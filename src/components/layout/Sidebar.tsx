import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ArrowDownToLine,
  ArrowUpFromLine,
  Users,
  UserCheck,
  Landmark,
  BarChart3,
  FolderOpen,
  Settings,
  Gift,
  MessageCircle,
  Search,
  Inbox,
  BookOpen,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: number | string;
  section?: 'primary' | 'secondary' | 'tertiary' | 'bottom';
}

const navigationItems: NavItem[] = [
  // Primary (used daily)
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, section: 'primary' },
  { name: 'Insights', path: '/insights', icon: BookOpen, section: 'primary', badge: 5 },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, section: 'primary' },
  { name: 'Loans', path: '/loans', icon: FileText, section: 'primary' },
  { name: 'Payments', path: '/payments', icon: ArrowDownToLine, section: 'primary', badge: 3 },
  { name: 'Distributions', path: '/distributions', icon: ArrowUpFromLine, section: 'primary' },

  // Secondary (used weekly)
  { name: 'Borrowers', path: '/borrowers', icon: Users, section: 'secondary' },
  { name: 'Agents', path: '/agents', icon: UserCheck, section: 'secondary' },
  { name: 'Capital', path: '/capital', icon: Landmark, section: 'secondary', badge: 'Beta' },

  // Tertiary (used monthly)
  { name: 'Reports', path: '/reports', icon: BarChart3, section: 'tertiary' },
  { name: 'Documents', path: '/documents', icon: FolderOpen, section: 'tertiary' },

  // Bottom items
  { name: 'Settings', path: '/settings', icon: Settings, section: 'bottom' },
];

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.path);

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={clsx(
          'group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all duration-150',
          active
            ? 'bg-gray-200/60 text-gray-900'
            : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
        )}
      >
        <Icon size={18} strokeWidth={1.5} className={active ? 'text-gray-700' : 'text-gray-500'} />
        <span className="flex-1">{item.name}</span>
        {item.badge && (
          <span
            className={clsx(
              'rounded-full px-1.5 py-0.5 text-xs font-medium',
              typeof item.badge === 'number'
                ? 'bg-[#355E3B] text-white'
                : 'bg-gray-200 text-gray-700'
            )}
          >
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  const primaryItems = navigationItems.filter((item) => item.section === 'primary');
  const secondaryItems = navigationItems.filter((item) => item.section === 'secondary');
  const tertiaryItems = navigationItems.filter((item) => item.section === 'tertiary');
  const bottomItems = navigationItems.filter((item) => item.section === 'bottom');

  return (
    <aside className="flex h-screen w-[220px] flex-col bg-[#f5f4f0]">
      {/* Logo */}
      <div className="flex h-14 items-center px-3">
        <span className="text-base font-bold text-gray-900">Compass</span>
      </div>

      {/* Search and Inbox */}
      <div className="space-y-0.5 px-2 pb-4">
        <button className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100/80 hover:text-gray-900">
          <Search size={18} strokeWidth={1.5} className="text-gray-500" />
          <span className="flex-1 text-left text-gray-500">Search</span>
          <span className="text-xs text-gray-400">⌘ K</span>
        </button>
        <button className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100/80 hover:text-gray-900">
          <Inbox size={18} strokeWidth={1.5} className="text-gray-500" />
          <span className="flex-1 text-left">Inbox</span>
          <span className="rounded-full bg-[#355E3B] px-1.5 py-0.5 text-xs font-medium text-white">
            2
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-2">
        {/* Primary Section */}
        <div className="space-y-0.5">{primaryItems.map(renderNavItem)}</div>

        {/* Secondary Section */}
        {secondaryItems.length > 0 && (
          <div className="space-y-0.5">{secondaryItems.map(renderNavItem)}</div>
        )}

        {/* Tertiary Section */}
        {tertiaryItems.length > 0 && (
          <div className="space-y-0.5">{tertiaryItems.map(renderNavItem)}</div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-0.5 px-2 pb-3 pt-2">
        {bottomItems.map(renderNavItem)}
        <button className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100/80 hover:text-gray-900">
          <Gift size={18} strokeWidth={1.5} className="text-gray-500" />
          <span className="flex-1 text-left">Refer & earn</span>
        </button>
        <button className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100/80 hover:text-gray-900">
          <MessageCircle size={18} strokeWidth={1.5} className="text-gray-500" />
          <span className="flex-1 text-left">Chat for help</span>
        </button>
      </div>
    </aside>
  );
};
