
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Wishlist({ onWishlistChange }) {
  const [wishlistStocks, setWishlistStocks] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [holdings, setHoldings] = useState([]); // ✅ owned holdings
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [wishlistChanged, setWishlistChanged] = useState(false);

  // ✅ Fetch Wishlist
  useEffect(() => {
    const getWishlistedStocks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wishlist/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch wishlist stocks");
        const data = await response.json();
        setWishlistStocks(data);
      } catch (error) {
        console.error("Error fetching wishlist stocks:", error);
        alert("Failed to fetch wishlist stocks. Please try again later.");
      }
    };
    getWishlistedStocks();
  }, [wishlistChanged]);

  // ✅ Fetch Holdings
  useEffect(() => {
    const getHoldings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/holdings/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch holdings");
        const data = await response.json();
        setHoldings(data);
      } catch (error) {
        console.error("Error fetching holdings:", error);
        alert("Failed to fetch holdings. Please try again later.");
      }
    };
    getHoldings();
  }, [refreshTrigger]);

  const pieData = holdings.map((stock) => ({
    name: stock.stock,
    value: stock.buyPrice * stock.quantity,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

  const handleWishlistChange = () => {
    setWishlistChanged((prev) => !prev);
  };

  const openBuyModal = (stock) => {
    setSelectedStock(stock);
    setQuantity(1);
    setShowModal(true);
  };

  const openSellModal = (stock) => {
    setSelectedStock(stock);
    setSellQuantity(1);
    setShowSellModal(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const searchQuery = event.target.value.trim();
      if (searchQuery) {
        fetch(`http://localhost:8080/stocks/${searchQuery}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to search stocks");
            return response.json();
          })
          .then((data) => setSearchData(data))
          .catch((error) => {
            console.error("Error searching stocks:", error);
            alert("Failed to search stocks. Please try again later.");
          });
      }
    }
  };

  const handleConfirmSell = () => {
    const payload = {
      userId: parseInt(userId),
      symbol: selectedStock.symbol,
      quantity: parseInt(sellQuantity),
    };

    fetch("http://localhost:8080/sellStock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) return res.text().then((text) => { throw new Error(text); });
        return res.text();
      })
      .then((data) => {
        alert(data);
        setShowSellModal(false);
        setRefreshTrigger((prev) => !prev);
        if (onWishlistChange) onWishlistChange();
      })
      .catch((err) => {
        alert("Failed to sell stock: " + err.message);
      });
  };

  const handleConfirmBuy = () => {
    const payload = {
      userId: parseInt(userId),
      stocks: [
        {
          symbol: selectedStock.symbol,
          price: parseFloat(selectedStock.price),
          percentChange: selectedStock.percentChange,
          quantity: parseInt(quantity),
        },
      ],
    };

    fetch("http://localhost:8080/addToOwnedStock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) return res.text().then((text) => { throw new Error(text); });
        return res.text();
      })
      .then((data) => {
        alert(data);
        setShowModal(false);
        setRefreshTrigger((prev) => !prev);
        if (onWishlistChange) onWishlistChange();
      })
      .catch((err) => {
        alert("Failed to buy stock: " + err.message);
      });
  };

  return (
    <div className="col-4 border" style={{ height: "100vh" }}>
      <div className="container my-5 mx-3">
        <input
          type="text"
          placeholder=" 🔍Search Your Stocks"
          className="form-control w-75 fw-bold bg-light"
          onKeyDown={handleKeyPress}
        />
        {searchData && (
          <h1>
            <span className="text-success display-5 my-5 d-block">
              {searchData.symbol} &nbsp; {searchData.price} &nbsp;{" "}
              {searchData.percentChange}
            </span>
          </h1>
        )}
        <h1 className="display-5 my-5 d-block" style={{ marginLeft: "20%" }}>
          WatchList
        </h1>
        <div style={{ width: "100%", height: "40vh", overflowY: "auto", overflowX: "hidden", marginRight: "5%" }}>
          <table className="table table-info table-striped table-hover table-bordered table-responsive mx-3">
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Price</th>
                <th scope="col">Percent Change</th>
                <th scope="col">Buy or Sell</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {wishlistStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.price}</td>
                  <td>{stock.percentChange}</td>
                  <td>
                    <button className="btn btn-success mx-2" onClick={() => openBuyModal(stock)}>Buy</button>
                    <button className="btn btn-danger mx-2" onClick={() => openSellModal(stock)}>Sell</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Pie Chart */}
        <div className="my-5 d-flex justify-content-center">
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* ✅ Buy Modal */}
      {showModal && selectedStock && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          background: "white", padding: "30px", borderRadius: "10px", zIndex: 1000, boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}>
          <h3>Buy {selectedStock.symbol}</h3>
          <p>Price: ₹{selectedStock.price}</p>
          <input type="number" className="form-control my-2" min={1} value={quantity || ""} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleConfirmBuy}>Confirm</button>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* ✅ Sell Modal */}
      {showSellModal && selectedStock && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          background: "white", padding: "30px", borderRadius: "10px", zIndex: 1000, boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}>
          <h3>Sell {selectedStock.symbol}</h3>
          <p>Current Price: ₹{selectedStock.price}</p>
          <input type="number" className="form-control my-2" min={1} value={sellQuantity || ""} onChange={(e) => setSellQuantity(parseInt(e.target.value))} />
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={handleConfirmSell}>Confirm Sell</button>
            <button className="btn btn-secondary" onClick={() => setShowSellModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
