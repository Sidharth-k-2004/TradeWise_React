import Navbar from "../Navbar";

export default function KnowMore() {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="card shadow border-0 rounded-4 overflow-hidden">
          <div className="row g-0">
            {/* Left Image Section */}
            <div className="col-lg-4 d-none d-lg-block">
              <img
                src="Images/knowmore.jpg"
                className="img-fluid h-100 w-100 object-fit-cover"
                alt="Stock Market Illustration"
              />
            </div>

            <div className="col-lg-8 p-4">
              <h2 className="text-primary mb-3 display-2">
                Know More About the Stock Market & Trade-Wise
              </h2>
              <p className="text-muted fs-4" >
                The stock market is a powerful engine of wealth creation.
                It represents ownership in companies and reflects the performance
                of the global economy. With Trade-Wise, navigating this dynamic space becomes easier.
              </p>

              <ul className="list-unstyled mb-3">
                <li className="mb-2">
                  <i className="bi bi-graph-up-arrow text-success me-2"></i>
                  <strong>Investment Growth:</strong> Stocks have historically outperformed savings and bonds over time.
                </li>
                <li className="mb-2">
                  <i className="bi bi-bar-chart-line-fill text-info me-2"></i>
                  <strong>Market Indicators:</strong> Stay updated with key indices like NIFTY 50, SENSEX, and NASDAQ.
                </li>
                <li className="mb-2">
                  <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                  <strong>Smart Decisions:</strong> Use insights, charts, and analytics for informed trading.
                </li>
              </ul>

              {/* Collapsible Extra Info */}
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="collapse"
                data-bs-target="#moreMarketInfo"
              >
                Learn More
              </button>

              <div className="collapse mt-4" id="moreMarketInfo">
                <div className="card card-body bg-light border-0">
                  <h5 className="fw-semibold text-secondary mb-3">More About Trade-Wise</h5>
                  <ul className="ps-3 mb-0 text-muted bg-light">
                    <li className="mb-2">📊 Real-time stock tracking</li>
                    <li className="mb-2">📈 Portfolio growth and performance visualization</li>
                    <li className="mb-2">🔍 Trade behavior insights and custom reports</li>
                    <li className="mb-2">✅ User friendly interface</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
