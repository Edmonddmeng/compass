import { useState } from 'react';
import { MessageSquare, HelpCircle, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';

type Ticket = {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdDate: string;
  lastUpdate: string;
  priority: 'low' | 'normal' | 'high';
};

type Message = {
  id: string;
  from: 'user' | 'support';
  content: string;
  timestamp: string;
};

export const SupportPage = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'new' | 'faq'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState<'low' | 'normal' | 'high'>('normal');

  // Mock ticket data
  const tickets: Ticket[] = [
    {
      id: 'TKT-2024-0012',
      subject: 'Question about June statement',
      status: 'resolved',
      createdDate: '2024-07-08T14:30:00Z',
      lastUpdate: '2024-07-09T10:15:00Z',
      priority: 'normal',
    },
    {
      id: 'TKT-2024-0011',
      subject: 'Update bank account information',
      status: 'in-progress',
      createdDate: '2024-07-05T09:00:00Z',
      lastUpdate: '2024-07-06T16:30:00Z',
      priority: 'high',
    },
    {
      id: 'TKT-2024-0010',
      subject: 'Request capital account statement',
      status: 'resolved',
      createdDate: '2024-06-28T11:20:00Z',
      lastUpdate: '2024-06-28T14:45:00Z',
      priority: 'normal',
    },
  ];

  // Mock messages for selected ticket
  const ticketMessages: Record<string, Message[]> = {
    'TKT-2024-0012': [
      {
        id: 'msg-1',
        from: 'user',
        content: 'I have a question about the fee breakdown on my June statement. Can you help explain the management fee calculation?',
        timestamp: '2024-07-08T14:30:00Z',
      },
      {
        id: 'msg-2',
        from: 'support',
        content: 'Thank you for reaching out. I\'d be happy to explain the management fee calculation. The management fee is calculated as 2% annually on deployed capital, charged quarterly. For June, your deployed capital averaged $37.5M, resulting in a quarterly fee of $187,500.',
        timestamp: '2024-07-08T15:45:00Z',
      },
      {
        id: 'msg-3',
        from: 'user',
        content: 'That makes sense. Thank you for the clear explanation!',
        timestamp: '2024-07-09T09:30:00Z',
      },
      {
        id: 'msg-4',
        from: 'support',
        content: 'You\'re welcome! I\'m marking this ticket as resolved. If you have any other questions, please don\'t hesitate to reach out.',
        timestamp: '2024-07-09T10:15:00Z',
      },
    ],
    'TKT-2024-0011': [
      {
        id: 'msg-1',
        from: 'user',
        content: 'I need to update my bank account information for distributions. What\'s the process?',
        timestamp: '2024-07-05T09:00:00Z',
      },
      {
        id: 'msg-2',
        from: 'support',
        content: 'I can help you with that. For security purposes, we\'ll need to verify your identity. I\'ve sent a verification email to your registered email address. Once you complete the verification, please provide the new account details.',
        timestamp: '2024-07-05T10:30:00Z',
      },
      {
        id: 'msg-3',
        from: 'user',
        content: 'Verification completed. New account: Chase Business Checking, Account #: 123456789, Routing #: 021000021',
        timestamp: '2024-07-06T14:15:00Z',
      },
      {
        id: 'msg-4',
        from: 'support',
        content: 'Thank you. I\'ve received your information and forwarded it to our operations team for processing. They will verify the account details and update your profile within 1-2 business days. You\'ll receive a confirmation email once complete.',
        timestamp: '2024-07-06T16:30:00Z',
      },
    ],
  };

  const handleSubmitTicket = () => {
    console.log('Submitting new ticket:', { newTicketSubject, newTicketMessage, newTicketPriority });
    // Reset form
    setNewTicketSubject('');
    setNewTicketMessage('');
    setNewTicketPriority('normal');
    setActiveTab('tickets');
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'text-info bg-blue-50';
      case 'in-progress':
        return 'text-warning bg-yellow-50';
      case 'resolved':
        return 'text-success bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-red-50';
      case 'normal':
        return 'text-gray-700 bg-gray-100';
      case 'low':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const faqs = [
    {
      question: 'How do I download my monthly statements?',
      answer: 'Navigate to Statements & Tax Documents from the main menu. You\'ll find all your monthly statements listed there with download buttons.',
    },
    {
      question: 'When will my capital be deployed?',
      answer: 'Capital deployment timing varies by product and firm. Typical deployment occurs within 14-30 days of commitment. You\'ll receive notifications when capital is deployed.',
    },
    {
      question: 'How are fees calculated?',
      answer: 'Fees are calculated based on your agreement terms. Platform fees are typically 1% of gross payments, and management fees are 2% annually on deployed capital, charged quarterly.',
    },
    {
      question: 'How do I update my bank account?',
      answer: 'For security reasons, bank account updates require identity verification. Please create a support ticket, and our team will guide you through the secure update process.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Support</h1>
        <p className="mt-2 text-base text-gray-600">
          Get help with secure messaging, view support tickets, and find answers to common questions
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <MessageSquare size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Secure Messaging</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">Create a Ticket</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <Mail size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email Support</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">support@compass.com</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-compass-50">
              <Phone size={20} className="text-compass-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">1-800-COMPASS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Content */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200">
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`border-b-2 pb-3 pt-4 text-sm font-medium transition-colors ${
                activeTab === 'tickets'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Tickets
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`border-b-2 pb-3 pt-4 text-sm font-medium transition-colors ${
                activeTab === 'new'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              New Ticket
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`border-b-2 pb-3 pt-4 text-sm font-medium transition-colors ${
                activeTab === 'faq'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* My Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-4">
              <h2 className="text-lg font-normal text-gray-900">Support Tickets</h2>
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                    onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-medium text-gray-900">{ticket.id}</span>
                          <span className={`inline-flex rounded px-2 py-1 text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <span className={`inline-flex rounded px-2 py-1 text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <p className="mt-2 font-medium text-gray-900">{ticket.subject}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Created: {format(new Date(ticket.createdDate), 'MMM dd, yyyy')} • Last update: {format(new Date(ticket.lastUpdate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>

                    {/* Ticket Messages */}
                    {selectedTicket === ticket.id && ticketMessages[ticket.id] && (
                      <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                        {ticketMessages[ticket.id].map((message) => (
                          <div
                            key={message.id}
                            className={`rounded-lg p-3 ${message.from === 'user' ? 'bg-compass-50 ml-8' : 'bg-gray-50 mr-8'}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-gray-700">
                                {message.from === 'user' ? 'You' : 'Support Team'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {format(new Date(message.timestamp), 'MMM dd, HH:mm')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900">{message.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Ticket Tab */}
          {activeTab === 'new' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-normal text-gray-900">Create New Ticket</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Our support team will respond within 24 hours
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Priority</label>
                  <select
                    value={newTicketPriority}
                    onChange={(e) => setNewTicketPriority(e.target.value as 'low' | 'normal' | 'high')}
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    placeholder="Brief description of your issue"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Message</label>
                  <textarea
                    value={newTicketMessage}
                    onChange={(e) => setNewTicketMessage(e.target.value)}
                    placeholder="Provide details about your question or issue"
                    rows={6}
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <button
                  onClick={handleSubmitTicket}
                  disabled={!newTicketSubject || !newTicketMessage}
                  className="rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-normal text-gray-900">Frequently Asked Questions</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Quick answers to common questions
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{faq.question}</p>
                        <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                  Can't find what you're looking for? <button onClick={() => setActiveTab('new')} className="font-medium text-compass-600 hover:text-compass-700">Create a support ticket</button> and we'll help you out.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
