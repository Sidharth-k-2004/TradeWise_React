import { useNavigate } from "react-router-dom";
export default function Content() {
    const navigate = useNavigate();
    return (
        <div className="fluid-container">
            <div className="container justify-content-center text-center">
                <img src="Images/investment-illustration.png" className="img-fluid d-none d-md-block mx-auto d-block" alt="investment-illustration.png" />
                <h1 className=" display-1 my-4">Invest in Everything</h1>
                <p className="text-muted my-4 fs-3">Your platform to explore and understand the world of investments.</p>
                <button className="btn bg-primary fs-5 rounded-pill" style={{color:"white"}} onClick={() => navigate("/SignUp")} >Sign Up for Free</button>
                <p className="fs-4 my-4 ">Simplifying Investments, Empowering Your Financial Growth</p>

            </div>
            <div className="container my-5 py-3 d-flex ">
                <div className="container my-5 " >
                    <div >
                        <h2 className="fs-3">Invest with confidence</h2>
                        <p className="text-muted fs-4">Committed to providing a seamless and secure, investment experience tailored to your needs.
                        </p>
                    </div>
                    <div className="">
                        <h2 className="fs-3">Investment Made Simple</h2>
                        <p className="text-muted fs-4">Easy-to-use tools to help you invest smarter and achieve your goals.
                        </p>
                    </div>
                    <div className="">
                        <h2 className="fs-3">A New Way to Invest</h2>
                        <p className="text-muted fs-4">Reimagining investment platforms—focused on your experience and growth.
                        </p>
                    </div>
                </div>
                <div className="container my-5 ms-5 img-fluid d-none d-lg-block ">
                    <img src="Images/investment-growth.png" alt="investment-growth.png" />
                </div>
            </div>
            <div className="container my-5 py-3 d-flex" >
                <div className="container my-5 ms-5 img-fluid d-none d-lg-block">
                    <img src="Images/financial-control.png" alt="financial-control.png" />
                </div>
                <div className="container my-5 " >
                    <div>
                        <h2 className="fs-3">Take Control of Your Finances</h2>
                        <p className="text-muted fs-4">Empowering you with the right tools to make confident investment decisions.</p>
                    </div>
                    <div>
                        <h2 className="fs-3">Simplicity at its best</h2>
                        <p className="text-muted fs-4">Focus on your goals without distractions—no gimmicks, just reliable tools and features.
                        </p>
                    </div>
                    
                </div>
                
            </div>
            <div className="container my-5 justify-content-center text-center">
                <h1 className="display-4"> Open Your Account</h1>
                <button className="btn bg-primary fs-5 rounded-4 my-5" style={{color:"white"}} onClick={() => navigate("/SignUp")}>Sign Up for Free</button>
            </div>
        </div>
    );
}