import { Search, Inbox, Home, Lightbulb } from 'lucide-react';
import { PortalSwitcher } from './PortalSwitcher';

export interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string | number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

interface SidebarNewProps {
  sections: NavSection[];
}

export const SidebarNew = ({ sections }: SidebarNewProps) => {
  return (
    <aside className="flex h-screen w-[220px] flex-col bg-[#f5f4f0]">
      {/* Logo */}
      <div className="flex h-14 items-center px-3">
        <span className="text-base font-bold text-gray-900">Compass</span>
      </div>

      {/* Portal Switcher */}
      <div className="px-2 pb-4">
        <PortalSwitcher />
      </div>

      {/* Quick Actions */}
      <div className="space-y-0.5 px-2 pb-4">
        <button className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-white/50">
          <Search size={18} strokeWidth={1.5} className="text-gray-500" />
          <span className="flex-1 text-left text-gray-500">Search</span>
          <span className="text-xs text-gray-400">⌘ K</span>
        </button>
        <button className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium hover:bg-white/50">
          <Inbox size={18} strokeWidth={1.5} className="text-gray-600" />
          <span className="flex-1 text-left text-gray-900">Inbox</span>
          <span className="rounded-full bg-[#355E3B] px-1.5 py-0.5 text-xs font-medium text-white">2</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-2">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <p className="mb-1.5 px-2.5 text-xs font-medium uppercase tracking-wide text-gray-500">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isActive = window.location.pathname === item.path;
                return (
                  <a
                    key={itemIdx}
                    href={item.path}
                    className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-gray-900'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.5} className={isActive ? 'text-gray-900' : 'text-gray-600'} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-[#355E3B] px-1.5 py-0.5 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Help Section */}
      <div className="border-t border-gray-200/50 p-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-white/50">
          <Lightbulb size={18} strokeWidth={1.5} className="text-gray-600" />
          <span>Help & Support</span>
        </button>
      </div>
    </aside>
  );
};
