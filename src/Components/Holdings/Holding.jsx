import { useEffect, useState } from "react";
import NavbarContent from "../NavbarContent";
import Wishlist from "../Wishlist/Wishlist";

export default function Holding() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [wishlistChanged, setWishlistChanged] = useState(false);
    const handleWishlistChange = () => {
    setWishlistChanged(prev => !prev); // ✅ toggle to trigger useEffect
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      alert("User ID not found. Please log in again.");
      return;
    }

    fetch(`http://localhost:8080/holdings/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch holdings");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Holdings data:", data);
        setHoldings(data);
        setLoading(false); // ✅ stop loading
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
        alert("Failed to fetch holdings. Please try again later.");
        setLoading(false); // ✅ even on error
      });
  }, [wishlistChanged]);

  return (
    <>
      <NavbarContent />
      <div className="fluid-container">
        <div className="row gx-5">
          <Wishlist onWishlistChange={handleWishlistChange} />
          <div className="col-8 border">
            <div className="display-2 my-5">Hey User!!</div>

            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div style={{ width: "95%", height: "60vh", overflowY: "auto" }}>
                <table className="table table-success table-striped table-hover table-bordered table-responsive mx-5">
                  <thead>
                    <tr>
                      <th scope="col">Stocks</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Bought Price</th>
                      <th scope="col">Total Invested Price</th>
                      <th scope="col">Current Price</th>
                      <th scope="col">Total Holdings Price</th>
                      <th scope="col">P & L</th>
                      <th scope="col">Purchase Date</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {holdings.map((holding) => (
                      <tr key={holding.stockSymbol}>
                        <td>{holding.stock}</td>
                        <td>{holding.quantity}</td>
                        <td>{holding.buyPrice}</td>
                        <td>
                          {(holding.buyPrice * holding.quantity).toFixed(2)}
                        </td>
                        <td>{holding.currentPrice}</td>
                        <td>
                          {(holding.currentPrice * holding.quantity).toFixed(2)}
                        </td>
                        <td>
                          {(
                            holding.currentPrice * holding.quantity -
                            holding.buyPrice * holding.quantity
                          ).toFixed(2)}
                        </td>
                        <td>
                          {new Date(
                            holding.purchaseDate
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
