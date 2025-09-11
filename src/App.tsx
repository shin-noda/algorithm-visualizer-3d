import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";

// css
import './App.css'

// pages
import BubbleSort from "./pages/BubbleSort";
import InsertionSort from "./pages/InsertionSort";
import SelectionSort from "./pages/SelectionSort";
import QuickSort from "./pages/QuickSort";
import MergeSort from "./pages/MergeSort";
import HeapSort from "./pages/HeapSort";
import ShellSort from "./pages/ShellSort";
import TimSort from "./pages/TimSort";
import CountingSort from "./pages/CountingSort";



const App = () => {
  return (
    <BrowserRouter basename="/algorithm-visualizer-3d">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/bubble-sort" element={<BubbleSort />} />
          <Route path="/insertion-sort" element={<InsertionSort />} />
          <Route path="/selection-sort" element={<SelectionSort />} />
          <Route path="/quick-sort" element={<QuickSort />} />
          <Route path="/merge-sort" element={<MergeSort />} />
          <Route path="/heap-sort" element={<HeapSort />} />
          <Route path="/shell-sort" element={<ShellSort />} />
          <Route path="/tim-sort" element={<TimSort />} />
          <Route path="/counting-sort" element={<CountingSort />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;