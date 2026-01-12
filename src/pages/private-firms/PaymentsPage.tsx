import { useState } from 'react';
import { Search, Filter, Download, ArrowDownToLine, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { paymentsData, PaymentData } from '../../data/loansData';
import { format } from 'date-fns';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

export const PaymentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate summary statistics
  const totalPayments = paymentsData.length;
  const settledPayments = paymentsData.filter((p) => p.status === 'Settled');
  const pendingPayments = paymentsData.filter((p) => p.status === 'Pending');
  const failedPayments = paymentsData.filter((p) => p.status === 'Failed');

  const totalAmount = paymentsData.reduce((sum, p) => sum + p.amount, 0);
  const settledAmount = settledPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const failedAmount = failedPayments.reduce((sum, p) => sum + p.amount, 0);

  // Payment method breakdown
  const methodData = [
    {
      method: 'ACH',
      count: paymentsData.filter((p) => p.method === 'ACH').length,
      amount: paymentsData.filter((p) => p.method === 'ACH').reduce((sum, p) => sum + p.amount, 0),
    },
    {
      method: 'Wire',
      count: paymentsData.filter((p) => p.method === 'Wire').length,
      amount: paymentsData.filter((p) => p.method === 'Wire').reduce((sum, p) => sum + p.amount, 0),
    },
    {
      method: 'Check',
      count: paymentsData.filter((p) => p.method === 'Check').length,
      amount: paymentsData.filter((p) => p.method === 'Check').reduce((sum, p) => sum + p.amount, 0),
    },
  ];

  // Mock data for payment flow over time
  const paymentFlowData = [
    { date: 'Jun 08', amount: 3200 },
    { date: 'Jun 09', amount: 3875 },
    { date: 'Jun 10', amount: 8850 },
    { date: 'Jun 11', amount: 15250 },
    { date: 'Jun 12', amount: 20450 },
  ];

  const paymentColumns = [
    {
      header: 'Payment ID',
      accessor: (row: PaymentData) => (
        <div>
          <div className="font-medium text-gray-900">{row.id}</div>
          <div className="text-sm text-gray-500">{row.reference}</div>
        </div>
      ),
    },
    {
      header: 'Initiated / Settled',
      accessor: (row: PaymentData) => (
        <div>
          <div className="text-sm text-gray-900">
            {format(new Date(row.initiatedDate), 'MMM dd, hh:mm a')}
          </div>
          <div className="text-sm text-gray-500">
            {row.settlementDate !== '—'
              ? format(new Date(row.settlementDate), 'MMM dd, hh:mm a')
              : '—'}
          </div>
        </div>
      ),
    },
    {
      header: 'Borrower',
      accessor: (row: PaymentData) => <span className="font-medium text-gray-900">{row.borrower}</span>,
    },
    {
      header: 'Amount',
      accessor: (row: PaymentData) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.amount)}</span>
      ),
    },
    {
      header: 'Method',
      accessor: (row: PaymentData) => {
        const icon =
          row.method === 'ACH' ? (
            <span className="text-xs text-gray-600">ACH</span>
          ) : row.method === 'Wire' ? (
            <span className="text-xs text-gray-600">Wire</span>
          ) : (
            <span className="text-xs text-gray-600">Check</span>
          );
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1">
            {icon}
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessor: (row: PaymentData) => {
        const variant =
          row.status === 'Settled'
            ? 'success'
            : row.status === 'Pending'
              ? 'warning'
              : row.status === 'Failed'
                ? 'error'
                : 'info';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: 'Linked Loan',
      accessor: (row: PaymentData) => <span className="text-sm text-gray-600">{row.loanId}</span>,
    },
    {
      header: 'Notes',
      accessor: (row: PaymentData) => (
        <span className="text-sm text-gray-600">{row.notes || '—'}</span>
      ),
    },
    {
      header: 'Action',
      accessor: (row: PaymentData) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">
          {row.status === 'Failed' ? 'Retry' : 'View'}
        </button>
      ),
    },
  ];

  // Filter payments based on search, status, and method
  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.borrower.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Operations</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Payments</h1>
        <p className="mt-2 text-base text-gray-600">Incoming money tracking and reconciliation</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <ArrowDownToLine size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Received</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-50 p-2">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Settled</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(settledAmount)}</p>
              <p className="text-xs text-gray-500">{settledPayments.length} payments</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-50 p-2">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(pendingAmount)}</p>
              <p className="text-xs text-gray-500">{pendingPayments.length} payments</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-50 p-2">
              <XCircle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(failedAmount)}</p>
              <p className="text-xs text-gray-500">{failedPayments.length} payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Flow Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Payment Flow</h2>
        <p className="mb-6 text-sm text-gray-500">Cumulative incoming payments over time</p>

        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={paymentFlowData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPaymentFlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#355E3B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#355E3B" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
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
              formatter={(value: number) => [formatCurrency(value), 'Amount']}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#355E3B"
              strokeWidth={2}
              fill="url(#colorPaymentFlow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Method Breakdown */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Payment Method Breakdown</h2>
        <p className="mb-6 text-sm text-gray-500">Volume and count by payment type</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {methodData.map((method) => (
            <div key={method.method} className="rounded-lg border border-gray-100 bg-gray-50 p-5">
              <p className="text-sm font-medium text-gray-600">{method.method}</p>
              <p className="mt-2 text-2xl font-normal text-gray-900">{formatCurrency(method.amount)}</p>
              <p className="mt-1 text-sm text-gray-500">{method.count} payments</p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-[#355E3B]"
                  style={{
                    width: `${(method.amount / totalAmount) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {((method.amount / totalAmount) * 100).toFixed(1)}% of total
              </p>
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
              placeholder="Search by borrower, payment ID, or reference..."
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
              <option value="Settled">Settled</option>
              <option value="Pending">Pending</option>
              <option value="Initiated">Initiated</option>
              <option value="Failed">Failed</option>
            </select>
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Method Filter */}
          <div className="relative">
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm text-gray-900 focus:border-gray-300 focus:outline-none"
            >
              <option value="all">All Methods</option>
              <option value="ACH">ACH</option>
              <option value="Wire">Wire</option>
              <option value="Check">Check</option>
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

      {/* Failed Payments Warning */}
      {failedPayments.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <XCircle size={20} className="mt-0.5 text-red-600" />
            <div className="flex-1">
              <p className="font-medium text-red-900">
                {failedPayments.length} failed payment{failedPayments.length !== 1 ? 's' : ''} require
                attention
              </p>
              <p className="mt-1 text-sm text-red-700">
                Total amount affected: {formatCurrency(failedAmount)}. Review and retry these payments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Payments Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">All Payments</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredPayments.length} of {totalPayments} payments
            </p>
          </div>
        </div>

        <DataTable data={filteredPayments} columns={paymentColumns} />
      </div>
    </div>
  );
};
