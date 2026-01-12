import { Building, Phone, Mail, TrendingUp, FileText } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

type Lender = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  products: string[];
  loansPlacedYTD: number;
  volumeYTD: number;
  avgApprovalDays: number;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
};

export const LenderNetworkPage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const lenders: Lender[] = [
    {
      id: '1',
      name: 'Anchor Capital',
      status: 'active',
      products: ['Bridge', 'HELOC'],
      loansPlacedYTD: 12,
      volumeYTD: 5400000,
      avgApprovalDays: 18,
      contact: { name: 'Sarah Chen', email: 'sarah@anchorcap.com', phone: '(555) 111-2222' },
    },
    {
      id: '2',
      name: 'Summit Lending',
      status: 'active',
      products: ['Bridge', 'Term', 'HELOC'],
      loansPlacedYTD: 18,
      volumeYTD: 7800000,
      avgApprovalDays: 21,
      contact: { name: 'Michael Torres', email: 'm.torres@summitlending.com', phone: '(555) 222-3333' },
    },
    {
      id: '3',
      name: 'Gateway Fund',
      status: 'active',
      products: ['Bridge', 'Construction', 'Term'],
      loansPlacedYTD: 8,
      volumeYTD: 6200000,
      avgApprovalDays: 24,
      contact: { name: 'Jennifer Wu', email: 'j.wu@gatewayfund.com', phone: '(555) 333-4444' },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Lender Network</h1>
        <p className="mt-2 text-base text-gray-600">Your funding relationships and products</p>
      </div>

      {/* Lender Cards */}
      <div className="space-y-6">
        {lenders.map((lender) => (
          <div key={lender.id} className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-compass-100">
                  <Building size={24} className="text-compass-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{lender.name}</h3>
                  <StatusBadge variant="success" className="mt-1">
                    Active
                  </StatusBadge>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-compass-50 p-4">
                <p className="text-sm text-gray-600">Loans Placed YTD</p>
                <p className="mt-1 text-2xl font-normal text-compass-700">{lender.loansPlacedYTD}</p>
                <p className="mt-1 text-xs text-gray-600">{formatCurrency(lender.volumeYTD)} volume</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Avg Approval Time</p>
                <p className="mt-1 text-2xl font-normal text-gray-900">{lender.avgApprovalDays}d</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Products Offered</p>
                <p className="mt-1 text-2xl font-normal text-gray-900">{lender.products.length}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {lender.products.map((product, idx) => (
                    <span key={idx} className="rounded bg-white px-2 py-0.5 text-xs text-gray-700">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-sm font-medium text-gray-900">Primary Contact</p>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-900">{lender.contact.name}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} />
                  {lender.contact.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} />
                  {lender.contact.phone}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700">
                <FileText size={16} />
                Submit Application
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <TrendingUp size={16} />
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
