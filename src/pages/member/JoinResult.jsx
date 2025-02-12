import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { useAccessToken } from '../../context/AccessTokenContext';


const JoinResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name,id,email } = location.state || {};


  // console.log("LocalStorage AccessToken:", localStorage.getItem("accessToken"));
  // const { setAccessToken } = useAccessToken();
  // useEffect(() => {
  //   console.log(1111)
  //   const accessTokenFromStorage = localStorage.getItem("accessToken");
  //   if (accessTokenFromStorage) {
  //     console.log(2222)
  //     setAccessToken(accessTokenFromStorage);
  //   }
  // }, []);




  useEffect(()=>{
    if(!name || !id || !email){
      navigate("/");
    }
  },[])

  // navigate("/", {replace:true})
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => navigate("/", { replace: true });
    return () => window.onpopstate = null; // 언마운트 시 리소스 해제
  }, [navigate]);


  // const { setAccessToken, setAccessResult, setUserId } = useAccessToken();
  // const token = localStorage.getItem("accessToken");
  // useEffect(() => {
  //   localStorage.setItem("accessToken", accessToken); // 토큰 저장
  //   setAccessToken(accessToken);
  //   // localStorage.setItem("userInfo", JSON.stringify( {name,id,email} ));
  // }, [setAccessToken, setAccessResult, setUserId]);


  return (
    <>
      <div id="container" className="onboarding__join_result">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2 className="tit">회원가입 완료</h2>
            </div>
            <form>
              <ul className="inp_list">
                <li>
                  <dl>
                    <dt>이름</dt>
                    <dd>{name}</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>아이디</dt>
                    <dd>{id}</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>이메일</dt>
                    <dd>{email}</dd>
                  </dl>
                </li>
              </ul>
              <div className="btn_wrap column">
                <Link to="/member/login" onClick={()=>localStorage.removeItem('userInfo')} className="btn_dark">로그인</Link>
                <Link to="/" className="btn_light">메인으로</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinResult;