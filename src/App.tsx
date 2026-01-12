import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LayoutNew } from './components/layout/LayoutNew';
import { privateFirmsNav } from './config/privateFirmsNav';
import { lendersNav } from './config/lendersNav';
import { borrowersNav } from './config/borrowersNav';
import { agentsNav } from './config/agentsNav';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';

// Private Firms Pages
import { DashboardPage } from './pages/private-firms/DashboardPage';
import { AnalyticsPage } from './pages/private-firms/AnalyticsPage';
import { AnalyticsTabPage } from './pages/private-firms/AnalyticsTabPage';
import { InsightsPage } from './pages/private-firms/InsightsPage';
import { LoansPage } from './pages/private-firms/LoansPage';
import { PaymentsPage } from './pages/private-firms/PaymentsPage';
import { DistributionsPage } from './pages/private-firms/DistributionsPage';
import { BorrowersPage } from './pages/private-firms/BorrowersPage';
import { AgentsPage } from './pages/private-firms/AgentsPage';
import { CapitalPage } from './pages/private-firms/CapitalPage';
import { ReportsPage } from './pages/private-firms/ReportsPage';

// Agent Portal Pages
import { AgentDashboard } from './pages/agents/AgentDashboard';
import { PipelinePage } from './pages/agents/PipelinePage';
import { CommissionsPage } from './pages/agents/CommissionsPage';
import { BorrowersPage as AgentBorrowersPage } from './pages/agents/BorrowersPage';
import { LenderNetworkPage } from './pages/agents/LenderNetworkPage';
import { DocumentsPage as AgentDocumentsPage } from './pages/agents/DocumentsPage';
import { CompliancePage } from './pages/agents/CompliancePage';
import { PerformancePage } from './pages/agents/PerformancePage';

// Borrower Portal Pages
import { BorrowerDashboardNew } from './pages/borrowers/BorrowerDashboardNew';
import { ProductsPage as BorrowerProductsPage } from './pages/borrowers/ProductsPage';
import { MyLoansPage } from './pages/borrowers/MyLoansPage';
import { PaymentsBillingPage } from './pages/borrowers/PaymentsBillingPage';
import { BorrowerDocumentsPage } from './pages/borrowers/BorrowerDocumentsPage';
import { ContactPage } from './pages/borrowers/ContactPage';

// Lender Portal Pages
import { CapitalSummaryPage } from './pages/lenders/CapitalSummaryPage';
import { MyCapitalPage } from './pages/lenders/MyCapitalPage';
import { LoansPage as LenderLoansPage } from './pages/lenders/LoansPage';
import { PaymentsPage as LenderPaymentsPage } from './pages/lenders/PaymentsPage';
import { ProductsPage } from './pages/lenders/ProductsPage';
import { PerformancePage as LenderPerformancePage } from './pages/lenders/PerformancePage';
import { RiskPage } from './pages/lenders/RiskPage';
import { StatementsPage } from './pages/lenders/StatementsPage';
import { DocumentsPage } from './pages/lenders/DocumentsPage';
import { SettingsPage } from './pages/lenders/SettingsPage';
import { SupportPage } from './pages/lenders/SupportPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Private Firms Portal */}
        <Route
          path="/private-firms/*"
          element={
            <LayoutNew navigation={privateFirmsNav}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/dashboard/analytics" element={<AnalyticsTabPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/loans" element={<LoansPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/distributions" element={<DistributionsPage />} />
                <Route path="/borrowers" element={<BorrowersPage />} />
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/capital" element={<CapitalPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route
                  path="/documents"
                  element={<div className="text-gray-600">Documents page coming soon</div>}
                />
                <Route
                  path="/settings"
                  element={<div className="text-gray-600">Settings page coming soon</div>}
                />
              </Routes>
            </LayoutNew>
          }
        />

        {/* Agents Portal */}
        <Route
          path="/agents/*"
          element={
            <LayoutNew navigation={agentsNav}>
              <Routes>
                <Route path="/" element={<AgentDashboard />} />
                <Route path="/pipeline" element={<PipelinePage />} />
                <Route path="/commissions" element={<CommissionsPage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/borrowers" element={<AgentBorrowersPage />} />
                <Route path="/lenders" element={<LenderNetworkPage />} />
                <Route path="/documents" element={<AgentDocumentsPage />} />
                <Route path="/compliance" element={<CompliancePage />} />
              </Routes>
            </LayoutNew>
          }
        />

        {/* Borrowers Portal */}
        <Route
          path="/borrowers/*"
          element={
            <LayoutNew navigation={borrowersNav}>
              <Routes>
                <Route path="/" element={<BorrowerDashboardNew />} />
                <Route path="/products" element={<BorrowerProductsPage />} />
                <Route path="/loans" element={<MyLoansPage />} />
                <Route path="/payments" element={<PaymentsBillingPage />} />
                <Route path="/documents" element={<BorrowerDocumentsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </LayoutNew>
          }
        />

        {/* Lenders Portal */}
        <Route
          path="/lenders/*"
          element={
            <LayoutNew navigation={lendersNav}>
              <Routes>
                <Route path="/" element={<CapitalSummaryPage />} />
                <Route path="/capital" element={<MyCapitalPage />} />
                <Route path="/loans" element={<LenderLoansPage />} />
                <Route path="/payments" element={<LenderPaymentsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/performance" element={<LenderPerformancePage />} />
                <Route path="/risk" element={<RiskPage />} />
                <Route path="/statements" element={<StatementsPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/support" element={<SupportPage />} />
              </Routes>
            </LayoutNew>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
