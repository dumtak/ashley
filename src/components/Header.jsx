import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Quick from "../components/Quick"

import { isActiveToken, useAccessToken } from '../context/AccessTokenContext';

import "./Header.scss";

const Header = () => {
  const { accessToken, accessResult,setAccessResult, user_id } = useAccessToken();
  const [ isHamburger, setIsHamburger ] = useState(false);

  const navigate = useNavigate();
  const logout = () => {
    setAccessResult(false);
    localStorage.removeItem('accessToken');
    navigate("/");
  };

  useEffect(() => { // accessToken 사용할 코드
    const verifyToken = async () => {
      if (accessToken) {
        const result = await isActiveToken(accessToken);
        setAccessResult(result.accessResult);  // 유효성 검사 후 결과 설정
      } else {
        setAccessResult(false);  // 토큰이 없으면 바로 false로 설정
      }
    };
  
    if (accessResult === null) verifyToken();  // 처음 상태가 null이면 API호출하지 않음
  }, [accessToken, accessResult]);


  return (
    <>
      <header>
      <div className="topbar">
        <div className="layout_fix">
          { accessResult === false && (
            <>
              <Link to="/member/login">로그인</Link>
              <Link to="/member/join">회원가입</Link>
            </>
          ) }
          { accessResult === true && (
            <>
              <Link to="/mypage" className="name">{user_id}님</Link>
              <button onClick={()=>logout()}>로그아웃</button>
            </>
          )}
        </div>
      </div>
      <div className="layout_fix">
        <h1 className="header_logo">
          <Link to="/">애슐리</Link>
        </h1>
        { accessResult === false ? <Link to="/member/login" className="btn_user mo">My</Link> : <Link to="/mypage" className="btn_user mo">My</Link> }
        <button className={`btn_hamburger mo ${isHamburger ? "active" : ""}`} onClick={()=>setIsHamburger(true)}>모바일메뉴버튼</button>
        <ul className="gnb">
          <li><Link to="/notice">공지사항</Link></li>
          <li><Link to="/event">이벤트</Link></li> 
          <li><Link to="/store">매장안내</Link></li>
          <li><Link to="/membership">멤버십</Link></li>
          <li><Link to="/customer">고객센터</Link></li>
          { isHamburger && (
            <li className="btn_close"><button onClick={()=>setIsHamburger(false)}><img src="/images/btn-close-hamburger.png" alt="메뉴닫기"/></button></li>
          ) }
        </ul>
        <Link to="/about/shleyz" className="shleyz">
          <ul>
            <li className="berry"><img src="/images/shleyz-berrybit.png" alt=""/></li>
            <li className="ramzzi"><img src="/images/shleyz-ramzzi.png" alt=""/></li>
            <li className="sae"><img src="/images/shleyz-omongsae.png" alt=""/></li>
            <li className="cota"><img src="/images/shleyz-cota.png" alt=""/></li>
          </ul>
        </Link>
      </div>
    </header>
    <Quick/>
    </>
  );
};

export default Header;