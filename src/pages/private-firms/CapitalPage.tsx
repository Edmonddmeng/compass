import { useState } from 'react';
import { Search, Filter, Download, Briefcase, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { capitalPartnersData, CapitalPartnerData } from '../../data/loansData';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const CapitalPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRiskTolerance, setFilterRiskTolerance] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate summary statistics
  const totalPartners = capitalPartnersData.length;
  const activePartners = capitalPartnersData.filter((p) => p.status === 'Active').length;
  const totalCommitment = capitalPartnersData.reduce((sum, p) => sum + p.commitmentAmount, 0);
  const totalDeployed = capitalPartnersData.reduce((sum, p) => sum + p.deployedCapital, 0);
  const totalAvailable = capitalPartnersData.reduce((sum, p) => sum + p.availableCapital, 0);
  const totalReturns = capitalPartnersData.reduce((sum, p) => sum + p.totalReturns, 0);
  const avgUtilization = (capitalPartnersData.reduce((sum, p) => sum + p.utilizationRate, 0) / totalPartners).toFixed(1);

  // Capital deployment by partner
  const deploymentData = capitalPartnersData.map((p) => ({
    name: p.name.split(' ')[0], // Use first word of name for brevity
    deployed: p.deployedCapital,
    available: p.availableCapital,
  }));

  // Risk tolerance distribution
  const riskToleranceData = [
    { tolerance: 'Conservative', count: capitalPartnersData.filter((p) => p.riskTolerance === 'Conservative').length },
    { tolerance: 'Moderate', count: capitalPartnersData.filter((p) => p.riskTolerance === 'Moderate').length },
    { tolerance: 'Aggressive', count: capitalPartnersData.filter((p) => p.riskTolerance === 'Aggressive').length },
  ];

  // Returns by partner
  const returnsData = [...capitalPartnersData]
    .sort((a, b) => b.totalReturns - a.totalReturns)
    .map((p) => ({ name: p.name.split(' ')[0], returns: p.totalReturns }));

  const COLORS = ['#355E3B', '#6b9976'];

  const capitalColumns = [
    {
      header: 'Partner ID / Name',
      accessor: (row: CapitalPartnerData) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.id}</div>
        </div>
      ),
    },
    {
      header: 'Contact Person',
      accessor: (row: CapitalPartnerData) => (
        <div>
          <div className="text-sm text-gray-900">{row.contactPerson}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      header: 'Commitment',
      accessor: (row: CapitalPartnerData) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.commitmentAmount)}</span>
      ),
    },
    {
      header: 'Deployed',
      accessor: (row: CapitalPartnerData) => (
        <div>
          <div className="font-medium text-gray-900">{formatCurrency(row.deployedCapital)}</div>
          <div className="text-sm text-gray-500">{row.utilizationRate}% utilized</div>
        </div>
      ),
    },
    {
      header: 'Available',
      accessor: (row: CapitalPartnerData) => (
        <span className="text-gray-900">{formatCurrency(row.availableCapital)}</span>
      ),
    },
    {
      header: 'Loans / Active',
      accessor: (row: CapitalPartnerData) => (
        <div>
          <div className="font-medium text-gray-900">{row.totalLoansParticipated}</div>
          <div className="text-sm text-gray-500">{row.activeLoans} active</div>
        </div>
      ),
    },
    {
      header: 'Total Returns',
      accessor: (row: CapitalPartnerData) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.totalReturns)}</span>
      ),
    },
    {
      header: 'Avg IRR',
      accessor: (row: CapitalPartnerData) => (
        <span className="font-medium text-gray-900">{row.avgIRR}%</span>
      ),
    },
    {
      header: 'Risk Tolerance',
      accessor: (row: CapitalPartnerData) => {
        const variant =
          row.riskTolerance === 'Conservative'
            ? 'info'
            : row.riskTolerance === 'Moderate'
              ? 'warning'
              : 'error';
        return <StatusBadge label={row.riskTolerance} variant={variant} />;
      },
    },
    {
      header: 'Status',
      accessor: (row: CapitalPartnerData) => {
        const variant =
          row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'info' : 'warning';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: 'Action',
      accessor: (row: CapitalPartnerData) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">View</button>
      ),
    },
  ];

  // Filter capital partners
  const filteredPartners = capitalPartnersData.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;
    const matchesRiskTolerance =
      filterRiskTolerance === 'all' || partner.riskTolerance === filterRiskTolerance;
    return matchesSearch && matchesStatus && matchesRiskTolerance;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Operations</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Capital Partners</h1>
        <p className="mt-2 text-base text-gray-600">
          Partner ledger, deployment metrics, and capital allocation
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Briefcase size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Partners</p>
              <p className="text-2xl font-normal text-gray-900">{totalPartners}</p>
              <p className="text-xs text-gray-500">{activePartners} active</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <DollarSign size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Commitment</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalCommitment)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <TrendingUp size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Capital Deployed</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalDeployed)}</p>
              <p className="text-xs text-gray-500">{avgUtilization}% avg utilization</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Activity size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Returns</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalReturns)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Capital Deployment Overview */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Capital Deployment by Partner</h2>
        <p className="mb-6 text-sm text-gray-500">Deployed vs available capital allocation</p>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={deploymentData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Bar dataKey="deployed" stackId="a" fill="#355E3B" name="Deployed" radius={[0, 0, 0, 0]} />
            <Bar dataKey="available" stackId="a" fill="#6b9976" name="Available" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Risk Tolerance Distribution */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Risk Tolerance Distribution</h2>
          <p className="mb-6 text-sm text-gray-500">Partner count by risk appetite</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={riskToleranceData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="tolerance"
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
                formatter={(value: number) => [`${value} partners`, '']}
              />
              <Bar dataKey="count" fill="#355E3B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Returns by Partner */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Returns by Partner</h2>
          <p className="mb-6 text-sm text-gray-500">Total returns generated per partner</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={returnsData}
              layout="vertical"
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" horizontal={false} />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dy={10}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                width={80}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Returns']}
              />
              <Bar dataKey="returns" fill="#355E3B" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Partner Preferences */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Partner Loan Preferences</h2>
        <p className="mb-6 text-sm text-gray-500">Preferred loan types by partner</p>

        <div className="space-y-4">
          {capitalPartnersData.map((partner) => (
            <div key={partner.id} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-gray-900">{partner.name}</span>
                <span className="text-sm text-gray-500">
                  {partner.utilizationRate}% utilization
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {partner.preferredLoanTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, contact, ID, or email..."
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
              <option value="Pending">Pending</option>
            </select>
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Risk Tolerance Filter */}
          <div className="relative">
            <select
              value={filterRiskTolerance}
              onChange={(e) => setFilterRiskTolerance(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm text-gray-900 focus:border-gray-300 focus:outline-none"
            >
              <option value="all">All Risk Tolerance</option>
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Aggressive">Aggressive</option>
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

      {/* Capital Partners Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">All Capital Partners</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredPartners.length} of {totalPartners} partners
            </p>
          </div>
        </div>

        <DataTable data={filteredPartners} columns={capitalColumns} />
      </div>
    </div>
  );
};
