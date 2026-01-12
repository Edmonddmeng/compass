import { FileText, Upload, Download, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

type Document = {
  id: string;
  name: string;
  loanId: string;
  uploadDate: string;
  status: 'uploaded' | 'pending';
};

export const BorrowerDocumentsPage = () => {
  const documents: Document[] = [
    { id: '1', name: 'Loan Agreement.pdf', loanId: 'BL-2024-0891', uploadDate: '2024-01-15', status: 'uploaded' },
    { id: '2', name: 'Insurance Certificate.pdf', loanId: 'BL-2024-0891', uploadDate: '2024-06-12', status: 'uploaded' },
    { id: '3', name: 'Property Appraisal.pdf', loanId: 'TL-2024-0234', uploadDate: '2024-02-01', status: 'uploaded' },
  ];

  const requiredDocuments = [
    { name: 'Updated Insurance Certificate', loanId: 'BL-2024-0891', dueDate: '2024-12-15' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500">Borrower Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Documents</h1>
        <p className="mt-2 text-base text-gray-600">Access loan documents and upload required files</p>
      </div>

      {requiredDocuments.length > 0 && (
        <div className="rounded-lg border border-warning bg-yellow-50 p-6">
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-warning mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Documents Required</p>
              <ul className="mt-2 space-y-2">
                {requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    {doc.name} for {doc.loanId} - Due {format(new Date(doc.dueDate), 'MMM dd, yyyy')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

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

      <div className="space-y-4">
        <h2 className="text-xl font-normal text-gray-900">Your Documents</h2>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    {doc.loanId} • Uploaded {format(new Date(doc.uploadDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {doc.status === 'uploaded' && <CheckCircle size={16} className="text-success" />}
                <button className="flex items-center gap-2 text-sm font-medium text-compass-600">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
