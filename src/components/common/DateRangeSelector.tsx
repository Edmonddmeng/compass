import { Calendar } from 'lucide-react';
import { useState } from 'react';

type DateRange = 'Last 7 days' | 'Last 30 days' | 'Last 90 days' | 'Last 12 months';

interface DateRangeSelectorProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
}

export const DateRangeSelector = ({
  value = 'Last 30 days',
  onChange
}: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DateRange>(value);

  const ranges: DateRange[] = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 12 months'];

  const handleSelect = (range: DateRange) => {
    setSelected(range);
    setIsOpen(false);
    onChange?.(range);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50"
      >
        <Calendar size={16} className="text-gray-500" />
        <span>{selected}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => handleSelect(range)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {range}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
