import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";

// pages
import BubbleSort from "./pages/bubbleSort/BubbleSort";
import InsertionSort from "./pages/insertionSort/InsertionSort";

// CSS
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/bubble-sort" element={<BubbleSort />} />
          <Route path="/insertion-sort" element={<InsertionSort />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;