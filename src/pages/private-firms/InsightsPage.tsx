import { AlertTriangle, ChevronRight, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

type RiskLevel = 'high' | 'medium' | 'low';

interface StateData {
  name: string;
  exposure: number;
  exposurePercent: number;
  loanCount: number;
  avgIRR: number;
  riskLevel: RiskLevel;
  primaryConcern: string;
  details: string;
}

const stateData: Record<string, StateData> = {
  Texas: {
    name: 'Texas',
    exposure: 1580000,
    exposurePercent: 37,
    loanCount: 23,
    avgIRR: 13.8,
    riskLevel: 'high',
    primaryConcern: 'High concentration in construction & bridge loans',
    details: 'If interest rates rise 100 bps, projected default rates increase by 1.8-2.3%',
  },
  California: {
    name: 'California',
    exposure: 950000,
    exposurePercent: 22,
    loanCount: 18,
    avgIRR: 12.4,
    riskLevel: 'medium',
    primaryConcern: 'Regulatory environment changes',
    details: 'Strong market fundamentals but increasing regulatory scrutiny on short-term lending',
  },
  Florida: {
    name: 'Florida',
    exposure: 680000,
    exposurePercent: 16,
    loanCount: 14,
    avgIRR: 14.2,
    riskLevel: 'medium',
    primaryConcern: 'Hurricane season & insurance costs',
    details: 'Climate risk affecting property values and insurance availability',
  },
  Arizona: {
    name: 'Arizona',
    exposure: 420000,
    exposurePercent: 10,
    loanCount: 9,
    avgIRR: 13.5,
    riskLevel: 'low',
    primaryConcern: 'Market saturation in Phoenix metro',
    details: 'Diversified loan types with strong borrower quality',
  },
  Georgia: {
    name: 'Georgia',
    exposure: 280000,
    exposurePercent: 7,
    loanCount: 6,
    avgIRR: 12.9,
    riskLevel: 'low',
    primaryConcern: 'Limited diversification',
    details: 'Concentrated in Atlanta metro area but strong economic indicators',
  },
};

export const InsightsPage = () => {
  const [selectedState, setSelectedState] = useState<string | null>('Texas');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Intelligence</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Insights</h1>
        <p className="mt-2 text-base text-gray-600">
          AI-powered analysis and strategic recommendations
        </p>
      </div>

      {/* Summary Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 text-gray-600" size={20} />
          <div className="flex-1">
            <p className="font-normal text-gray-900">5 items require attention</p>
            <p className="mt-1 text-sm text-gray-600">
              Review concentration risks and regional exposure
            </p>
          </div>
        </div>
      </div>

      {/* Risk Concentration */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-normal text-gray-900">Risk Concentration</h2>
          <p className="mt-1 text-sm text-gray-500">Single point of failure analysis</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-500">Concentration Analysis</p>
            <p className="mt-2 text-xl font-normal text-gray-900">
              42% of projected credit losses concentrated in 5 entities
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-normal text-gray-600">Top Risk Sources</p>

            <div className="space-y-2">
              {[
                { name: 'Martinez Development LLC', exposure: '18%', type: 'Borrower', risk: 'High' },
                { name: 'West Coast Properties', exposure: '14%', type: 'Borrower', risk: 'High' },
                { name: 'Sunbelt Lending Partners', exposure: '10%', type: 'Originator', risk: 'High' },
                { name: 'Johnson Real Estate Group', exposure: '8%', type: 'Borrower', risk: 'Medium' },
                { name: 'Premier Mortgage Co.', exposure: '7%', type: 'Originator', risk: 'Medium' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setExpandedSection(expandedSection === item.name ? null : item.name)}
                  className="flex w-full items-center justify-between border-b border-gray-100 py-3 text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-normal text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.type} · {item.risk} risk</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-normal text-gray-900">{item.exposure}</span>
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 transition-transform ${
                        expandedSection === item.name ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              If top 5 loans default, 28% of annualized cash flow would be impacted
            </p>
          </div>
        </div>
      </div>

      {/* Regional Exposure */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-normal text-gray-900">Regional Exposure</h2>
          <p className="mt-1 text-sm text-gray-500">Geographic concentration and macro risk</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* US Map */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-sm text-gray-600">Click a state to view analysis</p>

              <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const hasData = stateData[stateName];
                      const isSelected = selectedState === stateName;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => {
                            if (hasData) setSelectedState(stateName);
                          }}
                          style={{
                            default: {
                              fill: hasData
                                ? isSelected
                                  ? '#355E3B'
                                  : '#f3f4f6'
                                : '#fafafa',
                              stroke: '#e5e7eb',
                              strokeWidth: 0.5,
                              outline: 'none',
                              cursor: hasData ? 'pointer' : 'default',
                            },
                            hover: {
                              fill: hasData ? '#2d4f32' : '#fafafa',
                              outline: 'none',
                            },
                            pressed: {
                              fill: '#355E3B',
                              outline: 'none',
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
          </div>

          {/* State Details */}
          <div className="lg:col-span-2">
            {selectedState && stateData[selectedState] ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <h3 className="font-normal text-gray-900">{stateData[selectedState].name}</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-normal text-gray-900">
                        {formatCurrency(stateData[selectedState].exposure)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {stateData[selectedState].exposurePercent}% of total portfolio
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-500">Active Loans</p>
                        <p className="text-lg font-normal text-gray-900">{stateData[selectedState].loanCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Avg IRR</p>
                        <p className="text-lg font-normal text-gray-900">{stateData[selectedState].avgIRR}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <p className="mb-2 text-sm font-normal text-gray-600">Primary Concern</p>
                  <p className="text-sm text-gray-900">{stateData[selectedState].primaryConcern}</p>

                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">Analysis</p>
                    <p className="mt-1 text-sm text-gray-700">{stateData[selectedState].details}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white p-8">
                <p className="text-sm text-gray-500">Select a state to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Key Finding */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="font-normal text-gray-900">Texas represents 37% of total loan exposure</p>
          <p className="mt-1 text-sm text-gray-600">
            Heavily concentrated in construction & short-term bridge loans. If interest rates rise another
            100 bps, projected default rates increase by 1.8–2.3%
          </p>
        </div>
      </div>

      {/* Product-Line Profitability */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-normal text-gray-900">Product-Line Profitability</h2>
          <p className="mt-1 text-sm text-gray-500">Forward-looking IRR projections</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              product: 'Bridge Loans',
              currentIRR: 14.5,
              projectedIRR: 15.2,
              trend: 'up',
              insight: 'Strong performance expected to continue',
            },
            {
              product: 'Fix & Flip',
              currentIRR: 13.2,
              projectedIRR: 12.8,
              trend: 'down',
              insight: 'Slight margin compression due to increased competition',
            },
            {
              product: 'Commercial RE Bridge',
              currentIRR: 12.1,
              projectedIRR: 8.4,
              trend: 'down',
              insight: 'Projected to enter negative IRR territory within 9 months',
            },
            {
              product: 'Rental Property',
              currentIRR: 11.8,
              projectedIRR: 11.5,
              trend: 'down',
              insight: 'Stable but low margins',
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="font-normal text-gray-900">{item.product}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.insight}</p>
                </div>
                {item.trend === 'up' ? (
                  <TrendingUp className="text-gray-600" size={18} />
                ) : (
                  <TrendingDown className="text-gray-600" size={18} />
                )}
              </div>

              <div className="flex items-end gap-4">
                <div>
                  <p className="text-xs text-gray-500">Current IRR</p>
                  <p className="text-2xl font-normal text-gray-900">{item.currentIRR}%</p>
                </div>
                <div className="mb-1 text-gray-400">→</div>
                <div>
                  <p className="text-xs text-gray-500">Projected (9mo)</p>
                  <p className="text-2xl font-normal text-gray-900">{item.projectedIRR}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="font-normal text-gray-900">
            Commercial RE bridge loans require immediate action
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Currently profitable but projected to enter negative IRR territory within 9 months
          </p>
        </div>
      </div>

      {/* Projected Default Scenarios */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-normal text-gray-900">Projected Default Scenarios</h2>
          <p className="mt-1 text-sm text-gray-500">12-month forward-looking assessment</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              scenario: 'Base Case',
              probability: '60%',
              defaultRate: '2.1%',
              assumption: 'Current market conditions continue',
            },
            {
              scenario: 'Stress Case',
              probability: '30%',
              defaultRate: '3.8%',
              assumption: 'Interest rates +100 bps',
            },
            {
              scenario: 'Downside Case',
              probability: '10%',
              defaultRate: '6.2%',
              assumption: 'Regional economic contraction',
            },
          ].map((scenario, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 bg-white p-5">
              <p className="text-xs font-normal uppercase tracking-wide text-gray-500">
                {scenario.scenario}
              </p>
              <p className="mt-3 text-3xl font-normal text-gray-900">{scenario.defaultRate}</p>
              <p className="mt-1 text-sm text-gray-500">Default rate</p>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500">Probability</p>
                <p className="mt-1 text-lg font-normal text-gray-900">{scenario.probability}</p>
              </div>

              <p className="mt-3 text-xs text-gray-600">{scenario.assumption}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="mb-4 font-normal text-gray-900">Under stress scenarios, highest risk concentration in:</p>

          <div className="space-y-3">
            {[
              { item: 'Commercial RE Bridge Loans', risk: 'Product' },
              { item: 'Texas Construction Portfolio', risk: 'Region' },
              { item: 'First-time Borrowers (< 2 years)', risk: 'Borrower Type' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-normal text-gray-900">{item.item}</p>
                  <p className="text-xs text-gray-500">{item.risk}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
