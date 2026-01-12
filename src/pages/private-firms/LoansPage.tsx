import { useState } from 'react';
import { Search, Filter, Download, ArrowUpDown, TrendingUp, DollarSign, Percent } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { loansData, LoanData } from '../../data/loansData';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const LoansPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Calculate summary statistics
  const totalLoans = loansData.length;
  const activeLoans = loansData.filter((loan) => loan.status === 'Active').length;
  const totalPrincipal = loansData.reduce((sum, loan) => sum + loan.outstandingPrincipal, 0);
  const avgIRR = loansData.reduce((sum, loan) => sum + loan.netIRR, 0) / loansData.length;
  const totalOriginated = loansData.reduce((sum, loan) => sum + loan.amount, 0);

  // Loan type distribution for pie chart
  const loanTypeData = Object.entries(
    loansData.reduce((acc, loan) => {
      acc[loan.loanType] = (acc[loan.loanType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Capital source distribution for bar chart
  const capitalSourceData = Object.entries(
    loansData.reduce((acc, loan) => {
      acc[loan.capitalSource] = (acc[loan.capitalSource] || 0) + loan.outstandingPrincipal;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#355E3B', '#2d4f32', '#4a7c59', '#6b9976', '#8cb693'];

  const loanColumns = [
    {
      header: 'Loan ID / Borrower',
      accessor: (row: LoanData) => (
        <div>
          <div className="font-medium text-gray-900">{row.id}</div>
          <div className="text-sm text-gray-500">{row.borrower}</div>
        </div>
      ),
    },
    {
      header: 'Amount / Term',
      accessor: (row: LoanData) => (
        <div>
          <div className="font-medium text-gray-900">{formatCurrency(row.amount)}</div>
          <div className="text-sm text-gray-500">
            {row.rate}% · {row.term}mo
          </div>
        </div>
      ),
    },
    {
      header: 'Capital Source',
      accessor: (row: LoanData) => <span className="text-gray-900">{row.capitalSource}</span>,
    },
    {
      header: 'IRR (Net)',
      accessor: (row: LoanData) => (
        <span className="font-medium text-gray-900">{formatPercent(row.netIRR)}</span>
      ),
    },
    {
      header: 'Payment Health',
      accessor: (row: LoanData) => {
        const variant =
          row.paymentHealth === 'Current'
            ? 'success'
            : row.paymentHealth === 'Late'
              ? 'warning'
              : row.paymentHealth === 'Delinquent'
                ? 'error'
                : 'error';
        return <StatusBadge label={row.paymentHealth} variant={variant} />;
      },
    },
    {
      header: 'Outstanding Principal',
      accessor: (row: LoanData) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.outstandingPrincipal)}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: LoanData) => {
        const variant =
          row.status === 'Active'
            ? 'success'
            : row.status === 'Paid Off'
              ? 'info'
              : row.status === 'In Default'
                ? 'error'
                : 'warning';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: 'Loan Type',
      accessor: (row: LoanData) => <span className="text-sm text-gray-600">{row.loanType}</span>,
    },
    {
      header: 'Maturity Date',
      accessor: (row: LoanData) => (
        <span className="text-sm text-gray-600">{format(new Date(row.maturityDate), 'MMM dd, yyyy')}</span>
      ),
    },
    {
      header: 'Action',
      accessor: (row: LoanData) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">View</button>
      ),
    },
  ];

  // Filter loans based on search and status
  const filteredLoans = loansData.filter((loan) => {
    const matchesSearch =
      loan.borrower.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Operations</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Loans</h1>
        <p className="mt-2 text-base text-gray-600">System of record for all loan activity</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <DollarSign size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Outstanding</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalPrincipal)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <TrendingUp size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Loans</p>
              <p className="text-2xl font-normal text-gray-900">
                {activeLoans} <span className="text-base text-gray-500">of {totalLoans}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Percent size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Net IRR</p>
              <p className="text-2xl font-normal text-gray-900">{formatPercent(avgIRR)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <DollarSign size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Originated</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalOriginated)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Loan Type Distribution */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Loan Type Distribution</h2>
          <p className="mb-6 text-sm text-gray-500">Portfolio breakdown by product</p>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={loanTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {loanTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {loanTypeData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value} loans</span>
              </div>
            ))}
          </div>
        </div>

        {/* Capital Source Exposure */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Capital Source Exposure</h2>
          <p className="mb-6 text-sm text-gray-500">Outstanding principal by partner</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={capitalSourceData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Outstanding']}
              />
              <Bar dataKey="value" fill="#355E3B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
              placeholder="Search by borrower or loan ID..."
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
              <option value="Paid Off">Paid Off</option>
              <option value="In Default">In Default</option>
              <option value="Pending">Pending</option>
            </select>
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <ArrowUpDown size={16} />
            Sort
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Loans Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">All Loans</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredLoans.length} of {totalLoans} loans
            </p>
          </div>
        </div>

        <DataTable data={filteredLoans} columns={loanColumns} />
      </div>
    </div>
  );
};
