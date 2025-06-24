import NavbarContent from "../NavbarContent";
import Wishlist from "../Wishlist/Wishlist";
import { useEffect,useState } from "react";
export default function Display() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    console.log(BACKEND_URL);
    const [Equity, setEquity] = useState(0);
    const [Holdings, setHoldings] = useState(0);
    useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    fetch(`${BACKEND_URL}/equity?userId=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch equity");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Equity data:", data);
            setEquity(data);
        })
        .catch((error) => {
            console.error("Error fetching equity:", error);
            alert("Failed to fetch equity. Please try again later.");
        });
    
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
            setHoldings(data.length);
        })
        .catch((error) => {
            console.error("Error fetching holdings:", error);
            alert("Failed to fetch holdings. Please try again later.");
        });

}, []);

    return (
        <>
            <NavbarContent/>  
            <div className="fluid-container">
                <div className="row gx-5">
                    <Wishlist/>
                    <div className="col-8 border">
                        
                        <div className="display-2 my-5">
                            Hey User!!
                        </div>
                        <div className="border-3 bg-light my-5" style={{height:"30vh",width:"80%"}}>
                            <h1 className="text-muted  m-3 display-3">Equity</h1>
                            <p className="display-5 m-3">Total Equity: {Equity}</p>
                        </div>
                        <div className="border-3 bg-light my-5" style={{height:"30vh",width:"80%"}}>
                            <h1 className="text-muted m-3 display-3">Holdings</h1>
                            <p className=" display-5 m-3">Total Holdings: {Holdings}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        

    );
}