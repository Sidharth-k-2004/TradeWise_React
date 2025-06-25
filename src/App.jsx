import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Components/Main/Main';
import SignUpPage from './Components/SignUp/SignUpPage';
import LoginPage from './Components/Login/LoginPage';
import Display from './Components/Display/Display';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Holding from './Components/Holdings/Holding';
import FundSection from './Components/Funds/FundSection';
import AllStocks from './Components/Watchlist/AllStocks';
import KnowMore from './Components/KnowMe/KnowMore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/display" element={<Display />} />
        <Route path="/holdings" element={<Holding/>} />
        <Route path="/funds" element={<FundSection/>} />
        <Route path="/wishlist" element={<AllStocks/>} />
        <Route path="/knowmore" element={<KnowMore/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
