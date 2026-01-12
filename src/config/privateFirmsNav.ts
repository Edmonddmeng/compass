import { Home, TrendingUp, FileText, DollarSign, Users, Briefcase, Building2, BarChart3, File, FolderOpen, Settings } from 'lucide-react';
import { NavSection } from '../components/layout/SidebarNew';

export const privateFirmsNav: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: Home, path: '/private-firms' },
      { label: 'Insights', icon: TrendingUp, path: '/private-firms/insights' },
      { label: 'Analytics', icon: BarChart3, path: '/private-firms/analytics' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Loans', icon: FileText, path: '/private-firms/loans' },
      { label: 'Payments', icon: DollarSign, path: '/private-firms/payments' },
      { label: 'Distributions', icon: TrendingUp, path: '/private-firms/distributions' },
    ],
  },
  {
    label: 'Relationships',
    items: [
      { label: 'Borrowers', icon: Users, path: '/private-firms/borrowers' },
      { label: 'Agents', icon: Briefcase, path: '/private-firms/agents' },
      { label: 'Capital', icon: Building2, path: '/private-firms/capital' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Reports', icon: File, path: '/private-firms/reports' },
      { label: 'Documents', icon: FolderOpen, path: '/private-firms/documents' },
      { label: 'Settings', icon: Settings, path: '/private-firms/settings' },
    ],
  },
];
