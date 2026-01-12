import { Upload, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataTable } from '../../components/common/DataTable';

type Document = {
  id: string;
  loanId: string;
  borrower: string;
  docType: string;
  dueDate: string;
  status: 'complete' | 'pending' | 'due';
};

export const DocumentsPage = () => {
  const documents: Document[] = [
    { id: '1', loanId: 'BL-1001', borrower: 'J. Smith', docType: 'Tax Returns', dueDate: '01/15/25', status: 'due' },
    { id: '2', loanId: 'BL-0982', borrower: 'M. Davis', docType: 'Insurance', dueDate: '01/12/25', status: 'complete' },
    { id: '3', loanId: 'TL-0991', borrower: 'K. Chen', docType: 'Appraisal', dueDate: '01/20/25', status: 'pending' },
    { id: '4', loanId: 'BL-0975', borrower: 'K. Wilson', docType: 'Purchase Agreement', dueDate: '01/10/25', status: 'complete' },
    { id: '5', loanId: 'BL-0968', borrower: 'T. Brown', docType: 'Title Report', dueDate: '01/08/25', status: 'complete' },
  ];

  const completeCount = documents.filter(d => d.status === 'complete').length;
  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const dueCount = documents.filter(d => d.status === 'due').length;

  const columns = [
    { label: 'Loan ID', accessor: (row: Document) => row.loanId },
    { label: 'Borrower', accessor: (row: Document) => row.borrower },
    { label: 'Document Type', accessor: (row: Document) => row.docType },
    { label: 'Due Date', accessor: (row: Document) => row.dueDate },
    {
      label: 'Status',
      accessor: (row: Document) => {
        if (row.status === 'complete') return <StatusBadge variant="success">Complete</StatusBadge>;
        if (row.status === 'due') return <StatusBadge variant="warning">Due</StatusBadge>;
        return <StatusBadge variant="neutral">Pending</StatusBadge>;
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Document Center</h1>
        <p className="mt-2 text-base text-gray-600">Upload, track, and manage loan documents</p>
      </div>

      {/* Document Status Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-compass-200 bg-compass-50 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} className="text-success" />
            <div>
              <p className="text-2xl font-normal text-compass-700">{completeCount}</p>
              <p className="mt-1 text-sm text-gray-600">Complete</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-gray-400" />
            <div>
              <p className="text-2xl font-normal text-gray-900">{pendingCount}</p>
              <p className="mt-1 text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-warning bg-yellow-50 p-6">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="text-warning" />
            <div>
              <p className="text-2xl font-normal text-warning">{dueCount}</p>
              <p className="mt-1 text-sm text-gray-600">Action Needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-normal text-gray-900">Upload Documents</h2>
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <Upload size={32} className="mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Drag and drop files here, or click to browse</p>
          <button className="mt-4 rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700">
            Select Files
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-normal text-gray-900">Document Status</h2>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Batch Download
          </button>
        </div>
        <DataTable columns={columns} data={documents} />
      </div>
    </div>
  );
};
