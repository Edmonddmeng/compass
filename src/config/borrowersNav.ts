import { Home, Search, FileText, CreditCard, FolderOpen, MessageSquare } from 'lucide-react';
import { NavSection } from '../components/layout/SidebarNew';

export const borrowersNav: NavSection[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: Home, path: '/borrowers' },
      { label: 'Find Products', icon: Search, path: '/borrowers/products' },
      { label: 'My Loans', icon: FileText, path: '/borrowers/loans' },
      { label: 'Payments', icon: CreditCard, path: '/borrowers/payments' },
      { label: 'Documents', icon: FolderOpen, path: '/borrowers/documents' },
      { label: 'Contact', icon: MessageSquare, path: '/borrowers/contact' },
    ],
  },
];
