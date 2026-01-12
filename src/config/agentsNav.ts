import {
  Home,
  TrendingUp,
  DollarSign,
  BarChart3,
  Users,
  Building,
  FileText,
  Shield,
} from 'lucide-react';
import { NavSection } from '../components/layout/SidebarNew';

export const agentsNav: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: Home, path: '/agents' },
      { label: 'Pipeline', icon: TrendingUp, path: '/agents/pipeline' },
    ],
  },
  {
    label: 'Revenue',
    items: [
      { label: 'Commissions', icon: DollarSign, path: '/agents/commissions' },
      { label: 'Performance', icon: BarChart3, path: '/agents/performance' },
    ],
  },
  {
    label: 'Relationships',
    items: [
      { label: 'My Borrowers', icon: Users, path: '/agents/borrowers' },
      { label: 'Lender Network', icon: Building, path: '/agents/lenders' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Documents', icon: FileText, path: '/agents/documents' },
      { label: 'Compliance', icon: Shield, path: '/agents/compliance' },
    ],
  },
];
