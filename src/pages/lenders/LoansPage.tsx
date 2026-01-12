import { useState } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Filter } from 'lucide-react';

type Loan = {
  id: string;
  borrower: string;
  product: string;
  firm: string;
  capitalAllocated: number;
  outstandingBalance: number;
  status: 'Current' | 'Late' | 'Paid Off' | 'Delinquent';
  cashReceived: number;
  riskTier: 'Low' | 'Medium' | 'High';
};

export const LoansPage = () => {
  const [filterProduct, setFilterProduct] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock loan data - exact exposure, loan by loan
  const loans: Loan[] = [
    {
      id: 'LN-2024-0001',
      borrower: 'Sunrise Properties LLC',
      product: 'Bridge Loan',
      firm: 'Anchor Capital',
      capitalAllocated: 500000,
      outstandingBalance: 475000,
      status: 'Current',
      cashReceived: 25000,
      riskTier: 'Low',
    },
    {
      id: 'LN-2024-0002',
      borrower: 'Metro Development Co',
      product: 'Term Loan',
      firm: 'Summit Lending',
      capitalAllocated: 750000,
      outstandingBalance: 680000,
      status: 'Current',
      cashReceived: 70000,
      riskTier: 'Medium',
    },
    {
      id: 'LN-2024-0003',
      borrower: 'Gateway Investments',
      product: 'Construction',
      firm: 'Pinnacle Finance',
      capitalAllocated: 1200000,
      outstandingBalance: 1150000,
      status: 'Current',
      cashReceived: 50000,
      riskTier: 'Medium',
    },
    {
      id: 'LN-2024-0004',
      borrower: 'Redwood Holdings',
      product: 'Bridge Loan',
      firm: 'Anchor Capital',
      capitalAllocated: 350000,
      outstandingBalance: 355000,
      status: 'Late',
      cashReceived: 12000,
      riskTier: 'High',
    },
    {
      id: 'LN-2023-0189',
      borrower: 'Oakmont Real Estate',
      product: 'Term Loan',
      firm: 'Summit Lending',
      capitalAllocated: 600000,
      outstandingBalance: 0,
      status: 'Paid Off',
      cashReceived: 648000,
      riskTier: 'Low',
    },
    {
      id: 'LN-2024-0005',
      borrower: 'Coastal Builders Inc',
      product: 'Construction',
      firm: 'Pinnacle Finance',
      capitalAllocated: 900000,
      outstandingBalance: 920000,
      status: 'Current',
      cashReceived: 45000,
      riskTier: 'Medium',
    },
    {
      id: 'LN-2024-0006',
      borrower: 'Highland Ventures',
      product: 'Bridge Loan',
      firm: 'Anchor Capital',
      capitalAllocated: 425000,
      outstandingBalance: 435000,
      status: 'Delinquent',
      cashReceived: 8500,
      riskTier: 'High',
    },
  ];

  // Filter loans based on selections
  const filteredLoans = loans.filter((loan) => {
    if (filterProduct !== 'all' && loan.product !== filterProduct) return false;
    if (filterStatus !== 'all' && loan.status !== filterStatus) return false;
    if (filterRisk !== 'all' && loan.riskTier !== filterRisk) return false;
    return true;
  });

  // Calculate summary metrics
  const totalAllocated = filteredLoans.reduce((sum, loan) => sum + loan.capitalAllocated, 0);
  const totalOutstanding = filteredLoans.reduce((sum, loan) => sum + loan.outstandingBalance, 0);
  const totalCashReceived = filteredLoans.reduce((sum, loan) => sum + loan.cashReceived, 0);

  const loanColumns = [
    {
      header: 'Loan ID',
      accessor: (row: Loan) => (
        <span className="font-mono text-sm font-medium text-gray-900">{row.id}</span>
      ),
    },
    {
      header: 'Borrower',
      accessor: 'borrower' as keyof Loan,
      className: 'font-medium text-gray-900',
    },
    {
      header: 'Product',
      accessor: 'product' as keyof Loan,
      className: 'text-gray-600',
    },
    {
      header: 'Firm',
      accessor: 'firm' as keyof Loan,
      className: 'text-gray-600',
    },
    {
      header: 'Capital Allocated',
      accessor: (row: Loan) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.capitalAllocated)}</span>
      ),
    },
    {
      header: 'Outstanding Balance',
      accessor: (row: Loan) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.outstandingBalance)}</span>
      ),
    },
    {
      header: 'Cash Received',
      accessor: (row: Loan) => (
        <span className="text-success">{formatCurrency(row.cashReceived)}</span>
      ),
    },
    {
      header: 'Risk Tier',
      accessor: (row: Loan) => {
        const variant = row.riskTier === 'Low' ? 'success' : row.riskTier === 'Medium' ? 'warning' : 'error';
        return <StatusBadge label={row.riskTier} variant={variant} />;
      },
    },
    {
      header: 'Status',
      accessor: (row: Loan) => {
        const variant =
          row.status === 'Current'
            ? 'success'
            : row.status === 'Late'
              ? 'warning'
              : row.status === 'Paid Off'
                ? 'info'
                : 'error';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: '',
      accessor: (row: Loan) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Loans</h1>
        <p className="mt-2 text-base text-gray-600">
          Exact exposure across all loans with allocation details and payment tracking
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-600">Total Capital Allocated</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{formatCurrency(totalAllocated)}</p>
            <p className="mt-1 text-sm text-gray-500">Across {filteredLoans.length} loans</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Outstanding Balance</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{formatCurrency(totalOutstanding)}</p>
            <p className="mt-1 text-sm text-gray-500">Current principal owed</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Cash Received</p>
            <p className="mt-2 text-3xl font-normal text-success">{formatCurrency(totalCashReceived)}</p>
            <p className="mt-1 text-sm text-gray-500">Principal + interest</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <label className="block text-xs text-gray-600 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All Statuses</option>
              <option value="Current">Current</option>
              <option value="Late">Late</option>
              <option value="Delinquent">Delinquent</option>
              <option value="Paid Off">Paid Off</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">Risk Tier</label>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All Risk Tiers</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Loan Portfolio</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {filteredLoans.length} of {loans.length} loans
          </p>
        </div>
        <DataTable data={filteredLoans} columns={loanColumns} />
      </div>
    </div>
  );
};
