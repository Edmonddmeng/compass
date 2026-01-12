import { useState } from 'react';
import { Wallet, TrendingUp, DollarSign, ArrowUpRight, Download, FileText } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { format } from 'date-fns';

type LedgerEntry = {
  id: string;
  timestamp: string;
  type: 'contribution' | 'draw' | 'return' | 'fee';
  description: string;
  amount: number;
  balance: number;
  referenceId: string;
};

export const MyCapitalPage = () => {
  const [exportingLedger, setExportingLedger] = useState(false);
  const [exportingStatement, setExportingStatement] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Capital Account Summary (Immutable Source of Truth)
  const capitalAccount = {
    totalCommitted: 50000000, // Lifetime commitment
    totalDeployed: 37500000, // Current deployed
    totalReturned: 8750000, // Lifetime returned (principal + returns)
    available: 12500000, // Available for deployment
    netReturnAbsolute: 3250000, // Absolute return
    netReturnPercent: 0.0867, // 8.67% net return
  };

  // Immutable Ledger Entries
  const ledgerEntries: LedgerEntry[] = [
    {
      id: 'L-2024-001',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'contribution',
      description: 'Initial capital contribution',
      amount: 25000000,
      balance: 25000000,
      referenceId: 'REF-CC-20240115-001',
    },
    {
      id: 'L-2024-002',
      timestamp: '2024-02-01T14:20:00Z',
      type: 'draw',
      description: 'Capital deployed to Bridge Loan Portfolio',
      amount: -12500000,
      balance: 12500000,
      referenceId: 'REF-CD-20240201-001',
    },
    {
      id: 'L-2024-003',
      timestamp: '2024-03-15T09:45:00Z',
      type: 'contribution',
      description: 'Additional capital contribution',
      amount: 25000000,
      balance: 37500000,
      referenceId: 'REF-CC-20240315-001',
    },
    {
      id: 'L-2024-004',
      timestamp: '2024-04-10T11:30:00Z',
      type: 'draw',
      description: 'Capital deployed to Term Loan Portfolio',
      amount: -15000000,
      balance: 22500000,
      referenceId: 'REF-CD-20240410-001',
    },
    {
      id: 'L-2024-005',
      timestamp: '2024-05-20T16:00:00Z',
      type: 'return',
      description: 'Principal return from Bridge Loan Portfolio',
      amount: 5000000,
      balance: 27500000,
      referenceId: 'REF-CR-20240520-001',
    },
    {
      id: 'L-2024-006',
      timestamp: '2024-05-20T16:00:00Z',
      type: 'return',
      description: 'Interest return from Bridge Loan Portfolio',
      amount: 750000,
      balance: 28250000,
      referenceId: 'REF-CR-20240520-002',
    },
    {
      id: 'L-2024-007',
      timestamp: '2024-05-21T10:00:00Z',
      type: 'fee',
      description: 'Management fee - Q1 2024',
      amount: -125000,
      balance: 28125000,
      referenceId: 'REF-FEE-20240521-001',
    },
    {
      id: 'L-2024-008',
      timestamp: '2024-06-15T13:30:00Z',
      type: 'draw',
      description: 'Capital deployed to Construction Portfolio',
      amount: -10000000,
      balance: 18125000,
      referenceId: 'REF-CD-20240615-001',
    },
    {
      id: 'L-2024-009',
      timestamp: '2024-07-25T15:45:00Z',
      type: 'return',
      description: 'Principal return from Term Loan Portfolio',
      amount: 3000000,
      balance: 21125000,
      referenceId: 'REF-CR-20240725-001',
    },
    {
      id: 'L-2024-010',
      timestamp: '2024-07-25T15:45:00Z',
      type: 'return',
      description: 'Interest return from Term Loan Portfolio',
      amount: 500000,
      balance: 21625000,
      referenceId: 'REF-CR-20240725-002',
    },
  ];

  const ledgerColumns = [
    {
      header: 'Timestamp',
      accessor: (row: LedgerEntry) => (
        <span className="text-gray-600">{format(new Date(row.timestamp), 'MMM dd, yyyy HH:mm')}</span>
      ),
    },
    {
      header: 'Type',
      accessor: (row: LedgerEntry) => {
        const typeConfig = {
          contribution: { label: 'Contribution', color: 'text-compass-600' },
          draw: { label: 'Draw', color: 'text-gray-900' },
          return: { label: 'Return', color: 'text-success' },
          fee: { label: 'Fee', color: 'text-error' },
        };
        const config = typeConfig[row.type];
        return <span className={`font-medium ${config.color}`}>{config.label}</span>;
      },
    },
    {
      header: 'Description',
      accessor: (row: LedgerEntry) => <span className="text-gray-900">{row.description}</span>,
    },
    {
      header: 'Amount',
      accessor: (row: LedgerEntry) => (
        <span
          className={`font-medium ${row.amount >= 0 ? 'text-success' : 'text-gray-900'}`}
        >
          {row.amount >= 0 ? '+' : ''}
          {formatCurrency(row.amount)}
        </span>
      ),
    },
    {
      header: 'Balance',
      accessor: (row: LedgerEntry) => (
        <span className="font-medium text-gray-900">{formatCurrency(row.balance)}</span>
      ),
    },
    {
      header: 'Reference ID',
      accessor: (row: LedgerEntry) => <span className="font-mono text-xs text-gray-500">{row.referenceId}</span>,
    },
    {
      header: 'Ledger ID',
      accessor: (row: LedgerEntry) => <span className="font-mono text-xs text-gray-500">{row.id}</span>,
    },
  ];

  const handleExportLedger = () => {
    setExportingLedger(true);
    // Simulate export
    setTimeout(() => {
      setExportingLedger(false);
      // In a real implementation, this would trigger a CSV download
      console.log('Exporting capital ledger as CSV...');
    }, 1000);
  };

  const handleExportStatement = () => {
    setExportingStatement(true);
    // Simulate export
    setTimeout(() => {
      setExportingStatement(false);
      // In a real implementation, this would trigger a PDF download
      console.log('Exporting capital account statement as PDF...');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">My Capital</h1>
        <p className="mt-2 text-base text-gray-600">
          Your capital account source of truth with immutable transaction records
        </p>
      </div>

      {/* Capital Account Summary */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Capital Account Summary</h2>
            <p className="mt-1 text-sm text-gray-500">Immutable source of truth</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportLedger}
              disabled={exportingLedger}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <Download size={16} />
              {exportingLedger ? 'Exporting...' : 'Export Ledger (CSV)'}
            </button>
            <button
              onClick={handleExportStatement}
              disabled={exportingStatement}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <FileText size={16} />
              {exportingStatement ? 'Exporting...' : 'Export Statement (PDF)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="border-r border-gray-100 pr-6">
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-gray-400" />
              <p className="text-sm font-normal text-gray-600">Capital Committed</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-gray-900">
              {formatCurrency(capitalAccount.totalCommitted)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Lifetime commitment</p>
          </div>

          <div className="border-r border-gray-100 pr-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-gray-400" />
              <p className="text-sm font-normal text-gray-600">Capital Deployed</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-gray-900">
              {formatCurrency(capitalAccount.totalDeployed)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Currently deployed</p>
          </div>

          <div className="border-r border-gray-100 pr-6">
            <div className="flex items-center gap-2">
              <ArrowUpRight size={16} className="text-gray-400" />
              <p className="text-sm font-normal text-gray-600">Capital Returned</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-gray-900">
              {formatCurrency(capitalAccount.totalReturned)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Lifetime returned</p>
          </div>

          <div className="border-r border-gray-100 pr-6">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-400" />
              <p className="text-sm font-normal text-gray-600">Capital Available</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-gray-900">
              {formatCurrency(capitalAccount.available)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Ready to deploy</p>
          </div>

          <div className="border-r border-gray-100 pr-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-gray-400" />
              <p className="text-sm font-normal text-gray-600">Net Return</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-success">
              {formatCurrency(capitalAccount.netReturnAbsolute)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Absolute return</p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-gray-400" />
              <p className="text-sm font-normal text-gray-600">Net Return %</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-success">
              {formatPercent(capitalAccount.netReturnPercent)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Percentage return</p>
          </div>
        </div>
      </div>

      {/* Capital Ledger */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Capital Ledger</h2>
          <p className="mt-1 text-sm text-gray-500">
            Immutable transaction history with reference IDs and timestamps
          </p>
        </div>

        <DataTable data={ledgerEntries} columns={ledgerColumns} />

        {/* Ledger Footer Notes */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">i</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="font-medium text-gray-900">Ledger Rules & Information</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All ledger entries are immutable and cannot be edited or deleted</li>
                <li>Each transaction includes a unique reference ID for audit purposes</li>
                <li>Timestamps are recorded in UTC and displayed in your local timezone</li>
                <li>This ledger contains no projections or estimates — only actual transactions</li>
                <li>Capital contributions increase your available balance</li>
                <li>Capital draws reduce your available balance as funds are deployed</li>
                <li>Capital returns include both principal and interest payments</li>
                <li>Fees are deducted from your capital account as disclosed in your agreement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
