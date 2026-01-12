import { useState } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

type Loan = {
  id: string;
  productType: string;
  lenderFirm: string;
  originalAmount: number;
  outstandingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  nextDueDate: string;
  paymentStatus: 'current' | 'late' | 'paid-off';
  originationDate: string;
  maturityDate: string;
};

type PaymentHistory = {
  id: string;
  date: string;
  amount: number;
  principalPaid: number;
  interestPaid: number;
  status: 'paid' | 'pending';
};

export const MyLoansPage = () => {
  const [expandedLoan, setExpandedLoan] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Mock loan data
  const loans: Loan[] = [
    {
      id: 'BL-2024-0891',
      productType: 'Bridge Loan',
      lenderFirm: 'Anchor Capital',
      originalAmount: 500000,
      outstandingBalance: 475000,
      interestRate: 0.095,
      monthlyPayment: 3950,
      nextDueDate: '2024-07-15',
      paymentStatus: 'current',
      originationDate: '2024-01-15',
      maturityDate: '2025-01-15',
    },
    {
      id: 'TL-2024-0234',
      productType: 'Term Loan',
      lenderFirm: 'Summit Lending',
      originalAmount: 750000,
      outstandingBalance: 680000,
      interestRate: 0.0825,
      monthlyPayment: 5670,
      nextDueDate: '2024-07-20',
      paymentStatus: 'current',
      originationDate: '2024-02-01',
      maturityDate: '2029-02-01',
    },
    {
      id: 'BL-2023-0456',
      productType: 'Bridge Loan',
      lenderFirm: 'Gateway Fund',
      originalAmount: 350000,
      outstandingBalance: 0,
      interestRate: 0.105,
      monthlyPayment: 0,
      nextDueDate: '',
      paymentStatus: 'paid-off',
      originationDate: '2023-06-10',
      maturityDate: '2024-06-10',
    },
  ];

  // Mock payment history for a specific loan
  const paymentHistory: Record<string, PaymentHistory[]> = {
    'BL-2024-0891': [
      {
        id: 'pay-1',
        date: '2024-06-15',
        amount: 3950,
        principalPaid: 1950,
        interestPaid: 2000,
        status: 'paid',
      },
      {
        id: 'pay-2',
        date: '2024-05-15',
        amount: 3950,
        principalPaid: 1875,
        interestPaid: 2075,
        status: 'paid',
      },
      {
        id: 'pay-3',
        date: '2024-04-15',
        amount: 3950,
        principalPaid: 1800,
        interestPaid: 2150,
        status: 'paid',
      },
    ],
  };

  const activeLoans = loans.filter((l) => l.paymentStatus !== 'paid-off');
  const paidOffLoans = loans.filter((l) => l.paymentStatus === 'paid-off');

  const loanColumns = [
    {
      header: 'Loan ID',
      accessor: (row: Loan) => (
        <span className="font-mono text-sm font-medium text-gray-900">{row.id}</span>
      ),
    },
    {
      header: 'Product',
      accessor: 'productType' as keyof Loan,
      className: 'text-gray-900',
    },
    {
      header: 'Lender',
      accessor: 'lenderFirm' as keyof Loan,
      className: 'text-gray-600',
    },
    {
      header: 'Original Amount',
      accessor: (row: Loan) => (
        <span className="text-gray-600">{formatCurrency(row.originalAmount)}</span>
      ),
    },
    {
      header: 'Outstanding',
      accessor: (row: Loan) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.outstandingBalance)}</span>
      ),
    },
    {
      header: 'Interest Rate',
      accessor: (row: Loan) => (
        <span className="text-gray-900">{formatPercent(row.interestRate)}</span>
      ),
    },
    {
      header: 'Monthly Payment',
      accessor: (row: Loan) => (
        <span className="text-gray-900">{formatCurrency(row.monthlyPayment)}</span>
      ),
    },
    {
      header: 'Next Due',
      accessor: (row: Loan) => (
        <span className="text-gray-600">
          {row.nextDueDate ? format(new Date(row.nextDueDate), 'MMM dd, yyyy') : '—'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Loan) => {
        const variant = row.paymentStatus === 'current' ? 'success' : row.paymentStatus === 'late' ? 'error' : 'info';
        const label = row.paymentStatus === 'current' ? 'Current' : row.paymentStatus === 'late' ? 'Late' : 'Paid Off';
        return <StatusBadge label={label} variant={variant} />;
      },
    },
    {
      header: '',
      accessor: (row: Loan) => (
        <button
          onClick={() => setExpandedLoan(expandedLoan === row.id ? null : row.id)}
          className="flex items-center gap-1 text-sm font-medium text-compass-600 hover:text-compass-700"
        >
          {expandedLoan === row.id ? (
            <>
              Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Details <ChevronDown size={16} />
            </>
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Borrower Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">My Loans</h1>
        <p className="mt-2 text-base text-gray-600">
          Detailed view of all your loans, payment schedules, and history
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Total Active Loans</p>
          <p className="mt-2 text-3xl font-normal text-gray-900">{activeLoans.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Total Outstanding Balance</p>
          <p className="mt-2 text-3xl font-normal text-gray-900">
            {formatCurrency(activeLoans.reduce((sum, l) => sum + l.outstandingBalance, 0))}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Total Monthly Payments</p>
          <p className="mt-2 text-3xl font-normal text-gray-900">
            {formatCurrency(activeLoans.reduce((sum, l) => sum + l.monthlyPayment, 0))}
          </p>
        </div>
      </div>

      {/* Active Loans */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Active Loans</h2>
          <p className="mt-1 text-sm text-gray-500">Your current loans</p>
        </div>

        <div className="space-y-6">
          {activeLoans.map((loan) => (
            <div key={loan.id} className="rounded-lg border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {loanColumns.map((col, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-xs font-normal text-gray-500"
                        >
                          {col.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {loanColumns.map((col, idx) => (
                        <td key={idx} className="whitespace-nowrap px-4 py-4 text-sm">
                          {typeof col.accessor === 'function' ? col.accessor(loan) : loan[col.accessor]}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Expanded Details */}
              {expandedLoan === loan.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Loan Details */}
                    <div>
                      <h3 className="mb-4 font-medium text-gray-900">Loan Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Origination Date</span>
                          <span className="text-sm font-medium text-gray-900">
                            {format(new Date(loan.originationDate), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Maturity Date</span>
                          <span className="text-sm font-medium text-gray-900">
                            {format(new Date(loan.maturityDate), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Remaining Principal</span>
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(loan.outstandingBalance)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Paid</span>
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(loan.originalAmount - loan.outstandingBalance)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                          View Documents
                        </button>
                        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                          Contact Lender
                        </button>
                      </div>
                    </div>

                    {/* Payment History */}
                    <div>
                      <h3 className="mb-4 font-medium text-gray-900">Recent Payment History</h3>
                      <div className="space-y-3">
                        {paymentHistory[loan.id]?.map((payment) => (
                          <div
                            key={payment.id}
                            className="rounded-lg border border-gray-200 bg-white p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {formatCurrency(payment.amount)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {format(new Date(payment.date), 'MMM dd, yyyy')}
                                </p>
                              </div>
                              <StatusBadge
                                label={payment.status === 'paid' ? 'Paid' : 'Pending'}
                                variant={payment.status === 'paid' ? 'success' : 'warning'}
                              />
                            </div>
                            <div className="mt-2 flex gap-4 text-xs text-gray-600">
                              <span>Principal: {formatCurrency(payment.principalPaid)}</span>
                              <span>Interest: {formatCurrency(payment.interestPaid)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="mt-3 text-sm font-medium text-compass-600 hover:text-compass-700">
                        View Full Payment History →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Past Loans */}
      {paidOffLoans.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Past Loans</h2>
            <p className="mt-1 text-sm text-gray-500">Completed and paid-off loans</p>
          </div>
          <DataTable data={paidOffLoans} columns={loanColumns} />
        </div>
      )}
    </div>
  );
};
