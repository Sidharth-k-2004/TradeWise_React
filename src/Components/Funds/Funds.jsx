import NavbarContent from "../NavbarContent";
import Wishlist from "../Wishlist/Wishlist";
import { useEffect, useState } from "react";
export default function Funds() {  
    const [AddFunds, setAddFunds] = useState(false);
    const [WithdrawFunds, setWithdrawFunds] = useState(false);
    const [Funds, setFunds] = useState(0);
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log("User ID from storage:", userId);
        if (userId) {
            fetch(`http://localhost:8080/myFunds`, {
                method: "Post",
                body: JSON.stringify({ userId: userId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })  
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch funds");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Funds data:", data);
                setFunds(data);
            })  
            .catch((error) => {
                console.error("Error fetching funds:", error);
                alert("Failed to fetch funds. Please try again later.");
            });
        } else {
            console.error("User ID not found in localStorage.");
            alert("User ID not found. Please log in again.");
        }
    }, []);
    const transaction = (type, amount) => {
    console.log("Transaction type:", type);
    console.log("Transaction amount:", amount);

    fetch("http://localhost:8080/transaction", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        userId: parseInt(localStorage.getItem("userId")),
        amount: parseFloat(amount),
        type: type.toLowerCase(), // must be 'add' or 'withdraw'
        }),
    })
        .then((res) => {
        if (!res.ok) throw new Error("Transaction failed");
        return res.json();
        })
        .then((data) => {
        console.log("Transaction success:", data);
        })
        .catch((err) => {
        console.error("Transaction error:", err);
        alert("Transaction failed.");
        });
};

    const handleWithdrawFunds = () => {
        setWithdrawFunds(true);
    };

    const handleAddFunds = () => {
        setAddFunds(true);
    };
    const confirmWithdraw = () => {
        const amount = parseFloat(document.querySelector('input[type="number"]').value);
        if (amount > Funds) {
            alert("Insufficient funds to withdraw.");
            setWithdrawFunds(false);
        } else {
            setFunds(Funds - amount);
            setWithdrawFunds(false);
            transaction("withdraw", amount);  
            alert("Funds withdrawn successfully!");
        }
    };
    const confirmAddFunds = () => {
        const amount = parseFloat(document.getElementById('add-input').value);      
        if (amount <= 0 || isNaN(amount)) {
            alert("Please enter a valid amount to add.");
            setAddFunds(false);
        } else {
            setFunds(Funds + amount);
            setAddFunds(false);
            transaction("add", amount);  
            alert("Funds added successfully!");
        }
        };
    return(
        <div>
            <NavbarContent/>
            <div className="fluid-container">
                <div className="row gx-5">
                    <Wishlist/>
                    <div className="col-8 border">
                        <div className="display-2 my-5">
                            Hey User!!
                        </div>
                        <div className="border-1 bg-light my-5 p-5 " style={{height:"30vh",width:"80%"}}>
                            {AddFunds && 
                                <div style={{zIndex: 1000,height:"50vh",width:"80vh", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)"}}>
                                    <h1 className="display-2 "  style={{fontFamily:'Poppins'}}>Add Funds Section</h1>
                                    <p className="display-5 text-muted ">Enter the amount you want to add:</p>
                                    <input type="number" className="form-control fs-5 my-5" id="add-input" placeholder="Enter amount" />
                                    <button className="btn btn-primary mx-auto d-block fs-5" onClick={confirmAddFunds}>Confirm</button>
                                </div>
                            }
                            {WithdrawFunds && 
                                <div className="bg-light" style={{zIndex: 1000,height:"50vh",width:"80vh", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)"}}>
                                    <h1 className="display-2 " style={{fontFamily:'Poppins'}}>Withdraw Funds Section</h1>
                                    <p className="display-5 text-muted " >Enter the amount you want to Withdraw:</p>
                                    <input id="withdraw-input" type="number" className="form-control fs-5 my-5" placeholder="Enter amount" />
                                    <button className="btn btn-primary mx-auto d-block fs-5" onClick={confirmWithdraw}>Confirm</button>
                                </div>
                            }
                            <h1 className="display-5 fw-light  d-block " style={{color:"#76E1FC"}}>Available Funds</h1>
                            <h1 className="text-muted">₹ {Funds}</h1>
                            <div className="d-flex justify-content-between my-5" style={{width:"100%"}}>
                                <button className="btn btn-primary mx-5" onClick={handleAddFunds}> Add Funds</button>
                                <button className="btn btn-danger mx-5"  onClick={handleWithdrawFunds}>Withdraw Funds</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}