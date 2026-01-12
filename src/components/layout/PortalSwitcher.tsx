import { useState } from 'react';
import { ChevronDown, Building2, Users, Briefcase, DollarSign } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Portal {
  id: string;
  name: string;
  icon: React.ElementType;
  path: string;
  description: string;
}

const portals: Portal[] = [
  {
    id: 'private-firms',
    name: 'Private Firms',
    icon: Building2,
    path: '/private-firms',
    description: 'Loan operations & management',
  },
  {
    id: 'agents',
    name: 'Agents',
    icon: Users,
    path: '/agents',
    description: 'Originator portal',
  },
  {
    id: 'borrowers',
    name: 'Borrowers',
    icon: Briefcase,
    path: '/borrowers',
    description: 'Borrower dashboard',
  },
  {
    id: 'lenders',
    name: 'Lenders',
    icon: DollarSign,
    path: '/lenders',
    description: 'Investor portal',
  },
];

export const PortalSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current portal based on path
  const getCurrentPortal = () => {
    const path = location.pathname;
    if (path.startsWith('/agents')) return portals[1];
    if (path.startsWith('/borrowers')) return portals[2];
    if (path.startsWith('/lenders')) return portals[3];
    return portals[0]; // default to private-firms
  };

  const currentPortal = getCurrentPortal();
  const CurrentIcon = currentPortal.icon;

  const handlePortalSwitch = (portal: Portal) => {
    navigate(portal.path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2.5">
          <CurrentIcon size={18} strokeWidth={1.5} className="text-gray-600" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{currentPortal.name}</p>
            <p className="text-xs text-gray-500">{currentPortal.description}</p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

          {/* Dropdown */}
          <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {portals.map((portal) => {
              const Icon = portal.icon;
              const isActive = portal.id === currentPortal.id;
              return (
                <button
                  key={portal.id}
                  onClick={() => handlePortalSwitch(portal)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left hover:bg-gray-50 ${
                    isActive ? 'bg-gray-50' : ''
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className={isActive ? 'text-[#355E3B]' : 'text-gray-600'}
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isActive ? 'text-[#355E3B]' : 'text-gray-900'}`}>
                      {portal.name}
                    </p>
                    <p className="text-xs text-gray-500">{portal.description}</p>
                  </div>
                  {isActive && (
                    <div className="h-2 w-2 rounded-full bg-[#355E3B]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
