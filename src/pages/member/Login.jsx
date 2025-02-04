import { Link } from "react-router-dom";

import "./Onboarding.scss";

const Login = () => {
  return (
    <>
      <div id="container" className="onboarding__login">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2 className="tit">로그인</h2>
            </div>
            <form>
              <ul className="inp_list">
                <li><input type="text" placeholder="아이디"/></li>
                <li><input type="password" placeholder="비밀번호"/></li>
              </ul>
              <div className="flex_items justify">
                <div className="security chk_bx">
                  <input type="checkbox" id="login_keep" name="login_keep"/>
                  <label className="chk_txt" htmlFor="login_keep">
                      <span className="chk"></span>
                      <span className="txt">로그인 유지</span>
                  </label>
                </div>
                <Link to="/" className="find">아이디/비밀번호 찾기</Link>
              </div>
              <div className="btn_wrap column">
                <Link to="/" className="btn_dark">로그인</Link>
                <Link to="/member/join" className="btn_light">회원가입</Link>
              </div>
              <div className="social">
                <p className="tit">SNS 간편 로그인</p>
                <ul>
                  <li><Link to="/"><img src="../images/social-kakao.png" alt="카카오 로그인"/></Link></li>
                  <li><Link to="/"><img src="../images/social-naver.png" alt="네이버 로그인"/></Link></li>
                  <li><Link to="/"><img src="../images/social-apple.png" alt="애플 로그인"/></Link></li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;