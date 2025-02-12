import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from '../../config/constants';
import { useAccessToken } from '../../context/AccessTokenContext';

const Mypage = () => {
  const navigate = useNavigate();
  const { setAccessResult } = useAccessToken();


  const [userData,setUserData] = useState([]);

  const token = localStorage.getItem("accessToken");
  const fetchData = ()=>{
    if(!token) return;

    axios.get(`${API_URL}/users/mypage`, {
      headers: {
        Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
      },
    })
    .then((res)=>{
      console.log("마이페이지받음", res.data);
      setUserData(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    fetchData();
  },[])

  const logout = () => {
    setAccessResult(false);
    localStorage.removeItem('accessToken');
    navigate("/");
  };


  return (
    <>
      <div id="container" className="mypage__idx">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>{userData?.name}님의 개인정보</h2>
            </div>
            <ul>
              { Object.entries(userData)?.map(([key,value])=> (
                <li key={key}>{key} : {value}</li>
              ) )}
            </ul>
            <div className="btn_wrap">
              <button onClick={()=>logout()}>로그아웃</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;