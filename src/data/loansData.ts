export interface LoanData {
  id: string;
  borrower: string;
  amount: number;
  rate: number;
  term: number;
  capitalSource: string;
  netIRR: number;
  paymentHealth: 'Current' | 'Late' | 'Delinquent' | 'Defaulted';
  outstandingPrincipal: number;
  status: 'Active' | 'Paid Off' | 'In Default' | 'Pending';
  originationDate: string;
  maturityDate: string;
  loanType: string;
  property: string;
  nextPaymentDue: string;
  totalPaid: number;
  ltv: number;
}

export const loansData: LoanData[] = [
  {
    id: 'LN-2024-001',
    borrower: 'Sarah Martinez',
    amount: 250000,
    rate: 12.5,
    term: 12,
    capitalSource: 'Sunbelt Capital Partners',
    netIRR: 13.8,
    paymentHealth: 'Late',
    outstandingPrincipal: 125000,
    status: 'Active',
    originationDate: '2024-01-15',
    maturityDate: '2025-01-15',
    loanType: 'Bridge Loan',
    property: '1234 Oak Street, Austin, TX',
    nextPaymentDue: '2024-06-15',
    totalPaid: 125000,
    ltv: 65,
  },
  {
    id: 'LN-2024-002',
    borrower: 'Michael Chen',
    amount: 175000,
    rate: 13.0,
    term: 18,
    capitalSource: 'West Coast Fund',
    netIRR: 14.2,
    paymentHealth: 'Current',
    outstandingPrincipal: 87500,
    status: 'Active',
    originationDate: '2024-02-10',
    maturityDate: '2025-08-10',
    loanType: 'Fix & Flip',
    property: '567 Maple Ave, San Francisco, CA',
    nextPaymentDue: '2024-06-10',
    totalPaid: 87500,
    ltv: 70,
  },
  {
    id: 'LN-2024-003',
    borrower: 'Jennifer Williams',
    amount: 420000,
    rate: 11.75,
    term: 24,
    capitalSource: 'Regional Investment Group',
    netIRR: 12.1,
    paymentHealth: 'Delinquent',
    outstandingPrincipal: 310000,
    status: 'Active',
    originationDate: '2023-12-01',
    maturityDate: '2025-12-01',
    loanType: 'Commercial RE Bridge',
    property: '890 Commerce Blvd, Houston, TX',
    nextPaymentDue: '2024-05-01',
    totalPaid: 110000,
    ltv: 68,
  },
  {
    id: 'LN-2024-004',
    borrower: 'Robert Johnson',
    amount: 312000,
    rate: 12.25,
    term: 15,
    capitalSource: 'Sunbelt Capital Partners',
    netIRR: 13.5,
    paymentHealth: 'Current',
    outstandingPrincipal: 156000,
    status: 'Active',
    originationDate: '2024-03-20',
    maturityDate: '2025-06-20',
    loanType: 'Ground-Up Construction',
    property: '234 Desert Road, Phoenix, AZ',
    nextPaymentDue: '2024-06-20',
    totalPaid: 156000,
    ltv: 72,
  },
  {
    id: 'LN-2024-005',
    borrower: 'Lisa Anderson',
    amount: 186000,
    rate: 11.5,
    term: 12,
    capitalSource: 'West Coast Fund',
    netIRR: 12.8,
    paymentHealth: 'Current',
    outstandingPrincipal: 93000,
    status: 'Active',
    originationDate: '2024-04-05',
    maturityDate: '2025-04-05',
    loanType: 'Rental Property',
    property: '789 Pine Street, Atlanta, GA',
    nextPaymentDue: '2024-06-05',
    totalPaid: 93000,
    ltv: 60,
  },
  {
    id: 'LN-2023-089',
    borrower: 'David Park',
    amount: 290000,
    rate: 13.5,
    term: 12,
    capitalSource: 'Regional Investment Group',
    netIRR: 14.8,
    paymentHealth: 'Current',
    outstandingPrincipal: 0,
    status: 'Paid Off',
    originationDate: '2023-05-12',
    maturityDate: '2024-05-12',
    loanType: 'Bridge Loan',
    property: '456 Sunset Blvd, Miami, FL',
    nextPaymentDue: '—',
    totalPaid: 290000,
    ltv: 65,
  },
];

export interface PaymentData {
  id: string;
  loanId: string;
  borrower: string;
  amount: number;
  method: 'ACH' | 'Wire' | 'Check';
  status: 'Initiated' | 'Pending' | 'Settled' | 'Failed';
  initiatedDate: string;
  settlementDate: string;
  reference: string;
  notes?: string;
}

export const paymentsData: PaymentData[] = [
  {
    id: 'PAY-2024-1823',
    loanId: 'LN-2024-001',
    borrower: 'Sarah Martinez',
    amount: 5200,
    method: 'ACH',
    status: 'Settled',
    initiatedDate: '2024-06-10T14:32:00',
    settlementDate: '2024-06-12T09:15:00',
    reference: 'REF-823491',
  },
  {
    id: 'PAY-2024-1824',
    loanId: 'LN-2024-002',
    borrower: 'Michael Chen',
    amount: 3650,
    method: 'Wire',
    status: 'Settled',
    initiatedDate: '2024-06-10T12:15:00',
    settlementDate: '2024-06-10T16:45:00',
    reference: 'REF-823492',
  },
  {
    id: 'PAY-2024-1825',
    loanId: 'LN-2024-004',
    borrower: 'Robert Johnson',
    amount: 6500,
    method: 'ACH',
    status: 'Pending',
    initiatedDate: '2024-06-11T10:45:00',
    settlementDate: '2024-06-13T09:00:00',
    reference: 'REF-823493',
  },
  {
    id: 'PAY-2024-1826',
    loanId: 'LN-2024-003',
    borrower: 'Jennifer Williams',
    amount: 8750,
    method: 'Wire',
    status: 'Failed',
    initiatedDate: '2024-06-11T09:20:00',
    settlementDate: '—',
    reference: 'REF-823494',
    notes: 'Insufficient funds - retry scheduled',
  },
  {
    id: 'PAY-2024-1827',
    loanId: 'LN-2024-005',
    borrower: 'Lisa Anderson',
    amount: 3875,
    method: 'Check',
    status: 'Settled',
    initiatedDate: '2024-06-09T16:30:00',
    settlementDate: '2024-06-11T14:20:00',
    reference: 'REF-823495',
  },
];

export interface DistributionData {
  id: string;
  batchId: string;
  loansIncluded: string[];
  grossAmount: number;
  platformFees: number;
  agentFees: number;
  netPayout: number;
  recipients: string[];
  status: 'Scheduled' | 'Processing' | 'Completed' | 'Failed';
  executionDate: string;
  createdDate: string;
}

export interface BorrowerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  creditScore: number;
  totalLoans: number;
  activeLoans: number;
  totalBorrowed: number;
  totalOutstanding: number;
  totalRepaid: number;
  paymentHistory: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  defaultHistory: number;
  firstLoanDate: string;
  lastLoanDate: string;
  status: 'Active' | 'Inactive' | 'Blacklisted';
}

export interface AgentData {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  totalLoansOriginated: number;
  activeLoans: number;
  totalVolume: number;
  totalFeesEarned: number;
  avgLoanSize: number;
  performanceRating: 'Excellent' | 'Good' | 'Average' | 'Poor';
  defaultRate: number;
  onboardingDate: string;
  lastOriginationDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface CapitalPartnerData {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  commitmentAmount: number;
  deployedCapital: number;
  availableCapital: number;
  utilizationRate: number;
  totalLoansParticipated: number;
  activeLoans: number;
  totalReturns: number;
  avgIRR: number;
  preferredLoanTypes: string[];
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  onboardingDate: string;
  lastDeploymentDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export const distributionsData: DistributionData[] = [
  {
    id: 'DIST-2024-045',
    batchId: 'BATCH-2024-06-012',
    loansIncluded: ['LN-2024-001', 'LN-2024-002', 'LN-2024-005'],
    grossAmount: 12725,
    platformFees: 637,
    agentFees: 318,
    netPayout: 11770,
    recipients: ['Sunbelt Capital Partners', 'West Coast Fund'],
    status: 'Completed',
    executionDate: '2024-06-12T10:00:00',
    createdDate: '2024-06-11T16:00:00',
  },
  {
    id: 'DIST-2024-046',
    batchId: 'BATCH-2024-06-013',
    loansIncluded: ['LN-2024-004'],
    grossAmount: 6500,
    platformFees: 325,
    agentFees: 162,
    netPayout: 6013,
    recipients: ['Sunbelt Capital Partners'],
    status: 'Processing',
    executionDate: '2024-06-13T10:00:00',
    createdDate: '2024-06-12T14:30:00',
  },
];

export const borrowersData: BorrowerData[] = [
  {
    id: 'BRW-001',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@example.com',
    phone: '(512) 555-0123',
    address: 'Austin, TX',
    creditScore: 720,
    totalLoans: 2,
    activeLoans: 1,
    totalBorrowed: 485000,
    totalOutstanding: 125000,
    totalRepaid: 360000,
    paymentHistory: 'Good',
    defaultHistory: 0,
    firstLoanDate: '2023-08-15',
    lastLoanDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 'BRW-002',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(415) 555-0234',
    address: 'San Francisco, CA',
    creditScore: 780,
    totalLoans: 3,
    activeLoans: 1,
    totalBorrowed: 625000,
    totalOutstanding: 87500,
    totalRepaid: 537500,
    paymentHistory: 'Excellent',
    defaultHistory: 0,
    firstLoanDate: '2022-11-10',
    lastLoanDate: '2024-02-10',
    status: 'Active',
  },
  {
    id: 'BRW-003',
    name: 'Jennifer Williams',
    email: 'jennifer.williams@example.com',
    phone: '(713) 555-0345',
    address: 'Houston, TX',
    creditScore: 680,
    totalLoans: 1,
    activeLoans: 1,
    totalBorrowed: 420000,
    totalOutstanding: 310000,
    totalRepaid: 110000,
    paymentHistory: 'Fair',
    defaultHistory: 0,
    firstLoanDate: '2023-12-01',
    lastLoanDate: '2023-12-01',
    status: 'Active',
  },
  {
    id: 'BRW-004',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(602) 555-0456',
    address: 'Phoenix, AZ',
    creditScore: 745,
    totalLoans: 4,
    activeLoans: 1,
    totalBorrowed: 1125000,
    totalOutstanding: 156000,
    totalRepaid: 969000,
    paymentHistory: 'Excellent',
    defaultHistory: 0,
    firstLoanDate: '2022-05-20',
    lastLoanDate: '2024-03-20',
    status: 'Active',
  },
  {
    id: 'BRW-005',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    phone: '(404) 555-0567',
    address: 'Atlanta, GA',
    creditScore: 755,
    totalLoans: 2,
    activeLoans: 1,
    totalBorrowed: 410000,
    totalOutstanding: 93000,
    totalRepaid: 317000,
    paymentHistory: 'Excellent',
    defaultHistory: 0,
    firstLoanDate: '2023-02-05',
    lastLoanDate: '2024-04-05',
    status: 'Active',
  },
  {
    id: 'BRW-006',
    name: 'David Park',
    email: 'david.park@example.com',
    phone: '(305) 555-0678',
    address: 'Miami, FL',
    creditScore: 795,
    totalLoans: 5,
    activeLoans: 0,
    totalBorrowed: 1580000,
    totalOutstanding: 0,
    totalRepaid: 1580000,
    paymentHistory: 'Excellent',
    defaultHistory: 0,
    firstLoanDate: '2021-09-12',
    lastLoanDate: '2023-05-12',
    status: 'Inactive',
  },
];

export const agentsData: AgentData[] = [
  {
    id: 'AGT-001',
    name: 'Marcus Thompson',
    company: 'Thompson Real Estate Finance',
    email: 'marcus@thompsonref.com',
    phone: '(512) 555-1234',
    location: 'Austin, TX',
    totalLoansOriginated: 12,
    activeLoans: 5,
    totalVolume: 2850000,
    totalFeesEarned: 142500,
    avgLoanSize: 237500,
    performanceRating: 'Excellent',
    defaultRate: 0.8,
    onboardingDate: '2022-03-15',
    lastOriginationDate: '2024-05-20',
    status: 'Active',
  },
  {
    id: 'AGT-002',
    name: 'Rachel Kim',
    company: 'West Coast Lending Group',
    email: 'rachel@wclg.com',
    phone: '(415) 555-2345',
    location: 'San Francisco, CA',
    totalLoansOriginated: 18,
    activeLoans: 7,
    totalVolume: 4250000,
    totalFeesEarned: 212500,
    avgLoanSize: 236111,
    performanceRating: 'Excellent',
    defaultRate: 0.5,
    onboardingDate: '2021-11-08',
    lastOriginationDate: '2024-06-05',
    status: 'Active',
  },
  {
    id: 'AGT-003',
    name: 'David Rodriguez',
    company: 'Gulf Coast Capital Advisors',
    email: 'david@gulfcoastcap.com',
    phone: '(713) 555-3456',
    location: 'Houston, TX',
    totalLoansOriginated: 8,
    activeLoans: 3,
    totalVolume: 1680000,
    totalFeesEarned: 84000,
    avgLoanSize: 210000,
    performanceRating: 'Good',
    defaultRate: 1.2,
    onboardingDate: '2023-01-22',
    lastOriginationDate: '2024-04-15',
    status: 'Active',
  },
  {
    id: 'AGT-004',
    name: 'Jennifer Martinez',
    company: 'Desert Capital Partners',
    email: 'jennifer@desertcap.com',
    phone: '(602) 555-4567',
    location: 'Phoenix, AZ',
    totalLoansOriginated: 15,
    activeLoans: 6,
    totalVolume: 3425000,
    totalFeesEarned: 171250,
    avgLoanSize: 228333,
    performanceRating: 'Excellent',
    defaultRate: 0.6,
    onboardingDate: '2022-08-10',
    lastOriginationDate: '2024-05-28',
    status: 'Active',
  },
  {
    id: 'AGT-005',
    name: 'Brian Foster',
    company: 'Southeast Mortgage Solutions',
    email: 'brian@semortgage.com',
    phone: '(404) 555-5678',
    location: 'Atlanta, GA',
    totalLoansOriginated: 10,
    activeLoans: 4,
    totalVolume: 2150000,
    totalFeesEarned: 107500,
    avgLoanSize: 215000,
    performanceRating: 'Good',
    defaultRate: 1.0,
    onboardingDate: '2022-06-18',
    lastOriginationDate: '2024-06-01',
    status: 'Active',
  },
  {
    id: 'AGT-006',
    name: 'Sarah Chen',
    company: 'Coastal Bridge Lending',
    email: 'sarah@coastalbridge.com',
    phone: '(305) 555-6789',
    location: 'Miami, FL',
    totalLoansOriginated: 22,
    activeLoans: 0,
    totalVolume: 5280000,
    totalFeesEarned: 264000,
    avgLoanSize: 240000,
    performanceRating: 'Excellent',
    defaultRate: 0.4,
    onboardingDate: '2021-05-12',
    lastOriginationDate: '2023-12-20',
    status: 'Inactive',
  },
];

export const capitalPartnersData: CapitalPartnerData[] = [
  {
    id: 'CP-001',
    name: 'Sunbelt Capital Partners',
    contactPerson: 'James Harrison',
    email: 'james@sunbeltcapital.com',
    phone: '(512) 555-7890',
    commitmentAmount: 5000000,
    deployedCapital: 4250000,
    availableCapital: 750000,
    utilizationRate: 85.0,
    totalLoansParticipated: 15,
    activeLoans: 8,
    totalReturns: 585000,
    avgIRR: 13.8,
    preferredLoanTypes: ['Bridge Loan', 'Ground-Up Construction', 'Fix & Flip'],
    riskTolerance: 'Moderate',
    onboardingDate: '2021-08-15',
    lastDeploymentDate: '2024-06-10',
    status: 'Active',
  },
  {
    id: 'CP-002',
    name: 'West Coast Fund',
    contactPerson: 'Linda Chen',
    email: 'linda@westcoastfund.com',
    phone: '(415) 555-8901',
    commitmentAmount: 7500000,
    deployedCapital: 6825000,
    availableCapital: 675000,
    utilizationRate: 91.0,
    totalLoansParticipated: 22,
    activeLoans: 12,
    totalReturns: 925000,
    avgIRR: 13.5,
    preferredLoanTypes: ['Fix & Flip', 'Rental Property', 'Commercial RE Bridge'],
    riskTolerance: 'Aggressive',
    onboardingDate: '2021-05-20',
    lastDeploymentDate: '2024-06-08',
    status: 'Active',
  },
  {
    id: 'CP-003',
    name: 'Regional Investment Group',
    contactPerson: 'Michael Torres',
    email: 'michael@regionalinvest.com',
    phone: '(713) 555-9012',
    commitmentAmount: 3000000,
    deployedCapital: 2100000,
    availableCapital: 900000,
    utilizationRate: 70.0,
    totalLoansParticipated: 9,
    activeLoans: 4,
    totalReturns: 285000,
    avgIRR: 13.6,
    preferredLoanTypes: ['Commercial RE Bridge', 'Bridge Loan'],
    riskTolerance: 'Conservative',
    onboardingDate: '2022-02-10',
    lastDeploymentDate: '2024-05-22',
    status: 'Active',
  },
  {
    id: 'CP-004',
    name: 'Prairie Capital LLC',
    contactPerson: 'Rebecca Martinez',
    email: 'rebecca@prairiecapital.com',
    phone: '(602) 555-0123',
    commitmentAmount: 4500000,
    deployedCapital: 3825000,
    availableCapital: 675000,
    utilizationRate: 85.0,
    totalLoansParticipated: 12,
    activeLoans: 6,
    totalReturns: 520000,
    avgIRR: 13.6,
    preferredLoanTypes: ['Ground-Up Construction', 'Fix & Flip', 'Bridge Loan'],
    riskTolerance: 'Moderate',
    onboardingDate: '2022-07-12',
    lastDeploymentDate: '2024-06-05',
    status: 'Active',
  },
  {
    id: 'CP-005',
    name: 'Atlantic Bridge Capital',
    contactPerson: 'Thomas Anderson',
    email: 'thomas@atlanticbridge.com',
    phone: '(404) 555-1234',
    commitmentAmount: 2500000,
    deployedCapital: 1875000,
    availableCapital: 625000,
    utilizationRate: 75.0,
    totalLoansParticipated: 7,
    activeLoans: 3,
    totalReturns: 245000,
    avgIRR: 13.1,
    preferredLoanTypes: ['Rental Property', 'Bridge Loan'],
    riskTolerance: 'Conservative',
    onboardingDate: '2023-01-15',
    lastDeploymentDate: '2024-05-18',
    status: 'Active',
  },
];
