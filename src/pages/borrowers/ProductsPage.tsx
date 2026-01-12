import { useState } from 'react';
import { Send, Sparkles, CheckCircle, TrendingUp, Clock, DollarSign, Building } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  description: string;
  interestRateRange: string;
  termLength: string;
  loanSizeRange: string;
  requirements: string[];
  availableFirms: string[];
  matchScore?: number;
  whyThisFits?: string[];
};

type ChatMessage = {
  id: string;
  from: 'user' | 'ai';
  content: string;
  timestamp: Date;
  matchedProducts?: Product[];
};

export const ProductsPage = () => {
  // Pre-rendered example conversation
  const exampleConversation: ChatMessage[] = [
    {
      id: '1',
      from: 'user',
      content: "I'm looking to flip a house in Miami. Need financing quick.",
      timestamp: new Date(),
    },
    {
      id: '2',
      from: 'ai',
      content: "Perfect! For a fix-and-flip in Miami, you'll want short-term bridge financing. Let me show you what matches best.\n\n**Here's why this fits:**\n\nThe 6-12 month term aligns with your flip timeline, and interest-only payments keep costs low during renovation. Our lenders can typically close in 2-3 weeks, and they're very active in the Miami market.",
      timestamp: new Date(),
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showExample, setShowExample] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [conversationContext, setConversationContext] = useState<{
    propertyType?: string;
    location?: string;
    purpose?: string;
    timeline?: string;
  }>({});

  // Mock products database
  const allProducts: Product[] = [
    {
      id: 'prod-bridge-001',
      name: 'Bridge Loan - Residential Fix & Flip',
      description: 'Short-term financing designed for residential property purchases and renovations with quick turnaround',
      interestRateRange: '8.5% - 11.5%',
      termLength: '6-12 months',
      loanSizeRange: '$250K - $5M',
      requirements: ['20% down payment', 'Credit score 680+', 'Clear exit strategy (resale or refinance)', 'Renovation budget & timeline'],
      availableFirms: ['Anchor Capital', 'Summit Lending', 'Gateway Fund'],
    },
    {
      id: 'prod-term-001',
      name: 'Term Loan - Stabilized Multifamily',
      description: 'Medium-term financing for cash-flowing multifamily properties with proven rental income',
      interestRateRange: '7.25% - 9.75%',
      termLength: '3-7 years',
      loanSizeRange: '$500K - $15M',
      requirements: ['1.25+ DSCR (debt service coverage ratio)', 'Credit score 700+', '90% occupancy rate', '2 years operating history'],
      availableFirms: ['Summit Lending', 'Pinnacle Finance'],
    },
    {
      id: 'prod-construction-001',
      name: 'Construction Loan - Ground-Up Development',
      description: 'Financing for new construction projects from land acquisition through completion and certificate of occupancy',
      interestRateRange: '9.0% - 12.0%',
      termLength: '12-18 months',
      loanSizeRange: '$1M - $20M',
      requirements: ['30% equity contribution', 'Proven development track record', 'Detailed budget & construction timeline', 'Licensed general contractor'],
      availableFirms: ['Pinnacle Finance', 'Gateway Fund'],
    },
    {
      id: 'prod-heloc-001',
      name: 'HELOC - Investment Property Equity Line',
      description: 'Flexible revolving line of credit secured by equity in your investment properties, draw as needed',
      interestRateRange: '7.5% - 10.5%',
      termLength: '5-10 years',
      loanSizeRange: '$50K - $2M',
      requirements: ['50% LTV maximum', 'Credit score 720+', 'Property generates positive cash flow', 'Reserves for 6 months payments'],
      availableFirms: ['Anchor Capital', 'Summit Lending'],
    },
    {
      id: 'prod-bridge-002',
      name: 'Bridge Loan - Commercial Property',
      description: 'Short-term financing for commercial property acquisition, repositioning, or lease-up',
      interestRateRange: '9.0% - 12.5%',
      termLength: '12-24 months',
      loanSizeRange: '$500K - $15M',
      requirements: ['25% down payment', 'Credit score 700+', 'Business plan for value-add strategy', 'Experience in commercial real estate'],
      availableFirms: ['Gateway Fund', 'Pinnacle Finance'],
    },
    {
      id: 'prod-term-002',
      name: 'Term Loan - Single Family Rental Portfolio',
      description: 'Long-term financing for portfolios of single-family rental properties with consistent cash flow',
      interestRateRange: '7.5% - 10.0%',
      termLength: '5-10 years',
      loanSizeRange: '$300K - $10M',
      requirements: ['Portfolio of 4+ properties', '1.2+ DSCR', 'Credit score 680+', 'Property management in place or plan'],
      availableFirms: ['Anchor Capital', 'Summit Lending', 'Gateway Fund'],
    },
  ];

  const handleStartChat = () => {
    setShowChat(true);
    setShowExample(false);
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      from: 'ai',
      content: "Hello! I can help narrow down the perfect product for your needs.\n\nJust describe your project in plain language - like 'I'm looking to flip a house in Miami' or 'I need financing for an apartment building' - and I'll filter these products and explain which ones match best.",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const handleTryExample = () => {
    setShowExample(false);
    // Show the example as a filtered result
    const bridgeProduct = allProducts.find(p => p.id === 'prod-bridge-001');
    if (bridgeProduct) {
      bridgeProduct.matchScore = 95;
      bridgeProduct.whyThisFits = [
        'Short 6-12 month term aligns perfectly with your flip timeline',
        'Interest-only payments keep costs low during renovation',
        'Quick funding process - typically 2-3 weeks to close',
        'Available in Miami from 3 experienced lenders',
      ];
      setFilteredProducts([bridgeProduct]);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      from: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with intelligent product matching
    setTimeout(() => {
      const input = currentInput.toLowerCase();
      let matchedProducts: Product[] = [];
      let aiResponse = '';
      const newContext = { ...conversationContext };

      // Extract context from conversation
      if (input.includes('miami') || input.includes('florida')) {
        newContext.location = 'Miami, FL';
      } else if (input.includes('new york') || input.includes('ny')) {
        newContext.location = 'New York, NY';
      } else if (input.includes('california') || input.includes('los angeles')) {
        newContext.location = 'California';
      }

      if (input.includes('fix') || input.includes('flip') || input.includes('renovate') || input.includes('rehab')) {
        newContext.purpose = 'fix-and-flip';
        newContext.propertyType = 'residential';
      } else if (input.includes('multifamily') || input.includes('apartment')) {
        newContext.propertyType = 'multifamily';
        newContext.purpose = 'rental-income';
      } else if (input.includes('construction') || input.includes('build') || input.includes('ground up')) {
        newContext.purpose = 'new-construction';
      } else if (input.includes('commercial') || input.includes('retail') || input.includes('office')) {
        newContext.propertyType = 'commercial';
      }

      if (input.includes('quick') || input.includes('short') || input.includes('6 month') || input.includes('fast')) {
        newContext.timeline = 'short-term';
      } else if (input.includes('long term') || input.includes('hold') || input.includes('permanent')) {
        newContext.timeline = 'long-term';
      }

      setConversationContext(newContext);

      // Smart product matching based on context
      if (newContext.purpose === 'fix-and-flip' || (input.includes('bridge') || input.includes('flip'))) {
        matchedProducts = allProducts.filter((p) => p.id === 'prod-bridge-001');
        setFilteredProducts(matchedProducts);
        const product = matchedProducts[0];
        product.matchScore = 95;
        product.whyThisFits = [
          'Short 6-12 month term aligns perfectly with your flip timeline',
          'Interest-only payments keep costs low during renovation',
          'Quick funding process - typically 2-3 weeks to close',
          `Available in ${newContext.location || 'your area'} from 3 experienced lenders`,
        ];

        aiResponse = `Great! Based on what you've shared about your fix-and-flip project${newContext.location ? ` in ${newContext.location}` : ''}, I've filtered to show the product that best matches your profile.\n\n**Here's why this fits you:**\n\nThe Bridge Loan for residential fix-and-flips is designed exactly for your situation. You'll get the short-term financing you need (6-12 months) with interest-only payments that won't eat into your renovation budget. Our lenders in this space have financed hundreds of flips and understand the business.\n\nCheck out the highlighted match below!`;
      } else if (newContext.propertyType === 'multifamily' || input.includes('multifamily') || input.includes('apartment')) {
        matchedProducts = allProducts.filter((p) => p.id === 'prod-term-001');
        setFilteredProducts(matchedProducts);
        const product = matchedProducts[0];
        product.matchScore = 92;
        product.whyThisFits = [
          'Lower rates (7.25-9.75%) compared to bridge loans for stable assets',
          'Longer 3-7 year terms provide stability and predictable payments',
          'Lenders value properties with consistent rental income',
          'Can refinance into permanent financing at maturity',
        ];

        aiResponse = `Perfect - multifamily properties are a great investment. Based on your interest in ${newContext.purpose === 'rental-income' ? 'generating rental income' : 'apartment buildings'}, I've filtered to show what matches:\n\n**Why this product fits your profile:**\n\nOur Term Loan for stabilized multifamily properties offers better rates than short-term options because these assets have proven cash flow. If your building is 90%+ occupied with good tenants, you'll qualify for the lower end of the rate range. The 3-7 year term gives you time to increase NOI before refinancing into permanent debt.\n\nSee the highlighted match below:`;
      } else if (newContext.purpose === 'new-construction' || input.includes('construction') || input.includes('build')) {
        matchedProducts = allProducts.filter((p) => p.id === 'prod-construction-001');
        setFilteredProducts(matchedProducts);
        const product = matchedProducts[0];
        product.matchScore = 90;
        product.whyThisFits = [
          'Funds released in draws as construction progresses',
          'Interest reserves built into loan - no payments during build',
          'Lenders review plans and budget to ensure feasibility',
          'Can convert to permanent financing at completion',
        ];

        aiResponse = `Construction financing is more complex, so let me break down how this works:\n\n**Why this construction loan fits:**\n\nThis isn't a lump sum - you'll get funds released in draws as you hit construction milestones (foundation, framing, MEP, etc.). The lender will inspect progress before each draw. Interest accrues but you don't make payments during construction, which preserves your cash flow for the build.\n\nYou'll need a detailed budget, timeline, and an experienced GC. Here's the filtered product:`;
      } else if (input.includes('line of credit') || input.includes('heloc') || input.includes('flexible') || input.includes('draw')) {
        matchedProducts = allProducts.filter((p) => p.id === 'prod-heloc-001');
        setFilteredProducts(matchedProducts);
        const product = matchedProducts[0];
        product.matchScore = 88;
        product.whyThisFits = [
          'Revolving credit line - borrow only what you need, when you need it',
          'Pay interest only on the amount drawn',
          'Great for investors managing multiple projects',
          'Lower rates than hard money or bridge loans',
        ];

        aiResponse = `A HELOC gives you maximum flexibility. Here's why it might be perfect for you:\n\n**Why this product fits:**\n\nInstead of a lump sum, you get a credit line backed by your property equity. Draw $50K for one project, pay it back, then draw $100K for another - you're only paying interest on what's actually outstanding. Many experienced investors use HELOCs as their main financing tool because it's so flexible and cost-effective.\n\nFiltered to show the HELOC option:`;
      } else if (newContext.propertyType === 'commercial' || input.includes('commercial')) {
        matchedProducts = allProducts.filter((p) => p.id === 'prod-bridge-002');
        setFilteredProducts(matchedProducts);
        const product = matchedProducts[0];
        product.matchScore = 87;
        product.whyThisFits = [
          'Designed for value-add commercial opportunities',
          'Longer 12-24 month terms for lease-up or repositioning',
          'Lenders understand commercial property dynamics',
          'Can refinance into permanent commercial mortgage',
        ];

        aiResponse = `Commercial properties have different dynamics than residential. Here's what I found:\n\n**Why this matches your needs:**\n\nThis bridge loan is specifically for commercial assets going through transition - maybe you're leasing up vacant space, converting use, or repositioning the asset. The 12-24 month term gives you time to stabilize occupancy before refinancing. Rates are higher than stabilized loans because of the transitional nature, but it's a path to permanent financing.\n\nFiltered to show the commercial bridge option:`;
      } else if (input.includes('rental') && (input.includes('portfolio') || input.includes('multiple') || input.includes('several'))) {
        matchedProducts = allProducts.filter((p) => p.id === 'prod-term-002');
        setFilteredProducts(matchedProducts);
        const product = matchedProducts[0];
        product.matchScore = 91;
        product.whyThisFits = [
          'Portfolio loan covers 4+ properties in one financing package',
          'Better rates than individual property loans',
          'Cross-collateralization spreads risk across portfolio',
          'Easier to manage than multiple separate loans',
        ];

        aiResponse = `Managing multiple rental properties? A portfolio loan makes life much easier:\n\n**Why this fits your situation:**\n\nInstead of separate loans for each property, you bundle 4 or more single-family rentals into one financing package. This means one payment, one lender relationship, and typically better rates than you'd get financing each property individually. The lender looks at your portfolio's combined cash flow and performance.\n\nFiltered to show the portfolio loan:`;
      } else {
        // Ask clarifying questions - show all products still
        setFilteredProducts([]);
        aiResponse = `Thanks for sharing that! I can help you narrow down the options. To filter these products to your specific needs, tell me a bit more:\n\n`;

        if (!newContext.propertyType) {
          aiResponse += `• **Property type**: Are you looking at residential (single-family or small multifamily), larger multifamily (apartments), or commercial property?\n\n`;
        }

        if (!newContext.purpose) {
          aiResponse += `• **Your plan**: Are you planning to flip/renovate and sell, hold for rental income, or build new construction?\n\n`;
        }

        if (!newContext.timeline) {
          aiResponse += `• **Timeline**: Do you need short-term financing (under 12 months) or longer-term (3+ years)?\n\n`;
        }

        if (!newContext.location) {
          aiResponse += `• **Location**: Where is the property located? Some products have geographic restrictions.\n\n`;
        }

        aiResponse += `The more specific you can be, the better I can match you with the right financing!`;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        from: 'ai',
        content: aiResponse,
        matchedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleApply = (product: Product) => {
    console.log('Applying for product:', product.id);
    // This would typically route to an application flow or contact agent
  };

  // Determine which products to show
  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : allProducts;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Borrower Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Find Your Product</h1>
        <p className="mt-2 text-base text-gray-600">
          Browse our financing products or use AI to find the perfect match for your project
        </p>
      </div>

      {/* Example Conversation Banner */}
      {showExample && !showChat && (
        <div className="rounded-lg border-2 border-compass-200 bg-gradient-to-br from-compass-50 to-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-compass-600" />
              <p className="font-medium text-gray-900">See AI Product Matching in Action</p>
            </div>
            <button
              onClick={handleStartChat}
              className="text-sm text-compass-600 hover:text-compass-700"
            >
              Start your own chat →
            </button>
          </div>

          {/* Example Conversation */}
          <div className="space-y-3">
            {exampleConversation.map((message) => (
              <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%]">
                  <div className="mb-1 flex items-center gap-2">
                    {message.from === 'user' ? (
                      <span className="text-xs text-gray-500">You</span>
                    ) : (
                      <span className="text-xs text-compass-600 font-medium">AI Assistant</span>
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.from === 'user'
                        ? 'bg-compass-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center justify-between rounded-lg bg-white border border-gray-200 p-3">
            <p className="text-sm text-gray-600">
              This example shows how our AI understands your needs and recommends products
            </p>
            <button
              onClick={handleTryExample}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700"
            >
              See Recommendation
            </button>
          </div>
        </div>
      )}

      {/* AI Helper Banner - After Example is Dismissed */}
      {!showExample && !showChat && (
        <div className="rounded-lg border border-compass-200 bg-compass-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Sparkles size={20} className="text-compass-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Need help choosing?</p>
                <p className="mt-1 text-sm text-gray-600">
                  Describe your project and I'll narrow down these products to what fits best.
                </p>
              </div>
            </div>
            <button
              onClick={handleStartChat}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-compass-600 px-4 py-2 text-sm font-medium text-white hover:bg-compass-700"
            >
              <Sparkles size={16} />
              Get AI Help
            </button>
          </div>
        </div>
      )}

      {/* AI Chat Interface */}
      {showChat && (
        <div className="rounded-lg border border-gray-200 bg-white">
          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.from === 'user' ? 'bg-compass-600 text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-gray-100 p-4">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Describe your financing needs..."
                className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="flex items-center gap-2 rounded-lg bg-compass-600 px-6 py-3 text-sm font-medium text-white hover:bg-compass-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                Send
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              The AI will filter the products below based on your description.
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-normal text-gray-900">
            {filteredProducts.length > 0 ? `${filteredProducts.length} Matching Products` : 'Available Products'}
          </h2>
          {filteredProducts.length > 0 && (
            <button
              onClick={() => {
                setFilteredProducts([]);
                setShowChat(false);
                setMessages([]);
              }}
              className="text-sm text-compass-600 hover:text-compass-700"
            >
              Clear filters · Show all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-lg border-2 bg-white p-6 transition-all ${
                product.matchScore
                  ? 'border-compass-300 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Match Score Badge */}
              {product.matchScore && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-compass-50 px-3 py-1.5">
                  <Sparkles size={16} className="text-compass-600" />
                  <span className="text-sm font-medium text-compass-700">
                    {product.matchScore}% Match
                  </span>
                </div>
              )}

              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{product.description}</p>

              {/* Why This Fits Section */}
              {product.whyThisFits && product.whyThisFits.length > 0 && (
                <div className="mt-4 rounded-lg bg-compass-50/50 p-3">
                  <p className="mb-2 text-xs font-medium text-gray-900">
                    Why this fits your profile:
                  </p>
                  <ul className="space-y-1.5">
                    {product.whyThisFits.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <TrendingUp size={14} className="text-compass-600 mt-0.5 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Details */}
              <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <DollarSign size={12} />
                    Interest Rate
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.interestRateRange}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={12} />
                    Term Length
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.termLength}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <TrendingUp size={12} />
                    Loan Size
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.loanSizeRange}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Building size={12} />
                    Lenders
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.availableFirms.length} firms
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-gray-900">Requirements:</p>
                <ul className="space-y-1.5">
                  {product.requirements.slice(0, 3).map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle size={14} className="text-success mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                  {product.requirements.length > 3 && (
                    <li className="text-xs text-gray-500">+ {product.requirements.length - 3} more</li>
                  )}
                </ul>
              </div>

              {/* Lenders */}
              <div className="mt-4">
                <p className="mb-2 text-xs text-gray-600">
                  Available from {product.availableFirms.length} lenders
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.availableFirms.map((firm, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {firm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center gap-2">
                <button
                  onClick={() => handleApply(product)}
                  className="flex-1 rounded-lg bg-compass-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-compass-700"
                >
                  Apply →
                </button>
                <button className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
