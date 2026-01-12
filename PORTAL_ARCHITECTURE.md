# Compass Multi-Portal Architecture

## Overview
Compass now supports 4 distinct user portals with shared design system and infrastructure.

## Portal Structure

### 1. **Private Firms Portal** (`/private-firms/*`)
**For:** Lending firms managing their loan operations
**Status:** ✅ FULLY BUILT (11 pages)

**Pages:**
- Dashboard - Overview with KPIs, charts, and activity
- Insights - AI-powered analysis and strategic recommendations
- Analytics - Returns tracking and performance metrics
- Loans - Loan management table with filters
- Payments - Incoming money tracking (ACH/Wire/Check)
- Distributions - Outgoing money to capital partners
- Borrowers - Borrower profiles and credit tracking
- Agents - Agent performance and origination tracking
- Capital - Capital partner ledger and deployment metrics
- Reports - Export functionality for all reports
- Documents - (placeholder)
- Settings - (placeholder)

### 2. **Agents Portal** (`/agents/*`)
**For:** Loan originators and servicing agents
**Status:** 🔨 Placeholder ready

**Planned Features:**
- Loan origination pipeline
- Commission tracking
- Performance metrics
- Borrower matching

### 3. **Borrowers Portal** (`/borrowers/*`)
**For:** Borrowers applying for and managing loans
**Status:** 🔨 Placeholder ready

**Planned Features:**
- Loan application
- Active loans overview
- Payment scheduling
- Document uploads

### 4. **Lenders Portal** (`/lenders/*`)
**For:** Private investors funding lending firms
**Status:** 🔨 Placeholder ready

**Planned Features:**
- Investment portfolio
- Returns dashboard
- Marketplace opportunities
- Capital deployment tracking

## Technical Architecture

### Components
```
src/components/layout/
├── LayoutNew.tsx          - Layout wrapper accepting navigation
├── SidebarNew.tsx         - Reusable sidebar with portal-specific nav
└── PortalSwitcher.tsx     - Dropdown to switch between portals
```

### Configuration
```
src/config/
└── privateFirmsNav.ts     - Private firms navigation items
```

### Pages
```
src/pages/
├── private-firms/         - All private firm pages
├── agents/               - Agent portal pages
├── borrowers/            - Borrower portal pages
└── lenders/              - Lender portal pages
```

### Data
```
src/data/
└── loansData.ts          - Mock data for loans, payments, distributions,
                            borrowers, agents, and capital partners
```

## Portal Switcher

The Portal Switcher component appears at the top of the sidebar and allows users to:
- See their current portal with icon and description
- Switch between all 4 portals with one click
- Visual indicator for active portal

### Portal Icons:
- 🏢 Building2 - Private Firms
- 👥 Users - Agents
- 💼 Briefcase - Borrowers
- 💰 DollarSign - Lenders

## Design System

All portals share:
- Ramp-inspired design aesthetic
- Deep green brand color (#355E3B)
- White card-based layout
- Normal font weights (no bold)
- Minimal, operational focus
- Subtle gray borders (border-gray-200)
- Breathable spacing

## Routing

Root path redirects to Private Firms:
```
/ → /private-firms
```

Each portal has its own namespace:
```
/private-firms/*
/agents/*
/borrowers/*
/lenders/*
```

## Next Steps

1. **Define navigation** for Agents, Borrowers, and Lenders portals
2. **Build pages** for each portal following Private Firms pattern
3. **Add authentication** to determine which portal users see
4. **Implement role-based access** control
5. **Add portal-specific data** and API integration

## Development Status

✅ Multi-portal architecture complete
✅ Portal switcher component
✅ Reusable layout system
✅ Private Firms portal (11 pages)
✅ Placeholder dashboards for 3 other portals
🔨 Navigation configs for other portals (pending)
🔨 Pages for other portals (pending)
