import { CreditCard, Calendar, Download } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { format } from 'date-fns';

type Payment = {
  id: string;
  date: string;
  loanId: string;
  amount: number;
  status: 'paid' | 'pending' | 'scheduled';
};

export const PaymentsBillingPage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const payments: Payment[] = [
    { id: 'PMT-001', date: '2024-06-15', loanId: 'BL-2024-0891', amount: 3950, status: 'paid' },
    { id: 'PMT-002', date: '2024-06-20', loanId: 'TL-2024-0234', amount: 5670, status: 'paid' },
    { id: 'PMT-003', date: '2024-07-15', loanId: 'BL-2024-0891', amount: 3950, status: 'scheduled' },
    { id: 'PMT-004', date: '2024-07-20', loanId: 'TL-2024-0234', amount: 5670, status: 'scheduled' },
  ];

  const paymentColumns = [
    {
      header: 'Date',
      accessor: (row: Payment) => format(new Date(row.date), 'MMM dd, yyyy'),
      className: 'text-gray-900',
    },
    { header: 'Loan ID', accessor: 'loanId' as keyof Payment, className: 'font-mono text-sm text-gray-900' },
    {
      header: 'Amount',
      accessor: (row: Payment) => <span className="font-medium text-gray-900">{formatCurrency(row.amount)}</span>,
    },
    {
      header: 'Status',
      accessor: (row: Payment) => {
        const variant = row.status === 'paid' ? 'success' : row.status === 'pending' ? 'warning' : 'info';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: '',
      accessor: (row: Payment) => (
        <button className="flex items-center gap-2 text-sm font-medium text-compass-600">
          <Download size={14} />
          Receipt
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500">Borrower Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Payments & Billing</h1>
        <p className="mt-2 text-base text-gray-600">Make payments and view payment history</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-normal text-gray-900">Make a Payment</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Select Loan</label>
              <select className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm">
                <option>BL-2024-0891 - Bridge Loan</option>
                <option>TL-2024-0234 - Term Loan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Payment Amount</label>
              <input
                type="text"
                value="$3,950.00"
                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <button className="w-full rounded-lg bg-compass-600 px-4 py-3 text-sm font-medium text-white hover:bg-compass-700">
              Continue to Payment
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-normal text-gray-900">Payment Methods</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4">
              <CreditCard size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Chase Checking</p>
                <p className="text-sm text-gray-600">****4892</p>
              </div>
            </div>
            <button className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Add Payment Method
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-normal text-gray-900">Payment History</h2>
        <DataTable data={payments} columns={paymentColumns} />
      </div>
    </div>
  );
};
