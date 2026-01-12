import { AlertTriangle } from 'lucide-react';
import { BarChart } from '../../components/common/BarChart';

export const RiskPage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Risk Concentration Data
  const concentrationByBorrower = [
    { name: 'Gateway Investments', value: 1200000 },
    { name: 'Coastal Builders Inc', value: 900000 },
    { name: 'Metro Development Co', value: 750000 },
    { name: 'Sunrise Properties LLC', value: 500000 },
    { name: 'Redwood Holdings', value: 350000 },
    { name: 'Other Borrowers', value: 2800000 },
  ];

  const concentrationByRegion = [
    { name: 'Southeast', value: 15000000 },
    { name: 'Northeast', value: 11250000 },
    { name: 'West', value: 7500000 },
    { name: 'Midwest', value: 3750000 },
  ];

  const concentrationByProduct = [
    { name: 'Bridge Loans', value: 18750000 },
    { name: 'Term Loans', value: 12500000 },
    { name: 'Construction', value: 4375000 },
    { name: 'HELOC', value: 1875000 },
  ];

  const concentrationByFirm = [
    { name: 'Anchor Capital', value: 16875000 },
    { name: 'Summit Lending', value: 12375000 },
    { name: 'Pinnacle Finance', value: 6000000 },
    { name: 'Gateway Fund', value: 2250000 },
  ];

  // Stress Scenarios
  const stressScenarios = [
    {
      scenario: 'Base Case',
      description: 'Current market conditions continue',
      expectedReturn: 0.0847,
      expectedLoss: 0.015,
      netReturn: 0.0697,
    },
    {
      scenario: 'Stress Case',
      description: 'Moderate market downturn with increased defaults',
      expectedReturn: 0.0720,
      expectedLoss: 0.035,
      netReturn: 0.0370,
    },
    {
      scenario: 'Downside Case',
      description: 'Severe market disruption with significant defaults',
      expectedReturn: 0.0650,
      expectedLoss: 0.065,
      netReturn: 0.0000,
    },
  ];

  // Loans to Watch
  const loansToWatch = [
    {
      loanId: 'LN-2024-0006',
      borrower: 'Highland Ventures',
      issue: 'Payment 45 days late. Borrower cited cash flow issues.',
      exposure: 435000,
      action: 'Monitoring daily. Borrower provided updated cash flow projections.',
    },
    {
      loanId: 'LN-2024-0004',
      borrower: 'Redwood Holdings',
      issue: 'Payment 15 days late. First late payment in loan history.',
      exposure: 355000,
      action: 'Contacted borrower. Payment scheduled for next week.',
    },
    {
      loanId: 'LN-2024-0011',
      borrower: 'Valley Construction',
      issue: 'Project delayed due to permitting. Interest reserve utilized.',
      exposure: 680000,
      action: 'Permit expected within 30 days. Reserve sufficient for 60 days.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Risk</h1>
        <p className="mt-2 text-base text-gray-600">
          Portfolio risk analysis with concentration metrics and stress scenarios
        </p>
      </div>

      {/* Risk Summary */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-lg font-normal text-gray-900">Risk Overview</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <AlertTriangle size={20} className="text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Largest single borrower exposure is 3.2% of deployed capital</p>
              <p className="mt-1 text-sm text-gray-600">
                Top 5 borrowers represent 14.8% of total exposure. Concentration risk is within acceptable limits.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <AlertTriangle size={20} className="text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Southeast region represents 40% of deployed capital</p>
              <p className="mt-1 text-sm text-gray-600">
                Geographic concentration in Southeast driven by Bridge Loan product mix. Monitor regional market conditions.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <AlertTriangle size={20} className="text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">3 loans currently require heightened monitoring</p>
              <p className="mt-1 text-sm text-gray-600">
                2 late payments and 1 project delay identified. Total exposure: $1.47M (3.9% of portfolio). See details below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Concentration by Borrower */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Concentration by Borrower</h2>
          <p className="mt-1 text-sm text-gray-500">Capital exposure to individual borrowers</p>
        </div>
        <BarChart data={concentrationByBorrower} color="#355E3B" height={280} horizontal />
      </div>

      {/* Concentration by Region */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Concentration by Region</h2>
          <p className="mt-1 text-sm text-gray-500">Geographic distribution of deployed capital</p>
        </div>
        <BarChart data={concentrationByRegion} color="#355E3B" height={220} horizontal />
      </div>

      {/* Concentration Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Concentration by Product</h2>
            <p className="mt-1 text-sm text-gray-500">Capital deployed across products</p>
          </div>
          <BarChart data={concentrationByProduct} color="#355E3B" height={200} horizontal />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Concentration by Firm</h2>
            <p className="mt-1 text-sm text-gray-500">Capital with lending firms</p>
          </div>
          <BarChart data={concentrationByFirm} color="#355E3B" height={200} horizontal />
        </div>
      </div>

      {/* Stress Scenarios */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Stress Scenarios</h2>
          <p className="mt-1 text-sm text-gray-500">
            Expected portfolio performance under different market conditions
          </p>
        </div>
        <div className="space-y-4">
          {stressScenarios.map((scenario, index) => (
            <div key={index} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{scenario.scenario}</h3>
                  <p className="mt-1 text-sm text-gray-600">{scenario.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Expected Return</p>
                  <p className="mt-1 text-lg font-normal text-gray-900">
                    {formatPercent(scenario.expectedReturn)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expected Loss</p>
                  <p className="mt-1 text-lg font-normal text-error">
                    {formatPercent(scenario.expectedLoss)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Net Return</p>
                  <p
                    className={`mt-1 text-lg font-normal ${scenario.netReturn > 0 ? 'text-success' : 'text-gray-900'}`}
                  >
                    {formatPercent(scenario.netReturn)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loans to Watch */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Loans Requiring Attention</h2>
          <p className="mt-1 text-sm text-gray-500">
            Loans with identified issues requiring monitoring
          </p>
        </div>
        <div className="space-y-4">
          {loansToWatch.map((loan, index) => (
            <div key={index} className="rounded-lg border border-gray-100 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-gray-900">{loan.loanId}</span>
                    <span className="text-sm text-gray-600">{loan.borrower}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-900">{loan.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Exposure</p>
                  <p className="mt-1 font-medium text-gray-900">{formatCurrency(loan.exposure)}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">Action</p>
                <p className="mt-1 text-sm text-gray-700">{loan.action}</p>
              </div>
              <button className="mt-3 text-sm font-medium text-compass-600 hover:text-compass-700">
                View Evidence →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Methodology */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">i</span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">Risk Assessment Methodology</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Concentration metrics calculated as percentage of total deployed capital</li>
              <li>Stress scenarios based on historical market conditions and loss data</li>
              <li>No raw model scores or black-box explanations provided</li>
              <li>Loans flagged for monitoring based on payment status and project milestones</li>
              <li>Risk assessments updated monthly or as material events occur</li>
              <li>All risk metrics reflect current portfolio composition only</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
