export const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="card">
        <h2 className="text-3xl font-bold mb-4">Welcome to Compass</h2>
        <p className="text-gray-600 mb-6">
          Your enterprise-grade fintech platform for small to medium traditional lending firms.
        </p>
        <button className="btn-primary">Get Started</button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Loan Management</h3>
          <p className="text-gray-600">
            Streamline your loan origination and servicing processes.
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
          <p className="text-gray-600">
            Advanced analytics and risk evaluation tools for informed decisions.
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Compliance</h3>
          <p className="text-gray-600">
            Stay compliant with automated regulatory reporting and monitoring.
          </p>
        </div>
      </section>
    </div>
  );
};
