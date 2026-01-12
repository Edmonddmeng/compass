import { useState } from 'react';
import { Download, FileText, Eye } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { format } from 'date-fns';

type Document = {
  id: string;
  category: 'loan' | 'product' | 'allocation' | 'legal';
  title: string;
  relatedTo: string;
  uploadDate: string;
  fileSize: string;
  downloadCount: number;
};

export const DocumentsPage = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRelated, setFilterRelated] = useState<string>('all');

  // Mock document data - centralized vault
  const documents: Document[] = [
    {
      id: 'DOC-LN-2024-0001',
      category: 'loan',
      title: 'Loan Agreement - LN-2024-0001',
      relatedTo: 'LN-2024-0001',
      uploadDate: '2024-01-15T10:00:00Z',
      fileSize: '3.2 MB',
      downloadCount: 2,
    },
    {
      id: 'DOC-LN-2024-0001-NOTE',
      category: 'loan',
      title: 'Promissory Note - LN-2024-0001',
      relatedTo: 'LN-2024-0001',
      uploadDate: '2024-01-15T10:00:00Z',
      fileSize: '1.8 MB',
      downloadCount: 2,
    },
    {
      id: 'DOC-LN-2024-0002',
      category: 'loan',
      title: 'Loan Agreement - LN-2024-0002',
      relatedTo: 'LN-2024-0002',
      uploadDate: '2024-02-01T10:00:00Z',
      fileSize: '3.4 MB',
      downloadCount: 3,
    },
    {
      id: 'DOC-PROD-BRIDGE',
      category: 'product',
      title: 'Bridge Loan Product Disclosure',
      relatedTo: 'Bridge Loan',
      uploadDate: '2024-01-01T10:00:00Z',
      fileSize: '2.1 MB',
      downloadCount: 5,
    },
    {
      id: 'DOC-PROD-TERM',
      category: 'product',
      title: 'Term Loan Product Disclosure',
      relatedTo: 'Term Loan',
      uploadDate: '2024-01-01T10:00:00Z',
      fileSize: '2.3 MB',
      downloadCount: 4,
    },
    {
      id: 'DOC-ALLOC-2024-Q1',
      category: 'allocation',
      title: 'Capital Allocation Agreement - Q1 2024',
      relatedTo: 'Q1 2024',
      uploadDate: '2024-01-05T10:00:00Z',
      fileSize: '1.9 MB',
      downloadCount: 1,
    },
    {
      id: 'DOC-ALLOC-2024-Q2',
      category: 'allocation',
      title: 'Capital Allocation Agreement - Q2 2024',
      relatedTo: 'Q2 2024',
      uploadDate: '2024-04-05T10:00:00Z',
      fileSize: '2.0 MB',
      downloadCount: 1,
    },
    {
      id: 'DOC-LEGAL-TOS',
      category: 'legal',
      title: 'Terms of Service',
      relatedTo: 'Platform Agreement',
      uploadDate: '2024-01-01T10:00:00Z',
      fileSize: '856 KB',
      downloadCount: 1,
    },
    {
      id: 'DOC-LEGAL-PRIVACY',
      category: 'legal',
      title: 'Privacy Policy',
      relatedTo: 'Platform Agreement',
      uploadDate: '2024-01-01T10:00:00Z',
      fileSize: '624 KB',
      downloadCount: 1,
    },
    {
      id: 'DOC-LEGAL-NOTICE-2024-05',
      category: 'legal',
      title: 'Legal Notice - Rate Change',
      relatedTo: 'Platform Notice',
      uploadDate: '2024-05-15T10:00:00Z',
      fileSize: '412 KB',
      downloadCount: 2,
    },
  ];

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    if (filterCategory !== 'all' && doc.category !== filterCategory) return false;
    if (filterRelated !== 'all' && doc.relatedTo !== filterRelated) return false;
    return true;
  });

  // Get unique related items for filter
  const relatedItems = Array.from(new Set(documents.map((d) => d.relatedTo))).sort();

  const getCategoryLabel = (category: Document['category']) => {
    switch (category) {
      case 'loan':
        return 'Loan Document';
      case 'product':
        return 'Product Disclosure';
      case 'allocation':
        return 'Allocation Agreement';
      case 'legal':
        return 'Legal Notice';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: Document['category']) => {
    switch (category) {
      case 'loan':
        return 'text-compass-600 bg-compass-50';
      case 'product':
        return 'text-info bg-blue-50';
      case 'allocation':
        return 'text-gray-700 bg-gray-100';
      case 'legal':
        return 'text-error bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDownload = (doc: Document) => {
    console.log(`Downloading document: ${doc.id}`);
    // Track download
    // In a real implementation, this would trigger a file download and update download count
  };

  const handleView = (doc: Document) => {
    console.log(`Viewing document: ${doc.id}`);
    // In a real implementation, this would open a document viewer
  };

  const documentColumns = [
    {
      header: 'Category',
      accessor: (row: Document) => (
        <span
          className={`inline-flex rounded px-2 py-1 text-xs font-medium ${getCategoryColor(row.category)}`}
        >
          {getCategoryLabel(row.category)}
        </span>
      ),
    },
    {
      header: 'Title',
      accessor: 'title' as keyof Document,
      className: 'font-medium text-gray-900',
    },
    {
      header: 'Related To',
      accessor: 'relatedTo' as keyof Document,
      className: 'text-gray-600',
    },
    {
      header: 'Upload Date',
      accessor: (row: Document) => (
        <span className="text-gray-600">
          {format(new Date(row.uploadDate), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      header: 'Size',
      accessor: 'fileSize' as keyof Document,
      className: 'text-gray-600 text-sm',
    },
    {
      header: 'Downloads',
      accessor: (row: Document) => (
        <span className="text-gray-600">{row.downloadCount}×</span>
      ),
    },
    {
      header: '',
      accessor: (row: Document) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(row)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Eye size={14} />
            View
          </button>
          <button
            onClick={() => handleDownload(row)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download size={14} />
            Download
          </button>
        </div>
      ),
    },
  ];

  // Document counts by category
  const documentCounts = {
    loan: documents.filter((d) => d.category === 'loan').length,
    product: documents.filter((d) => d.category === 'product').length,
    allocation: documents.filter((d) => d.category === 'allocation').length,
    legal: documents.filter((d) => d.category === 'legal').length,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Documents</h1>
        <p className="mt-2 text-base text-gray-600">
          Centralized document vault with loan agreements, disclosures, and legal notices
        </p>
      </div>

      {/* Document Summary */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-normal text-gray-900">Document Library</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-compass-600" />
              <p className="text-sm text-gray-600">Loan Documents</p>
            </div>
            <p className="mt-2 text-2xl font-normal text-gray-900">{documentCounts.loan}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-info" />
              <p className="text-sm text-gray-600">Product Disclosures</p>
            </div>
            <p className="mt-2 text-2xl font-normal text-gray-900">{documentCounts.product}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-gray-600" />
              <p className="text-sm text-gray-600">Allocation Agreements</p>
            </div>
            <p className="mt-2 text-2xl font-normal text-gray-900">{documentCounts.allocation}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-error" />
              <p className="text-sm text-gray-600">Legal Notices</p>
            </div>
            <p className="mt-2 text-2xl font-normal text-gray-900">{documentCounts.legal}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-gray-900">Filter Documents</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All Categories</option>
              <option value="loan">Loan Documents</option>
              <option value="product">Product Disclosures</option>
              <option value="allocation">Allocation Agreements</option>
              <option value="legal">Legal Notices</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">Related To</label>
            <select
              value={filterRelated}
              onChange={(e) => setFilterRelated(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All</option>
              {relatedItems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-normal text-gray-900">All Documents</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {filteredDocuments.length} of {documents.length} documents
          </p>
        </div>
        <DataTable data={filteredDocuments} columns={documentColumns} />
      </div>

      {/* Information Footer */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">i</span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">Document Vault Information</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All document downloads are tracked for security and compliance</li>
              <li>Documents are stored securely with encryption at rest and in transit</li>
              <li>Loan documents are uploaded within 24 hours of loan execution</li>
              <li>Product disclosures are updated as material changes occur</li>
              <li>You will be notified when new documents are added to your vault</li>
              <li>If you cannot find a document, please contact support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
