import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { NoticeProvider } from "./context/BoardContext";
import { AccessTokenProvider } from "./context/AccessTokenContext";

import Header from './components/Header';
import Home from "./pages/Home";
import Login from "./pages/member/Login";
import Join from "./pages/member/Join";
import JoinResult from "./pages/member/JoinResult";
import Shleyz from "./pages/shleyz/Shleyz";
import Notice from "./pages/board/Notice";
import Event from "./pages/board/Event";
import DetailType from "./pages/board/DetailType";
import Store from "./pages/store/Store";
import Membership from "./pages/membership/Membership";
import Customer from "./pages/customer/Customer";
import Mypage from "./pages/mypage/Mypage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

import './App.css'
import "./assets/scss/Modal.scss"



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

  //===Loading
  const [loading, setLoading] = useState(true);
  const images = [
    "/images/shleyz-cota-i1.png",
    "/images/shleyz-cota-i2.png",
    "/images/shleyz-cota-i3.png",
    "/images/shleyz-omongsae-i1.png",
    "/images/shleyz-omongsae-i2.png",
    "/images/shleyz-omongsae-i3.png",
    "/images/shleyz-berrybit-i1.png",
    "/images/shleyz-berrybit-i2.png",
    "/images/shleyz-berrybit-i3.png",
    "/images/shleyz-ramzzi-i2.png",
    "/images/shleyz-ramzzi-i1.png",
    "/images/shleyz-ramzzi-i3.png"
  ];

  useEffect(() => {
    const imgEl = document.querySelector(".load_slot img");
    const getRandomImage = () => images[Math.floor(Math.random() * images.length)];
    
    if (imgEl) {
      imgEl.src = getRandomImage(); // 처음 랜덤이미지 설정
      const interval = setInterval(() => {
        if (loading) {  //주기적으로 랜덤이미지 설정
          console.log("계속돈다", loading);
          imgEl.src = getRandomImage();
        } else {
          clearInterval(interval);
        }
      }, 250);
  
      const loadingTimeout = setTimeout(() => { //로딩상태확인
        console.log("로딩성공", loading);
        if (document.readyState === "complete") {
          setLoading(false);
        }
      }, 1500);

      const loadingReload = setTimeout(() => {
        console.log("3000")
        if (document.readyState !== "complete") {
          window.location.reload();
        }
      }, 3000);
  
      return () => {
        clearInterval(interval);
        clearTimeout(loadingTimeout);
        clearTimeout(loadingReload);
      };
    }
  }, [loading]);


  //===Page Scroll
  useEffect(()=>{
    window.scrollTo({ top: 0 });
  },[location])


  return (
    <>
    <AccessTokenProvider>
    { loading && (
        <div id="modal" className="modal_load">
          <div className="load_cont">
            <div className="load_slot"><img src={images[2]} alt="랜덤이미지"/></div>
          </div>
        </div>
      ) }
      <NoticeProvider>
        {/* <Router basename={import.meta.env.BASE_URL}> */}
          <DataContext.Provider value={loading}>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/member/">
                <Route path="login" element={<Login/>}></Route>
                <Route path="join" element={<Join/>}></Route>
                <Route path="joinResult" element={<JoinResult/>}></Route>
              </Route>
              <Route path="/about/">
                <Route path="shleyz" element={<Shleyz/>}></Route>
              </Route>
              <Route path="/notice" element={<Notice/>}/>
              <Route path="/event" element={<Event/>}/>
              <Route path="/:type/detail" element={<DetailType/>}/>
              <Route path="/store" element={<Store/>}/>
              <Route path="/membership" element={<Membership/>}/>
              <Route path="/customer" element={<Customer/>}/>
              <Route path="/mypage" element={<Mypage/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
          </DataContext.Provider>
        {/* </Router> */}
      </NoticeProvider>
    </AccessTokenProvider>
    </>
  )
}

// export default App

