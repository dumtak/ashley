import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NoticeProvider } from "./context/NoticeContext";

import Header from './components/header.jsx';
import Home from "./pages/Home.jsx";
import Shleyz from "./pages/Shleyz.jsx";
import Notice from "./pages/Notice.jsx";
import Store from "./pages/Store.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/Footer.jsx";

import './App.css'


function App() {
  const DataContext = createContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
  },[])

  return (
    <>
      <NoticeProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <DataContext.Provider value={loading}>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about/">
                <Route path="shleyz" element={<Shleyz/>}></Route>
              </Route>
              <Route path="/notice" element={<Notice/>}/>
              <Route path="/store" element={<Store/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
          </DataContext.Provider>
        </Router>
      </NoticeProvider>
    </>
  )
}

export default App
