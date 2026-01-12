import { Search, Filter, Clock, DollarSign } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

type Loan = {
  id: string;
  borrower: string;
  amount: number;
  product: string;
  stage: 'Lead' | 'Application' | 'Underwriting' | 'Approved';
  daysInStage: number;
  status?: 'ready' | 'pending' | 'action-needed';
};

export const PipelinePage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data
  const loans: Loan[] = [
    { id: 'BL-1001', borrower: 'J. Smith', amount: 450000, product: 'Bridge', stage: 'Lead', daysInStage: 2, status: 'pending' },
    { id: 'BL-0998', borrower: 'K. Martinez', amount: 280000, product: 'Bridge', stage: 'Lead', daysInStage: 5, status: 'action-needed' },
    { id: 'TL-0995', borrower: 'R. Chen', amount: 620000, product: 'Term', stage: 'Lead', daysInStage: 1, status: 'pending' },
    { id: 'BL-0982', borrower: 'M. Davis', amount: 380000, product: 'Term', stage: 'Application', daysInStage: 5, status: 'pending' },
    { id: 'TL-0989', borrower: 'T. Anderson', amount: 725000, product: 'Construction', stage: 'Application', daysInStage: 3, status: 'action-needed' },
    { id: 'BL-0975', borrower: 'K. Wilson', amount: 1200000, product: 'Bridge', stage: 'Underwriting', daysInStage: 8, status: 'pending' },
    { id: 'BL-0968', borrower: 'T. Brown', amount: 625000, product: 'HELOC', stage: 'Approved', daysInStage: 2, status: 'ready' },
    { id: 'TL-0971', borrower: 'S. Park', amount: 485000, product: 'Term', stage: 'Approved', daysInStage: 1, status: 'ready' },
  ];

  const stages = ['Lead', 'Application', 'Underwriting', 'Approved'] as const;

  const getLoansByStage = (stage: typeof stages[number]) => {
    return loans.filter(loan => loan.stage === stage);
  };

  const totalPipelineValue = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const avgTimeToClose = 24; // days
  const successRate = 68; // percentage

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Pipeline Management</h1>
        <p className="mt-2 text-base text-gray-600">Track all applications from lead to close</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search loans..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm"
          />
        </div>
        <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm">
          <option>All Stages</option>
          <option>Lead</option>
          <option>Application</option>
          <option>Underwriting</option>
          <option>Approved</option>
        </select>
        <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm">
          <option>All Products</option>
          <option>Bridge</option>
          <option>Term</option>
          <option>HELOC</option>
          <option>Construction</option>
        </select>
        <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm">
          <option>This Month</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>All Time</option>
        </select>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* Quick Stats */}
      <div className="rounded-lg border border-compass-200 bg-compass-50 p-4">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Total Pipeline Value:</span>
            <span className="font-medium text-compass-700">{formatCurrency(totalPipelineValue)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Avg Time to Close:</span>
            <span className="font-medium text-compass-700">{avgTimeToClose} days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Success Rate:</span>
            <span className="font-medium text-compass-700">{successRate}%</span>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {stages.map((stage) => {
          const stageLoans = getLoansByStage(stage);
          const stageValue = stageLoans.reduce((sum, loan) => sum + loan.amount, 0);

          return (
            <div key={stage} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              {/* Stage Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{stage}</h3>
                  <span className="rounded-full bg-compass-100 px-2 py-0.5 text-xs font-medium text-compass-700">
                    {stageLoans.length}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">{formatCurrency(stageValue)}</p>
              </div>

              {/* Loan Cards */}
              <div className="space-y-3">
                {stageLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="group rounded-lg border-l-4 border-compass-600 bg-white p-3 shadow-sm transition-all hover:shadow-md hover:border-compass-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{loan.id}</p>
                        <p className="mt-0.5 text-sm text-gray-600">{loan.borrower}</p>
                      </div>
                      {loan.status === 'ready' && (
                        <StatusBadge variant="success" className="ml-2">
                          Ready
                        </StatusBadge>
                      )}
                      {loan.status === 'action-needed' && (
                        <StatusBadge variant="warning" className="ml-2">
                          Action
                        </StatusBadge>
                      )}
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-gray-600">
                          <DollarSign size={12} />
                          {formatCurrency(loan.amount)}
                        </span>
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700">{loan.product}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        {loan.daysInStage}d in stage
                      </div>
                    </div>
                  </div>
                ))}

                {stageLoans.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 bg-white p-4 text-center">
                    <p className="text-sm text-gray-500">No loans in this stage</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
