export interface ProductData {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Business' | 'Asset-Backed';
  targetNetIRR: { min: number; max: number };
  typicalTerm: string; // in months
  riskTier: 'Conservative' | 'Moderate' | 'Aggressive';
  capitalDeployed: number; // platform-wide
  historicalPerformance: {
    avgNetIRR: number;
    defaultRate: number;
    recoveryRate: number;
    volatilityIndex: number;
  };
  activeOpportunities: number;
  capacityRemaining: number;
  allocationMinimum: number;
  liquidity: string;
  description: string;
  borrowerProfile: string;
  riskCharacteristics: string[];
  approvedFirms: number;
  totalLoansOriginated: number;
  avgLoanSize: number;
  ltvRange: { min: number; max: number };
  performanceHistory: Array<{ month: string; irr: number; deployed: number }>;
}

export const productsData: ProductData[] = [
  {
    id: 'prod-001',
    name: 'Residential Bridge Loans',
    category: 'Residential',
    targetNetIRR: { min: 11.5, max: 14.2 },
    typicalTerm: '12-18 months',
    riskTier: 'Moderate',
    capitalDeployed: 8450000,
    historicalPerformance: {
      avgNetIRR: 13.1,
      defaultRate: 1.8,
      recoveryRate: 94.2,
      volatilityIndex: 2.3,
    },
    activeOpportunities: 12,
    capacityRemaining: 2150000,
    allocationMinimum: 50000,
    liquidity: 'Fixed term with early exit options',
    description: 'Short-term financing for residential property acquisition, renovation, or bridge-to-permanent financing',
    borrowerProfile: 'Experienced real estate investors and property flippers with established track records',
    riskCharacteristics: [
      'First lien position',
      'LTV capped at 70%',
      'Personal guarantees required',
      'Monthly interest payments',
      'Property inspections quarterly',
    ],
    approvedFirms: 8,
    totalLoansOriginated: 142,
    avgLoanSize: 285000,
    ltvRange: { min: 55, max: 70 },
    performanceHistory: [
      { month: 'Jan', irr: 12.8, deployed: 7200000 },
      { month: 'Feb', irr: 13.0, deployed: 7450000 },
      { month: 'Mar', irr: 13.2, deployed: 7850000 },
      { month: 'Apr', irr: 13.1, deployed: 8100000 },
      { month: 'May', irr: 13.3, deployed: 8250000 },
      { month: 'Jun', irr: 13.1, deployed: 8450000 },
    ],
  },
  {
    id: 'prod-002',
    name: 'Commercial Bridge Loans',
    category: 'Commercial',
    targetNetIRR: { min: 10.8, max: 13.5 },
    typicalTerm: '18-24 months',
    riskTier: 'Moderate',
    capitalDeployed: 12850000,
    historicalPerformance: {
      avgNetIRR: 12.1,
      defaultRate: 2.4,
      recoveryRate: 89.5,
      volatilityIndex: 3.1,
    },
    activeOpportunities: 8,
    capacityRemaining: 3200000,
    allocationMinimum: 100000,
    liquidity: 'Fixed term',
    description: 'Bridge financing for commercial property acquisition, repositioning, or refinancing',
    borrowerProfile: 'Commercial real estate operators with minimum 5 years experience and established portfolios',
    riskCharacteristics: [
      'First lien position',
      'LTV capped at 65%',
      'Debt service coverage ratio > 1.2x',
      'Quarterly financial reporting',
      'Property condition assessments',
    ],
    approvedFirms: 6,
    totalLoansOriginated: 89,
    avgLoanSize: 625000,
    ltvRange: { min: 50, max: 65 },
    performanceHistory: [
      { month: 'Jan', irr: 11.8, deployed: 11200000 },
      { month: 'Feb', irr: 12.0, deployed: 11650000 },
      { month: 'Mar', irr: 12.2, deployed: 11950000 },
      { month: 'Apr', irr: 12.1, deployed: 12250000 },
      { month: 'May', irr: 12.3, deployed: 12550000 },
      { month: 'Jun', irr: 12.1, deployed: 12850000 },
    ],
  },
  {
    id: 'prod-003',
    name: 'Business Term Loans',
    category: 'Business',
    targetNetIRR: { min: 13.2, max: 16.8 },
    typicalTerm: '24-36 months',
    riskTier: 'Aggressive',
    capitalDeployed: 5680000,
    historicalPerformance: {
      avgNetIRR: 14.9,
      defaultRate: 4.2,
      recoveryRate: 78.3,
      volatilityIndex: 4.8,
    },
    activeOpportunities: 15,
    capacityRemaining: 1850000,
    allocationMinimum: 25000,
    liquidity: 'Fixed term with limited secondary market',
    description: 'Working capital and growth financing for established small to mid-sized businesses',
    borrowerProfile: 'Operating businesses with minimum 3 years history, positive cash flow, and clear growth trajectory',
    riskCharacteristics: [
      'Second lien or unsecured',
      'Personal guarantees required',
      'Monthly principal and interest',
      'Financial covenants monitored',
      'Higher risk, higher return profile',
    ],
    approvedFirms: 12,
    totalLoansOriginated: 203,
    avgLoanSize: 145000,
    ltvRange: { min: 0, max: 0 }, // Not applicable for business loans
    performanceHistory: [
      { month: 'Jan', irr: 14.5, deployed: 4850000 },
      { month: 'Feb', irr: 14.7, deployed: 5020000 },
      { month: 'Mar', irr: 14.9, deployed: 5185000 },
      { month: 'Apr', irr: 15.1, deployed: 5350000 },
      { month: 'May', irr: 15.0, deployed: 5520000 },
      { month: 'Jun', irr: 14.9, deployed: 5680000 },
    ],
  },
  {
    id: 'prod-004',
    name: 'Asset-Backed Loans',
    category: 'Asset-Backed',
    targetNetIRR: { min: 9.5, max: 12.2 },
    typicalTerm: '12-24 months',
    riskTier: 'Conservative',
    capitalDeployed: 9250000,
    historicalPerformance: {
      avgNetIRR: 10.8,
      defaultRate: 0.9,
      recoveryRate: 97.8,
      volatilityIndex: 1.4,
    },
    activeOpportunities: 6,
    capacityRemaining: 1750000,
    allocationMinimum: 100000,
    liquidity: 'Fixed term with strong secondary market',
    description: 'Secured lending backed by tangible assets including equipment, inventory, or receivables',
    borrowerProfile: 'Established businesses with verifiable asset collateral and stable cash flows',
    riskCharacteristics: [
      'First priority security interest',
      'Advance rates 50-75% of asset value',
      'Monthly asset verification',
      'Strong collateral liquidation options',
      'Lower risk, stable returns',
    ],
    approvedFirms: 5,
    totalLoansOriginated: 167,
    avgLoanSize: 385000,
    ltvRange: { min: 50, max: 75 },
    performanceHistory: [
      { month: 'Jan', irr: 10.5, deployed: 8120000 },
      { month: 'Feb', irr: 10.6, deployed: 8350000 },
      { month: 'Mar', irr: 10.8, deployed: 8585000 },
      { month: 'Apr', irr: 10.9, deployed: 8750000 },
      { month: 'May', irr: 10.8, deployed: 8950000 },
      { month: 'Jun', irr: 10.8, deployed: 9250000 },
    ],
  },
];

// Active allocation opportunities within products
export interface AllocationOpportunity {
  id: string;
  productId: string;
  firmName: string;
  targetAmount: number;
  minimumCommitment: number;
  capacityRemaining: number;
  expectedIRR: number;
  term: string;
  status: 'Open' | 'Filling' | 'Closed';
  closeDate: string;
  firmTrackRecord: {
    loansOriginated: number;
    avgIRR: number;
    defaultRate: number;
  };
}

// Geographic distribution of capital
export interface GeographicData {
  state: string;
  stateCode: string;
  capitalDeployed: number;
  activeLoans: number;
  avgIRR: number;
  products: string[];
}

export const geographicData: GeographicData[] = [
  {
    state: 'Texas',
    stateCode: 'TX',
    capitalDeployed: 8450000,
    activeLoans: 34,
    avgIRR: 13.2,
    products: ['Residential Bridge Loans', 'Commercial Bridge Loans', 'Business Term Loans'],
  },
  {
    state: 'California',
    stateCode: 'CA',
    capitalDeployed: 7250000,
    activeLoans: 28,
    avgIRR: 12.8,
    products: ['Residential Bridge Loans', 'Commercial Bridge Loans', 'Asset-Backed Loans'],
  },
  {
    state: 'Florida',
    stateCode: 'FL',
    capitalDeployed: 6850000,
    activeLoans: 31,
    avgIRR: 13.5,
    products: ['Residential Bridge Loans', 'Business Term Loans'],
  },
  {
    state: 'New York',
    stateCode: 'NY',
    capitalDeployed: 5120000,
    activeLoans: 18,
    avgIRR: 11.9,
    products: ['Commercial Bridge Loans', 'Asset-Backed Loans'],
  },
  {
    state: 'Arizona',
    stateCode: 'AZ',
    capitalDeployed: 3850000,
    activeLoans: 22,
    avgIRR: 13.1,
    products: ['Residential Bridge Loans', 'Business Term Loans'],
  },
  {
    state: 'Georgia',
    stateCode: 'GA',
    capitalDeployed: 2420000,
    activeLoans: 16,
    avgIRR: 12.9,
    products: ['Residential Bridge Loans', 'Business Term Loans'],
  },
  {
    state: 'North Carolina',
    stateCode: 'NC',
    capitalDeployed: 1850000,
    activeLoans: 12,
    avgIRR: 12.7,
    products: ['Residential Bridge Loans', 'Asset-Backed Loans'],
  },
  {
    state: 'Illinois',
    stateCode: 'IL',
    capitalDeployed: 1440000,
    activeLoans: 9,
    avgIRR: 11.8,
    products: ['Commercial Bridge Loans', 'Business Term Loans'],
  },
];

export const allocationOpportunities: AllocationOpportunity[] = [
  {
    id: 'opp-001',
    productId: 'prod-001',
    firmName: 'Sunbelt Capital Partners',
    targetAmount: 2000000,
    minimumCommitment: 50000,
    capacityRemaining: 850000,
    expectedIRR: 13.5,
    term: '12 months',
    status: 'Open',
    closeDate: '2024-07-15',
    firmTrackRecord: {
      loansOriginated: 34,
      avgIRR: 13.8,
      defaultRate: 1.2,
    },
  },
  {
    id: 'opp-002',
    productId: 'prod-001',
    firmName: 'West Coast Fund',
    targetAmount: 1500000,
    minimumCommitment: 50000,
    capacityRemaining: 420000,
    expectedIRR: 13.2,
    term: '18 months',
    status: 'Filling',
    closeDate: '2024-07-20',
    firmTrackRecord: {
      loansOriginated: 48,
      avgIRR: 13.5,
      defaultRate: 1.8,
    },
  },
  {
    id: 'opp-003',
    productId: 'prod-002',
    firmName: 'Regional Investment Group',
    targetAmount: 3000000,
    minimumCommitment: 100000,
    capacityRemaining: 1250000,
    expectedIRR: 12.0,
    term: '24 months',
    status: 'Open',
    closeDate: '2024-08-01',
    firmTrackRecord: {
      loansOriginated: 22,
      avgIRR: 12.1,
      defaultRate: 2.1,
    },
  },
];
