import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/header.jsx';
import Home from "./pages/Home.jsx";
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
      <Router basename={import.meta.env.BASE_URL}>
        <DataContext.Provider value={loading}>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Footer/>
        </DataContext.Provider>
      </Router>
    </>
  )
}

export default App
