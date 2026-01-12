import { Home, Wallet, FileText, DollarSign, Package, TrendingUp, AlertTriangle, File, FolderOpen, Settings, HelpCircle } from 'lucide-react';
import { NavSection } from '../components/layout/SidebarNew';

export const lendersNav: NavSection[] = [
  {
    label: 'Primary',
    items: [
      { label: 'Overview', icon: Home, path: '/lenders' },
      { label: 'My Capital', icon: Wallet, path: '/lenders/capital' },
      { label: 'Loans', icon: FileText, path: '/lenders/loans' },
      { label: 'Payments Received', icon: DollarSign, path: '/lenders/payments' },
    ],
  },
  {
    label: 'Secondary',
    items: [
      { label: 'Products', icon: Package, path: '/lenders/products' },
      { label: 'Performance', icon: TrendingUp, path: '/lenders/performance' },
      { label: 'Risk', icon: AlertTriangle, path: '/lenders/risk' },
    ],
  },
  {
    label: 'Tertiary',
    items: [
      { label: 'Statements & Tax Docs', icon: File, path: '/lenders/statements' },
      { label: 'Documents', icon: FolderOpen, path: '/lenders/documents' },
      { label: 'Settings', icon: Settings, path: '/lenders/settings' },
      { label: 'Support', icon: HelpCircle, path: '/lenders/support' },
    ],
  },
];
