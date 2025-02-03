import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { NoticeProvider } from "./context/NoticeContext";

import Header from './components/Header';
import Home from "./pages/Home";
import Shleyz from "./pages/Shleyz";
import Notice from "./pages/board/Notice";
import Event from "./pages/board/Event";
import DetailType from "./pages/board/DetailType";
import Store from "./pages/Store";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

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
              <Route path="/event" element={<Event/>}/>
              <Route path="/:type/detail" element={<DetailType/>}/>
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

