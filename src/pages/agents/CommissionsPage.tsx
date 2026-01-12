import { DollarSign, TrendingUp, Clock, Download } from 'lucide-react';
import { DonutChart } from '../../components/common/DonutChart';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';

type Commission = {
  id: string;
  loanId: string;
  borrower: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
  expectedDate?: string;
};

export const CommissionsPage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data
  const earnings = {
    ytd: 186450,
    ytdChange: 23,
    thisMonth: 24500,
    monthLoans: 7,
    pending: 12800,
    pendingLoans: 3,
  };

  const productMix = [
    { name: 'Bridge Loans', value: 84000, color: '#355E3B' },
    { name: 'Term Loans', value: 56000, color: '#60966e' },
    { name: 'HELOC', value: 28000, color: '#a4c2ac' },
    { name: 'Construction', value: 18450, color: '#c6d8cb' },
  ];

  const paidCommissions: Commission[] = [
    { id: '1', loanId: 'BL-0968', borrower: 'T. Brown', amount: 3500, status: 'paid', date: '01/08/25' },
    { id: '2', loanId: 'TL-0856', borrower: 'R. Lee', amount: 4200, status: 'paid', date: '01/05/25' },
    { id: '3', loanId: 'BL-0945', borrower: 'K. Chen', amount: 2800, status: 'paid', date: '12/28/24' },
    { id: '4', loanId: 'BL-0923', borrower: 'M. Rodriguez', amount: 3900, status: 'paid', date: '12/20/24' },
    { id: '5', loanId: 'TL-0912', borrower: 'J. Williams', amount: 5100, status: 'paid', date: '12/15/24' },
  ];

  const pendingCommissions: Commission[] = [
    { id: '6', loanId: 'BL-1012', borrower: 'M. Wilson', amount: 4500, status: 'pending', date: '', expectedDate: '01/15/25' },
    { id: '7', loanId: 'TL-0991', borrower: 'J. Park', amount: 5100, status: 'pending', date: '', expectedDate: '01/18/25' },
    { id: '8', loanId: 'BL-0987', borrower: 'S. Thompson', amount: 3200, status: 'pending', date: '', expectedDate: '01/22/25' },
  ];

  const paidColumns = [
    { label: 'Date', accessor: (row: Commission) => row.date },
    { label: 'Loan ID', accessor: (row: Commission) => row.loanId },
    { label: 'Borrower', accessor: (row: Commission) => row.borrower },
    { label: 'Amount', accessor: (row: Commission) => formatCurrency(row.amount) },
    {
      label: 'Status',
      accessor: (row: Commission) => (
        <StatusBadge variant="success">Paid</StatusBadge>
      ),
    },
  ];

  const pendingColumns = [
    { label: 'Loan ID', accessor: (row: Commission) => row.loanId },
    { label: 'Borrower', accessor: (row: Commission) => row.borrower },
    { label: 'Expected Amount', accessor: (row: Commission) => formatCurrency(row.amount) },
    { label: 'Expected Date', accessor: (row: Commission) => row.expectedDate || '-' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Commission Tracker</h1>
        <p className="mt-2 text-base text-gray-600">View earnings, pending payments, and history</p>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign size={16} className="text-gray-400" />
            <p className="text-sm">YTD Earnings</p>
          </div>
          <p className="mt-3 text-3xl font-normal text-compass-700">{formatCurrency(earnings.ytd)}</p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <TrendingUp size={14} className="text-success" />
            <span className="text-success">+{earnings.ytdChange}%</span>
            <span className="text-gray-500">vs last year</span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign size={16} className="text-gray-400" />
            <p className="text-sm">This Month</p>
          </div>
          <p className="mt-3 text-3xl font-normal text-compass-700">{formatCurrency(earnings.thisMonth)}</p>
          <p className="mt-2 text-sm text-gray-600">{earnings.monthLoans} loans closed</p>
        </div>

        <div className="rounded-lg border border-compass-200 bg-compass-50 p-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} className="text-compass-600" />
            <p className="text-sm">Pending</p>
          </div>
          <p className="mt-3 text-3xl font-normal text-compass-700">{formatCurrency(earnings.pending)}</p>
          <p className="mt-2 text-sm text-compass-600">{earnings.pendingLoans} loans in progress</p>
        </div>
      </div>

      {/* Commission Breakdown */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-normal text-gray-900">Commission Breakdown by Product</h2>
        <DonutChart data={productMix} />
      </div>

      {/* Payment History */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-normal text-gray-900">Payment History</h2>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
        </div>
        <DataTable columns={paidColumns} data={paidCommissions} />
      </div>

      {/* Pending Commissions */}
      <div className="rounded-lg border border-compass-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-normal text-gray-900">Pending Commissions</h2>
        <DataTable columns={pendingColumns} data={pendingCommissions} />
      </div>
    </div>
  );
};
