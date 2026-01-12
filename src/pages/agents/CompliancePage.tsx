import { Shield, CheckCircle, Clock, Lock, Download } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProgressBar } from '../../components/common/ProgressBar';

type RequiredAction = {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

type Certification = {
  id: string;
  name: string;
  status: 'active' | 'expiring' | 'expired';
  expiryDate: string;
};

export const CompliancePage = () => {
  const complianceScore = 98;

  const requiredActions: RequiredAction[] = [
    { id: '1', description: 'Complete monthly training', dueDate: '01/31/25', completed: false },
    { id: '2', description: 'Submit December audit report', dueDate: '01/10/25', completed: true },
    { id: '3', description: 'Renew NMLS license', dueDate: '12/31/25', completed: true },
  ];

  const certifications: Certification[] = [
    { id: '1', name: 'NMLS License', status: 'active', expiryDate: '12/31/25' },
    { id: '2', name: 'AML Training', status: 'active', expiryDate: '06/15/25' },
    { id: '3', name: 'Fair Lending Certification', status: 'expiring', expiryDate: '01/30/25' },
  ];

  const pendingActions = requiredActions.filter(a => !a.completed).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Compliance Dashboard</h1>
        <p className="mt-2 text-base text-gray-600">Stay compliant with regulatory requirements</p>
      </div>

      {/* Compliance Score */}
      <div className="rounded-lg border-2 border-compass-200 bg-gradient-to-br from-compass-50 to-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-compass-600 bg-white">
              <div className="text-center">
                <p className="text-4xl font-normal text-compass-700">{complianceScore}%</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-normal text-gray-900">Compliance Score</h2>
              <div className="mt-2 flex items-center gap-2">
                <StatusBadge variant="success">On Track</StatusBadge>
                <p className="text-sm text-gray-600">{pendingActions} actions pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Required Actions */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-normal text-gray-900">Required Actions</h2>
        <div className="space-y-3">
          {requiredActions.map((action) => (
            <div
              key={action.id}
              className={`flex items-start gap-3 rounded-lg border p-4 ${
                action.completed ? 'border-compass-200 bg-compass-50/30' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex-shrink-0">
                {action.completed ? (
                  <CheckCircle size={20} className="text-success" />
                ) : (
                  <div className="h-5 w-5 rounded border-2 border-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${action.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {action.description}
                </p>
                <p className="mt-1 text-xs text-gray-500">Due: {action.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training & Certifications */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-normal text-gray-900">Training & Certifications</h2>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className={cert.status === 'active' ? 'text-success' : 'text-warning'} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">Expires: {cert.expiryDate}</p>
                </div>
              </div>
              {cert.status === 'active' ? (
                <StatusBadge variant="success">Active</StatusBadge>
              ) : (
                <StatusBadge variant="warning">Expiring Soon</StatusBadge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Audit Trail</h2>
            <p className="mt-1 text-sm text-gray-600">All loan actions logged with timestamps</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export Audit Log
          </button>
        </div>
        <div className="space-y-3">
          {[
            { action: 'Loan BL-1001 created', time: '2 hours ago' },
            { action: 'Documents uploaded for BL-0982', time: '5 hours ago' },
            { action: 'Loan BL-0975 submitted to underwriting', time: '1 day ago' },
            { action: 'Commission processed for TL-0856', time: '2 days ago' },
          ].map((entry, idx) => (
            <div key={idx} className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0">
              <Lock size={14} className="text-compass-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{entry.action}</p>
                <p className="mt-0.5 text-xs text-gray-500">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
