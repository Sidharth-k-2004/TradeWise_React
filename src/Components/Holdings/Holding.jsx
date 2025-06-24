// import { useEffect, useState } from "react";
// import NavbarContent from "../NavbarContent";
// import Wishlist from "../Wishlist/Wishlist";

// export default function Holding() {
//     const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   const [holdings, setHoldings] = useState([]);
//   const [loading, setLoading] = useState(true); // ✅ Loading state
//   const [wishlistChanged, setWishlistChanged] = useState(false);
//     const handleWishlistChange = () => {
//     setWishlistChanged(prev => !prev); // ✅ toggle to trigger useEffect
//   };

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.error("User ID not found in localStorage.");
//       alert("User ID not found. Please log in again.");
//       return;
//     }

//     fetch(`${BACKEND_URL}/holdings/${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch holdings");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Holdings data:", data);
//         setHoldings(data);
//         setLoading(false); // ✅ stop loading
//       })
//       .catch((error) => {
//         console.error("Error fetching holdings:", error);
//         alert("Failed to fetch holdings. Please try again later.");
//         setLoading(false); // ✅ even on error
//       });
//   }, [wishlistChanged]);

//   return (
//     <>
//       <NavbarContent />
//       <div className="fluid-container">
//         <div className="row gx-5">
//           <Wishlist onWishlistChange={handleWishlistChange} />
//           <div className="col-8 border">
//             <div className="display-2 my-5">Hey User!!</div>

//             {loading ? (
//               <div className="text-center my-5">
//                 <div className="spinner-border text-success" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : (
//               <div style={{ width: "95%", height: "60vh", overflowY: "auto" }}>
//                 <table className="table table-success table-striped table-hover table-bordered table-responsive mx-5">
//                   <thead>
//                     <tr>
//                       <th scope="col">Stocks</th>
//                       <th scope="col">Quantity</th>
//                       <th scope="col">Bought Price</th>
//                       <th scope="col">Total Invested Price</th>
//                       <th scope="col">Current Price</th>
//                       <th scope="col">Total Holdings Price</th>
//                       <th scope="col">P & L</th>
//                       <th scope="col">Purchase Date</th>
//                     </tr>
//                   </thead>
//                   <tbody className="table-group-divider">
//                     {holdings.map((holding) => (
//                       <tr key={`${holding.stock}-${holding.purchaseDate}`}>
//                         <td>{holding.stock}</td>
//                         <td>{holding.quantity}</td>
//                         <td>{holding.buyPrice}</td>
//                         <td>
//                           {(holding.buyPrice * holding.quantity).toFixed(2)}
//                         </td>
//                         <td>{holding.currentPrice}</td>
//                         <td>
//                           {(holding.currentPrice * holding.quantity).toFixed(2)}
//                         </td>
//                         <td>
//                           {(
//                             holding.currentPrice * holding.quantity -
//                             holding.buyPrice * holding.quantity
//                           ).toFixed(2)}
//                         </td>
//                         <td>
//                           {new Date(
//                             holding.purchaseDate
//                           ).toLocaleDateString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import NavbarContent from "../NavbarContent";
import Wishlist from "../Wishlist/Wishlist";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Holding() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistChanged, setWishlistChanged] = useState(false);

  const handleWishlistChange = () => {
    setWishlistChanged((prev) => !prev);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      alert("User ID not found. Please log in again.");
      return;
    }

    fetch(`${BACKEND_URL}/holdings/${userId}`, {
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
        alert("Failed to fetch holdings. Please try again later.");
        setLoading(false);
      });
  }, [wishlistChanged]);

  const chartData = holdings.map((holding) => ({
    stock: holding.stock,
    invested: holding.buyPrice * holding.quantity,
    current: holding.currentPrice * holding.quantity,
  }));

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
              <>
                <div style={{ width: "95%", height: 300 }} className="mx-5 my-4">
                  <h4>Total Investment vs. Current Value</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stock" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="invested" fill="#82ca9d" name="Invested Value" />
                      <Bar dataKey="current" fill="#8884d8" name="Current Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

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
                        <tr key={`${holding.stock}-${holding.purchaseDate}`}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
