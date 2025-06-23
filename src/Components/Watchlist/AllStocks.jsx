import NavbarContent from "../NavbarContent";
import { useEffect } from "react";
import { useState } from "react";
export default function AllStocks(){
    const [userId,setUserId]=useState();
    const [allStocks, setAllStocks] = useState([]);
     const [loading, setLoading] = useState(true); // 🔁 NEW
    const [selectedStocks, setSelectedStocks] = useState([]);
    useEffect(() => {
    fetch("http://localhost:8080/getAllStocks", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stocks");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Stocks data:", data);  
        setAllStocks(data);
        console.log("All stocks:", allStocks);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Server error or invalid response.");
        setLoading(false); 
      });
       const storedUserId = localStorage.getItem("userId");
       if (storedUserId) setUserId(storedUserId);
  }, []);

  
const addToWatchlist = () => {
  if (!userId) {
    alert("User ID missing. Please log in again.");
    return;
  }
  const payload = {
    userId: parseInt(userId), 
    stocks: selectedStocks.map((stock) => ({
      symbol: stock.symbol,
      price: String(stock.price), 
      change: String(stock.change),
      percentChange: String(stock.percentChange)
    }))
  };

  console.log("Sending to backend:", payload);

  fetch("http://localhost:8080/addToWishlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
.then(async (response) => {
  if (!response.ok) {
    throw new Error("Failed to add to watchlist");
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    console.log("Response JSON:", data);
  } else {
    const text = await response.text();
    console.log("Response Text:", text);
  }

  alert("Successfully added to watchlist");
})
.catch((error) => {
  console.error("Error:", error);
  alert("Error adding to watchlist");
});

};

    const handleCheckboxChange = (stock) => {
    setSelectedStocks((prev) => {
      const exists = prev.find((s) => s.symbol === stock.symbol);
      if (exists) {
        // remove if already selected
        return prev.filter((s) => s.symbol !== stock.symbol);
      } else {
        // add new
        return [...prev, stock];
      }
    });
  };

  
    return (
    <>
      <NavbarContent />

      <div className="container">
        <h1 className="display-1 my-5">Add to Watchlist</h1>

        {/* 🔁 Loading Spinner */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div style={{ width: "95%", height: "55vh", overflowY: "auto" }}>
              <table className="table table-info table-striped table-hover table-bordered table-responsive mx-5">
                <thead>
                  <tr>
                    <th scope="col">Symbol</th>
                    <th scope="col">Price</th>
                    <th scope="col">Change</th>
                    <th scope="col">Percent Change</th>
                    <th scope="col">Add to Wishlist</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {allStocks.map((stock, index) => (
                    <tr key={index}>
                      <td>{stock.symbol}</td>
                      <td>{stock.price}</td>
                      <td>{stock.change}</td>
                      <td>{stock.percentChange}</td>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(stock)}
                          className="fs-5"
                        />{" "}
                        Add
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-center my-5">
              <button
                className="btn btn-primary rounded-2"
                onClick={addToWatchlist}
              >
                Add to WatchList
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}