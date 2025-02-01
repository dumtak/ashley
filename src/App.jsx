import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { NoticeProvider } from "./context/NoticeContext";

import Header from './components/header.jsx';
import Home from "./pages/Home.jsx";
import Shleyz from "./pages/Shleyz.jsx";
import Notice from "./pages/Notice.jsx";
import Store from "./pages/Store.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/Footer.jsx";

import './App.css'



export default function Main() { //useLocation 사용으로 Router 분리
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <App />
    </Router>
  );
}

function App() {
  const DataContext = createContext();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
  },[])

  useEffect(()=>{
    window.scrollTo({ top: 0 });
  },[location])

  return (
    <>
      <NoticeProvider>
        {/* <Router basename={import.meta.env.BASE_URL}> */}
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
        {/* </Router> */}
      </NoticeProvider>
    </>
  )
}

// export default App

