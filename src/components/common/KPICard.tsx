import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: LucideIcon;
  className?: string;
}

export const KPICard = ({ title, value, subtitle, trend, icon: Icon, className }: KPICardProps) => {
  return (
    <div className={clsx('rounded-lg border border-gray-100 bg-gray-50/30 p-5', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-normal text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-normal text-gray-900">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={clsx(
                  'text-sm font-normal',
                  trend.isPositive ? 'text-success' : 'text-error'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-sm text-gray-500">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
