import "./Header.scss";

const Header = () => {
  return (
    <>
      <header>
      <div className="topbar">
        <div className="layout_fix">
          <a href="member/login.html">로그인</a> 
          <a href="member/join.html">회원가입</a>
        </div>
      </div>
      <div className="layout_fix">
        <h1 className="header_logo">
          <a href="index.html">애슐리</a>
        </h1>
        <a href="#none" className="btn_hamburger mo">모바일메뉴버튼</a>
        <ul className="gnb">
          <li><a href="#">회사소개</a></li>
          <li><a href="#">매장안내</a></li>
          <li><a href="#">이벤트</a></li> 
          <li><a href="#">멤버십</a></li> 
          <li><a href="#">고객센터</a></li>
        </ul>
        <a href="about/shleyz.html" className="shleyz">
          <ul>
            <li className="berry"><img src="images/shleyz-berrybit.png" alt=""/></li>
            <li className="ramzzi"><img src="images/shleyz-ramzzi.png" alt=""/></li>
            <li className="sae"><img src="images/shleyz-omongsae.png" alt=""/></li>
            <li className="cota"><img src="images/shleyz-cota.png" alt=""/></li>
          </ul>
        </a>
      </div>
    </header>
    </>
  );
};

export default Header;