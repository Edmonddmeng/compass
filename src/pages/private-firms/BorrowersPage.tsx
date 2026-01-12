import { useState } from 'react';
import { Search, Filter, Download, User, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { borrowersData, BorrowerData } from '../../data/loansData';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ScatterChart, Scatter, ZAxis } from 'recharts';

export const BorrowersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPaymentHistory, setFilterPaymentHistory] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate summary statistics
  const totalBorrowers = borrowersData.length;
  const activeBorrowers = borrowersData.filter((b) => b.status === 'Active').length;
  const totalBorrowed = borrowersData.reduce((sum, b) => sum + b.totalBorrowed, 0);
  const totalOutstanding = borrowersData.reduce((sum, b) => sum + b.totalOutstanding, 0);
  const totalRepaid = borrowersData.reduce((sum, b) => sum + b.totalRepaid, 0);
  const avgCreditScore = Math.round(
    borrowersData.reduce((sum, b) => sum + b.creditScore, 0) / borrowersData.length
  );

  // Credit score distribution
  const creditScoreRanges = [
    { range: '650-700', count: borrowersData.filter((b) => b.creditScore >= 650 && b.creditScore < 700).length },
    { range: '700-750', count: borrowersData.filter((b) => b.creditScore >= 700 && b.creditScore < 750).length },
    { range: '750-800', count: borrowersData.filter((b) => b.creditScore >= 750 && b.creditScore < 800).length },
    { range: '800+', count: borrowersData.filter((b) => b.creditScore >= 800).length },
  ];

  // Scatter plot data: Credit Score vs Total Borrowed
  const scatterData = borrowersData.map((b) => ({
    creditScore: b.creditScore,
    totalBorrowed: b.totalBorrowed,
    name: b.name,
  }));

  const borrowerColumns = [
    {
      header: 'Borrower ID / Name',
      accessor: (row: BorrowerData) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.id}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: (row: BorrowerData) => (
        <div>
          <div className="text-sm text-gray-900">{row.email}</div>
          <div className="text-sm text-gray-500">{row.phone}</div>
        </div>
      ),
    },
    {
      header: 'Credit Score',
      accessor: (row: BorrowerData) => {
        const color =
          row.creditScore >= 750
            ? 'text-green-600'
            : row.creditScore >= 700
              ? 'text-gray-900'
              : 'text-yellow-600';
        return <span className={`font-medium ${color}`}>{row.creditScore}</span>;
      },
    },
    {
      header: 'Total Loans',
      accessor: (row: BorrowerData) => (
        <div>
          <div className="font-medium text-gray-900">{row.totalLoans}</div>
          <div className="text-sm text-gray-500">{row.activeLoans} active</div>
        </div>
      ),
    },
    {
      header: 'Total Borrowed',
      accessor: (row: BorrowerData) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.totalBorrowed)}</span>
      ),
    },
    {
      header: 'Outstanding',
      accessor: (row: BorrowerData) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.totalOutstanding)}</span>
      ),
    },
    {
      header: 'Total Repaid',
      accessor: (row: BorrowerData) => (
        <span className="text-gray-900">{formatCurrency(row.totalRepaid)}</span>
      ),
    },
    {
      header: 'Payment History',
      accessor: (row: BorrowerData) => {
        const variant =
          row.paymentHistory === 'Excellent'
            ? 'success'
            : row.paymentHistory === 'Good'
              ? 'info'
              : row.paymentHistory === 'Fair'
                ? 'warning'
                : 'error';
        return <StatusBadge label={row.paymentHistory} variant={variant} />;
      },
    },
    {
      header: 'Status',
      accessor: (row: BorrowerData) => {
        const variant =
          row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'info' : 'error';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: 'Action',
      accessor: (row: BorrowerData) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">View</button>
      ),
    },
  ];

  // Filter borrowers
  const filteredBorrowers = borrowersData.filter((borrower) => {
    const matchesSearch =
      borrower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrower.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrower.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || borrower.status === filterStatus;
    const matchesPaymentHistory =
      filterPaymentHistory === 'all' || borrower.paymentHistory === filterPaymentHistory;
    return matchesSearch && matchesStatus && matchesPaymentHistory;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Operations</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Borrowers</h1>
        <p className="mt-2 text-base text-gray-600">
          Borrower profiles, credit history, and relationship tracking
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <User size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Borrowers</p>
              <p className="text-2xl font-normal text-gray-900">{totalBorrowers}</p>
              <p className="text-xs text-gray-500">{activeBorrowers} active</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <DollarSign size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Borrowed</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalBorrowed)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <TrendingUp size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Outstanding</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalOutstanding)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Activity size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Credit Score</p>
              <p className="text-2xl font-normal text-gray-900">{avgCreditScore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Credit Score Distribution */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Credit Score Distribution</h2>
          <p className="mb-6 text-sm text-gray-500">Borrower count by credit range</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={creditScoreRanges} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="range"
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
                formatter={(value: number) => [`${value} borrowers`, '']}
              />
              <Bar dataKey="count" fill="#355E3B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Credit Score vs Loan Amount */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Credit Score vs Total Borrowed</h2>
          <p className="mb-6 text-sm text-gray-500">Relationship between creditworthiness and volume</p>

          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" />
              <XAxis
                type="number"
                dataKey="creditScore"
                name="Credit Score"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                domain={[650, 'dataMax + 10']}
                dy={10}
              />
              <YAxis
                type="number"
                dataKey="totalBorrowed"
                name="Total Borrowed"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
                  if (name === 'totalBorrowed') return [formatCurrency(value), 'Total Borrowed'];
                  return [value, 'Credit Score'];
                }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Scatter data={scatterData} fill="#355E3B" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment History Breakdown */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Payment History Breakdown</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {['Excellent', 'Good', 'Fair', 'Poor'].map((level) => {
            const count = borrowersData.filter((b) => b.paymentHistory === level).length;
            const percentage = ((count / totalBorrowers) * 100).toFixed(1);
            return (
              <div key={level} className="rounded-lg border border-gray-100 bg-gray-50 p-5">
                <p className="text-sm font-medium text-gray-600">{level}</p>
                <p className="mt-2 text-2xl font-normal text-gray-900">{count}</p>
                <p className="mt-1 text-sm text-gray-500">{percentage}% of borrowers</p>
              </div>
            );
          })}
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
              placeholder="Search by name, ID, or email..."
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
              <option value="Blacklisted">Blacklisted</option>
            </select>
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Payment History Filter */}
          <div className="relative">
            <select
              value={filterPaymentHistory}
              onChange={(e) => setFilterPaymentHistory(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm text-gray-900 focus:border-gray-300 focus:outline-none"
            >
              <option value="all">All Payment History</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
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

      {/* Borrowers Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">All Borrowers</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredBorrowers.length} of {totalBorrowers} borrowers
            </p>
          </div>
        </div>

        <DataTable data={filteredBorrowers} columns={borrowerColumns} />
      </div>
    </div>
  );
};
