interface MoneyFlowChartProps {
  received: number;
  distributed: number;
  platformFees: number;
  pending: number;
}

export const MoneyFlowChart = ({
  received,
  distributed,
  platformFees,
  pending,
}: MoneyFlowChartProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const distributedPercent = (distributed / received) * 100;
  const feesPercent = (platformFees / received) * 100;
  const pendingPercent = (pending / received) * 100;

  return (
    <div className="space-y-6">
      {/* Received */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5">
        <div>
          <p className="text-sm font-normal text-gray-600">Payments Received</p>
          <p className="mt-1 text-2xl font-normal text-gray-900">{formatCurrency(received)}</p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-green-700">Inflow</span>
          </div>
        </div>
      </div>

      {/* Flow visualization */}
      <div className="relative flex items-center justify-center py-2">
        <div className="h-20 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200"></div>
      </div>

      {/* Distribution breakdown */}
      <div className="space-y-3">
        {/* Distributed to Lenders */}
        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300">
          <div
            className="absolute left-0 top-0 h-full bg-[#355E3B]/5 transition-all"
            style={{ width: `${distributedPercent}%` }}
          ></div>
          <div className="relative flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-normal text-gray-600">Distributed to Lenders</p>
              <p className="mt-1 text-xl font-normal text-gray-900">{formatCurrency(distributed)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">{distributedPercent.toFixed(1)}%</p>
              <p className="text-xs text-gray-400">of total</p>
            </div>
          </div>
        </div>

        {/* Platform Fees */}
        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300">
          <div
            className="absolute left-0 top-0 h-full bg-blue-50/50 transition-all"
            style={{ width: `${feesPercent}%` }}
          ></div>
          <div className="relative flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-normal text-gray-600">Platform Fees</p>
              <p className="mt-1 text-xl font-normal text-gray-900">{formatCurrency(platformFees)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">{feesPercent.toFixed(1)}%</p>
              <p className="text-xs text-gray-400">of total</p>
            </div>
          </div>
        </div>

        {/* Pending Settlement */}
        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300">
          <div
            className="absolute left-0 top-0 h-full bg-yellow-50/50 transition-all"
            style={{ width: `${pendingPercent}%` }}
          ></div>
          <div className="relative flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-normal text-gray-600">Pending Settlement</p>
              <p className="mt-1 text-xl font-normal text-gray-900">{formatCurrency(pending)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">{pendingPercent.toFixed(1)}%</p>
              <p className="text-xs text-gray-400">of total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="rounded-lg border border-gray-200 bg-gray-50/30 p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
          <span>Allocation breakdown</span>
          <span>{formatCurrency(received)} total</span>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="bg-[#355E3B]"
            style={{ width: `${distributedPercent}%` }}
            title="Distributed to Lenders"
          ></div>
          <div
            className="bg-blue-500"
            style={{ width: `${feesPercent}%` }}
            title="Platform Fees"
          ></div>
          <div
            className="bg-yellow-500"
            style={{ width: `${pendingPercent}%` }}
            title="Pending Settlement"
          ></div>
        </div>
      </div>
    </div>
  );
};
