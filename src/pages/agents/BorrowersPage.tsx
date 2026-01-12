import { Search, Phone, Mail, FileText, Plus } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProgressBar } from '../../components/common/ProgressBar';

type Borrower = {
  id: string;
  name: string;
  email: string;
  phone: string;
  activeLoan?: {
    id: string;
    amount: number;
    stage: string;
    progress: number;
  };
  totalLoans: number;
  lastContact: string;
  status: 'active' | 'prospect' | 'past';
};

export const BorrowersPage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const borrowers: Borrower[] = [
    {
      id: '1',
      name: 'Jennifer Smith',
      email: 'j.smith@email.com',
      phone: '(555) 123-4567',
      activeLoan: { id: 'BL-1001', amount: 450000, stage: 'Application', progress: 35 },
      totalLoans: 1,
      lastContact: '2 days ago',
      status: 'active',
    },
    {
      id: '2',
      name: 'Michael Davis',
      email: 'm.davis@email.com',
      phone: '(555) 234-5678',
      activeLoan: { id: 'BL-0982', amount: 380000, stage: 'Application', progress: 40 },
      totalLoans: 2,
      lastContact: '5 days ago',
      status: 'active',
    },
    {
      id: '3',
      name: 'Karen Wilson',
      email: 'k.wilson@email.com',
      phone: '(555) 345-6789',
      activeLoan: { id: 'BL-0975', amount: 1200000, stage: 'Underwriting', progress: 65 },
      totalLoans: 3,
      lastContact: '1 day ago',
      status: 'active',
    },
    {
      id: '4',
      name: 'Robert Chen',
      email: 'r.chen@email.com',
      phone: '(555) 456-7890',
      totalLoans: 0,
      lastContact: '1 week ago',
      status: 'prospect',
    },
  ];

  const activeClients = borrowers.filter(b => b.status === 'active').length;
  const prospects = borrowers.filter(b => b.status === 'prospect').length;
  const totalClients = borrowers.length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">My Borrowers</h1>
        <p className="mt-2 text-base text-gray-600">Manage client relationships and history</p>
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-gray-600">Total Clients: </span>
            <span className="font-medium text-gray-900">{totalClients}</span>
          </div>
          <div>
            <span className="text-gray-600">Active: </span>
            <span className="font-medium text-compass-700">{activeClients}</span>
          </div>
          <div>
            <span className="text-gray-600">Prospects: </span>
            <span className="font-medium text-gray-900">{prospects}</span>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700">
          <Plus size={16} />
          Add Borrower
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search borrowers..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm"
        />
      </div>

      {/* Borrower Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {borrowers.map((borrower) => (
          <div
            key={borrower.id}
            className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-compass-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-compass-100 text-compass-700">
                  {borrower.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{borrower.name}</h3>
                  {borrower.status === 'active' ? (
                    <StatusBadge variant="success">Active</StatusBadge>
                  ) : (
                    <StatusBadge variant="neutral">Prospect</StatusBadge>
                  )}
                </div>
              </div>
            </div>

            {borrower.activeLoan && (
              <div className="mt-4 rounded-lg bg-compass-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Active Loan: {borrower.activeLoan.id}</p>
                  <p className="text-sm text-gray-700">{formatCurrency(borrower.activeLoan.amount)}</p>
                </div>
                <p className="mb-2 text-xs text-gray-600">Stage: {borrower.activeLoan.stage}</p>
                <ProgressBar progress={borrower.activeLoan.progress} height="sm" />
              </div>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={14} />
                {borrower.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} />
                {borrower.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={14} />
                {borrower.totalLoans} total loans
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="flex-1 rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700">
                Contact
              </button>
              <button className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                View History
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-500">Last contact: {borrower.lastContact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
