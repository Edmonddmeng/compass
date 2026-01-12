import { useState } from 'react';
import { Search, Filter, Download, Users, TrendingUp, DollarSign, Award } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { agentsData, AgentData } from '../../data/loansData';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ScatterChart, Scatter, ZAxis } from 'recharts';

export const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPerformance, setFilterPerformance] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate summary statistics
  const totalAgents = agentsData.length;
  const activeAgents = agentsData.filter((a) => a.status === 'Active').length;
  const totalVolume = agentsData.reduce((sum, a) => sum + a.totalVolume, 0);
  const totalFeesEarned = agentsData.reduce((sum, a) => sum + a.totalFeesEarned, 0);
  const totalLoansOriginated = agentsData.reduce((sum, a) => sum + a.totalLoansOriginated, 0);
  const avgDefaultRate = (agentsData.reduce((sum, a) => sum + a.defaultRate, 0) / agentsData.length).toFixed(2);

  // Performance rating distribution
  const performanceData = [
    { rating: 'Excellent', count: agentsData.filter((a) => a.performanceRating === 'Excellent').length },
    { rating: 'Good', count: agentsData.filter((a) => a.performanceRating === 'Good').length },
    { rating: 'Average', count: agentsData.filter((a) => a.performanceRating === 'Average').length },
    { rating: 'Poor', count: agentsData.filter((a) => a.performanceRating === 'Poor').length },
  ];

  // Top agents by volume
  const topAgentsByVolume = [...agentsData]
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, 5)
    .map((a) => ({ name: a.name, volume: a.totalVolume }));

  // Scatter: Default Rate vs Total Volume
  const scatterData = agentsData.map((a) => ({
    defaultRate: a.defaultRate,
    totalVolume: a.totalVolume,
    name: a.name,
  }));

  const agentColumns = [
    {
      header: 'Agent ID / Name',
      accessor: (row: AgentData) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.id}</div>
        </div>
      ),
    },
    {
      header: 'Company',
      accessor: (row: AgentData) => <span className="text-sm text-gray-900">{row.company}</span>,
    },
    {
      header: 'Contact',
      accessor: (row: AgentData) => (
        <div>
          <div className="text-sm text-gray-900">{row.email}</div>
          <div className="text-sm text-gray-500">{row.phone}</div>
        </div>
      ),
    },
    {
      header: 'Location',
      accessor: (row: AgentData) => <span className="text-sm text-gray-900">{row.location}</span>,
    },
    {
      header: 'Total Loans / Active',
      accessor: (row: AgentData) => (
        <div>
          <div className="font-medium text-gray-900">{row.totalLoansOriginated}</div>
          <div className="text-sm text-gray-500">{row.activeLoans} active</div>
        </div>
      ),
    },
    {
      header: 'Total Volume',
      accessor: (row: AgentData) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.totalVolume)}</span>
      ),
    },
    {
      header: 'Fees Earned',
      accessor: (row: AgentData) => (
        <span className="text-gray-900">{formatCurrency(row.totalFeesEarned)}</span>
      ),
    },
    {
      header: 'Avg Loan Size',
      accessor: (row: AgentData) => (
        <span className="text-sm text-gray-900">{formatCurrency(row.avgLoanSize)}</span>
      ),
    },
    {
      header: 'Default Rate',
      accessor: (row: AgentData) => {
        const color =
          row.defaultRate <= 0.5
            ? 'text-green-600'
            : row.defaultRate <= 1.0
              ? 'text-gray-900'
              : 'text-yellow-600';
        return <span className={`font-medium ${color}`}>{row.defaultRate}%</span>;
      },
    },
    {
      header: 'Performance',
      accessor: (row: AgentData) => {
        const variant =
          row.performanceRating === 'Excellent'
            ? 'success'
            : row.performanceRating === 'Good'
              ? 'info'
              : row.performanceRating === 'Average'
                ? 'warning'
                : 'error';
        return <StatusBadge label={row.performanceRating} variant={variant} />;
      },
    },
    {
      header: 'Status',
      accessor: (row: AgentData) => {
        const variant =
          row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'info' : 'error';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: 'Action',
      accessor: (row: AgentData) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">View</button>
      ),
    },
  ];

  // Filter agents
  const filteredAgents = agentsData.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    const matchesPerformance =
      filterPerformance === 'all' || agent.performanceRating === filterPerformance;
    return matchesSearch && matchesStatus && matchesPerformance;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Operations</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Agents</h1>
        <p className="mt-2 text-base text-gray-600">
          Loan originators, servicers, and performance tracking
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Users size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Agents</p>
              <p className="text-2xl font-normal text-gray-900">{totalAgents}</p>
              <p className="text-xs text-gray-500">{activeAgents} active</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <DollarSign size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Volume</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalVolume)}</p>
              <p className="text-xs text-gray-500">{totalLoansOriginated} loans</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <TrendingUp size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Fees Earned</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalFeesEarned)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Award size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Default Rate</p>
              <p className="text-2xl font-normal text-gray-900">{avgDefaultRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance Rating Distribution */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Performance Rating Distribution</h2>
          <p className="mb-6 text-sm text-gray-500">Agent count by performance level</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={performanceData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="rating"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [`${value} agents`, '']}
              />
              <Bar dataKey="count" fill="#355E3B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Agents by Volume */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Top Agents by Volume</h2>
          <p className="mb-6 text-sm text-gray-500">Highest total loan origination</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={topAgentsByVolume}
              layout="vertical"
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" horizontal={false} />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                dy={10}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                width={120}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Volume']}
              />
              <Bar dataKey="volume" fill="#355E3B" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Default Rate vs Volume Scatter */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Default Rate vs Total Volume</h2>
        <p className="mb-6 text-sm text-gray-500">
          Relationship between agent volume and default performance
        </p>

        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" />
            <XAxis
              type="number"
              dataKey="defaultRate"
              name="Default Rate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{ value: 'Default Rate (%)', position: 'insideBottom', offset: -5, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis
              type="number"
              dataKey="totalVolume"
              name="Total Volume"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              label={{ value: 'Total Volume', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
              dx={-10}
            />
            <ZAxis range={[60, 200]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'totalVolume') return [formatCurrency(value), 'Total Volume'];
                return [`${value}%`, 'Default Rate'];
              }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter data={scatterData} fill="#355E3B" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, company, ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 focus:border-gray-300 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Performance Filter */}
          <div className="relative">
            <select
              value={filterPerformance}
              onChange={(e) => setFilterPerformance(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm text-gray-900 focus:border-gray-300 focus:outline-none"
            >
              <option value="all">All Performance</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Agents Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">All Agents</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredAgents.length} of {totalAgents} agents
            </p>
          </div>
        </div>

        <DataTable data={filteredAgents} columns={agentColumns} />
      </div>
    </div>
  );
};
