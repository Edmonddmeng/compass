import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500">Borrower Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Contact</h1>
        <p className="mt-2 text-base text-gray-600">Connect with your agent and get support</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-normal text-gray-900">Your Assigned Agent</h2>
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-compass-100"></div>
          <div className="flex-1">
            <p className="text-lg font-medium text-gray-900">Sarah Johnson</p>
            <p className="text-sm text-gray-600">Senior Loan Officer</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700">
                <MessageSquare size={16} />
                Send Message
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Phone size={16} />
                Call
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Calendar size={16} />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <Phone size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">(555) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <Mail size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">sarah.j@firm.com</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <MessageSquare size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Response Time</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-normal text-gray-900">Send a Message</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Subject</label>
            <input
              type="text"
              placeholder="What do you need help with?"
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Message</label>
            <textarea
              rows={6}
              placeholder="Type your message here..."
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <button className="rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};
