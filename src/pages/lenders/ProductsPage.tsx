import { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, ArrowRight, ChevronRight, MapPin } from 'lucide-react';
import { productsData, ProductData, geographicData } from '../../data/productsData';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

export const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string | null>('Texas');
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const categories = ['all', 'Residential', 'Commercial', 'Business', 'Asset-Backed'];

  const filteredProducts =
    selectedCategory === 'all'
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  const getRiskColor = (tier: string) => {
    switch (tier) {
      case 'Conservative':
        return 'border-gray-300 text-gray-700';
      case 'Moderate':
        return 'border-gray-400 text-gray-800';
      case 'Aggressive':
        return 'border-gray-500 text-gray-900';
      default:
        return 'border-gray-300 text-gray-700';
    }
  };

  // Risk-Return scatter data
  const riskReturnData = productsData.map((p) => ({
    name: p.name,
    risk: p.historicalPerformance.volatilityIndex,
    return: p.historicalPerformance.avgNetIRR,
    deployed: p.capitalDeployed,
  }));

  // Performance comparison radar
  const radarData = productsData.map((p) => ({
    product: p.name.split(' ')[0], // First word for brevity
    IRR: p.historicalPerformance.avgNetIRR,
    Recovery: p.historicalPerformance.recoveryRate,
    Stability: 100 - p.historicalPerformance.volatilityIndex * 10,
  }));

  // Capital deployment by category
  const deploymentByCategory = categories
    .filter((c) => c !== 'all')
    .map((category) => ({
      category,
      deployed: productsData
        .filter((p) => p.category === category)
        .reduce((sum, p) => sum + p.capitalDeployed, 0),
    }));

  const totalCapitalDeployed = productsData.reduce((sum, p) => sum + p.capitalDeployed, 0);
  const avgNetIRR = productsData.reduce((sum, p) => sum + p.historicalPerformance.avgNetIRR, 0) / productsData.length;
  const totalOpportunities = productsData.reduce((sum, p) => sum + p.activeOpportunities, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Allocate Capital</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Products</h1>
        <p className="mt-2 text-base text-gray-600">
          Structured lending opportunities offered by approved firms on the platform
        </p>
      </div>

      {/* Platform Summary Bar */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          <div className="p-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">Active Products</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{productsData.length}</p>
          </div>
          <div className="p-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">Platform Capital</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{formatCurrency(totalCapitalDeployed)}</p>
          </div>
          <div className="p-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">Avg Net IRR</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{formatPercent(avgNetIRR)}</p>
          </div>
          <div className="p-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">Open Opportunities</p>
            <p className="mt-2 text-3xl font-normal text-gray-900">{totalOpportunities}</p>
          </div>
        </div>
      </div>

      {/* Risk-Return Profile */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Risk-Return Profile</h2>
          <p className="mt-1 text-sm text-gray-500">
            Historical performance across product categories
          </p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" />
            <XAxis
              type="number"
              dataKey="risk"
              name="Volatility Index"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{
                value: 'Risk (Volatility Index)',
                position: 'insideBottom',
                offset: -10,
                fill: '#6b7280',
                fontSize: 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="return"
              name="Net IRR"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{
                value: 'Expected Return (Net IRR %)',
                angle: -90,
                position: 'insideLeft',
                fill: '#6b7280',
                fontSize: 12,
              }}
              domain={[8, 17]}
            />
            <ZAxis type="number" dataKey="deployed" range={[400, 1200]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
              }}
              formatter={(value: any, name: string) => {
                if (name === 'return') return [formatPercent(value), 'Net IRR'];
                if (name === 'risk') return [value.toFixed(1), 'Volatility'];
                if (name === 'deployed') return [formatCurrency(value), 'Capital Deployed'];
                return [value, name];
              }}
              labelFormatter={(label) => riskReturnData.find((d) => d.name === label)?.name || ''}
            />
            <Scatter data={riskReturnData} fill="#355E3B">
              {riskReturnData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#355E3B" opacity={0.8} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600">
            Bubble size represents total capital deployed. Lower volatility and higher IRR indicate more attractive
            risk-adjusted returns.
          </p>
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance Radar */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Performance Comparison</h2>
            <p className="mt-1 text-sm text-gray-500">Multi-dimensional product analysis</p>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="product"
                tick={{ fill: '#6b7280', fontSize: 11 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Radar
                name="IRR"
                dataKey="IRR"
                stroke="#355E3B"
                fill="#355E3B"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Recovery Rate"
                dataKey="Recovery"
                stroke="#6b7280"
                fill="#6b7280"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="line"
                formatter={(value) => (
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>{value}</span>
                )}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Capital Deployment by Category */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Capital Deployment by Category</h2>
            <p className="mt-1 text-sm text-gray-500">Platform-wide allocation</p>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deploymentByCategory} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Deployed']}
              />
              <Bar dataKey="deployed" fill="#355E3B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Geographic Distribution</h2>
          <p className="mt-1 text-sm text-gray-500">
            Capital deployment across US markets
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* US Map */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const hasData = geographicData.find((d) => d.state === stateName);
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
                                  : '#e5e7eb'
                                : '#fafafa',
                              stroke: '#d1d5db',
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
            {selectedState && geographicData.find((d) => d.state === selectedState) ? (
              <div className="space-y-4">
                {(() => {
                  const stateData = geographicData.find((d) => d.state === selectedState)!;
                  return (
                    <>
                      <div className="rounded-lg border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center gap-2">
                          <MapPin size={16} className="text-gray-500" />
                          <h3 className="font-medium text-gray-900">{stateData.state}</h3>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-2xl font-normal text-gray-900">
                              {formatCurrency(stateData.capitalDeployed)}
                            </p>
                            <p className="text-sm text-gray-500">Capital deployed</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                            <div>
                              <p className="text-xs text-gray-500">Active Loans</p>
                              <p className="text-lg font-normal text-gray-900">{stateData.activeLoans}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Avg IRR</p>
                              <p className="text-lg font-normal text-gray-900">{formatPercent(stateData.avgIRR)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-5">
                        <p className="mb-3 text-sm font-medium text-gray-600">Active Products</p>
                        <div className="space-y-2">
                          {stateData.products.map((product, idx) => (
                            <div key={idx} className="text-sm text-gray-700">
                              • {product}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white p-8">
                <p className="text-sm text-gray-500">Select a state to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Geographic Table */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <p className="mb-4 text-sm font-medium text-gray-600">Capital by State</p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    State
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                    Capital Deployed
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                    Active Loans
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                    Avg IRR
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                    % of Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {geographicData
                  .sort((a, b) => b.capitalDeployed - a.capitalDeployed)
                  .map((state) => {
                    const percentage = (state.capitalDeployed / totalCapitalDeployed) * 100;
                    return (
                      <tr key={state.stateCode} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{state.state}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">
                          {formatCurrency(state.capitalDeployed)}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">{state.activeLoans}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">
                          {formatPercent(state.avgIRR)}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600">
                          {percentage.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
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
            {category === 'all' ? 'All Products' : category}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-normal text-gray-900">Available Products</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => navigate(`/lenders/products/${product.id}`)}
              className="group w-full rounded-lg border border-gray-200 bg-white p-6 text-left transition-all hover:border-gray-300"
            >
              {/* Product Header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{product.description}</p>
                </div>
                <ChevronRight
                  size={20}
                  className="text-gray-400 transition-transform group-hover:translate-x-1"
                />
              </div>

              {/* Key Metrics Grid */}
              <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-gray-100 pt-4 md:grid-cols-5">
                <div>
                  <p className="text-xs text-gray-500">Target Net IRR</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatPercent(product.targetNetIRR.min)} - {formatPercent(product.targetNetIRR.max)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Typical Term</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{product.typicalTerm}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Risk Tier</p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getRiskColor(
                        product.riskTier
                      )}`}
                    >
                      {product.riskTier}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Capital Deployed</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatCurrency(product.capitalDeployed)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Opportunities</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{product.activeOpportunities}</p>
                </div>
              </div>

              {/* Historical Performance Bar */}
              <div className="border-t border-gray-100 pt-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Historical Performance
                </p>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Avg Net IRR</p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {formatPercent(product.historicalPerformance.avgNetIRR)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Default Rate</p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {formatPercent(product.historicalPerformance.defaultRate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Recovery Rate</p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {formatPercent(product.historicalPerformance.recoveryRate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Volatility</p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {product.historicalPerformance.volatilityIndex.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Allocation Guidance */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Capital Allocation Guidance</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              Each product represents a <span className="font-medium">defined strategy</span> with clear risk parameters,
              return expectations, and operational boundaries
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              Products are originated by <span className="font-medium">approved firms</span> who have demonstrated
              consistent performance and operational excellence
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              Historical performance data reflects <span className="font-medium">actual results</span> across all loans
              within each product category on the platform
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              Allocation minimums and liquidity terms vary by product based on underlying loan characteristics and
              operational requirements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
