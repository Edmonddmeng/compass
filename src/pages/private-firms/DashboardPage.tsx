import { DollarSign, Wallet, TrendingUp, AlertCircle, ArrowDownToLine, Percent, ArrowRight } from 'lucide-react';
import { KPICard } from '../../components/common/KPICard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MoneyFlowChart } from '../../components/common/MoneyFlowChart';
import { AreaChart } from '../../components/common/AreaChart';
import { DateRangeSelector } from '../../components/common/DateRangeSelector';
import { mockKPIs, mockLoans, mockPayments, mockMoneyFlow, Loan, Payment } from '../../data/mockData';
import { format } from 'date-fns';

export const DashboardPage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const loanColumns = [
    {
      header: 'Loan ID / Borrower',
      accessor: (row: Loan) => (
        <div>
          <div className="font-medium text-gray-900">{row.id}</div>
          <div className="text-gray-500">{row.borrower}</div>
        </div>
      ),
    },
    {
      header: 'Outstanding Balance',
      accessor: (row: Loan) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.outstandingBalance)}</span>
      ),
    },
    {
      header: 'Next Due Date',
      accessor: (row: Loan) => format(new Date(row.nextDueDate), 'MMM dd, yyyy'),
      className: 'text-gray-600',
    },
    {
      header: 'Days Late',
      accessor: (row: Loan) => (
        <span className={row.daysLate > 0 ? 'font-medium text-error' : 'text-gray-600'}>
          {row.daysLate > 0 ? `${row.daysLate} days` : '—'}
        </span>
      ),
    },
    {
      header: 'Risk Tier',
      accessor: (row: Loan) => {
        const variant =
          row.riskTier === 'Low' ? 'success' : row.riskTier === 'Medium' ? 'warning' : 'error';
        return <StatusBadge label={row.riskTier} variant={variant} />;
      },
    },
    {
      header: 'Status',
      accessor: (row: Loan) => {
        const variant =
          row.paymentStatus === 'Current'
            ? 'success'
            : row.paymentStatus === 'Late'
              ? 'warning'
              : row.paymentStatus === 'Delinquent'
                ? 'error'
                : 'info';
        return <StatusBadge label={row.paymentStatus} variant={variant} />;
      },
    },
    {
      header: 'Action',
      accessor: (row: Loan) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">
          {row.paymentStatus === 'Current' ? 'View' : 'Review'}
        </button>
      ),
    },
  ];

  const paymentColumns = [
    {
      header: 'Timestamp',
      accessor: (row: Payment) => (
        <span className="text-gray-600">{format(new Date(row.timestamp), 'MMM dd, hh:mm a')}</span>
      ),
    },
    {
      header: 'Borrower',
      accessor: (row: Payment) => <span className="font-medium text-gray-900">{row.borrower}</span>,
    },
    {
      header: 'Amount',
      accessor: (row: Payment) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.amount)}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Payment) => {
        const variant =
          row.status === 'Cleared' ? 'success' : row.status === 'Pending' ? 'warning' : 'error';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: 'Linked Loan',
      accessor: (row: Payment) => <span className="text-gray-600">{row.linkedLoan}</span>,
    },
    {
      header: 'Distribution',
      accessor: (row: Payment) => (
        <span className="text-gray-600">{row.linkedDistribution || '—'}</span>
      ),
    },
  ];

  // Filter loans requiring attention (Late or Delinquent)
  const loansRequiringAttention = mockLoans.filter(
    (loan) => loan.paymentStatus === 'Late' || loan.paymentStatus === 'Delinquent'
  );

  // Mock data for total lending overview
  const lendingOverviewData = [
    { date: 'Apr 29', value: 3850000 },
    { date: 'May 6', value: 3920000 },
    { date: 'May 13', value: 4100000 },
    { date: 'May 20', value: 4180000 },
    { date: 'May 27', value: 4285000 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header - Ramp Style */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500">Home</p>
          <h1 className="mt-1 text-4xl font-normal text-gray-900">Dashboard</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-gray-200">
          <button className="border-b-2 border-gray-900 pb-3 text-sm font-medium text-gray-900">
            Overview
          </button>
          <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Activity
          </button>
          <a
            href="/dashboard/analytics"
            className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Analytics
          </a>
        </div>
      </div>

      {/* Date Range Selector */}
      <div>
        <DateRangeSelector />
      </div>

      {/* Total Outstanding Principal Chart */}
      <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-normal text-gray-900">Total outstanding principal</h2>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
          </div>
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <p className="text-sm font-normal text-gray-500">Total active loans</p>
        </div>

        <p className="mb-6 text-3xl font-normal text-gray-900">{formatCurrency(mockKPIs.outstandingPrincipal)}</p>

        <AreaChart data={lendingOverviewData} color="#355E3B" height={280} />
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Outstanding Principal"
          value={formatCurrency(mockKPIs.outstandingPrincipal)}
          subtitle="Total active loans"
          icon={DollarSign}
        />
        <KPICard
          title="Funds in Custody (FBO)"
          value={formatCurrency(mockKPIs.fundsInCustody)}
          subtitle="Awaiting distribution"
          icon={Wallet}
        />
        <KPICard
          title="Payments Received (7d)"
          value={formatCurrency(mockKPIs.paymentsReceived7d)}
          subtitle="Last 7 days"
          icon={ArrowDownToLine}
        />
        <KPICard
          title="Distributions Pending"
          value={formatCurrency(mockKPIs.distributionsPending)}
          subtitle="Ready to process"
          icon={TrendingUp}
        />
        <KPICard
          title="Delinquent Balance"
          value={formatCurrency(mockKPIs.delinquentBalance)}
          subtitle="Requires attention"
          icon={AlertCircle}
        />
        <KPICard
          title="Net Yield (YTD)"
          value={formatPercent(mockKPIs.netYieldYTD)}
          subtitle="Year to date"
          icon={Percent}
        />
      </div>

      {/* Money Flow Summary */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Money Flow Summary</h2>
          <p className="mt-1 text-sm text-gray-500">Current period cash movement</p>
        </div>

        <MoneyFlowChart
          received={mockMoneyFlow.received}
          distributed={mockMoneyFlow.distributed}
          platformFees={mockMoneyFlow.platformFees}
          pending={mockMoneyFlow.pending}
        />
      </div>

      {/* Loans Requiring Attention */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Loans Requiring Attention</h2>
            <p className="mt-1 text-sm text-gray-500">
              {loansRequiringAttention.length} loan{loansRequiringAttention.length !== 1 ? 's' : ''}{' '}
              need review
            </p>
          </div>
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            View All Loans
          </button>
        </div>

        <DataTable data={loansRequiringAttention} columns={loanColumns} />
      </div>

      {/* Recent Payment Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Recent Payment Activity</h2>
            <p className="mt-1 text-sm text-gray-500">Latest payment transactions</p>
          </div>
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            View All Payments
          </button>
        </div>

        <DataTable data={mockPayments} columns={paymentColumns} />
      </div>
    </div>
  );
};
