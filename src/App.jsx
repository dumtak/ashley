import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import gsap from 'gsap';

import { NoticeProvider } from "./context/NoticeContext";
import { AccessTokenProvider } from "./context/AccessTokenContext";

import Header from './components/Header';
import Home from "./pages/Home";
import Login from "./pages/member/Login";
import Join from "./pages/member/Join.jsx";
import Shleyz from "./pages/Shleyz";
import Notice from "./pages/board/Notice";
import Event from "./pages/board/Event";
import DetailType from "./pages/board/DetailType";
import Store from "./pages/Store";
import Membership from "./pages/Membership";
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
  const [loading, setLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
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

  // useEffect(()=>{
  //   const timeout = setTimeout(()=>{
  //     const interval = setInterval(()=>{
  //       console.log(document.readyState,1111)
  //       const imgEl = document.querySelector(".load_slot img");
  //         // if(!imgEl) return;
  //       if(imgEl){
  //         gsap.to(".load_slot img", {
  //           duration: .25,
  //           yoyo: true,
  //           repeat: -1,
  //           repeatDelay: 0,
  //           // stagger:{ each:100 },
  //           onRepeat: () => {
  //             // document.querySelector(".load_slot img").src = images[Math.floor(Math.random() * images.length)];
  //             imgEl.src = images[Math.floor(Math.random() * images.length)];
  //             gsap.fromTo(imgEl, { visibility:"hidden" }, { visibility:"visible" });
  //           }
  //         });
  //         clearInterval(interval);
  //       }
  //     },50)
        
  //     if(document.readyState === "complete"){
  //       console.log(document.readyState,2222)
  //       setLoading(false);
  //     }

  //   }, 1000)
  //   return () => clearTimeout(timeout);
  // },[location])


  
  

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
  
      return () => {
        clearInterval(interval);
        clearTimeout(loadingTimeout);
      };
    }
  }, [loading]);

  // useEffect(()=>{
  //   let timeout = null;
  //   let interval = null;
  //   timeout = setTimeout(()=>{
  //     setLoading(true);
  //   },1000);
  //   interval = setInterval(()=>{
  //     setLoadPercentage((time) => {
  //       if(time >= 100){
  //         const imgEl = document.querySelector(".load_slot img");
  //         if(!imgEl) return;
  //           gsap.to(".load_slot img", {
  //             duration: .25,
  //             yoyo: true,
  //             repeat: -1,
  //             repeatDelay: 0,
  //             // stagger:{ each:100 },
  //             onRepeat: () => {
  //               const randomImage = images[Math.floor(Math.random() * images.length)];
  //               gsap.fromTo(imgEl, { visibility: "hidden" }, { visibility: "visible" });
  //               imgEl.src = randomImage;


  //               // if(imgEl){
  //               //   imgEl.src = images[Math.floor(Math.random() * images.length)];
  //               //   gsap.fromTo(imgEl, { visibility:"hidden" }, { visibility:"visible" });
  //               // }
  //             }
  //           });
  //         clearTimeout(timeout);
  //         clearInterval(interval);
  //         setLoading(false);
  //         return 100;
  //       }
  //       return time + 50; //비율 증가
  //     });
  //   }, 250)
  //   return () => {
  //     clearTimeout(timeout);
  //     clearInterval(interval);
  //   }
  // },[location])


  useEffect(()=>{
    window.scrollTo({ top: 0 });
  },[location])

  return (
    <>
    <AccessTokenProvider>
    { AccessTokenProvider && loading && (
        <div id="modal" className="modal_load">
          <div className="load_cont">
            <div className="load_slot"><img src={images[2]} alt="랜덤이미지"/></div>
            {/* <div className="cover_fill">
              <div className="fill" style={{height:`${loadPercentage}px`}}></div>
            </div> */}
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
              </Route>
              <Route path="/about/">
                <Route path="shleyz" element={<Shleyz/>}></Route>
              </Route>
              <Route path="/notice" element={<Notice/>}/>
              <Route path="/event" element={<Event/>}/>
              <Route path="/:type/detail" element={<DetailType/>}/>
              <Route path="/store" element={<Store/>}/>
              <Route path="/membership" element={<Membership/>}/>
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

