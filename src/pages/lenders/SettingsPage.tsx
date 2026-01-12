import { useState } from 'react';
import { User, Bell, CreditCard, Shield, Check } from 'lucide-react';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'banking' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  // Mock user data
  const [profileData, setProfileData] = useState({
    fullName: 'John Anderson',
    email: 'john.anderson@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Anderson Family Trust',
    address: '123 Investment Way, Suite 400',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    monthlyStatements: true,
    paymentReceived: true,
    capitalDeployment: true,
    documentsAdded: true,
    performanceReports: false,
    riskAlerts: true,
    productUpdates: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    console.log('Settings saved');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Settings</h1>
        <p className="mt-2 text-base text-gray-600">
          Manage your account preferences, notifications, and security settings
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200">
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 border-b-2 pb-3 pt-4 text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={16} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2 border-b-2 pb-3 pt-4 text-sm font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell size={16} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('banking')}
              className={`flex items-center gap-2 border-b-2 pb-3 pt-4 text-sm font-medium transition-colors ${
                activeTab === 'banking'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <CreditCard size={16} />
              Banking
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 border-b-2 pb-3 pt-4 text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield size={16} />
              Security
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-normal text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-500">
                  View your profile details. Contact support to update.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Company/Entity</label>
                  <input
                    type="text"
                    value={profileData.company}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700">Address</label>
                  <input
                    type="text"
                    value={profileData.address}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">City</label>
                  <input
                    type="text"
                    value={profileData.city}
                    disabled
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700">State</label>
                    <input
                      type="text"
                      value={profileData.state}
                      disabled
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      value={profileData.zipCode}
                      disabled
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                  Profile information is locked for security. To update your profile details, please contact support.
                </p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-normal text-gray-900">Notification Preferences</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Choose which notifications you'd like to receive
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(notificationPreferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {key === 'monthlyStatements' && 'Receive monthly account statements'}
                        {key === 'paymentReceived' && 'Notification when payments are received'}
                        {key === 'capitalDeployment' && 'Alerts when capital is deployed'}
                        {key === 'documentsAdded' && 'Notification when new documents are added'}
                        {key === 'performanceReports' && 'Quarterly performance summaries'}
                        {key === 'riskAlerts' && 'Alerts about portfolio risk changes'}
                        {key === 'productUpdates' && 'Information about new products'}
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotificationPreferences({ ...notificationPreferences, [key]: e.target.checked })
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-compass-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                className="rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700"
              >
                Save Preferences
              </button>
            </div>
          )}

          {/* Banking Tab */}
          {activeTab === 'banking' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-normal text-gray-900">Linked Bank Accounts</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Accounts used for distributions and payments
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
                        <CreditCard size={20} className="text-compass-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Chase Business Checking</p>
                        <p className="mt-1 text-sm text-gray-600">Account ending in ****4892</p>
                        <p className="mt-0.5 text-xs text-gray-500">Primary account for distributions</p>
                      </div>
                    </div>
                    <span className="inline-flex rounded bg-success/10 px-2 py-1 text-xs font-medium text-success">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                  To add or modify bank accounts, please contact support for security verification.
                </p>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-normal text-gray-900">Security Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your account security and active sessions
                </p>
              </div>

              <div className="space-y-6">
                {/* Two-Factor Authentication */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <Check size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="mt-1 text-sm text-gray-600">Enabled via SMS to phone ending in **4567</p>
                      </div>
                    </div>
                    <span className="inline-flex rounded bg-success/10 px-2 py-1 text-xs font-medium text-success">
                      Active
                    </span>
                  </div>
                </div>

                {/* Active Sessions */}
                <div>
                  <h3 className="mb-3 font-medium text-gray-900">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Current Session</p>
                          <p className="mt-1 text-sm text-gray-600">Chrome on macOS</p>
                          <p className="mt-0.5 text-xs text-gray-500">New York, NY • Last active: Just now</p>
                        </div>
                        <span className="text-xs text-gray-500">This device</span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">iPad</p>
                          <p className="mt-1 text-sm text-gray-600">Safari on iOS</p>
                          <p className="mt-0.5 text-xs text-gray-500">New York, NY • Last active: 2 days ago</p>
                        </div>
                        <button className="text-sm font-medium text-error hover:text-error/80">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {saved && (
            <div className="fixed bottom-8 right-8 rounded-lg border border-success bg-success/10 px-4 py-3 text-sm text-success">
              Settings saved successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
