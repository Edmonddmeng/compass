import { DollarSign, Calendar, AlertCircle, FileText, MessageSquare, CreditCard } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { format } from 'date-fns';

type ActiveLoan = {
  id: string;
  productType: string;
  lenderFirm: string;
  outstandingBalance: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  paymentStatus: 'current' | 'due-soon' | 'late';
};

type RecentActivity = {
  id: string;
  type: 'payment' | 'document' | 'message';
  description: string;
  timestamp: string;
};

export const BorrowerDashboardNew = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data
  const activeLoans: ActiveLoan[] = [
    {
      id: 'BL-2024-0891',
      productType: 'Bridge Loan',
      lenderFirm: 'Anchor Capital',
      outstandingBalance: 475000,
      nextPaymentDate: '2024-07-15',
      nextPaymentAmount: 3950,
      paymentStatus: 'current',
    },
    {
      id: 'TL-2024-0234',
      productType: 'Term Loan',
      lenderFirm: 'Summit Lending',
      outstandingBalance: 680000,
      nextPaymentDate: '2024-07-20',
      nextPaymentAmount: 5670,
      paymentStatus: 'due-soon',
    },
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'payment',
      description: 'Payment of $3,950 processed for BL-2024-0891',
      timestamp: '2024-06-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'document',
      description: 'Insurance certificate uploaded for TL-2024-0234',
      timestamp: '2024-06-12T14:20:00Z',
    },
    {
      id: '3',
      type: 'message',
      description: 'Message from your agent: Payment confirmation received',
      timestamp: '2024-06-10T09:15:00Z',
    },
    {
      id: '4',
      type: 'payment',
      description: 'Payment of $5,670 processed for TL-2024-0234',
      timestamp: '2024-06-05T11:00:00Z',
    },
  ];

  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + loan.outstandingBalance, 0);
  const nextPaymentDue = activeLoans.reduce((sum, loan) => sum + loan.nextPaymentAmount, 0);

  const loanColumns = [
    {
      header: 'Loan ID',
      accessor: (row: ActiveLoan) => (
        <span className="font-mono text-sm font-medium text-gray-900">{row.id}</span>
      ),
    },
    {
      header: 'Product',
      accessor: 'productType' as keyof ActiveLoan,
      className: 'text-gray-900',
    },
    {
      header: 'Lender',
      accessor: 'lenderFirm' as keyof ActiveLoan,
      className: 'text-gray-600',
    },
    {
      header: 'Outstanding Balance',
      accessor: (row: ActiveLoan) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.outstandingBalance)}</span>
      ),
    },
    {
      header: 'Next Payment Due',
      accessor: (row: ActiveLoan) => (
        <div>
          <div className="font-medium text-gray-900">{format(new Date(row.nextPaymentDate), 'MMM dd, yyyy')}</div>
          <div className="text-sm text-gray-600">{formatCurrency(row.nextPaymentAmount)}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (row: ActiveLoan) => {
        const variant = row.paymentStatus === 'current' ? 'success' : row.paymentStatus === 'due-soon' ? 'warning' : 'error';
        const label = row.paymentStatus === 'current' ? 'Current' : row.paymentStatus === 'due-soon' ? 'Due Soon' : 'Late';
        return <StatusBadge label={label} variant={variant} />;
      },
    },
    {
      header: '',
      accessor: (row: ActiveLoan) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">
          Make Payment
        </button>
      ),
    },
  ];

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'payment':
        return <DollarSign size={16} className="text-success" />;
      case 'document':
        return <FileText size={16} className="text-info" />;
      case 'message':
        return <MessageSquare size={16} className="text-compass-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Borrower Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Dashboard</h1>
        <p className="mt-2 text-base text-gray-600">
          Overview of your active loans, upcoming payments, and recent activity
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-400" />
            <p className="text-sm text-gray-600">Total Outstanding</p>
          </div>
          <p className="mt-3 text-3xl font-normal text-gray-900">{formatCurrency(totalOutstanding)}</p>
          <p className="mt-1 text-sm text-gray-500">Across {activeLoans.length} active loans</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <p className="text-sm text-gray-600">Next Payment Due</p>
          </div>
          <p className="mt-3 text-3xl font-normal text-gray-900">{formatCurrency(nextPaymentDue)}</p>
          <p className="mt-1 text-sm text-gray-500">Due on {format(new Date(activeLoans[0].nextPaymentDate), 'MMM dd, yyyy')}</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-gray-400" />
            <p className="text-sm text-gray-600">Loan Status</p>
          </div>
          <p className="mt-3 text-3xl font-normal text-success">All Current</p>
          <p className="mt-1 text-sm text-gray-500">No payments overdue</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-normal text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <button className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <CreditCard size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Make a Payment</p>
              <p className="text-sm text-gray-500">Pay your loan</p>
            </div>
          </button>

          <button className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <Calendar size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Payment History</p>
              <p className="text-sm text-gray-500">View past payments</p>
            </div>
          </button>

          <button className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <FileText size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Upload Documents</p>
              <p className="text-sm text-gray-500">Submit required docs</p>
            </div>
          </button>

          <button className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <MessageSquare size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Contact Agent</p>
              <p className="text-sm text-gray-500">Get help</p>
            </div>
          </button>
        </div>
      </div>

      {/* Active Loans */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Active Loans</h2>
          <p className="mt-1 text-sm text-gray-500">Your current loans and payment status</p>
        </div>
        <DataTable data={activeLoans} columns={loanColumns} />
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-gray-500">Latest updates and actions on your account</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {format(new Date(activity.timestamp), 'MMM dd, yyyy • hh:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-lg border border-gray-200 bg-compass-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-100">
            <MessageSquare size={20} className="text-compass-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Need Help?</p>
            <p className="mt-1 text-sm text-gray-600">
              Your assigned agent is here to help. Contact them directly for questions about your loans, payments, or any issues.
            </p>
            <button className="mt-3 text-sm font-medium text-compass-600 hover:text-compass-700">
              Contact Your Agent →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
