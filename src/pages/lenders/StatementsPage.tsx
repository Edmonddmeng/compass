import { useState } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { format } from 'date-fns';

type Statement = {
  id: string;
  type: 'monthly' | 'year-end' | 'capital-account' | 'tax';
  title: string;
  period: string;
  generatedDate: string;
  version: number;
  fileSize: string;
};

export const StatementsPage = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');

  // Mock statement data - all immutable, versioned, download-only
  const statements: Statement[] = [
    {
      id: 'STMT-2024-06',
      type: 'monthly',
      title: 'Monthly Statement - June 2024',
      period: '2024-06',
      generatedDate: '2024-07-05T10:00:00Z',
      version: 1,
      fileSize: '2.4 MB',
    },
    {
      id: 'STMT-2024-05',
      type: 'monthly',
      title: 'Monthly Statement - May 2024',
      period: '2024-05',
      generatedDate: '2024-06-05T10:00:00Z',
      version: 1,
      fileSize: '2.1 MB',
    },
    {
      id: 'STMT-2024-04',
      type: 'monthly',
      title: 'Monthly Statement - April 2024',
      period: '2024-04',
      generatedDate: '2024-05-05T10:00:00Z',
      version: 1,
      fileSize: '2.3 MB',
    },
    {
      id: 'STMT-2024-03',
      type: 'monthly',
      title: 'Monthly Statement - March 2024',
      period: '2024-03',
      generatedDate: '2024-04-05T10:00:00Z',
      version: 1,
      fileSize: '2.2 MB',
    },
    {
      id: 'CAP-2024-Q2',
      type: 'capital-account',
      title: 'Capital Account Statement - Q2 2024',
      period: '2024-Q2',
      generatedDate: '2024-07-10T10:00:00Z',
      version: 1,
      fileSize: '1.8 MB',
    },
    {
      id: 'CAP-2024-Q1',
      type: 'capital-account',
      title: 'Capital Account Statement - Q1 2024',
      period: '2024-Q1',
      generatedDate: '2024-04-10T10:00:00Z',
      version: 1,
      fileSize: '1.7 MB',
    },
    {
      id: 'YE-2023',
      type: 'year-end',
      title: 'Year-End Summary - 2023',
      period: '2023',
      generatedDate: '2024-01-15T10:00:00Z',
      version: 2,
      fileSize: '3.5 MB',
    },
    {
      id: '1099-2023',
      type: 'tax',
      title: '1099 Form - Tax Year 2023',
      period: '2023',
      generatedDate: '2024-01-31T10:00:00Z',
      version: 1,
      fileSize: '456 KB',
    },
  ];

  // Filter statements
  const filteredStatements = statements.filter((statement) => {
    if (filterType !== 'all' && statement.type !== filterType) return false;
    if (filterYear !== 'all' && !statement.period.startsWith(filterYear)) return false;
    return true;
  });

  const getTypeLabel = (type: Statement['type']) => {
    switch (type) {
      case 'monthly':
        return 'Monthly Statement';
      case 'year-end':
        return 'Year-End Summary';
      case 'capital-account':
        return 'Capital Account';
      case 'tax':
        return 'Tax Document';
      default:
        return type;
    }
  };

  const getTypeColor = (type: Statement['type']) => {
    switch (type) {
      case 'monthly':
        return 'text-compass-600 bg-compass-50';
      case 'year-end':
        return 'text-info bg-blue-50';
      case 'capital-account':
        return 'text-gray-700 bg-gray-100';
      case 'tax':
        return 'text-error bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDownload = (statement: Statement) => {
    console.log(`Downloading statement: ${statement.id}`);
    // In a real implementation, this would trigger a PDF download
  };

  const statementColumns = [
    {
      header: 'Type',
      accessor: (row: Statement) => (
        <span
          className={`inline-flex rounded px-2 py-1 text-xs font-medium ${getTypeColor(row.type)}`}
        >
          {getTypeLabel(row.type)}
        </span>
      ),
    },
    {
      header: 'Title',
      accessor: 'title' as keyof Statement,
      className: 'font-medium text-gray-900',
    },
    {
      header: 'Period',
      accessor: 'period' as keyof Statement,
      className: 'text-gray-600',
    },
    {
      header: 'Generated',
      accessor: (row: Statement) => (
        <span className="text-gray-600">
          {format(new Date(row.generatedDate), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      header: 'Version',
      accessor: (row: Statement) => (
        <span className="font-mono text-sm text-gray-600">v{row.version}</span>
      ),
    },
    {
      header: 'Size',
      accessor: 'fileSize' as keyof Statement,
      className: 'text-gray-600 text-sm',
    },
    {
      header: '',
      accessor: (row: Statement) => (
        <button
          onClick={() => handleDownload(row)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Download size={14} />
          Download
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Statements & Tax Documents</h1>
        <p className="mt-2 text-base text-gray-600">
          Download monthly statements, year-end summaries, and tax documents
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <FileText size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Latest Monthly</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">June 2024</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(statements[0])}
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Download
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Calendar size={20} className="text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Capital Account</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">Q2 2024</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(statements[4])}
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Download
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <FileText size={20} className="text-info" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Year-End Summary</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">2023</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(statements[6])}
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Download
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
              <FileText size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tax Document</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">1099 (2023)</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(statements[7])}
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Download
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-gray-900">Filter Statements</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Document Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All Types</option>
              <option value="monthly">Monthly Statements</option>
              <option value="capital-account">Capital Account</option>
              <option value="year-end">Year-End Summaries</option>
              <option value="tax">Tax Documents</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">Year</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statements Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">All Statements</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {filteredStatements.length} of {statements.length} documents
          </p>
        </div>
        <DataTable data={filteredStatements} columns={statementColumns} />
      </div>

      {/* Information Footer */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">i</span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">Document Information</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All documents are download-only and cannot be edited</li>
              <li>Statements are versioned to ensure accuracy and compliance</li>
              <li>Monthly statements are generated within 5 business days of month-end</li>
              <li>Tax documents are available by January 31st for the prior tax year</li>
              <li>Capital account statements are generated quarterly</li>
              <li>Year-end summaries are available by January 15th</li>
              <li>If you need a reissued document, please contact support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
