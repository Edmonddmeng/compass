type ProgressBarProps = {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'amber';
};

export const ProgressBar = ({
  progress,
  label,
  showPercentage = false,
  height = 'md',
  color = 'green',
}: ProgressBarProps) => {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    green: 'bg-compass-600',
    blue: 'bg-blue-600',
    amber: 'bg-amber-500',
  };

  const bgColorClasses = {
    green: 'bg-compass-100',
    blue: 'bg-blue-100',
    amber: 'bg-amber-100',
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between">
          {label && <span className="text-sm text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-900">{clampedProgress}%</span>}
        </div>
      )}
      <div className={`w-full rounded-full ${bgColorClasses[color]} ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} rounded-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
