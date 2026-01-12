import { DollarSign, TrendingUp, Briefcase, Target, Plus, Upload, Phone, CheckCircle } from 'lucide-react';
import { AreaChart } from '../../components/common/AreaChart';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Link } from 'react-router-dom';

type Task = {
  id: string;
  description: string;
  loanId: string;
  completed: boolean;
  dueDate: string;
};

type Activity = {
  id: string;
  description: string;
  timestamp: string;
  type: 'loan' | 'commission' | 'document';
};

export const AgentDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data
  const performanceMetrics = {
    commissionEarned: 24500,
    commissionTrend: 12,
    loansClosed: 7,
    loansTrend: 2,
    pipelineValue: 2100000,
    pipelineTrend: 15,
    conversionRate: 68,
    conversionTrend: 3,
  };

  const pipelineStages = [
    { name: 'Lead', count: 3, value: 850000 },
    { name: 'Application', count: 2, value: 680000 },
    { name: 'Underwriting', count: 1, value: 320000 },
    { name: 'Approved', count: 2, value: 950000 },
  ];

  const tasks: Task[] = [
    { id: '1', description: 'Upload tax documents for BL-1001', loanId: 'BL-1001', completed: false, dueDate: '01/15/25' },
    { id: '2', description: 'Schedule appraisal call with M. Davis', loanId: 'BL-0982', completed: false, dueDate: '01/13/25' },
    { id: '3', description: 'Send loan agreement to K. Wilson', loanId: 'TL-0975', completed: true, dueDate: '01/10/25' },
    { id: '4', description: 'Follow up on pending documents', loanId: 'BL-1012', completed: false, dueDate: '01/14/25' },
  ];

  const recentActivity: Activity[] = [
    { id: '1', description: 'Loan BL-0968 moved to Approved', timestamp: '2 hours ago', type: 'loan' },
    { id: '2', description: 'Commission of $3,500 paid for TL-0856', timestamp: '5 hours ago', type: 'commission' },
    { id: '3', description: 'Documents received for BL-0982', timestamp: '1 day ago', type: 'document' },
    { id: '4', description: 'New lead: J. Thompson ($425K)', timestamp: '1 day ago', type: 'loan' },
  ];

  const commissionData = [
    { month: 'Jul', amount: 18500 },
    { month: 'Aug', amount: 21200 },
    { month: 'Sep', amount: 19800 },
    { month: 'Oct', amount: 23400 },
    { month: 'Nov', amount: 22100 },
    { month: 'Dec', amount: 24500 },
  ];

  const totalPipelineCount = pipelineStages.reduce((sum, stage) => sum + stage.count, 0);
  const maxStageCount = Math.max(...pipelineStages.map(s => s.count));

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Dashboard</h1>
        <p className="mt-2 text-base text-gray-600">Your performance overview and active pipeline</p>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-compass-200 bg-compass-50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700">
            <Plus size={16} />
            New Application
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Upload size={16} />
            Upload Document
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Phone size={16} />
            Contact Lender
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h2 className="mb-4 text-xl font-normal text-gray-900">This Month's Performance</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Commission Earned */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign size={16} className="text-gray-400" />
              <p className="text-sm">Commission Earned</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-compass-700">
              {formatCurrency(performanceMetrics.commissionEarned)}
            </p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <TrendingUp size={14} className="text-success" />
              <span className="text-success">+{performanceMetrics.commissionTrend}%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Loans Closed */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-gray-400" />
              <p className="text-sm">Loans Closed</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-compass-700">{performanceMetrics.loansClosed}</p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <TrendingUp size={14} className="text-success" />
              <span className="text-success">+{performanceMetrics.loansTrend}</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Pipeline Value */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase size={16} className="text-gray-400" />
              <p className="text-sm">Pipeline Value</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-compass-700">
              {formatCurrency(performanceMetrics.pipelineValue)}
            </p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <TrendingUp size={14} className="text-success" />
              <span className="text-success">+{performanceMetrics.pipelineTrend}%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Target size={16} className="text-gray-400" />
              <p className="text-sm">Conversion Rate</p>
            </div>
            <p className="mt-3 text-3xl font-normal text-compass-700">{performanceMetrics.conversionRate}%</p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <TrendingUp size={14} className="text-success" />
              <span className="text-success">+{performanceMetrics.conversionTrend}%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Pipeline */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Active Pipeline</h2>
            <p className="mt-1 text-sm text-gray-600">{totalPipelineCount} loans in progress</p>
          </div>
          <Link
            to="/agents/pipeline"
            className="text-sm font-medium text-compass-600 hover:text-compass-700"
          >
            View Full Pipeline →
          </Link>
        </div>

        <div className="space-y-4">
          {pipelineStages.map((stage) => {
            const percentage = (stage.count / maxStageCount) * 100;
            return (
              <div key={stage.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">{stage.name}</span>
                    <span className="rounded-full bg-compass-100 px-2 py-0.5 text-xs text-compass-700">
                      {stage.count} loans
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{formatCurrency(stage.value)}</span>
                </div>
                <ProgressBar progress={percentage} height="lg" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Tasks */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-normal text-gray-900">Upcoming Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start gap-3 rounded-lg border p-3 ${
                  task.completed ? 'border-compass-200 bg-compass-50/30' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle size={18} className="text-success" />
                  ) : (
                    <div className="h-4.5 w-4.5 rounded border-2 border-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.description}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>{task.loanId}</span>
                    <span>•</span>
                    <span>Due {task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-normal text-gray-900">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                <div
                  className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                    activity.type === 'commission'
                      ? 'bg-success'
                      : activity.type === 'document'
                        ? 'bg-compass-600'
                        : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commission Earnings Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-normal text-gray-900">Commission Earnings</h2>
        <AreaChart
          data={commissionData}
          xKey="month"
          yKey="amount"
          height={300}
          color="#355E3B"
        />
      </div>
    </div>
  );
};
