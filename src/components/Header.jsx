import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <>
      <header>
      <div className="topbar">
        <div className="layout_fix">
          <Link to="/member/login">로그인</Link>
          <Link to="/member/join">회원가입</Link>
        </div>
      </div>
      <div className="layout_fix">
        <h1 className="header_logo">
          <Link to="/">애슐리</Link>
        </h1>
        <a href="#none" className="btn_hamburger mo">모바일메뉴버튼</a>
        <ul className="gnb">
          
          <li><Link to="/notice">공지사항</Link></li>
          <li><Link to="/event">이벤트</Link></li> 
          <li><Link to="/store">매장안내</Link></li>
          <li><Link to="/">멤버십</Link></li>
          <li><Link to="/">고객센터</Link></li>
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
    </>
  );
};

export default Header;