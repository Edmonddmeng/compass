import { useState } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Filter, Download } from 'lucide-react';
import { format } from 'date-fns';

type Payment = {
  id: string;
  dateReceived: string;
  loanId: string;
  borrower: string;
  product: string;
  grossAmount: number;
  platformFee: number;
  managementFee: number;
  netPayout: number;
  settlementStatus: 'Settled' | 'Pending' | 'Processing';
  distributionBatchId: string;
};

export const PaymentsPage = () => {
  const [filterProduct, setFilterProduct] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [exporting, setExporting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Mock payment data - Cash-in ledger, immutable and chronological
  const payments: Payment[] = [
    {
      id: 'PMT-2024-0087',
      dateReceived: '2024-06-28T14:30:00Z',
      loanId: 'LN-2024-0001',
      borrower: 'Sunrise Properties LLC',
      product: 'Bridge Loan',
      grossAmount: 15000,
      platformFee: 150,
      managementFee: 300,
      netPayout: 14550,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-06-30',
    },
    {
      id: 'PMT-2024-0086',
      dateReceived: '2024-06-25T10:15:00Z',
      loanId: 'LN-2024-0002',
      borrower: 'Metro Development Co',
      product: 'Term Loan',
      grossAmount: 22500,
      platformFee: 225,
      managementFee: 450,
      netPayout: 21825,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-06-30',
    },
    {
      id: 'PMT-2024-0085',
      dateReceived: '2024-06-20T16:45:00Z',
      loanId: 'LN-2024-0003',
      borrower: 'Gateway Investments',
      product: 'Construction',
      grossAmount: 18000,
      platformFee: 180,
      managementFee: 360,
      netPayout: 17460,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-06-30',
    },
    {
      id: 'PMT-2024-0084',
      dateReceived: '2024-06-15T11:20:00Z',
      loanId: 'LN-2024-0005',
      borrower: 'Coastal Builders Inc',
      product: 'Construction',
      grossAmount: 27000,
      platformFee: 270,
      managementFee: 540,
      netPayout: 26190,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-06-17',
    },
    {
      id: 'PMT-2024-0083',
      dateReceived: '2024-06-10T09:00:00Z',
      loanId: 'LN-2024-0001',
      borrower: 'Sunrise Properties LLC',
      product: 'Bridge Loan',
      grossAmount: 10000,
      platformFee: 100,
      managementFee: 200,
      netPayout: 9700,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-06-12',
    },
    {
      id: 'PMT-2024-0082',
      dateReceived: '2024-05-28T15:30:00Z',
      loanId: 'LN-2024-0002',
      borrower: 'Metro Development Co',
      product: 'Term Loan',
      grossAmount: 22500,
      platformFee: 225,
      managementFee: 450,
      netPayout: 21825,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-05-31',
    },
    {
      id: 'PMT-2024-0081',
      dateReceived: '2024-05-20T12:00:00Z',
      loanId: 'LN-2023-0189',
      borrower: 'Oakmont Real Estate',
      product: 'Term Loan',
      grossAmount: 648000,
      platformFee: 6480,
      managementFee: 12960,
      netPayout: 628560,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-05-22',
    },
    {
      id: 'PMT-2024-0080',
      dateReceived: '2024-05-15T10:45:00Z',
      loanId: 'LN-2024-0003',
      borrower: 'Gateway Investments',
      product: 'Construction',
      grossAmount: 18000,
      platformFee: 180,
      managementFee: 360,
      netPayout: 17460,
      settlementStatus: 'Settled',
      distributionBatchId: 'DIST-2024-05-17',
    },
  ];

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    if (filterProduct !== 'all' && payment.product !== filterProduct) return false;
    if (filterMonth !== 'all') {
      const paymentMonth = format(new Date(payment.dateReceived), 'yyyy-MM');
      if (paymentMonth !== filterMonth) return false;
    }
    return true;
  });

  // Calculate summary metrics
  const totalGross = filteredPayments.reduce((sum, p) => sum + p.grossAmount, 0);
  const totalFees = filteredPayments.reduce((sum, p) => sum + p.platformFee + p.managementFee, 0);
  const totalNet = filteredPayments.reduce((sum, p) => sum + p.netPayout, 0);

  const paymentColumns = [
    {
      header: 'Date Received',
      accessor: (row: Payment) => (
        <span className="text-gray-600">{format(new Date(row.dateReceived), 'MMM dd, yyyy HH:mm')}</span>
      ),
    },
    {
      header: 'Loan ID',
      accessor: (row: Payment) => (
        <span className="font-mono text-sm font-medium text-gray-900">{row.loanId}</span>
      ),
    },
    {
      header: 'Borrower',
      accessor: 'borrower' as keyof Payment,
      className: 'text-gray-900',
    },
    {
      header: 'Product',
      accessor: 'product' as keyof Payment,
      className: 'text-gray-600',
    },
    {
      header: 'Gross Amount',
      accessor: (row: Payment) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.grossAmount)}</span>
      ),
    },
    {
      header: 'Fees',
      accessor: (row: Payment) => (
        <span className="text-gray-600">{formatCurrency(row.platformFee + row.managementFee)}</span>
      ),
    },
    {
      header: 'Net Payout',
      accessor: (row: Payment) => (
        <span className="font-medium text-success">{formatCurrency(row.netPayout)}</span>
      ),
    },
    {
      header: 'Settlement',
      accessor: (row: Payment) => {
        const variant = row.settlementStatus === 'Settled' ? 'success' : row.settlementStatus === 'Processing' ? 'warning' : 'info';
        return <StatusBadge label={row.settlementStatus} variant={variant} />;
      },
    },
    {
      header: 'Batch ID',
      accessor: (row: Payment) => (
        <span className="font-mono text-xs text-gray-500">{row.distributionBatchId}</span>
      ),
    },
    {
      header: 'Payment ID',
      accessor: (row: Payment) => (
        <span className="font-mono text-xs text-gray-500">{row.id}</span>
      ),
    },
  ];

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      console.log('Exporting payments as CSV...');
    }, 1000);
  };

  // Group by month for summary
  const monthlyGroups = filteredPayments.reduce((groups, payment) => {
    const month = format(new Date(payment.dateReceived), 'MMMM yyyy');
    if (!groups[month]) {
      groups[month] = { gross: 0, fees: 0, net: 0, count: 0 };
    }
    groups[month].gross += payment.grossAmount;
    groups[month].fees += payment.platformFee + payment.managementFee;
    groups[month].net += payment.netPayout;
    groups[month].count += 1;
    return groups;
  }, {} as Record<string, { gross: number; fees: number; net: number; count: number }>);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Payments Received</h1>
        <p className="mt-2 text-base text-gray-600">
          Cash-in ledger with complete payment history and fee breakdown
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-normal text-gray-900">Payment Summary</h2>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <Download size={16} />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-600">Total Gross Received</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{formatCurrency(totalGross)}</p>
            <p className="mt-1 text-sm text-gray-500">{filteredPayments.length} payments</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Fees Deducted</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{formatCurrency(totalFees)}</p>
            <p className="mt-1 text-sm text-gray-500">Platform + management</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Payout</p>
            <p className="mt-2 text-3xl font-normal text-success">{formatCurrency(totalNet)}</p>
            <p className="mt-1 text-sm text-gray-500">Deposited to account</p>
          </div>
        </div>
      </div>

      {/* Monthly Grouping */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-normal text-gray-900">Monthly Summary</h2>
        <div className="space-y-3">
          {Object.entries(monthlyGroups).map(([month, data]) => (
            <div key={month} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="font-medium text-gray-900">{month}</span>
                <span className="ml-2 text-sm text-gray-500">({data.count} payments)</span>
              </div>
              <div className="flex gap-8 text-sm">
                <div className="text-right">
                  <div className="text-gray-500">Gross</div>
                  <div className="font-medium text-gray-900">{formatCurrency(data.gross)}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500">Fees</div>
                  <div className="text-gray-900">{formatCurrency(data.fees)}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500">Net</div>
                  <div className="font-medium text-success">{formatCurrency(data.net)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Product</label>
            <select
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All Products</option>
              <option value="Bridge Loan">Bridge Loan</option>
              <option value="Term Loan">Term Loan</option>
              <option value="Construction">Construction</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">Month</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All Months</option>
              <option value="2024-06">June 2024</option>
              <option value="2024-05">May 2024</option>
              <option value="2024-04">April 2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Payment History</h2>
          <p className="mt-1 text-sm text-gray-500">
            Chronological ledger of all payments received (immutable)
          </p>
        </div>
        <DataTable data={filteredPayments} columns={paymentColumns} />
      </div>
    </div>
  );
};
