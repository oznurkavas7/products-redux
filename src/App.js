import './App.css';
import ProductList from './components/ProductList';
import BasketList from './components/BasketList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';

function App() {
  return (
    <div>
      <Router>
      <Header></Header>
        <Routes>
          <Route path="/" element={<ProductList/>}></Route>
          <Route path="/products" element={<ProductList />}></Route>
          <Route path="/basket" element={<BasketList />}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
