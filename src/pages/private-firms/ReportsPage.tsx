import { useState } from 'react';
import { Download, FileText, Calendar, DollarSign, TrendingUp, PieChart as PieChartIcon, Users, Building2 } from 'lucide-react';
import { DateRangeSelector } from '../../components/common/DateRangeSelector';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'Financial' | 'Operational' | 'Compliance' | 'Analytics';
  frequency: 'On-demand' | 'Monthly' | 'Quarterly' | 'Annual';
  lastGenerated: string;
  formats: ('PDF' | 'CSV' | 'XLSX')[];
}

export const ReportsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const reports: ReportCard[] = [
    {
      id: 'loan-cash-flow',
      title: 'Loan Cash Flow Statement',
      description: 'Detailed cash flow analysis for all active loans including principal, interest, and fees',
      icon: DollarSign,
      category: 'Financial',
      frequency: 'On-demand',
      lastGenerated: '2024-06-12',
      formats: ['PDF', 'CSV', 'XLSX'],
    },
    {
      id: 'payment-ledger',
      title: 'Payment Ledger',
      description: 'Complete payment history with timestamps, methods, and settlement status',
      icon: FileText,
      category: 'Financial',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      formats: ['PDF', 'CSV', 'XLSX'],
    },
    {
      id: 'distribution-summary',
      title: 'Distribution Summary',
      description: 'Pro-rata distribution calculations, fee breakdowns, and recipient details',
      icon: PieChartIcon,
      category: 'Financial',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      formats: ['PDF', 'XLSX'],
    },
    {
      id: 'monthly-statements',
      title: 'Monthly Statements',
      description: 'Comprehensive monthly account statements for all capital partners',
      icon: Calendar,
      category: 'Financial',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      formats: ['PDF'],
    },
    {
      id: 'portfolio-performance',
      title: 'Portfolio Performance Report',
      description: 'IRR analysis, default rates, and portfolio-wide performance metrics',
      icon: TrendingUp,
      category: 'Analytics',
      frequency: 'Quarterly',
      lastGenerated: '2024-04-01',
      formats: ['PDF', 'XLSX'],
    },
    {
      id: 'borrower-summary',
      title: 'Borrower Credit Summary',
      description: 'Credit scores, payment history, and borrower performance tracking',
      icon: Users,
      category: 'Operational',
      frequency: 'On-demand',
      lastGenerated: '2024-06-10',
      formats: ['PDF', 'CSV', 'XLSX'],
    },
    {
      id: 'agent-performance',
      title: 'Agent Performance Report',
      description: 'Origination volume, default rates, and agent-level performance metrics',
      icon: Building2,
      category: 'Operational',
      frequency: 'Quarterly',
      lastGenerated: '2024-04-01',
      formats: ['PDF', 'XLSX'],
    },
    {
      id: 'tax-summary',
      title: 'Tax Summary (1099 Package)',
      description: 'Annual tax reporting package with interest income and distribution details',
      icon: FileText,
      category: 'Compliance',
      frequency: 'Annual',
      lastGenerated: '2024-01-15',
      formats: ['PDF'],
    },
    {
      id: 'audit-trail',
      title: 'Audit Trail Report',
      description: 'Complete transaction log for compliance and audit purposes',
      icon: FileText,
      category: 'Compliance',
      frequency: 'On-demand',
      lastGenerated: '2024-06-12',
      formats: ['PDF', 'CSV'],
    },
    {
      id: 'capital-deployment',
      title: 'Capital Deployment Report',
      description: 'Partner-by-partner capital allocation, utilization rates, and deployment schedules',
      icon: PieChartIcon,
      category: 'Analytics',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      formats: ['PDF', 'XLSX'],
    },
    {
      id: 'delinquency-report',
      title: 'Delinquency & Collections',
      description: 'Late payments, delinquent accounts, and collection status tracking',
      icon: FileText,
      category: 'Operational',
      frequency: 'On-demand',
      lastGenerated: '2024-06-12',
      formats: ['PDF', 'CSV', 'XLSX'],
    },
    {
      id: 'loan-pipeline',
      title: 'Loan Pipeline Report',
      description: 'Pending loans, approval status, and origination pipeline analysis',
      icon: TrendingUp,
      category: 'Operational',
      frequency: 'On-demand',
      lastGenerated: '2024-06-11',
      formats: ['PDF', 'XLSX'],
    },
  ];

  const categories = ['all', 'Financial', 'Operational', 'Compliance', 'Analytics'];

  const filteredReports =
    selectedCategory === 'all'
      ? reports
      : reports.filter((r) => r.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Operational':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Compliance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Analytics':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleExport = (reportId: string, format: string) => {
    // In a real application, this would trigger the actual export
    console.log(`Exporting ${reportId} as ${format}`);
    alert(`Generating ${reportId} report as ${format}...`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Operations</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Reports</h1>
        <p className="mt-2 text-base text-gray-600">
          Export loan activity, financial statements, and compliance documentation
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-normal text-gray-900">Report Period</h2>
        <p className="mb-4 text-sm text-gray-500">
          Select date range for time-based reports
        </p>
        <DateRangeSelector />
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[#355E3B] text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category === 'all' ? 'All Reports' : category}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Reports</p>
          <p className="mt-2 text-2xl font-normal text-gray-900">{reports.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Financial</p>
          <p className="mt-2 text-2xl font-normal text-gray-900">
            {reports.filter((r) => r.category === 'Financial').length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Operational</p>
          <p className="mt-2 text-2xl font-normal text-gray-900">
            {reports.filter((r) => r.category === 'Operational').length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Compliance</p>
          <p className="mt-2 text-2xl font-normal text-gray-900">
            {reports.filter((r) => r.category === 'Compliance').length}
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Available Reports</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {filteredReports.length} {selectedCategory === 'all' ? '' : selectedCategory.toLowerCase()}{' '}
            report{filteredReports.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredReports.map((report) => {
            const IconComponent = report.icon;
            return (
              <div
                key={report.id}
                className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-50 p-2">
                      <IconComponent size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(
                      report.category
                    )}`}
                  >
                    {report.category}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-600">
                    {report.frequency}
                  </span>
                </div>

                <div className="mb-4 border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500">
                    Last generated: {new Date(report.lastGenerated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {report.formats.map((format) => (
                    <button
                      key={format}
                      onClick={() => handleExport(report.id, format)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Download size={14} />
                      Export {format}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Scheduled Reports</h2>
        <p className="mb-6 text-sm text-gray-500">
          Automatically generated reports sent via email
        </p>

        <div className="space-y-3">
          {[
            {
              name: 'Monthly Partner Statements',
              schedule: 'First business day of each month',
              recipients: '5 capital partners',
            },
            {
              name: 'Quarterly Performance Review',
              schedule: 'End of quarter (Jan, Apr, Jul, Oct)',
              recipients: 'Management team',
            },
            {
              name: 'Weekly Payment Summary',
              schedule: 'Every Monday at 9:00 AM',
              recipients: 'Operations team',
            },
          ].map((scheduled, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
            >
              <div>
                <p className="font-medium text-gray-900">{scheduled.name}</p>
                <p className="mt-1 text-sm text-gray-600">
                  {scheduled.schedule} · Sent to {scheduled.recipients}
                </p>
              </div>
              <button className="text-sm font-medium text-compass-600 hover:text-compass-700">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Guidelines */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Report Guidelines</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              <span className="font-medium">Financial reports</span> include loan cash flow, payment ledgers, and distribution summaries for capital partners
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              <span className="font-medium">Operational reports</span> track borrower activity, agent performance, and pipeline metrics
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              <span className="font-medium">Compliance reports</span> provide audit trails and tax documentation (1099 packages)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              <span className="font-medium">Analytics reports</span> offer portfolio-wide insights including IRR projections and capital deployment analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
