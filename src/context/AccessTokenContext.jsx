import React, { useState, useEffect, createContext, useContext } from 'react';
import { API_URL } from '../config/constants';
import axios from 'axios';

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

export const isActiveToken = async (accessToken) => {
  if (!accessToken) { // accessToken이 없으면 API 호출하지 않음
    return { accessResult: false };
  }

  try {
    const response = await axios.post(`${API_URL}/auth`, { accessToken });
    const resResult = response.data.result;
    console.log("API응답===", response);

    if (resResult && resResult.id) {
      return { accessResult: true, user_id: resResult.id };
    } else if (resResult === false) { // 유효하지 않은 토큰
      console.warn("Token is invalid.");
      localStorage.removeItem('accessToken');
      // navigate("/login");  // 로그인 페이지로 리디렉션
      return { accessResult: false };
    } else {
      console.error("No valid result received:", resResult);
      return { accessResult: false };
    }
  } catch (error) {
    console.error("Token verification failed: ", error);
    return { accessResult: false };
  }
}

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [accessResult, setAccessResult] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      // if (accessToken) { 
      //   const result = await isActiveToken(accessToken);
      //   setAccessResult(result.accessResult);
      //   setUserId(result.user_id);

      //   // if (result.accessResult) {
      //   //   setAccessResult(true);
      //   //   setUserId(result.user_id);
      //   // } else {
      //   //   setAccessResult(false);
      //   //   setUserId(null);  // 토큰이 유효하지 않으면 user_id를 null로 설정
      //   // }

      // } else {
      //   setAccessResult(false);
      //   setUserId(null);
      // }

        console.log("인증토큰===", accessToken);
        if (!accessToken) { // accessToken 없을 경우
          console.log("==인증토큰없음==");
          setAccessResult(false);
          setUserId(null);
          setLoading(false);
          return;
        }
    
        const result = await isActiveToken(accessToken);
        console.log("인증결과===", result);
        if (result.accessResult) {
          setAccessResult(true);
          setUserId(result.user_id);
        } else {
          setAccessResult(false);
          setUserId(null);
        }

      
      setLoading(false);
    }

    verifyToken();

  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken, accessResult, user_id, loading }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenContext;