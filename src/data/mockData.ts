export interface Loan {
  id: string;
  borrower: string;
  outstandingBalance: number;
  nextDueDate: string;
  daysLate: number;
  riskTier: 'Low' | 'Medium' | 'High';
  paymentStatus: 'Current' | 'Late' | 'Delinquent' | 'Pending';
}

export interface Payment {
  id: string;
  timestamp: string;
  borrower: string;
  amount: number;
  status: 'Pending' | 'Cleared' | 'Failed';
  linkedLoan: string;
  linkedDistribution?: string;
}

export const mockKPIs = {
  outstandingPrincipal: 4285000,
  fundsInCustody: 347500,
  paymentsReceived7d: 182400,
  distributionsPending: 156200,
  delinquentBalance: 89500,
  netYieldYTD: 0.127, // 12.7%
};

export const mockLoans: Loan[] = [
  {
    id: 'LN-2024-001',
    borrower: 'Sarah Martinez',
    outstandingBalance: 125000,
    nextDueDate: '2024-01-15',
    daysLate: 5,
    riskTier: 'Medium',
    paymentStatus: 'Late',
  },
  {
    id: 'LN-2024-002',
    borrower: 'Michael Chen',
    outstandingBalance: 87500,
    nextDueDate: '2024-01-18',
    daysLate: 0,
    riskTier: 'Low',
    paymentStatus: 'Current',
  },
  {
    id: 'LN-2024-003',
    borrower: 'Jennifer Williams',
    outstandingBalance: 210000,
    nextDueDate: '2024-01-12',
    daysLate: 12,
    riskTier: 'High',
    paymentStatus: 'Delinquent',
  },
  {
    id: 'LN-2024-004',
    borrower: 'Robert Johnson',
    outstandingBalance: 156000,
    nextDueDate: '2024-01-20',
    daysLate: 0,
    riskTier: 'Low',
    paymentStatus: 'Current',
  },
  {
    id: 'LN-2024-005',
    borrower: 'Lisa Anderson',
    outstandingBalance: 93000,
    nextDueDate: '2024-01-16',
    daysLate: 3,
    riskTier: 'Medium',
    paymentStatus: 'Late',
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    timestamp: '2024-01-11T14:32:00',
    borrower: 'Sarah Martinez',
    amount: 5200,
    status: 'Cleared',
    linkedLoan: 'LN-2024-001',
    linkedDistribution: 'DIST-2024-001',
  },
  {
    id: 'PAY-002',
    timestamp: '2024-01-11T12:15:00',
    borrower: 'Michael Chen',
    amount: 3650,
    status: 'Cleared',
    linkedLoan: 'LN-2024-002',
    linkedDistribution: 'DIST-2024-001',
  },
  {
    id: 'PAY-003',
    timestamp: '2024-01-11T10:45:00',
    borrower: 'Robert Johnson',
    amount: 6500,
    status: 'Pending',
    linkedLoan: 'LN-2024-004',
  },
  {
    id: 'PAY-004',
    timestamp: '2024-01-11T09:20:00',
    borrower: 'Jennifer Williams',
    amount: 8750,
    status: 'Failed',
    linkedLoan: 'LN-2024-003',
  },
  {
    id: 'PAY-005',
    timestamp: '2024-01-10T16:30:00',
    borrower: 'Lisa Anderson',
    amount: 3875,
    status: 'Cleared',
    linkedLoan: 'LN-2024-005',
    linkedDistribution: 'DIST-2024-002',
  },
];

export const mockMoneyFlow = {
  received: 842000,
  distributed: 791300,
  platformFees: 36200,
  agentFees: 0,
  pending: 14500,
};
