import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../config/constants";
import DaumAddr from "../../context/DaumAddr";

import { useAccessToken } from '../../context/AccessTokenContext';

import "./Onboarding.scss";

const Join = () => {
  const navigate = useNavigate();
  //=== 다음 주소검색 API
  const [ postcode, setPostcode ] = useState("");
  const [ address, setAddress ] = useState("");
  useEffect(()=>{
    setFormData(prev => ({
      ...prev,
      addr1: postcode,
      addr2: address
    }))
  },[postcode, address])
  

  //### id trim 체크할것!
  const [ formData, setFormData ] = useState({ //입력값 담기
    // region: '지역',
    // store: '지점',
  });
  const handleData = (e)=>{ //입력값 체크
    const { name,value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name] : value
    }))
  }
  const [errors, setErrors] = useState({});


  //===아이디 중복확인 버튼
  const [ idCheck, setIdCheck ] = useState(false);
  const handleIdCheck = async ()=>{
    console.log("####errors###", errors);
    //##### 아이디
    try {
      const response = await axios.get(`${API_URL}/users/check-id`, {
        params:{user_id: formData.user_id},
      });
      console.log("==response==", response);
      const idRule=/^[a-z0-9]{4,16}$/;
      const trimId = formData.user_id.trim();

      if(trimId === ""){
        setErrors((el) => ({...el, user_id: "아이디를 입력하세요", user_id_state:"error"})); return;
      } 
      if(!idRule.test(trimId)){
        setErrors((el) => ({...el, user_id: "소문자/숫자, 4~16자 조합", user_id_state:"error"})); return;
      }
      
      if(!response.data.success){
        setErrors((el) => ({ ...el, user_id: response.data.message, user_id_state:"error" }));
      } else {
        setErrors((el) => ({ ...el, user_id: response.data.message, user_id_state:"success" }));
        setIdCheck(true);
      }
    } catch(err){
      if(err.response){ //서버응답 있는 경우
        setErrors((el) => ({ ...el, user_id: err.response.data.message, user_id_state:"error" }));
      } else {
        setErrors((el) => ({ ...el, user_id: "서버 오류 발생", user_id_state:"error" }));
      }
    }
  }


  //===onBlur
  const confirmName = (name)=>{
    const nameRule = /^[a-zA-Z가-힣]{2,20}$/;
    if(/\s/.test(name) || !nameRule.test(name)){ //공백 및 rule 확인
      setErrors(prev => ({ ...prev, name: "형식이 올바르지 않습니다", name_state: "error" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, name:"", name_state: "success" }));
    }
  }
  const confirmPassword = (password)=>{
    const pwRule = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
    if(!password) return;
    if (!password || password.trim() === "") {
      setErrors((prev) => ({ ...prev, password: "비밀번호를 입력하세요", password_state: "error" }));
      return false;
    }
    if (!pwRule.test(password)) {
      setErrors((prev) => ({ ...prev, password: "영문 대소문자/숫자/특수문자 8~16자 조합", password_state: "error" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: "올바른 비밀번호입니다", password_state: "success" }));
    return true;
  }
  const confirmPasswordConfirm = (password, passwordConfirm)=>{
    const pwRule = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
    console.log("passwordRule", password)
    if(!passwordConfirm) return;
    if(!pwRule.test(password)){
      setErrors((prev) => ({ ...prev, passwordConfirm: "비밀번호를 재설정하고 입력하세요", passwordConfirm_state: "error" }));
      return;
    }
    if (password !== passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: "비밀번호와 재입력이 일치하지 않습니다", passwordConfirm_state: "error" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, passwordConfirm: "비밀번호와 일치합니다", passwordConfirm_state: "success" }));
    return true;
  }
  const confirmBirth = (birth1, birth2, birth3) => {
    const birthRule1 = /^(19[0-9]{2}|20[0-9]{2})$/; // 1900년 ~ 2099년
    const birthRule2 = /^(0?[1-9]|1[0-2])$/; //1~12월, 01~12월
    const birthRule3 = /^(0?[1-9]|[12][0-9]|3[01])$/; // 1~31일,01~31일

    if (!birth1 || !birth2 || !birth3 || birth1==="" || birth2==="" || birth3==="") return;
    if (!birthRule1.test(birth1)) {
      setErrors(prev => ({ ...prev, birth1: "올바른 연도를 입력하세요", birth1_state: "error" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, birth1: "", birth1_state: "success" }));
    }
    if (!birthRule2.test(birth2)) {
      setErrors(prev => ({ ...prev, birth2: "올바른 월을 입력하세요", birth2_state: "error" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, birth2: "", birth2_state: "success" }));
    }
    if (!birthRule3.test(birth3)) {
      setErrors(prev => ({ ...prev, birth3: "올바른 일을 입력하세요", birth3_state: "error" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, birth3: "", birth3_state: "success" }));
    }
  }
  const confirmPhone = (phone)=>{
    const phoneRule = /^(?:(010)|(01[1|6|7|8|9]))\d{3,4}(\d{4})$/;
    if(!phone) return;
    if(!phoneRule.test(phone)){
      setErrors(prev => ({ ...prev, phone: "형식이 올바르지 않습니다", phone_state: "error" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, phone:"", phone_state: "success" }));
    }
  }
  const confirmEmail = (email)=>{
    const emailRule = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    if(!email) return;
    if(!emailRule.test(email)){
      setErrors(prev => ({ ...prev, email: "형식이 올바르지 않습니다", email_state: "error" }));
      return;
    } else {
      setErrors(prev => ({ ...prev, email:"", email_state: "success" }));
    }
  }


  //===회원가입버튼
  const { setAccessToken } = useAccessToken();
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(e.target);

    if(idCheck === false){
      alert("아이디 중복확인 해주세요");
      window.scrollTo({ top:0, behavior:"smooth" });
      return;
    }
    handleIdCheck();
    
    const required = ["name", "user_id", "password", "passwordConfirm", "phone", "email", "region", "store"];
    const requiredKo = {
      name : "이름",
      user_id : "아이디",
      password : "비밀번호",
      passwordConfirm : "비밀번호 재입력",
      phone : "핸드폰 번호",
      email : "이메일",
      region : "선호지역",
      store : "선호지점",
    }
    const requiredCheck = required.filter(item => !formData[item]); //찾기

    // console.log(requiredCheck.length);
    if(requiredCheck.length !== 0){
      const msg = requiredCheck.map(item => requiredKo[item]).join(",");
      alert(`${msg} 을 입력해주세요!`);
      return;
    } else {
    // else {

      //##### 이름
      // const nameRule = /^[a-zA-Z가-힣]{2,20}$/;
      // if(!nameRule.test(formData.name)){
      //   setErrors(prev => ({ ...prev, name: "형식이 올바르지 않습니다", name_state: "error" }));
      //   return;
      // } else {
      //   setErrors(prev => ({ ...prev, name:"", name_state: "success" }));
      // }

      //##### 비밀번호
      // const pwRule = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
      // console.log("errors====", errors);
      // // console.log("!pwRule.test(formData.password)",!pwRule.test(formData.password))
      // // console.log("!pwRule.test(formData.passwordConfirm)",!pwRule.test(formData.passwordConfirm))
      // if (!formData.password || formData.password.trim() === "") { // 비밀번호가 비어 있으면
      //   setErrors(prev => ({ ...prev, password: "비밀번호를 입력하세요", password_state: "error" }));
      //   return;
      // }
      // if (!pwRule.test(formData.password)) { // 비밀번호가 규칙에 맞지 않으면
      //   setErrors(prev => ({ ...prev, password: "영문 대소문자/숫자/특수문자 8~16자 조합", password_state: "error" })); window.scrollTo({ top:0, behavior:"smooth" });
      //   return;
      // } else {
      //   setErrors(prev => ({ ...prev, password: "올바른 비밀번호입니다", password_state: "success" }));
      // }
      // if (!formData.passwordConfirm || formData.passwordConfirm.trim() === "") { // 비밀번호 재입력이 비어 있으면
      //   setErrors(prev => ({ ...prev, passwordConfirm: "비밀번호를 재입력하세요", passwordConfirm_state: "error" })); window.scrollTo({ top:0, behavior:"smooth" });
      //   return;
      // }
      // if (!pwRule.test(formData.passwordConfirm)) { // 비밀번호 재입력이 규칙에 맞지 않으면
      //   // setErrors(prev => ({ ...prev, passwordConfirm: "영문 대소문자/숫자/특수문자 8~16자 조합", passwordConfirm_state: "error" }));
      //   setErrors(prev => ({ ...prev, passwordConfirm: "비밀번호와 재입력이 일치하지 않습니다", passwordConfirm_state: "error" })); window.scrollTo({ top:0, behavior:"smooth" });
      //   return;
      // }
      // if (formData.password !== formData.passwordConfirm) { // 비밀번호와 비밀번호 재입력이 일치하지 않으면
      //   setErrors(prev => ({ ...prev, passwordConfirm: "비밀번호와 재입력이 일치하지 않습니다", passwordConfirm_state: "error" })); window.scrollTo({ top:0, behavior:"smooth" });
      //   return;
      // }
      // // if (pwRule.test(formData.password) && formData.password === formData.passwordConfirm) {
      // // }
      // setErrors(prev => ({ ...prev,  password: "올바른 비밀번호입니다",  passwordConfirm: "올바른 비밀번호입니다",  password_state: "success",  passwordConfirm_state: "success" }));

      //##### 핸드폰번호
      // const phoneRule = /^(?:(010)|(01[1|6|7|8|9]))\d{3,4}(\d{4})$/;
      // if(!phoneRule.test(formData.phone)){
      //   setErrors(prev => ({ ...prev, phone: "형식이 올바르지 않습니다", phone_state: "error" }));
      //   return;
      // } else {
      //   setErrors(prev => ({ ...prev, phone:"", phone_state: "success" }));
      // }

      //##### 이메일
      // const emailRule = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
      // if(!emailRule.test(formData.email)){
      //   setErrors(prev => ({ ...prev, email: "형식이 올바르지 않습니다", email_state: "error" }));
      //   return;
      // } else {
      //   setErrors(prev => ({ ...prev, email:"", email_state: "success" }));
      // }


      try{
        const birth = (formData.birth1 && formData.birth2 && formData.birth3) ? `${formData.birth1}-${formData.birth2}-${formData.birth3}` : null;
        const address = formData.addr3 && formData.addr3.trim() !== "" ? `${formData.addr2} ${formData.addr3.trim()}` : formData.addr2 || null;

        console.log('보낸다데이터===', {
          ...formData,
          birth: birth,
          addr1: formData.addr1,
          addr2: address
        }); 

        axios.post(`${API_URL}/users`, {
          ...formData,
          birth: birth,
          addr1: formData.addr1,
          addr2: address,
          // marketingChecked : marketingChecked ? "True" : "False"
        }).then((result)=>{
          console.log('회원가입 성공 ?? ', result.data);
          // console.log("result.data.token111",result.data.token)
          // console.log("result.data.token222",result.data.accessToken)
          //회원가입완료 전달
          const accessToken = result.data.accessToken;
          setAccessToken(accessToken); // 상태 업데이트
          localStorage.setItem("accessToken", accessToken);
          
          navigate('/member/joinResult', {
            state: { name:formData.name, id:formData.user_id, email:formData.email },
          });
          // history("/", {replace:true}) //성공시 뒤로가기 막기
        }).catch((error)=>{
          console.error(error);
          alert(error.response.data);
        })
      } catch(error){
        //db에 회원가입 정보 넣기 실패
        console.error('에러===', error.response?.data, error.message);
      }

    }

  }


  //===물음표안내
  const modalPop = (e)=>{
    e.preventDefault();
    const modal = document.querySelector(`.modal_info[data-popup="${e.target.dataset.popup}"]`);
    const isOpen = modal.style.display === 'block';
    !isOpen ? (e.target.classList.add("active"), modal.style.display = "block") : (e.target.classList.remove("active"), modal.style.display = "none");
  }

  const [isTermsCheckedAll,setIsTermsCheckedAll] = useState(false);
  const [isTermsChecked,setIsTermsChecked] = useState([]);
  const chkEl = document.querySelectorAll("input[name^='join_terms']:not([name$='_all'])");
  const chkChange = (id)=>{
    setIsTermsChecked(prev => prev.includes(id) ? prev.filter(el => el !== id) : [...prev, id]);
  }
  useEffect(()=>{
    setIsTermsCheckedAll(isTermsChecked.length === chkEl.length);
  },[isTermsChecked])


  return (
    <>
      <div id="container" className="onboarding__join">
        <div id="contents">
          <div className="layout_fix">
          <div className="heading">
            <img src="../images/logo-eland.png" alt="이랜드 로고 이미지"/>
            <h2 className="tit">회원가입</h2>
            <p className="desc">가입시 2,000P, 미션 수행시 최대 10,000P의 혜택을 드립니다!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="tb_item">
              <ul className="inp_list">
                <li>
                  <div className="tit required">이름</div>
                  <input type="text" name="name"
                  onChange={(e)=>handleData(e)}
                  onBlur={()=>confirmName(formData.name)} aria-required="true" required/>
                  {errors.name_state === "error" && <p className="error">{errors.name}</p>}
                  {/* {errors.name && <p className={errors.name_state === "error" ? "error" : ""}>{errors.name}</p>} */}
                </li>
                <li>
                  <div className="tit required">회원아이디</div>
                  <div className="flex_items">
                    <input type="text" name="user_id" onChange={(e)=>handleData(e)} aria-required="true" required />
                    <button onClick={handleIdCheck} className="btn_check">중복확인</button>
                  </div>
                  {errors.user_id && <p className={errors.user_id_state === "error" ? "error" : ""}>{errors.user_id}</p>}
                </li>
                <li>
                  <div className="tit required">비밀번호</div>
                  <input type="password" name="password"
                  onChange={(e)=>handleData(e)} placeholder="8~16자 영문 대/소문자, 숫자, 특수문자"
                  onBlur={()=>confirmPassword(formData.password)} aria-required="true" required/>
                  { errors.password && ( <p className={errors.password_state === "error" ? "error" : ""}>{errors.password}</p> ) }
                </li>
                <li>
                  <div className="tit required">비밀번호 재입력</div>
                  <input type="password" name="passwordConfirm"
                  onChange={(e)=>handleData(e)}
                  onBlur={()=>confirmPasswordConfirm(formData.password, formData.passwordConfirm)} aria-required="true" required/>
                  { errors.passwordConfirm && ( <p className={errors.passwordConfirm_state === "error" ? "error" : ""}>{errors.passwordConfirm}</p> ) }
                </li>
                <li>
                  <div className="tit">생년월일</div>
                  <div className="flex_items">
                    <input type="tel" name="birth1" maxLength="4" onChange={(e)=>handleData(e)} onInput={(e)=>e.target.value=e.target.value.replace(/[^0-9]/g,'')} onBlur={()=>confirmBirth(formData.birth1,formData.birth2,formData.birth3)} placeholder="연도"/>
                    <input type="tel" name="birth2" maxLength="2" onChange={(e)=>handleData(e)} onInput={(e)=>e.target.value=e.target.value.replace(/[^0-9]/g,'')} onBlur={()=>confirmBirth(formData.birth1,formData.birth2,formData.birth3)} placeholder="월"/>
                    <input type="tel" name="birth3" maxLength="2" onChange={(e)=>handleData(e)} onInput={(e)=>e.target.value=e.target.value.replace(/[^0-9]/g,'')} onBlur={()=>confirmBirth(formData.birth1,formData.birth2,formData.birth3)} placeholder="일"/>
                  </div>
                  {
                    (errors.birth1 || errors.birth2 || errors.birth3) && (
                      <p className={( errors.birth1_state === "error" || errors.birth2_state === "error" || errors.birth3_state === "error") ? "error" : ""}>
                        {errors.birth1 || errors.birth2 || errors.birth3}
                      </p>
                    )
                  }
                  {/* { errors.birth1_state === "error" ? errors.birth1 : "1에러아님" }
                  { errors.birth2_state === "error" ? errors.birth2 : "2에러아님" }
                  { errors.birth3_state === "error" ? errors.birth3 : "3에러아님" } */}
                </li>
                <li>
                  <div className="tit required">핸드폰 번호</div>
                  <input type="tel" name="phone" maxLength="11" placeholder="(-) 제외" 
                  onChange={(e)=>handleData(e)}
                  onInput={(e)=>e.target.value=e.target.value.replace(/[^0-9]/g,'')}
                  onBlur={()=>confirmPhone(formData.phone)} aria-required="true" required/>
                  {errors.phone && <p className={errors.phone_state === "error" ? "error" : ""}>{errors.phone}</p>}
                </li>
                <li>
                  <div className="tit">주소</div>
                  <div className="addr">
                    <div className="flex_items">
                      <input type="text" name="addr1" value={postcode} onInput={(e)=>handleData(e)} placeholder="우편번호" readOnly disabled/>
                      <DaumAddr setPostcode={setPostcode} setAddress={setAddress}/>
                      {/* <a href="#" className="btn_basic">주소검색</a> */}
                    </div>
                    <input type="text" value={address} name="addr2" onInput={(e)=>handleData(e)} placeholder="기본주소" readOnly disabled/>
                    <input type="text" name="addr3" onChange={(e)=>handleData(e)} placeholder="나머지 주소(선택입력)" {...(address !== "" ? {} : {readOnly:true})}/>
                  </div>
                </li>
                <li>
                  <div className="tit required">이메일</div>
                  <input type="email" name="email"
                  onChange={(e)=>handleData(e)}
                  onBlur={()=>confirmEmail(formData.email)} aria-required="true" required/>
                  {errors.email && <p className={errors.email_state === "error" ? "error" : ""}>{errors.email}</p>}
                </li>
                <li>
                  <div className="tit required">리테일 선호 지점</div>
                  <div className="flex_items">
                    <select name="region" value={formData.region || "지역"} onChange={(e)=>handleData(e)} aria-required="true" required>
                      <option value="지역" disabled>지역</option>
                      <option value="경기">경기</option>
                      <option value="서울">서울</option>
                      <option value="인천">인천</option>
                      <option value="강원">강원</option>
                      <option value="충남">충남</option>
                      <option value="충북">충북</option>
                      <option value="경북">경북</option>
                      <option value="경남">경남</option>
                      <option value="전북">전북</option>
                      <option value="전남">전남</option>
                      <option value="제주">제주</option>
                    </select>
                    <select name="store" value={formData.store || "지점"} onChange={(e)=>handleData(e)} aria-required="true" required>
                      <option value="지점" disabled>지점</option>
                      <option>NC 강서점</option>
                      <option>NC 신구로점</option>
                      <option>NC 불광점</option>
                      <option>NC 송파점</option>
                      <option>NC 고잔점</option>
                      <option>NC 야탑점</option>
                      <option>NC 청주점</option>
                      <option>NC 충장점</option>
                      <option>NC 전주점</option>
                      <option>NC 엑스코점</option>
                      <option>NC 부산대점</option>
                    </select>
                  </div>
                </li>
                <li>
                  <div className="tit">부가정보</div>
                  <div className="tab_radio">
                    <input type="radio" id="join_marry1" name="marry" value="미혼" onChange={(e)=>handleData(e)}/>
                    <label className="chk_txt" htmlFor="join_marry1">
                        <span className="chk"></span>
                        <span className="txt">미혼</span>
                    </label>
                    <input type="radio" id="join_marry2" name="marry" value="기혼" onChange={(e)=>handleData(e)}/>
                    <label className="chk_txt" htmlFor="join_marry2">
                        <span className="chk"></span>
                        <span className="txt">기혼</span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tb_item terms">
              <h3 className="tit">약관 동의</h3>
              <ul className="inp_list">
                <li>
                  <div className="chk_bx">
                    <input type="checkbox" id="join_terms_all" name="join_terms_all" checked={isTermsCheckedAll}
                    onChange={()=> { setIsTermsChecked(prev => prev.length ? [] : [...chkEl].map(el => el.id) ); } }/> {/* setIsTermsCheckedAll(isTermsCheckedAll); */}
                    <label className="chk_txt" htmlFor="join_terms_all">
                        <span className="chk"></span>
                        <span className="txt"><b>모든 약관을 확인하고 전체 동의합니다.</b></span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="chk_bx">
                    <input type="checkbox" id="join_terms1" name="join_terms1" aria-required="true" checked={isTermsChecked.includes("join_terms1")} onChange={(e)=> {chkChange(e.target.id); handleData(e);} }/>
                    <label className="chk_txt" htmlFor="join_terms1">
                        <span className="chk"></span>
                        <span className="txt">[필수] E-POINT 이용약관 동의</span>
                    </label>
                  </div>
                  <button className="btn_more">전문보기</button>
                  <div className="txt">제 1 장 총칙
                    제 1 조 (목적)
                    본 약관은 "이포인트 회원"이 이랜드리테일(이하 "당사")가 제공하는 "이포인트 서비스"를 이용함에 있어 "이포인트 회원"과 당사와의 제반 권리, 의무 및 관련 절차 등을 규정하는데 그 목적이 있습니다.

                    제 2 조 (용어의 정의)
                    ① "이포인트 회원"(이하 "회원")이라 함은 당사의 본 약관에 동의하고 회원가입 신청서와 "개인정보의 수집, 제공 및 활용동의서"를 당사로 제출하여 당사로부터 회원 가입의 허락을 받은 자를 말합니다.
                    ② "이포인트 서비스"라 함은 회원을 위해 당사 또는 "이포인트 제휴사", "이포인트 제휴가맹점"이 제공하는 서비스로서 그 내용은 본 약관 제3조에 정한 바와 같습니다.
                    ③ "이포인트 카드"(이하 "카드")라 함은 회원이 이포인트 서비스를 정상적으로 이용할 수 있도록 당사가 승인한 카드로서 당사 또는 "이포인트 제휴사"가 발급합니다.
                    ④ "이포인트 제휴사"(이하 "제휴사") 및 "이포인트 제휴가맹점"(이하 "제휴가맹점")이라 함은 이포인트 서비스에 관하여 당사와 제휴 계약 또는 가맹점 가입계약을 체결한 업체 또는 업소를 말합니다.
                    ⑤ "이랜드리테일 멤버십 마일리지"란 회원이 본 약관에 따라 이랜드리테일 멤버십 서비스를 이용하기 위하여 취득하였던 것으로서 그 사용 등에 관한 구체적인 사항은 본 약관 제3장에 정한 바와 같습니다. “이포인트”(이하 “포인트”)란 당사, 제휴사 또는 제휴가맹점에서 상품이나 서비스 구매 시 적립 또는 사용하도록 제공하는 포인트 및 관련된 서비스를 말합니다
                    ⑥ "적립 마일리지”라 함은 회원이 당사, 제휴사 또는 제휴가맹점에서 상품을 구매 또는 서비스를 이용할 경우나 기타 당사가 정하는 바에 따라, 혹은 당사와 해당 제휴사 또는 제휴가맹점간에 약정된 바에 따라 부여되는 이랜드리테일 멤버십 마일리지를 말합니다. 적립 포인트란 회원이 당사, 제휴사 또는 제휴가맹점에서 상품을 구매 또는 서비스를 이용할 경우나 기타 당사가 정하는 바에 따라, 혹은 당사와 해당 제휴사 또는 제휴가맹점간에 약정된 바에 따라 부여되는 포인트를 말합니다.
                    ⑦ 가용 마일리지란 적립 마일리지가 본 약관 제11조의 기준에 부합하여 회원이 당사, 제휴사 또는 제휴가맹점에서 상품을 구매하거나 서비스를 이용할 때 즉시 사용할 수 있는 이랜드리테일 멤버십 마일리지를 말합니다. 가용 포인트 또는 잔여 포인트란 회원이 본 약관에 따라 적법하게 부여받은 포인트 중 이미 사용한 포인트를 제외한 나머지 포인트로서 회원이 당사, 제휴사 또는 제휴가맹점에서 상품을 구매하거나 서비스를 이용할 때 즉시 사용할 수 있는 포인트를 말합니다.
                    ⑧ "사업장"이란 당사 및 당사의 계열사가 대한민국 내에서 당사가 운영하는 백화점, 할인점 및 온라인쇼핑몰 및 제휴사, 제휴가맹점이 운영하는 사업장을 말합니다.
                    ⑨ "이용자"란 사이트에 접속하여 이 약관에 따라 사이트가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                    ⑩ “E페이 서비스” 란 이포인트 서비스 중 하나로서, 당사가 제휴사와 함께 회원의 결제편의를 위해 제공하는 서비스입니다. E페이 서비스는 회원이 마켓/앱스토어를 통해 본인 명의의 모바일 단말기에 E페이 서비스를 제공하는 앱을 다운 받아 본인 명의의 은행계좌 정보를 앱과 서버에 분리 저장한 후, E페이 가맹점으로부터 결제 요청을 앱으로 수신 받아 결제 승인절차가 진행되는 모바일 결제 서비스를 말합니다.
                    ⑪ “E페이 이용회원”이라 함은 회원 중 모바일 단말기에 E페이 서비스를 제공하는 앱을 설치하고, 실명/소유 인증을 받아 본 약관 및 제휴사 약관에 따라 당사 및 제휴사와 E페이 서비스 이용계약을 체결하는 이용자를 말합니다.
                    ⑫ “결제 비밀번호”란 E페이 서비스 이용을 위하여 회원 본인임을 확인하고 보호하기 위해 회원 자신이 정한 숫자 6자리로 이루어진 PIN (Personal Identification Number)을 말합니다.
                    ⑬ “E페이 가맹점” 이라 함은 E페이 이용회원에게 상품 판매 및 서비스 제공을 위해 당사와 서비스 이용계약을 체결한 사업자 (개인 또는 법인)를 말합니다.
                    ⑭ “간편결제서비스”라 함은 E페이 이용회원이 E페이 서비스를 이용하여 E페이 가맹점에서 상품 등을 구매하는 경우, 결제에 사용하고자 하는 은행계좌 등 결제정보를 1회 등록하여 각각 은행, 당사로부터 인증 및 승낙을 받으면, 당사와 제휴한 사용처에서 결제정보를 다시 입력할 필요 없이 결제 비밀번호 등을 입력함으로써 구매대금을 간편하게 결제할 수 있는 서비스를 말합니다.
                    ⑮ “리워드머니”라 함은 당사가 “이포인트 회원” 중 “E페이 이용회원”에게 부여하는 단기 소멸성 포인트 혜택으로, 이랜드리테일 오프라인 매장에서만 사용할 수 있고 적립이 가능한 지급수단입니다.
                    ⑯ “리워드머니”는 프로모션 참여에 따라 적립금액이 결정됩니다. 구체적인 프로모션의 내용은 이멤버 APP, 이랜드리테일 오프라인 매장 등에 게시되는 안내문을 통해 확정됩니다.

                    제 3 조 (이포인트 서비스의 개요)
                    ① 이포인트 서비스의 내용은 아래와 같으며 이를 이용하고자 하는 고객은 본 약관에 정해진 제반 절차를 거쳐 회원으로 가입하여야 합니다.
                    a) 적립 서비스 - 회원은 당사, 제휴사 및 제휴가맹점에서의 상품 구매 또는 서비스 이용을 통하여 포인트를 받거나 당사와 제휴사 및 제휴가맹점에서 주최하는 이벤트, 추가 적립 서비스 등 마케팅 활동에 참여함으로써 포인트를 적립받을 수 있습니다.
                    b) 결제(사용) 서비스 - 회원은 적립된 포인트를 사용하여 당사, 제휴사 및 제휴가맹점에서 상품을 구매하거나 서비스를 이용할 수 있습니다. 단, 회원이 포인트를 사용하기 위해서는 반드시 카드(모바일 카드 포함)를 발급 받아야 합니다.
                    c) 통합 아이디 서비스 – 회원은 당사 및 제휴사의 홈페이지 ID와 비밀번호를 통합하여 사용할 수 있는 통합 아이디 서비스를 이용할 수 있습니다.
                    d) E페이 결제 서비스 – 회원은 당사, 제휴사 및 제휴가맹점에서 E페이 서비스를 이용할 수 있습니다.
                    e ) 기타 서비스 - 당사는 상기 각 호의 서비스 이외에도 추가적인 서비스를 개발하여 회원에게 제공할 수 있습니다.
                    ② 당사는 이포인트 서비스의 원활한 제공을 위하여 이포인트 홈페이지(www.elandretail.com, oneclick.elandretail.com, www.elandmall.com)를 운영하고 있으며, 회원은 "이포인트 홈페이지"에서 제공하는 각종 서비스를 이용할 수 있습니다. 단, "이포인트 홈페이지"를 이용하고자 하는 회원은 회원ID 및 비밀번호 지정 등 당사가 정하는 회원 등록 절차를 거쳐야 합니다.
                    ③ 회원에게 제공되는 이포인트 서비스는 당사, 제휴사 및 제휴가맹점의 사정이나 영업정책에 따라 변경될 수 있습니다.

                    제 4 조 (약관의 효력 및 개정)
                    ① 본 약관은 수시로 개정될 수 있으며, 당사는 본 약관을 개정하고자 할 경우 개정된 약관을 적용하고자 하는 날(이하 "효력 발생일"이라고 합니다)로부터 30일 이전에 본 약관이 개정된다는 사실과 개정된 내용 등을 아래에 규정된 방법 중 1가지 이상의 방법으로 회원에게 고지하여드립니다.
                    a) 이메일 등 전자우편 통보
                    b) 서면 또는 문자 통보
                    c) 이포인트 홈페이지(제3조에서 정한 관련 홈페이지 포함) 내 게시
                    d) 당사, 제휴사 또는 제휴가맹점 내 게시
                    e) 일간지 공고 등의 방법
                    ② 본 약관이 개정된 사실 및 개정된 내용을 회원에게 고지하는 방법 중 본 조 제1항의 a), b) 경우에는 회원이 가장 최근에 당사에 제공한 전자우편 주소나 주소지로 통보합니다.
                    ③ 본 조의 규정에 의하여 개정된 약관(이하 "개정약관")은 원칙적으로 그 효력 발생일로부터 유효합니다.
                    ④ 개정약관에 이의가 있는 회원은 회원 탈퇴를 할 수 있습니다. 단, 이의가 있음에도 불구하고 본 조 제1항, 제2항에 따른 당사의 고지가 있은 후 30일 이내에 회원 탈퇴를 하지 않은 회원은 개정약관에 동의한 것으로 간주합니다.
                    ⑤ 본 조의 고지방법 및 고지의 효력은, 본 약관에서 달리 규정하지 않는 한, 본 약관의 각 조항에서 규정하는 통보 또는 통지의 경우에 이를 준용합니다.

                    제 2 장 회원가입 및 탈퇴

                    제 5 조 (회원가입)
                    ① 회원으로 가입하고자 하는 고객은 당사 당사 홈페이지(모바일앱 포함), 제휴사 홈페이지(모바일앱 포함) 및 영업점, 제휴가맹점에서 가입신청서에 정해진 사항을 기입한 후 본 약관과 "개인정보의 수집/이용 동의"에 동의함으로써 회원가입을 신청합니다. 단, 만 14세 미만의 경우 회원가입이 불가합니다.
                    ② 고객으로부터 회원가입 신청이 있는 경우, 당사는 자체 기준에 따른 심사를 거친 뒤 동 기준을 만족하는 회원가입 신청고객에게 카드를 발급하여 드립니다. 회원은 회원자격 및 그로부터 발생하는 권리를 타인에게 양도하거나 대여 또는 담보의 목적으로 제공할 수 없습니다.

                    제 6 조 (회원의 탈퇴 및 회원자격 상실)
                    ① 회원은 언제든지 서면, 이포인트 홈페이지 등 당사가 정하는 방법으로 회원 탈퇴를 요청할 수 있습니다.
                    ② 회원이 다음 각 호에 해당하는 경우, 당사는 당해 회원에 대한 통보로서 회원의 자격을 상실 시킬 수 있습니다. 단, a)호의 경우에는 별도의 통보 없이 당연히 자격이 상실됩니다.
                    a) 회원이 사망한 경우
                    b) 회원가입 신청 시 허위 내용을 등록, 기재 혹은 고지한 경우
                    c) 포인트 부정적립, 부정사용 등 카드를 부정한 방법 또는 목적으로 이용한 경우

                    - "부정적립"이란
                    i) 당사, 제휴사 또는 제휴가맹점에서 회원이 실제로 상품을 구매하거나 서비스를 이용하지 않았음에도 당해 회원에게 포인트가 적립된 경우(당사, 제휴사 또는 제휴가맹점에서 상품을 판매하거나 서비스를 제공한 당사자의 동의가 있는 경우는 제외)
                    ii) 실제 구입액 혹은 이용액 이상으로 포인트가 적립된 경우를 말합니다.
                    iii) 단, 회원이 제휴사, 제휴가맹점이거나 그 사용인인 경우, 제휴사 또는 제휴가맹점에서 포인트를 적립 받기 위해서는 당해 회원 본인이 그 제휴사 또는 제휴가맹점에서 실제로 상품을 구매하거나 서비스를 이용하여야 하며, 그 이외의 경우에는 부정적립으로 봅니다.
                    iv) 부정적립 된 포인트는 자격상실 통보와 동시에 소멸하고 이에 대하여 회원은 어떠한 권리를 주장할 수 없습니다. 또한 부당이익을 취한 부분 즉, 부정적립 된 포인트로 상품을 구매하거나 서비스를 이용한 경우 회원 본인 또는 부정적립에 관여한 자는 관련 법령에 따라 민, 형사상의 책임을 부담할 수 있습니다.

                    - "부정사용"이란
                    i) 회원이 부정 적립한 포인트를 사용하거나 본 약관에 위반하여 사용하는 경우 또는 당사 및 타 회원의 동의 없이 타 회원의 포인트를 임의로 사용한 경우를 말합니다
                    ii) 회원은 부정사용의 사유가 자신의 고의 또는 과실에 기한 것이 아님을 소명할 수 있습니다. 이 경우 당사는 회원의 소명 내용을 심사하여 회원의 주장이 타당하다고 판단하는 경우 회원으로 하여금 정상적으로 이포인트 서비스를 이용할 수 있도록 합니다.
                    d) 다른 회원의 홈페이지 이용을 방해하거나 그 정보를 하는 등 전자 거래질서를 어지럽히는 경우
                    e) 홈페이지를 이용하여 법령과 이 약관이 금지하거나 공서 양속에 반하는 행위를 하는 경우
                    f) 본 약관에 규정된 회원의 의무를 위반한 경우

                    ③ 회원(마일리지를 보유한 회원 포함)이 12개월간 포인트•마일리지 적립/사용실적 및 이랜드리테일 원클릭 로그인 기록이 없는 경우
                    a) 30일 전에 회원정보의 이메일, 카카오 알림톡, 이멤버 앱 푸시, SMS 중 1개의 수단으로 고지 하며,
                    b) 그럼에도 포인트•마일리지 적립/사용실적 및 이랜드리테일 원클릭 로그인 기록이 없으면, 12개월이 경과한 후 가장 가까운 16일 정해진 시간에 회원자격을 상실하게 되며, 회원정보는 관계법에 명시된 기준대로 일반 회원정보와 분리되어 관리됩니다.
                    c) 회원자격을 상실한 경우, 보유 포인트•마일리지는 잔여 유효기간에 따라 소멸되며, 향후 회원의 요청에 따라 일반 회원으로 전환될 경우 잔여 유효기간이 남아있는 포인트•마일리지에 한하여 복원됩니다.

                    ④ 본 조 제1항에 의한 회원 탈퇴 또는 제2, 3항에 의한 회원 자격상실이 확정되는 시점은 아래와 같습니다.
                    a) 회원 탈퇴 요청일 또는 자격상실 통보일에 회원탈퇴 또는 자격상실이 확정됩니다.
                    b) 사망으로 인한 회원 자격상실의 경우에는 회원 사망일에 자격상실이 확정됩니다.
                    c) 본 조 제3항의 12개월간 무실적으로 인한 자격 정지의 경우 당해 일자에 자격상실이 확정됩니다.

                    제 7 조 (카드의 관리)
                    ① 이랜드리테일 멤버십 서비스를 1회라도 이용한 회원은 본 약관의 모든 사항에 동의한 것으로 봅니다.
                    ② 카드는 본인이 직접 사용하여야 하며, 당사에 등록된 카드 명의인 이외의 자가 카드를 이용하게 해서는 안됩니다. 또한 카드를 타인에게 양도 또는 대여하거나 담보의 목적으로 제공할 수 없습니다.
                    ③ 카드는 회원 스스로의 책임 하에 관리하여야 하며, 회원의 고의 또는 과실로 카드가 분실, 도난, 훼손되는 등의 경우에는 회원은 즉시 그 사실을 당사에 통지하여야 합니다.
                    ④ 당사는 회원으로부터 본 조 제5항에 따른 통지를 받은 경우 그 즉시 당해 카드의 사용 중지에 필요한 제반 조치를 취합니다. 단, 당사는 당해 회원이 본 조 제3항에 따른 통지를 한 시점 이전에 발생한 손해에 대해서는 어떠한 책임도 지지 않습니다.
                    ⑤ 카드의 분실, 도난, 훼손 등으로 카드를 재발급 받고자 하는 회원은 "이랜드리테일 멤버십 카드 발급 신청서"를 작성하여 재발급 신청을 하여야 합니다.

                    제 8 조 (이랜드리테일 멤버십 마일리지의 종료)
                    ① "이랜드리테일 멤버십 마일리지"의 적립은 고객들의 편의를 위하여 2019년 3월 31일(이하 “기존 마일리지 적립 중단일”)까지 제공됩니다.
                    ② "이랜드리테일 멤버십 마일리지"는 제1항의 기존 마일리지 적립 중단일 이후에도 미사용분 잔여 이랜드리테일 멤버십 마일리지에 대해 2019년 12월 31일(이하 “마일리지 소멸일”)까지 사용이 가능하며, 마일리지 소멸일 이후 사용하지 않거나 포인트로 전환하지 않은 잔여 마일리지는 소멸됩니다.
                    ③ 회원은 마일리지 소멸일까지 언제든지 기존과 동일하게 이랜드리테일 멤버십 마일리지를 사용하거나, 포인트로 전환할 수 있습니다.
                    ④ 본 조 제3항의 경우 회원이 현금, 신용카드 등을 통해 결제를 한 후 카드와 기타의 할인카드를 제시하고 이중 할인 등을 요청하였을 때 당사, 제휴사 또는 제휴가맹점은 이를 거부할 수 있습니다. 이 때 회원은 당사, 제휴사 또는 제휴가맹점의 요구에 따라 하나의 마일리지제도 또는 할인제도를 선택하여야 합니다.
                    ⑤ "이랜드리테일 멤버십 마일리지"에 관련하여 발생하는 제세공과금은 회원이 부담합니다.

                    제 9 조 (포인트의 적립)
                    ① 포인트는 회원이 당사나 제휴사 또는 제휴가맹점에서 판매되는 상품이나 서비스를 구매하거나 당사나 제휴사에서 주최하는 이벤트, 추가 적립 서비스 등 마케팅 활동 등과 관련하여 획득한 포인트를 말합니다.
                    ② 당사나 제휴사 또는 제휴가맹점은 상품을 구입하거나 서비스를 이용하고 그에 따른 대금을 결제한 회원에게 약정에 고지된 바에 따라 아래와 같은 방식으로 포인트를 산정, 부여합니다. 단, 포인트와 관련하여 발생하는 제세공과금은 회원이 부담합니다.
                    - 포인트 = (상품/서비스의 구입/이용 실결제대금) X (고지된 회사와 제휴사의 포인트 적립률) &lt; 법인별 적립률 (인터넷 링크) &gt;
                    ③ 당사나 제휴사 또는 제휴가맹점의 정책에 따라 일부 제휴영업점이나 제휴가맹점에서는 포인트 적립이 불가 할 수도 있으며 제휴사나 제휴가맹점의 경영방침에 따라 포인트 적립률이 별도로 적용 될 수 있습니다.
                    ④ 포인트는 회원의 상품 구매 또는 서비스 이용 당시에 적립하는 것이 원칙이나, 그 당시에 적립하지 못했을 경우에는 회원은 본인의 구매내역에 한하여 그 기간 내 구매가 이루어진 당사나 제휴영업점 또는 제휴가맹점에 구매 영수증을 제시함으로써 소급하여 적립을 청구할 수 있습니다. 당사나 제휴사 또는 제휴가맹점은 내부 방침에 따라 포인트 소급 적립 청구 기간 변경이 가능하고 경우에 따라 회원의 소급청구를 거부할 수 있습니다.
                    ⑤ 본 조 제1항의 경우 회원이 현금, 신용카드 등을 통해 결제를 한 후 카드와 기타의 할인카드를 제시하고 이중 포인트 누적 또는 이중 할인 등을 요청하였을 때 당사나 제휴사 또는 제휴가맹점은 이를 거부할 수 있습니다. 이 때 회원은 당사나 제휴사 또는 제휴가맹점의 요구에 따라 하나의 포인트제도 또는 할인제도를 선택하여야 합니다.
                    ⑥ 본 조 제2항의 포인트 적립기준에 따라 부여 되거나 이벤트에 따라 추가 적립되는 포인트 중 소수점 이하의 단위는 절사 되고, 포인트를 상품이나 서비스 이용시 결제수단으로 사용하는 경우에는 포인트가 적립되지 않을 수 있습니다.
                    ⑦ 포인트 적립률 및 기준은 회사와 제휴사의 내부 방침에 따라 임의로 변경될 수 있습니다.

                    제 10 조 (포인트의 정정, 취소 및 소멸)
                    ① 포인트의 적립에 오류가 있을 경우 회원은 오류 발생 시점부터 60일 이내에 당사나 해당 제휴사 또는 해당 제휴가맹점에 정정신청을 하여야 하며, 당사는 회원의 정정 요청일부터 30일 이내에 정정할 수 있습니다. 단, 회원은 이를 증명할 수 있는 유효한 영수증 등의 자료를 제시하여야 합니다.
                    ② 당사는 제휴사 또는 제휴가맹점을 이용한 회원에게 영수증 또는 기타의 방법으로 고지된 포인트라 할지라도 제휴사 또는 제휴 가맹점과 당사 간의 정산과정에서 미결제 금액이 발생하거나 제휴사 또는 제휴가맹점의 지급 불능 상태가 발생하였을 경우 기 부여된 포인트를 취소할 수 있습니다.
                    ③ 포인트는 실적에 관계없이 적립일로부터 5년간 유지 되고 적립일로부터 5년 경과시 자동 소멸 됩니다.
                    a) 포인트 소멸 관련 고지는 소멸 당월 둘째주 목요일에 회원정보의 이메일, 카카오 알림톡, 이멤버 앱 푸시, SMS 중 1개의 수단으로 포인트 소멸 관련 고지를 해드리며, 회원이 이랜드리테일 홈페이지 또는 이멤버 앱에서 소멸 예정 포인트를 직접 확인 가능합니다. 단, 회원이 잘못된 정보를 제공하여 안내정보를 수신하지 못한 책임은 회원 본인에게 있습니다.

                    제 11 조 (포인트의 사용)
                    ① 포인트는 당사가 별도로 정하거나 또는 당사와 제휴사 혹은 제휴 가맹점 간의 계약에서 별도로 정함이 없는 한, 원칙적으로 온라인(On-line) 제휴사 또는 제휴가맹점에서 사용시 적립 포인트가 5000Point 이상인 경우 10Point단위로, 오프라인 제휴사 또는 제휴가맹점에서 사용시 적립 포인트가 5000Point 이상인 경우 사용 가능합니다. 단 당사가 별도로 정한 행사기간 내에는, 해당 행사의 기준에 따라 본 항에 명시한 사용기준에 미달되는 적립 포인트의 사용이 가능합니다.
                    ② 회원은 제1항에서 정한 조건을 충족하는 경우, 당사, 제휴사 및 제휴가맹점에서 카드와 신분증을 제시하거나 당사가 정한 방법 및 소정 절차에 따라 상품의 구매 또는 서비스 이용에 따른 대금 일부 또는 전부를 제1항에서 정한 적립 포인트로 결제할 수 있습니다. 이때 당사의 사정에 따라 상품교환권 발급 등의 간접 방법을 취할 수 있습니다.
                    ③ 적립 포인트는 1Point당 1원으로 환산되는 것이 원칙이나 본 약관 제4조에 정해진 바에 따른 약관 개정을 통하여 환산금액을 변경할 수 있습니다. 이 경우 변경된 환산금액은 그 고지된 효력 발생일부터 적용됩니다.
                    ④ 회원은 포인트를 타인에게 양도 또는 대여하거나 담보의 목적으로 제공할 수 없습니다.
                    ⑤ 회원의 고객정보가 등록되어 있지 않은 경우 포인트 사용이 제한될 수도 있습니다.
                    ⑥ 적립 포인트의 사용과 관련하여 발생하는 제세공과금은 회원이 부담합니다.

                    제 12 조 (회원탈퇴 및 자격상실의 포인트 처리))
                    ① 본 약관 제6조에 정해진 회원탈퇴의 경우 해당 확정일 현재 보유한 포인트는 자동으로 소멸됩니다.
                    ② 부정 적립된 포인트는 자격상실 통보와 동시에 소멸하고, 이에 대하여 회원은 어떠한 권리도 주장할 수 없습니다.

                    제 13 조 (기존 제휴사 포인트 및 서비스 연계 전환 불가)
                    ① 당사나 제휴사가 운영 중이거나 운영을 종료한 멤버십 서비스 및 지급 포인트는 이포인트 서비스와 무관합니다. 따라서 본 이포인트 서비스 회원 가입과 상관 없이 회원이 당사나 제휴사가 제공하는 다른 서비스의 회원으로서 제공받아 보유한 포인트 또는 적립금은 해당 서비스에서 별도로 정한 방침을 따릅니다.

                    제 3장 E페이 서비스

                    제 14조 (E페이 이용계약의 성립)
                    당사 및 제휴사는 회원이 E페이 서비스를 제공하는 모바일 앱을 본인 명의의 단말기에 다운로드 후 설치한 뒤 E페이 서비스의 제공을 게시합니다.
                    E페이 서비스 이용계약은 제 ①항 및 제 ②항의 약관 동의를 포함하는 회원의 E페이 서비스 이용 신청에 대해 당사와 제휴사가 승낙함으로써 성립합니다.
                    당사는 E페이 이용 신청자 본인확인을 하기 위해, 전문기관을 통한 본인인증 또는 실명확인을 요청할 수 있습니다.

                    제 15조 (E페이 서비스이용 신청 및 제한)
                    회원이 E페이 이용회원이 되기 위해서는 본 약관, 제휴사 약관, 개인정보 수집 및 이용에 대한 안내 동의 절차를 거친 후 당사가 정한 양식에 따라 E페이 서비스 이용에 필요한 정보를 입력하여야 합니다.
                    E페이 이용회원은 E페이 서비스 이용을 위해 등록할 경우 현재의 사실과 일치하는 정확한 정보를 제공하여야 하고, 회원정보 중 본인확인에 영향을 미치는 주요 정보가 변경되었을 경우 앱 삭제 후 재설치를 통하여 재인증을 받을 의무가 있습니다.
                    당사는 다음의 각 호에 해당하는 이용신청에 대해 승낙을 하지 않을 수 있으며, 해당 사유가 해소될 때까지 승낙을 유보할 수 있습니다.
                    1) 번호이동, 기기변경 등을 통해 기존 E페이 이용회원의 모바일 단말기 전화번호와 동일한 번호로 다른 모바일 단말기를 통하여 E페이 서비스 이용 신청을 하는 신규 회원이 있는 경우
                    2) 휴대폰 번호 변경을 통해 기존 E페이 이용회원이 기존 단말기에서 다른 번호로 E페이 서비스 이용을 할 경우
                    3) E페이서비스 이용에 필요한 정보에 허위, 기재누락, 오기가 있는 경우
                    4) 실명이 아니거나 타인의 명의를 이용한 경우
                    5) 결제 비밀번호를 5회 오입력 했을 경우
                    ④ 제 3항의 사유로 인해 E페이 서비스 이용 제한이 있을 경우 아래와 같은 절차를 통해 재이용할 수 있습니다.

                    1)
                    제 3항 제 1)호 및 제 2)호의 경우 신규 모바일 단말기에서 E페이 서비스 이용을 위해 재로그인 해야 합니다. 2)
                    제 3항 제3)호의 경우 모바일 고객센터에서 실명/휴대폰번호/계좌 번호 등을 입력하여 재인증을 받아 E페이 서비스 이용을 재개합니다.
                    3) 제 3항 제4)호의 경우 당사의 권한으로 해당 회원을 탈퇴처리 할 수 있으며, 사용자 본인 명의의 단말기에서, 본인 명의로 가입하여 E페이 서비스를 이용하실 수 있습니다.
                    4) 제 3항 제5)호의 경우 E페이 서비스 내에서 본인인증 절차를 거쳐 결제 비밀번호 초기화 및 재등록 절차를 통해 E페이 서비스 이용을 재개합니다.

                    제 16조 (E페이 서비스의 이용 개시)
                    ① 당사는 회원이 E페이 서비스를 제공하는 모바일 앱을 본인 명의의 단말기에 다운로드 및 설치한 뒤 E페이 서비스의 제공을 개시합니다.
                    ② 회원은 E페이 서비스와 관련하여 당사가 요구하는 사항(성명, 생년월일, 통신사, 휴대폰번호, 성별, 결제 비밀번호, 이메일 주소 등)을 당사에 제공함으로써 E페이 서비스를 이용할 수 있습니다
                    ③ E페이 이용회원은 이포인트 회원으로서 E페이 가맹점에서 재화의 구입 또는 용역의 대가로 포인트 적립 및 사용이 가능합니다.
                    ④ E페이 이용회원은 간편결제서비스의 이용과 관련하여 은행계좌 정보 등을 금융회사에 제공하여 인증 및 승낙을 받음으로써 e페이 간편결제서비스를 이용할 수 있습니다.
                    ⑤ E페이 서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 금융기관 및 기타 결제수단 발행업자 등의 사정에 따라 달리 정할 수 있습니다. 또한, 당사의 업무상이나 기술상의 이유로 또는 이동전화망이나 인터넷 망의 불안정이나 기술상의 이유로 서비스가 일시 중지될 수 있으며, 운영상의 필요성으로 회사가 정한 기간에 서비스가 일시 중지될 수 있습니다. 이 때 당사는 해당 내용을 전자적 수단을 통하여 사이트에 공지하거나 회원에게 통지합니다. 다만, 시스템 장애보수, 긴급한 프로그램 보수, 외부요인 등 불가피한 경우에는 사전 게시 없이 서비스를 중단할 수 있습니다.

                    제 17조 (E페이 서비스의 제공 및 변경)
                    당사는 E페이 서비스와 관련하여, 제휴사와 함께 은행계좌를 활용한 간편결제 서비스 업무를 수행합니다.
                    ② 당사는 재화 또는 용역의 품절, 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
                    ③ 당사는 회원에 대해 내부 정책에 따라 E페이 서비스 이용에 제한 및 차등을 둘 수 있습니다.
                    ④ 당사가 제공하기로 회원과 계약을 체결한 E페이 서비스의 내용을 재화 등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 회원에게 통지 가능한 수단으로 즉시 통지합니다.
                    ⑤ 전항의 경우 당사는 이로 인하여 회원이 입은 손해를 배상합니다. 다만, 당사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.

                    제 18조 (E페이 서비스의 이용 제한)
                    당사는 E페이 서비스를 통한 거래의 안정성과 신뢰성을 위하여 아래 각 호의 어느 하나에 해당하는 사유가 발생하는 경우 회원의  E페이 서비스 이용을 정지하거나 이용계약을 해지할 수 있습니다.
                    E페이 서비스의 운영의 고의, 과실로 방해하는 경우
                    회원 자격이 정지되거나 상실하는 경우
                    본 약관 제 31조 및 제 37조를 위반한 경우
                    d)  기타 본 약관에서 규정한 사항이나 별도로 정한 이용규칙을 위반한 경우
                    ② 당사는 제 1항의 경우, 회원이 해당 사유를 소명하거나 거래 상대방의 양해가 있었음을 소명하는 등 당사가 정하는 기준을 충족하는 경우 이용조치를 해소할 수 있습니다. 

                    제 19조 (E페이 서비스의 이용 한도)
                    당사는 직불전자지급수단을 직접적으로 발행 및 관리하지 않으며, 당사가 해당 업무를 위탁한 제휴사를 통해 E페이 이용회원과 E페이 가맹점 간에 전자적 방법에 따라 금융회사의 계좌에서 자금을 이체하는 방법으로 재화 등의 제공과 그 대가의 지급을 동시에 이행할 수 있도록 금융회사 또는 당사가 발행한 증표 또는 그 증표에 관한 정보로서 전자금융거래법상 직불전자지급수단을 발행 및 관리하고 있습니다.
                    E페이 이용회원이 직불전자지급수단을 이용하여 재화 등을 구매할 수 있는 최대 이용한도(1회, 1일 이용한도 등)는 관련 법령 및 제휴사의 정책에 따라 정해지게 되며, E페이 이용회원은 제휴사가 정한 그 이용한도 내에서만 전항의 직불전자지급수단을 사용할 수 있습니다. 제휴사는 해당 제휴사의 서비스 앱 등 서비스 홈페이지를 통하여 위 최대 이용한도를 공지합니다.

                    제 20조 (E페이 서비스 이용 수수료)
                    E페이 서비스 이용을 위한 별도의 이용 수수료는 없습니다. 단, 회원이 Wifi 무선 인터넷망이 아닌 무선 이동통신망을 사용할 경우 앱 다운로드 및 이용에 대한 무선 데이터 통신요금이 발생합니다.

                    제 21조 (E페이 서비스 관련 책임 제한)
                    ① 당사는 E페이 서비스 이용과 관련하여 발생한 손해에 대해 당사에 귀책사유가 있는 경우에만 책임을 부담합니다.
                    ② E페이 가맹점과 회원간에 이루어지는 상품 등의 매매와 관련하여 발생하는 상품 등의 배송, 청약철회 또는 교환, 반품 및 환불 등의 거래진행은 거래의 당사자인 E페이 가맹점과 회원 각각의 책임 하에 이루어집니다. 당사는 E페이 가맹점과 회원간의 상품 등 거래에 관여하지 않으며, 이에 대하여 어떠한 책임도 부담하지 않습니다.
                    ③ 당사는 회원의 귀책사유로 인한 E페이 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
                    ④ 회원이 자신의 개인정보를 타인에게 유출하거나 제공하여 발생하는 피해에 대해 당사는 책임을 지지 않습니다.
                    ⑤ 당사의 E페이 서비스 화면에서 링크, 배너 등을 통하여 연결된 다른 회사와 회원간에 이루어진 거래에 당사는 개입하지 않으며, 해당 거래에 대하여 책임을 지지 않습니다.
                    ⑥ 당사는 E페이 서비스 화면에 표시되는 제휴사, E페이 가맹점 또는 제3자가 제공하는 상품 등 및 정보 등의 정확성, 적시성, 타당성 등에 대하여 보증하지 않으며, 그와 관련하여 책임을 부담하지 아니 합니다.

                    제 22 조 (리워드머니 서비스)
                    ①회원은 “리워드머니”를 이용하기 위해 E페이 서비스를 가입하여야 하며, 당사는 “리워드머니”의 정책에 따라  “리워드머니”를 지급합니다.
                    ②회원이 “이포인트” 탈퇴 시, “리워드머니” 회원 자격도 함께 박탈되며, 보유한 “리워드머니” 포인트도 소멸됩니다.

                    제 23 조 (리워드머니 적립/사용)
                    ①“리워드머니”의 유효기간은 구체적인 “리워드머니” 프로모션의 유형에 따라 1~90일의 범위 내에서 지정될 수 있으며, 당사는 “리워드머니” 프로모션 유형에 따라 적립/사용이 가능한 “리워드머니” 금액(포인트)의 한도를 개별적으로 설정할 수 있습니다.
                    ② “리워드머니”의 적립에 오류가 있을 경우 회원은 오류 발생 시점부터 60일 이내에 당사에 정정신청을 하여야 하며, 당사는 회원의 정정 요청일로부터 30일 이내에 정정할 수 있습니다. 단, 회원은 이를 증명할 수 있는 유효한 영수증 등의 자료를 제시하여 동의를 얻어야 합니다.
                    ③ “리워드머니”를 사용하기 위해서는 “이포인트 회원” 및 “E페이 서비스 회원” 지위를 획득하고 있어야 하며, “리워드머니” 결제 시 이멤버 APP 내 E페이 결제 바코드를 제시하는 방식으로 사용 가능하며, 사용 시에는 유효기간 종료일이 먼저 도래하는 순서대로 사용됩니다.
                    ④ “리워드머니”는 프로모션의 유형에 따라 유효기간이 다르게 설정될 수 있습니다. 이용자가 유효기간 내에 사용하지 않은 “리워드머니”는 유효기간 경과에 따라 자동 소멸됩니다.
                    ⑤ 부정한 방법으로 “리워드머니”를 획득 또는 사용한 사실이 확인될 경우 당사는 이용자의 “리워드머니” 회수, 형사 고발 등 기타 조치를 취할 수 있습니다.
                    ⑥ 프로모션의 구체적인 조건 및 해당 프로모션에 적용되는 “리워드머니”의 사용기간, 적립/사용의 한도 그리고 유효기간 등은 향후 이멤버 APP, 이랜드리테일 오프라인 매장에 게시되는 안내문을 통해 확인 할 수 있습니다.
                    ⑦ “리워드머니”를 보유한 “회원”은 “당사”가 정한 소정의 절차에 따라 이랜드리테일 오프라인 매장에서 상품 구매나 서비스 이용에 따른 대금의 일부 또는 전부를 “리워드머니”로 결제할 수 있습니다. 단, 상품권 구매에는 결제할 수 없습니다. 또한, 일부 임대매장(외식 매장 등) 및 ㈜엠페스트에서 운영하는 킴스클럽(구로, 천호, 평택, 부평, 목동)과 단독 운영 점포인 김포 킴스클럽에서는 리워드머니 사용이 불가합니다.
                    ⑧ “리워드머니” 적립 조건에 따라 유효기간이 다를 수 있으며, 유효기간이 만료된 “리워드머니”는 유효기간 만료일 기준 익일 새벽 00~01시경에 자동 소멸됩니다.
                    ⑨ 이랜드리테일 오프라인 매장 휴점일에는 “리워드머니”를 사용할 수 없습니다.
                    ⑩ “리워드머니”와 “이포인트”는 동시 사용 가능합니다.
                    ⑪ “리워드머니”로 결제 후 취소/환불시, “리워드머니”로 환불됩니다. “리워드머니”가 환불되는 경우, 환불된 “리워드머니”의 유효기간은 익월 말일까지 유효기간 연장됩니다.
                    예) 1월 15일 리워드머니 사용(1월 31일 유효기간 만료일인 리워드머니)
                      2월 15일 환불할 경우, 기존 1월 31일에서 3월 31일로 유효기간 만료일 연장
                    ⑫ “리워드머니”는 “리워드머니”가 10원이상일 경우 10원 단위로 사용가능하며, 1원은 1원으로 환산합니다.
                    ⑬ “리워드머니” 이용약관은 이멤버 APP에서 확인이 가능하며 E페이 가입되어있지 않을 경우 서비스 이용이 제한됩니다.
                    ⑭ “회원” 이 보유한 “리워드머니” 소멸 안내는 이멤버 APP 내 [전체메뉴 – 내 포인트 – 당월 소멸 예정 포인트]에서 확인 가능하며, “알림톡”(카카오톡 이랜드리테일 채널 추가) 수신 동의한 회원 대상 알림톡으로만 안내합니다. 이 외의 별도 소멸 안내를 진행하지 않습니다.

                    제 24 조 (리워드머니 서비스 종료)
                    당사가 “리워드머니” 서비스를 종료하고자 할 경우, 서비스를 종료하고자 하는 날로부터 3개월 이전에 본 약관에 규정된 통지방법을 준용하여 “이포인트 회원”에게 통지하여 드립니다. 서비스 종료일 이후 “이포인트 회원”은 “리워드머니” 적립 및 기타 서비스 혜택을 받지 못하며, 통지일 시점에서 기 적립 된 “리워드머니”는 “당사”가 별도 지정하는 날까지 본 약관과 “당사”가 지정하는 바에 따라 사용하여야 하며, “리워드머니” 소멸일 이후 미사용 잔여분은 소멸됩니다.

                    제  4장 개인정보보호
                    당사는 관련법령이 정하는 바에 따라서 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다.
                    회원의 개인정보보호에 관한 사항은 관련법령 및 회사가 정하는 "개인정보취급방침"에 정한 바에 따릅니다.

                    제 5 장 홈페이지 운영 등

                    제 25 조 (이포인트 홈페이지의 목적)
                    당사는 회원에 대한 효율적인 이랜드리테일 멤버십 서비스 및 상품판매, 기타 각종 서비스를 제공하기 위하여 이포인트 홈페이지 및 관련 홈페이지 (이랜드리테일 공식 홈페이지 www.elandretail.com, 이랜드리테일 원클릭 oneclick.elandretail.com, 이랜드몰 www.elandmall.com) 이하 총칭하여 "이랜드리테일 홈페이지 등")을 운영하며, 당사는 회원이 이랜드리테일 홈페이지 등에서 제공하는 각종 서비스를 이용하는데 필요한 사항을 정할 수 있습니다.

                    제 26 조 (이랜드리테일 홈페이지 등의 서비스 제공 및 변경)
                    ① 당사가 이랜드리테일 홈페이지 등을 통하여 제공할 수 있는 서비스는 다음과 같습니다.
                    a) 회원에 대한 마일리지 서비스 관련 제반 정보의 제공
                    b) 상품 또는 서비스에 대한 정보 제공 및 구매 계약의 체결
                    c) 회원 커뮤니티 운영 서비스
                    d) 기타 당사가 정하는 업무
                    ② 당사는 상품 또는 서비스의 품절 혹은 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 상품 또는 서비스의 내용을 변경할 수 있습니다. 이 경우에는 변경된 상품, 서비스의 내용 및 제공일자를 명시하여 현재의 상품 또는 서비스의 내용을 게시한 곳에 그 제공일자 이전 7일 전부터 공지합니다.

                    제 27 조 (이랜드리테일 홈페이지 등의 서비스 중단)
                    ① 당사는 컴퓨터 등 정보통신설비의 점검, 보수, 교체, 고장, 통신두절 또는 전기공급의 중단 등의 경우, 불가항력 사유가 발생하는 경우, 이랜드리테일 홈페이지 등의 서비스 제공과 관련하여 필요한 경우, 해당 서비스의 제공을 일시적으로 중단할 수 있습니다.
                    ② 당사는 본 조 제1항의 사유로 이랜드리테일 홈페이지 등의 서비스를 제공할 수 없게 되는 경우, 제4조 제1항에서 정한 방법으로 회원에게 고지합니다.
                    ③ 당사는 본 조 제1항의 사유로 이랜드리테일 홈페이지 등의 서비스를 제공할 수 없게 되어 회원에게 손해가 발생할 경우, 그 손해를 배상합니다. 다만, 당사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.

                    제 28 조 (회원ID 및 비밀번호)
                    ① 이랜드리테일 홈페이지 등의 서비스를 이용하고자 하는 회원은 당사가 정하는 바에 따라 회원ID, 비밀번호 및 회원 정보를 홈페이지에 별도로 등록하여야 합니다.
                    ② 회원은 본인의 회원ID와 비밀번호를 제3자에게 알려주거나 이용하게 해서는 안됩니다.
                    ③ 회원이 본인의 회원ID와 비밀번호를 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 당사에 즉시 통보하고 당사의 안내가 있는 경우에는 그에 따라야 합니다.

                    제 29 조 (상품의 구매 또는 서비스의 이용)
                    ① 회원은 아래와 같은 절차에 따라 이랜드리테일 홈페이지 등을 통하여 상품을 구매하거나 서비스를 이용할 수 있습니다.
                    a) 상품 또는 서비스의 선택
                    b) 성명, 주소, 전화번호 입력
                    c) 약관 내용, 청약 철회권이 제한되는 서비스, 배송료, 설치비 등의 비용 부담과 관련한 내용에 대한 확인
                    d) 결제 방법의 선택
                    e) 기타 당사가 별도로 정하는 절차
                    ② 당사는 회원이 원하지 않을 경우 영리목적의 광고성 전자우편을 발송하지 않으며, 상품 또는 서비스에 대하여 표시 또는 광고의 공정화에 관한 법률 제3조 소정의 부당한 표시, 광고 행위를 하지 않습니다.

                    제 30 조 (대금 지급 방법)
                    회원이 구매하거나 이용하는 상품 또는 서비스에 대한 대금 지급 방법은 다음 각 호의 하나 또는 그 이상을 결합하여 할 수 있습니다.
                    a) 본 약관상 규정한 가용 마일리지
                    b) 폰뱅킹, 인터넷뱅킹 등의 각종 계좌이체
                    c) 선불카드, 직불카드, 신용카드 등의 각종 카드 결제
                    d) 온라인 무통장 입금
                    e) 전자화폐에 의한 결제
                    f) 수령 시 대금지급
                    g) 당사와 계약을 맺었거나, 당사가 인정한 상품권에 의한 결제 등

                    제 31 조 (수신 확인 통지 구매신청 변경 및 취소)
                    ① 당사는 회원으로부터 상품 또는 서비스에 대한 구매 혹은 이용 신청을 받은 경우 당해 회원에게 수신 확인 통지를 합니다.
                    ② 수신 확인 통지를 받은 회원은 의사표시의 불일치 등이 있는 경우에는 수신 확인 통지를 받은 후 즉시 구매 혹은 이용 신청의 변경 및 취소를 요청할 수 있고, 당사는 배송 전에 회원의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리합니다. 단, 당사가 지정하는 일부 상품 또는 서비스의 경우에는 구매 혹은 이용 신청의 변경 또는 취소가 제한될 수 있습니다. 이 경우 구매 혹은 이용 전에 회원에게 미리 고지합니다.

                    제 32 조 (배송)
                    당사는 회원이 구매한 상품에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 회원께 알려드립니다. 배송을 책임지고 담당하는 업체에게 배송에 필요한 최소한의 이용자 정보(성명, 주소, 전화번호)를 제공할 수 있으며, 이 경우에는 별도의 동의를 얻지 아니할 수 있습니다.

                    제 33 조 (환불, 반품 및 교환)
                    ① 당사는 회원이 구매 혹은 이용 신청한 상품 또는 서비스를 품절 등의 사유로 제공할 수 없을 경우 지체 없이 그 사유를 당해 회원에게 통지하고, 사전에 상품 또는 서비스의 대금을 받은 경우에는 대금을 받은 날부터 영업일 기준 3일 이내에 환불하거나 환불에 필요한 조치를 취합니다.
                    ② 회원은 상품을 인도 받거나 서비스를 제공받은 후 다음 각 호에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                    a) 회원에게 책임 있는 사유로 상품 또는 서비스가 멸실 또는 훼손된 경우
                    b) 회원의 사용 또는 일부 소비에 의하여 상품 또는 서비스의 가치가 현저히 감소한 경우
                    c) 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 또는 서비스의 가치가 현저히 감소한 경우
                    d) 같은 성능을 지닌 상품 또는 서비스로 복제가 가능한 경우 그 원인인 상품 또는 서비스의 포장을 훼손한 경우
                    e) 그 밖에 거래의 안전을 위하여 전자상거래 등에서의 소비자보호에 관한 법률시행령이 정하는 경우
                    ③ 회원은 본 조 제1항 내지 제2항의 규정에도 불구하고 상품 또는 서비스의 내용이 표시, 광고 내용과 다르거나 계약 내용과 다르게 이행된 때에는 당해 상품 또는 서비스를 공급 받은 날로부터 90일 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약 철회 등을 할 수 있습니다.

                    제 34 조 (회원의 의무)
                    회원은 이랜드리테일 홈페이지 등의 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.
                    a) 이랜드리테일 홈페이지 등의 서비스 이용 관련 신청 또는 변경 시 허위 내용의 등록
                    b) 이랜드리테일 홈페이지 등에 게시된 각종 정보의 무단 변경, 삭제 등 훼손
                    c) 당사가 정한 정보 이외의 정보(컴퓨터 프로그램 및 광고 등) 등의 송신 또는 게시
                    d) 당사, 기타 제3자의 저작권 등 지적재산권에 대한 침해
                    e) 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위

                    제 35 조 (웹사이트 연결과 당사의 책임)
                    이랜드리테일 홈페이지 등과 다른 웹사이트가 각종 링크(예: 링크의 대상에는 문자, 그림 및 동화상 등이 포함됨) 등의 방식으로 연결된 경우, 당사는 회원과 다른 웹사이트가 독자적으로 행하는 일체의 거래에 대해서 어떠한 책임도 부담하지 않습니다.

                    제 36 조 (저작권의 귀속 및 이용제한)
                    ① 당사가 작성한 저작물에 대한 저작권 기타 지적재산권은 당사에 귀속합니다.
                    ② 회원은 이랜드리테일 홈페이지 등을 이용함으로써 얻은 정보를 당사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 또는 기타의 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.

                    제 37 조 (홈페이지 서비스 이용 관련 분쟁해결)
                    ① 당사는 이랜드리테일 홈페이지 등의 서비스 이용과 관련하여 회원이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상 처리 기구를 설치, 운영합니다.
                    ② 당사는 회원으로부터 제출되는 불만사항 및 의견을 우선적으로 처리합니다. 단, 신속한 처리가 곤란한 경우에는 회원께 그 사유와 일정을 즉시 통보해 드립니다.
                    ③ 당사와 회원간에 발생한 분쟁은 공정거래위원회 또는 시도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.

                    제 6 장 기타

                    제 38 조 (이랜드리테일 멤버십 서비스의 종료)
                    당사는 영업부문의 폐지나 통합, 영업양도나 합병, 분할, 경영정책의 변경 등 부득이한 사정이 있는 경우 본 약관에 의한 이랜드리테일 멤버십 서비스를 일방적으로 종료 또는 폐쇄할 수 있습니다. 당사는 이랜드리테일 멤버십 서비스를 종료 또는 폐쇄하고자 하는 경우 중단 또는 폐쇄 시점부터 최소 1개월 이전에 제4조 제1항에서 정한 방법으로 회원에게 통보합니다.

                    제 39 조 (손해배상의 범위 및 청구)
                    ① 당사는 이랜드리테일 멤버십 서비스 제공에 있어 천재지변 등 불가항력적이거나 당사의 귀책사유 없이 발생한 회원의 손해에 대해서는 손해배상책임을 부담하지 않습니다.
                    ② 손해배상의 청구는 당사에 청구사유, 청구금액 및 산출근거를 기재하여 서면으로 하여야 합니다.

                    제 40 조 (금지행위)
                    ① 회원은 당사의 서비스를 이용함에 있어 다음의 행위를 하여서는 안됩니다.
                    타인의 명의, 계좌정보 등을 도용하여 서비스를 이용하는 행위
                    당사의 서비스의 안정적 운영을 방해할 수 있는 정보 및 수신자의 명시적인 수신거부 의사를 거부한 광고성 정보를 전송하는 행위
                    c )고의로 제3자 및 타인에게 ID 및 비밀번호(결제 비밀번호 포함)를 공유하여 당사의 영리 목적에 침해를 가하는 행위
                    d)구매의사 없는 반복적인 구매, 결제를 하는 행위
                    e)상품 거래를 가장하여 자금을 융통하는 것과 같이 여신전문금융업법 등 법령에 의하여 금지된 방법으로 비정상적인 결제를 하는 행위
                    f)회사가 정하지 않은 비정상적인 방법으로 포인트 또는 쿠폰을 취득하거나 사용하는 행위
                    g)적립 받은 포인트를 모두 소진한 후 고의로 환불하여 적립을 취소 함으로써 당사 및 제휴사의 손실을 발생시키는 행위
                    h)부당한 이익을 편취하는 행위와 법령 상 금지된 불공정행위(사업활동 방해 등)를 하여 회사와 타인의 영업에 피해를 주는 행위
                    특정 금융거래정보의 보고 및 이용 등에 관한 법률에서 정한 자금세탁행위 등과 같은 법률상 위법한 행위
                    ② 탈퇴 후 회원 재가입, 임의 해지 등을 반복하거나 다수의 아이디(ID)로 가입하여 회사가 제공하는 각종 할인쿠폰, 이벤트 혜택 등으로 경제적 이익을 편법으로 수취하고, 이 과정에서 명의를 무단으로 사용하는 등 편법과 불법 행위를 하는 회원을 차단하고자 회사는 부정회원에 대한 서비스 재개 및 재가입을 거부할 수 있습니다.
                    ③ 회원의 본조 위반이 있을 경우 당사는 해당 회원의 서비스 이용을 제한할 수 있으며, 현재 또는 장래의, 모든 또는 일부의 서비스 이용을 거절 할 수 있습니다. 또한 본조의 위반으로 인해 발생된 회원에 대한 제휴사 또는 관계기관에 의한 법적 조치 등에 관해서는 당사가 책임을 지지 않으며, 당사는 위와 같은 사실을 발견한 경우 필요한 별도의 법적 조치를 취할 수 있습니다.

                    제 41 조 (면책조항)
                    ① 당사는 회원이 이랜드리테일 멤버십의 서비스 제공으로부터 기대되는 이익을 얻지 못했거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 이랜드리테일 멤버십에 귀책사유가 없는 한 책임을 지지 않습니다.
                    ② 당사는 회원의 귀책사유로 인하여 발생한 서비스 이용의 장애에 대해서는 책임을 지지 않습니다.
                    ③ 당사는 회원이 게시 또는 전송한 자료의 내용에 대해서는 책임을 지지 않습니다.
                    ④ 당사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 담보로 하여 물품거래 등을 한 경우에 대해서는 책임을 지지 않습니다.

                    제 42 조 (분쟁조정)
                    본 약관에서 정하지 않은 분쟁의 조정은 관계법령 및 일반 상관례에 따릅니다.

                    제 43 조 (약관 위반시 책임)
                    본 약관을 위반함으로써 발생하는 모든 책임은 위반한 자가 부담하며, 이로 인하여 상대방에게 손해를 입힌 경우에는 배상하여야 합니다.

                    제 44 조 (관할법원)
                    ① 서비스 이용과 관련하여 회사와 회원 사이에 분쟁이 발생한 경우, 회사와 회원은 분쟁의 해결을 위해 성실히 협의합니다.
                    ② 본 조 제1항의 협의에서도 분쟁이 해결되지 않을 경우 본 약관에 의한 서비스 이용과 관련한 제반 분쟁 및 소송은 회원의 주소를 관할하는 법원에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다”

                    부칙

                    본 약관은 2024년 11월 15일부터 유효합니다.
                  </div>
                </li>
                <li>
                  <div className="chk_bx">
                    <input type="checkbox" id="join_terms2" name="join_terms2" aria-required="true" checked={isTermsChecked.includes("join_terms2")} onChange={(e)=> {chkChange(e.target.id); handleData(e);} }/>
                    <label className="chk_txt" htmlFor="join_terms2">
                        <span className="chk"></span>
                        <span className="txt">[필수] 개인정보 수집동의</span>
                    </label>
                  </div>
                  <button className="btn_more">전문보기</button>
                  <div className="txt">① 회사는 서비스제공을 위하여 필요한 최소한의 범위 내에서 아래와 같은 목적으로 개인정보를 수집하고 있습니다.
                    1. 서비스 제공에 관한 계약이행 및 서비스 제공에 따른 요금정산
                    - 컨텐츠 제공, 물품 및 경품 배송 또는 청구서 등 발송, 금융거래 본인인증 및 금융서비스, 구매 및 요금결제. 요금추심 이랜드레테일 Membership 포인트적립
                    2. 회원관리 
                    - 회원제 서비스 이용에 따른 본인 확인, 개인식별, 불량회원의 부정이용 방지와 비인가 사용 방지, 가입의사 확인 가입 및 가입횟수 제한, 법정대리인 동의여부 확인, 추후 법정대리인 본인 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
                    3. 마케팅 및 광고에 활용
                    신규 서비스(제품) 개발 및 특화, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계 등 업무와 관련된 각종 통계자료의 작성 및 서비스 개발, 이벤트 등 광고성 정보 전달 등 사은행사, 판촉행사, 광고물 발송
                    4. 기타
                    당사가 제공하는 서비스 및 이벤트 등 정보제공, 당사가 진행하는 행사 및 제휴행사의 안내. 서비스 홍보, 텔레마케팅, DM, EM 등의 정보제공 및 활용, 문화센터, 소극장 등의 안내정보 제공
                    필수적인 폭넓은 패키지 가시성 권한을 얻어 E페이 결제 서비스 사고 방지를 목적으로 단말에 설치된 악성 앱 탑지

                    ② 당사가 제1항의 목적에 따라 수집하는 회원의 개인정보는 아래와 같습니다.

                    1. 온라인 회원 가입시
                    [필수항목] 아이디, 비밀번호, 성명, 핸드폰번호, 이메일주소, 본인인증정보(CI, DI)
                    [선택항목] 주소, 생년월일, 결혼유무, 기념일, 선호지점
                    [목적] 회원의 서비스 이용 및 관리
                    [보유 및 이용기간] 회원 탈퇴시까지

                    2. 오프라인 회원 가입시
                    [필수항목] 성명, 성별, 주소, 핸드폰번호, 가입지점
                    [선택항목] 집전화번호, 결혼기념일, 생년월일, 이메일주소, 자녀정보(성명, 생년월일, 성별), 아이디, 비밀번호, 차량번호 및 입출차정보
                    [목적] 회원의 서비스 이용 및 관리
                    [보유 및 이용기간] 회원 탈퇴시까지

                    3. 카카오 간편가입
                    [필수항목] 프로필 정보(닉네임/프로필 사진), 이메일(아이디), 성별, 생일, 출생년도, 카카오계정(전화번호), CI, 본인확인정보(이름,생년월일,성별), 카카오톡 채널 추가 상태 및 내역, 배송지정보(수령인명,배송지 주소,전화번호

                    4. 네이버 간편가입
                    [필수항목] 이름, 생년월일, 핸드폰번호, 이메일 주소, CI
                    [선택항목] 별명, 프로필 사진, 성별, 생일, 연령대

                    5. 페이스북, 애플 간편가입
                    [필수항목] 이름, 이메일(아이디), 휴대폰번호
                    [선택항목] 성별, 생년월일

                    6. 휴대전화 및 아이핀을 이용한 본인인증 시
                    [필수항목] 핸드폰 본인 인증(이름, 생년월일, 성별, 휴대전화번호, 내국인 또는 외국인 여부), 아이핀 인증(아이핀 번호, 아이핀 비밀번호)

                    7. 고객센터 문의 시
                    [필수항목] 성명, 연락처 이메일 주소, 상담내용
                    [선택항목] 문의 답변을 받을 연락처

                    8. 현금영수증 발행 시
                    [선택항목] 핸드폰번호, 사업자번호, 현금영수증카드번호

                    9. 문화센터 강사 지원 시
                    [필수항목] 성명(한글/영문), 생년월일, 성별, 주소, E-mail, 휴대전화번호, 학력사항, 경력사항, 자격증, 외국어 능력
                    [선택항목] 자택전화번호, 은행 계좌번호, 건강정보
                    [수집목적] 인사관리
                    [보유 및 이용기간] 퇴직 후 3년 까지

                    10. 이맘클럽 가입 시
                    [필수항목] 자녀성명, 자녀나이
                    [수집목적] 이맘클럽 가입 대상자 확인 및 서비스 제공
                    [보유 및 이용기간] 이맘클럽 탈퇴 시

                    11. 그 외 수집되는 정보
                    - 서비스 이용 또는 사업처리 과정에서 생성되는 결제 관련 정보 (신용 및 체크카드번호 및 승인번호, 소득공제용 번호 및 승인번호 등), 무통장 입급 과정에서 환불계좌 정보
                    - 온라인서비스 이용기록 (쿠키, 접속IP, 접속로그, 회원정보 변경 이력)
                    - 모바일 애플리케이션 이용기록 (단말기 고유번호, 모바일 단말기 OS, OS 버전명, 모바일단말기 모델명, 이동통신회사, PUSH 수신여부, 위치기반서비스 제공을 위한 사용시각 및 장소, 서비스 이용을 위한 각종 약관동의 일자
                    - 그 외 수집하는 개인정보하는 형태 등 추가 필요
                    - 악성앱 설치 여부를 탐지하여 보다 안전한 환경에서 앱의 핵심기능인 E페이 서비스를 이용한 결제를 수행 할 수 있도록 이용자의 단말에 설치된 모든 앱 조회

                    ③ 회사는 고객님의 기본적 인권 침해의 우려가 있는 민감한 개인정보 (인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않습니다.

                    ④ 개인정보 수집방법
                    1. 전국 뉴코아아울렛, 이천일아울렛, NC백화점, 동아백화점 매장에서 이랜드리테일 회원가입 신청서를 통합 수집
                    2. "당사가 운영중인 온라인 웹사이트 홈페이지
                    (이랜드리테일 공식 홈페이지 www.elandretail.com, 이랜드리테일 원클릭 oneclick.elandretail.com) 이하 총칭하여 "이랜드리테일 홈페이지 등"")을 통한 수집."
                    3. 이랜드리테일 통합 온라인 회원관리 서비스인 이랜드리테일 원클릭(http://oneclick.elandretail.com)에서 수집된 마케팅 수신 동의내역은, 고객이 동의한 사이트에서 동의한 내역에 대해서만 사용됩니다.
                    4. 위의 3항에서 수집된 이랜드리테일 공식 홈페이지 마케팅 수신 동의여부는 이랜드리테일 오프라인 멤버십 시스템에도 전달되어 오프라인 매장(2001아울렛, NC백화점, NC아울렛, 뉴코아아울렛, 동아백화점)에서도 매체 별 동의여부에 따라 마케팅을 진행할 수 있습니다.

                    ⑤ 허위 정보 입력 시 회사의 조치
                    회원은 자신의 정보에 대해 정확성 및 적법성을 보장해야 하며, 이를 위반하거나 타인의 정보 도용 등 각종 불법적인 방법으로 허위 정보를 입력할 경우 회사는 회원을 관계법령에 따라 신고할 수 있으며 강제 탈퇴를 시킬 수도 있습니다.
                  </div>
                </li>
                <li>
                  <div className="chk_bx">
                    <input type="checkbox" id="join_terms3" name="join_terms3" checked={isTermsChecked.includes("join_terms3")} onChange={(e)=> {chkChange(e.target.id); handleData(e);} }/>
                    <label className="chk_txt" htmlFor="join_terms3">
                        <span className="chk"></span>
                        <span className="txt">[선택] 개인정보 수집동의</span>
                    </label>
                  </div>
                  <button className="btn_more">전문보기</button>
                  <div className="txt">① 회사는 서비스제공을 위하여 필요한 최소한의 범위 내에서 아래와 같은 목적으로 개인정보를 수집하고 있습니다.
                    1. 서비스 제공에 관한 계약이행 및 서비스 제공에 따른 요금정산
                    - 컨텐츠 제공, 물품 및 경품 배송 또는 청구서 등 발송, 금융거래 본인인증 및 금융서비스, 구매 및 요금결제. 요금추심 이랜드레테일 Membership 포인트적립
                    2. 회원관리 
                    - 회원제 서비스 이용에 따른 본인 확인, 개인식별, 불량회원의 부정이용 방지와 비인가 사용 방지, 가입의사 확인 가입 및 가입횟수 제한, 법정대리인 동의여부 확인, 추후 법정대리인 본인 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
                    3. 마케팅 및 광고에 활용
                    신규 서비스(제품) 개발 및 특화, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계 등 업무와 관련된 각종 통계자료의 작성 및 서비스 개발, 이벤트 등 광고성 정보 전달 등 사은행사, 판촉행사, 광고물 발송
                    4. 기타
                    당사가 제공하는 서비스 및 이벤트 등 정보제공, 당사가 진행하는 행사 및 제휴행사의 안내. 서비스 홍보, 텔레마케팅, DM, EM 등의 정보제공 및 활용, 문화센터, 소극장 등의 안내정보 제공
                    필수적인 폭넓은 패키지 가시성 권한을 얻어 E페이 결제 서비스 사고 방지를 목적으로 단말에 설치된 악성 앱 탑지

                    ② 당사가 제1항의 목적에 따라 수집하는 회원의 개인정보는 아래와 같습니다.

                    1. 온라인 회원 가입시
                    [필수항목] 아이디, 비밀번호, 성명, 핸드폰번호, 이메일주소, 본인인증정보(CI, DI)
                    [선택항목] 주소, 생년월일, 결혼유무, 기념일, 선호지점
                    [목적] 회원의 서비스 이용 및 관리
                    [보유 및 이용기간] 회원 탈퇴시까지

                    2. 오프라인 회원 가입시
                    [필수항목] 성명, 성별, 주소, 핸드폰번호, 가입지점
                    [선택항목] 집전화번호, 결혼기념일, 생년월일, 이메일주소, 자녀정보(성명, 생년월일, 성별), 아이디, 비밀번호, 차량번호 및 입출차정보
                    [목적] 회원의 서비스 이용 및 관리
                    [보유 및 이용기간] 회원 탈퇴시까지

                    3. 카카오 간편가입
                    [필수항목] 프로필 정보(닉네임/프로필 사진), 이메일(아이디), 성별, 생일, 출생년도, 카카오계정(전화번호), CI, 본인확인정보(이름,생년월일,성별), 카카오톡 채널 추가 상태 및 내역, 배송지정보(수령인명,배송지 주소,전화번호

                    4. 네이버 간편가입
                    [필수항목] 이름, 생년월일, 핸드폰번호, 이메일 주소, CI
                    [선택항목] 별명, 프로필 사진, 성별, 생일, 연령대

                    5. 페이스북, 애플 간편가입
                    [필수항목] 이름, 이메일(아이디), 휴대폰번호
                    [선택항목] 성별, 생년월일

                    6. 휴대전화 및 아이핀을 이용한 본인인증 시
                    [필수항목] 핸드폰 본인 인증(이름, 생년월일, 성별, 휴대전화번호, 내국인 또는 외국인 여부), 아이핀 인증(아이핀 번호, 아이핀 비밀번호)

                    7. 고객센터 문의 시
                    [필수항목] 성명, 연락처 이메일 주소, 상담내용
                    [선택항목] 문의 답변을 받을 연락처

                    8. 현금영수증 발행 시
                    [선택항목] 핸드폰번호, 사업자번호, 현금영수증카드번호

                    9. 문화센터 강사 지원 시
                    [필수항목] 성명(한글/영문), 생년월일, 성별, 주소, E-mail, 휴대전화번호, 학력사항, 경력사항, 자격증, 외국어 능력
                    [선택항목] 자택전화번호, 은행 계좌번호, 건강정보
                    [수집목적] 인사관리
                    [보유 및 이용기간] 퇴직 후 3년 까지

                    10. 이맘클럽 가입 시
                    [필수항목] 자녀성명, 자녀나이
                    [수집목적] 이맘클럽 가입 대상자 확인 및 서비스 제공
                    [보유 및 이용기간] 이맘클럽 탈퇴 시

                    11. 그 외 수집되는 정보
                    - 서비스 이용 또는 사업처리 과정에서 생성되는 결제 관련 정보 (신용 및 체크카드번호 및 승인번호, 소득공제용 번호 및 승인번호 등), 무통장 입급 과정에서 환불계좌 정보
                    - 온라인서비스 이용기록 (쿠키, 접속IP, 접속로그, 회원정보 변경 이력)
                    - 모바일 애플리케이션 이용기록 (단말기 고유번호, 모바일 단말기 OS, OS 버전명, 모바일단말기 모델명, 이동통신회사, PUSH 수신여부, 위치기반서비스 제공을 위한 사용시각 및 장소, 서비스 이용을 위한 각종 약관동의 일자
                    - 그 외 수집하는 개인정보하는 형태 등 추가 필요
                    - 악성앱 설치 여부를 탐지하여 보다 안전한 환경에서 앱의 핵심기능인 E페이 서비스를 이용한 결제를 수행 할 수 있도록 이용자의 단말에 설치된 모든 앱 조회

                    ③ 회사는 고객님의 기본적 인권 침해의 우려가 있는 민감한 개인정보 (인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않습니다.

                    ④ 개인정보 수집방법
                    1. 전국 뉴코아아울렛, 이천일아울렛, NC백화점, 동아백화점 매장에서 이랜드리테일 회원가입 신청서를 통합 수집
                    2. "당사가 운영중인 온라인 웹사이트 홈페이지
                    (이랜드리테일 공식 홈페이지 www.elandretail.com, 이랜드리테일 원클릭 oneclick.elandretail.com) 이하 총칭하여 "이랜드리테일 홈페이지 등"")을 통한 수집."
                    3. 이랜드리테일 통합 온라인 회원관리 서비스인 이랜드리테일 원클릭(http://oneclick.elandretail.com)에서 수집된 마케팅 수신 동의내역은, 고객이 동의한 사이트에서 동의한 내역에 대해서만 사용됩니다.
                    4. 위의 3항에서 수집된 이랜드리테일 공식 홈페이지 마케팅 수신 동의여부는 이랜드리테일 오프라인 멤버십 시스템에도 전달되어 오프라인 매장(2001아울렛, NC백화점, NC아울렛, 뉴코아아울렛, 동아백화점)에서도 매체 별 동의여부에 따라 마케팅을 진행할 수 있습니다.

                    ⑤ 허위 정보 입력 시 회사의 조치
                    회원은 자신의 정보에 대해 정확성 및 적법성을 보장해야 하며, 이를 위반하거나 타인의 정보 도용 등 각종 불법적인 방법으로 허위 정보를 입력할 경우 회사는 회원을 관계법령에 따라 신고할 수 있으며 강제 탈퇴를 시킬 수도 있습니다.
                  </div>
                </li>
                <li>
                  <div className="chk_bx">
                    <input type="checkbox" id="join_terms4" name="join_terms4" aria-required="true" checked={isTermsChecked.includes("join_terms4")} onChange={(e)=> {chkChange(e.target.id); handleData(e);} }/>
                    <label className="chk_txt" htmlFor="join_terms4">
                        <span className="chk"></span>
                        <span className="txt">[필수] 개인정보 제 3자 제공 동의</span>
                    </label>
                  </div>
                  <button className="btn_more">전문보기</button>
                  <div className="txt">제 1 조 (개인정보의 제3자 제공)
                    ① 당사는 고객이 개인정보를 사전 동의 없이 제3자에게 제공하지 않습니다.다만 정보 주체의 동의, 법률의 특별한 규정에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                    ② 당사는 보다 나은 서비스 제공, 고객편의 등을 위하여 동의하시는 고객에 한해서 아래와 같이 개인정보를 제3자에게 제공하고 있습니다.
                    
                    제 2 조 (개인정보 위탁 관리)
                    ① 당사는 서비스 이행 및 마케팅 업무를 위해 아래와 같이 개인정보 취급 업무를 외부 전문업체에 위탁하여 운영하고 있습니다.
                    a) 고객 정보 DB시스템 위탁 운영(전산 아웃소싱): ㈜이랜드이노플, ㈜라드씨엔에스, 소프트런치, cafe24, Amazon Web Service
                    - 보유 및 이용기간 : 위탁 계약 종료시까지
                    b) 오프라인 통합콜센터 직원관리 : ㈜디앤에이치피플(오프라인 통합콜센터)
                    - 보유 및 이용기간 : 위탁 계약 종료시까지
                    c) DM 발송 위탁 : ㈜빌포스트
                    - 보유 및 이용기간 : 위탁 계약 종료시까지
                    d) SMS 발송 위탁(마케팅 정보 제공을 위한 SMS 발송 위탁 포함) : ㈜이랜드이노플
                    - 보유 및 이용기간 : 위탁 계약 종료시까지
                    e) 결제정보 전송, 결제대행 업무 : ㈜이니시스
                    ③ 당사는 제1항에서 정한 업체가 변경되는 경우 이랜드멤버십 이용약관 제4조제 1항에서 정한 방법으로 회원에게 고지합니다.
                    
                    제 3 조 (개인정보의 보유. 이용기간 및 파기)
                    ① 당사는 개인정보의 수집목적 또는 제공받은 목적이 달성된 때에는 고객의 개인정보를 지체 없이 파기합니다.(단 고객가입 정보는 고객의 요구사항 처리, 포인트/적립금 소멸 일시 보류 등의 목적으로 고객탈퇴를 요청한 시점으로 "30일간 유예기간"을 두고 파기합니다.)
                    ② 제1항에도 불구하고, 상법 등 관련법령의 규정 및 내부 방침에 의하여 다음과 같이 거래관련 관리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있을 경우에는 개인정보를 일정기간 보유합니다.
                    1. 계약 또는 청약철회 등에 관한 기록: 5년
                    2. 대금결제 및 재화 등의 공급에 관한 기록: 5년
                    3. 소비자의 불만 또는 분쟁처리에 관한 기록: 3년
                    4. 웹사이트 방문 기록 : 3개월

                    ③ 파기방법
                    1. 종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각
                    2. 전자적 파일형태로 저장된 개인정보: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제

                    ④미이용자의 개인정보 파기 등에 관한 조치
                    1. 회사는 2015년 8월 이후 1년간 서비스를 이용하지 않은 이용자는 휴면계정으로 전환하고, 개인정보를 별도로 분리하여 보관합니다. 분리 보관된 개인정보는 1년간 보관 후 지체없이 파기합니다.
                    2. 미이용 산정 기간은 로그인, 상담원 상담일자, 백화점 고객서비스 이용을 기준으로 산정합니다.
                    3. 회사는 휴면전환 40일 전까지 휴면예정 회원에게 별도 분리 보관되는 사실 및 휴면 예정일, 별도 분리 보관하는 개인정보 항목을 LMS, SNS 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.
                    4. 휴면계정으로 전환을 원하지 않으시는 경우, 휴면계정 전환 전 서비스 로그인을 하시면 됩니다.
                    5. 휴면계정으로 전환된 고객 중 광고수신 동의 고객에 한해서는 광고가 발송 될 수 있습니다.

                    제 4 조 (개인정보의 열람. 정정. 탈퇴 및 동의 철회 방법)
                    ① 회원은 개인정보의 열람·정정·삭제·처리정지·회원탈퇴 요구를 할 수 있으며 해당 업무를 수행하기 위한 창구 및 방법은 아래와 같습니다.
                    1. 고객만족센터(고객상담실) :
                      - 오프라인 매장 통합 콜센터 02-530-5000, 온라인 콜센터 1899-9500)
                    2. 이랜드리테일 홈페이지 웹사이트에 방문하여 로그인 후 『정보수정』 클릭
                    ② 회원이 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인 정보를 제3자에게 이미 제공한 경우에는 정정 처리 결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 조치하겠습니다.
                    ③ 회원께서 개인정보 제3자 제공에 동의하신 내용은 당사의 지점 고객만족센터(고객상담실)에서 확인 하실 수 있으며 언제든지 동의 철회가 가능합니다.
                    ④ 회사는 회원의 요청에 의해 해지 또는 삭제된 개인정보는 회사가 수집하는 개인정보의 보유 및 이용 기간에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
                    ⑤ 회원 중 이랜드리테일 제휴 신용카드 가입 고객은 본인 신용카드의 개인정보를 수정 시 이랜드리테일 멤버십의 개인정보도 자동으로 연동되어서 수정됩니다.

                    제 5 조 개인정보 자동 수집 장치의 설치・운영 및 거부에 관한 사항
                    ① 회사의 이랜드리테일 홈페이지 등에서는 회원의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)'를 운영합니다. 쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 회원의 브라우저에 보내는 아주 작은 텍스트 파일로서 회원의 컴퓨터 하드디스크에 저장됩니다.
                    ② 이랜드리테일 홈페이지 등의 웹사이트에서는 다음과 같은 목적으로 쿠키를 사용합니다.
                    1. 회원과 비회원의 접속 빈도나 방문 시간 등을 분석하고 이용자의 취향과 관심분야를 파악하여 타겟(Target) 마케팅 및 서비스 개편 등의 척도로 활용합니다.
                    2. 쇼핑한 품목들에 대한 정보와 관심 있게 둘러본 품목들에 대한 자취를 추적하여 다음 번 쇼핑 때 개인 맞춤 서비스를 제공하는데 이용합니다.
                    3. 이랜드리테일 홈페이지 등에서 진행하는 각종 이벤트에서 회원의 참여 정도 및 방문 회수를 파악하여 차별적인 응모 기회를 부여하고 개인의 관심 분야에 따라 차별화 된 정보를 제공하기 위한 자료로 이용됩니다.
                    4. 회원은 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 회원은 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수 있습니다.
                    ㅇ 웹브라우저를 통한 맞춤형 광고 차단/허용
                    (1) 인터넷 익스플로러(Windows 10용 Internet Explorer 11)
                    - Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택
                    - 개인 정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택
                    (2) Microsoft Edge
                    - Edge에서 오른쪽 상단'•••' 표시를 클릭한 후, 설정을 클릭합니다.
                    - 설정 페이지 좌측의 '개인정보, 검색 및 서비스'를 클릭 후 「추적방지」 섹션에서 '추적방지' 여부 및 수준을 선택합니다.
                    - 'InPrivate를 검색할 때 항상 "엄격" 추적 방지 사용' 여부를 선택합니다.
                    - 아래 「개인정보」 섹션에서 '추적 안함 요청보내기' 여부를 선택합니다.
                    (3) 크롬 브라우저
                    - Chrome에서 오른쪽 상단 점 3개 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다.
                    - 설정 페이지 하단에 '고급 설정 표시'를 클릭하고, 「개인정보」 섹션에서 콘텐츠 설정을 클릭합니다.
                    - 쿠키 섹션에서 '타사 쿠키 및 사이트 데이터 차단'의 체크박스를 선택합니다.
                    * 회원께서 쿠키 설치를 거부하셨을 경우, 이랜드리테일 홈페이지 등의 웹 사이트 서비스 제공에 어려움이 있습니다.
                    ③ 회사는 자사가 운영하는 웹,앱에서 다음과 같이 행태정보를 수집하고 있습니다.  

                    제 6 조 개인정보 자동 수집 장치를 통해 제3자가 행태정보를 수집하도록 허용하는 경우 그 수집 이용 및 거부에 관한 사항
                    ① 회사는 사용자가 웹사이트, 앱을 방문하거나 이용하는 경우, 효과적인 서비스 이용과 광고 및 마케팅을 위해 쿠키 및 타사가 제공하는 SDK를 포함한 태그 등을 이용하고 있습니다.
                    ② 회사의 웹, 앱으로부터 제3자가 수집해가는 행태정보는 다음과 같습니다.

                    제 7 조 (개인정보 안전성 확보조치)
                    ① 회사는 회원의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 및 물리적 대책을 강구하고 있습니다.
                    1. 개인정보처리 시스템에 대한 접근권한을 개인정보 보호 책임자, 개인정보 취급자에게만 부여하고, 이들에 대한 인사이동이 있는 경우, 접근권한을 변경, 말소합니다.
                    2. 개인정보 취급자로 하여금 외부의 정보통신망을 통하여 개인정보처리 시스템에 접속할 수 없도록 합니다.
                    3. 외부의 불법적인 접근제한 및 침해방지를 위한 시스템을 사용하고, 접속기록을 2년간 보관합니다.
                    4. 회원이 안전한 비밀번호를 사용할 수 있도록 규칙을 정하고, 개인정보는 암호화하는 등의 방법으로 보호합니다.
                    5. 개인정보 취급자를 대상으로 비밀번호 작성규칙(영문 대문자 26개, 영문 소문자 26개, 숫자 10개, 특수문자 32개 중 2종류 이상을 조합하여 최소 10자리 이상 또는 3종류 이상을 조합하여 8자리 이상으로 구성)을 수립하고 이를 운용합니다.
                    6. 접속기록의 위 변조 방지를 위하여 월 1회 이상 정기적으로 확인, 감독하고, 접속기록은 2년 이상 보관하며, 별도의 저장장치에 보관하면서 정기적으로 백업을 시행합니다.
                    7. 회사는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치(Secure Socket Layer)를 채택하여 각종 정보를 암호화 하여 운영합니다.
                    8. 해킹 등에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위해, 외부로부터의 허가 받지 않은 접근을 차단하기 위한 2중 방화벽(일반방화벽, 홈페이지 전용방화벽)을 사용하고 있으며, 각 서버는 침입탐지/방어 시스템에 의하여 24시간 모니터링 되고 있습니다.
                    9. 개인정보에 대한 인쇄, 미리보기, 파일생성 등 방지조치를 하여 출력을 할 수 없도록 합니다.
                    10. 출력, 복사의 경우, 이와 관련된 각종 사항을 기록하고 개인정보관리책임자로부터 승인을 받도록 합니다.
                    ② 회사는 개인정보취급직원을 최소한으로 제한하고 담당직원에 대한 수시교육을 통하여 본 방침의 준수를 강조하고 있으며, 이와 관련된 문제가 발견될 경우 바로 시정조치하고 있습니다.
                    ③ 회사는 회원의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 아니하며, 회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의 ID와 비밀번호를 안전하게 관리하고 여기에 대한 책임을 져야 합니다. 그 외 내부관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 회사는 즉각 회원에게 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.

                    제 8 조 (14세 미만 아동의 개인정보 보호)
                    ①만14세 미만 아동의 경우 회원가입이 불가합니다.

                    제 9 조 (광고성 정보 전송)
                    ①회사는 이용자의 명시적인 수신거부의사에 반하여 영리목적의 광고성 정보를 전송하지 않습니다.
                    ②회사는 상품정보 안내 등 온라인 마케팅을 위해 광고성 정보를 전자우편 등으로 전송하는 경우 전자우편의 제목란 및 본문란에 다음 사항과 같이 회원이 쉽게 알아 볼 수 있도록 조치합니다.
                    1. 전자우편의 제목란: (광고) 또는 (성인광고)라는 문구를 제목란의 처음에 빈칸 없이 한글로 표시 하고 이어서 전자우편 본문란의 주요 내용을 표시합니다.
                    2. 전자우편의 본문란: 회원이 수신거부의 의사표시를 할 수 있는 전송자의 명칭, 전자우편 주소, 전화번호 및 주소를 명시하되, 회원이 수신거부의 의사를 쉽게 표시할 수 있는 방법을 한글 및 영문으로 각각 명시합니다.
                    ③ 다음과 같이 청소년에게 유해한 정보를 전송하는 경우 (성인광고) 문구를 표시합니다.
                    1. 본문란에 다음 각 항목의 어느 1에 해당하는 것이 부호,문자,영상 또는 음향의 형태로 표현된 경우(해당 전자우편의 본문란에는 직접 표현되어 있지 아니하더라도 수신자가 내용을 쉽게 확인할 수 있도록 기술적 조치가 되어 있는 경우를 포함한다)에는 해당 전자우편의 제목란에 "(성인광고)" 문구를 표시합니다.
                    가. 청소년(19세 미만의 자를 말합니다. 이하 같습니다.) 에게 성적인 욕구를 자극하는 선정적인 것이거나 음란한 것
                    나. 청소년에게 포악성이나 범죄의 충동을 일으킬 수 있는 것
                    다. 성폭력을 포함한 각종 형태의 폭력행사와 약물의 남용을 자극하거나 미화하는 것
                    라. 청소년보호법에 의하여 청소년유해매체물로 결정 고시된 것
                    2. 영리목적의 광고성 전자우편 본문란에서 제3항제1호라목에 해당하는 내용을 다룬 인터넷 홈페이지를 알리는 경우에는 해당 전자우편의 제목란에 "(성인광고)"문구를 표시합니다.

                    제 10 조 (고지의 의무)
                    현 개인정보처리방침은 2024년 8월 23일에 개정되었으며 정부의 정책 또는 보안기술의 변경에 따라 내용의 추가 삭제 또는 수정이 있을 시에는 개정 7일전부터 홈페이지 등의 공지란을 통해 고지할 것입니다.
                    공고일자: 2024년 8월 23일
                    시행일자: 2024년 8월 30일
                  </div>
                </li>
              </ul>
            </div>
            <div className="tb_item">
              <h3 className="tit">마케팅 정보 수신동의<button className="btn_pop" data-popup="join_mk" onClick={(e)=>modalPop(e)}>?</button></h3>
              <div className="modal_info" data-popup="join_mk">
                <h4 className="tit">[선택] 서비스 정보를 받으시려면 동의해주세요.</h4>
                <div className="bg_bx">
                  ㈜이랜드리테일(NC백화점,뉴코아아울렛 외),<br/>
                  ㈜이랜드월드(스파오,에블린 외),<br/>
                  ㈜이랜드이츠(애슐리 외),<br/>
                  ㈜이랜드파크(켄싱턴호텔&리조트),<br/>
                  ㈜이월드쥬얼리사업부(로이드 외),<br/>
                  ㈜이월드(테마파크)/이랜드크루즈/코코몽키즈랜드<br/>
                  / ㈜이랜드팜앤푸드(애슐리 홈스토랑)
                </div>
                <div className="txt_bx">
                  <h4 className="dot">·&nbsp;&nbsp;모바일 쿠폰북 수신동의시</h4>
                  <p className="txt">
                    E.POINT 2000포인트를 지급해드리며 다양한 혜택을<br/>
                    받으실 수 있습니다. 1월1일 APP에서 사용 가능하며<br/>
                    최소 1개 이상의 채널 동의시에 지급됩니다. 선택항목에<br/>
                    동의하지 않으셔도 가입은 가능하나, 관련 서비스를<br/>
                    제공받지 못하실 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="chk_cont">
                <span className="chk_bx">
                  <input type="checkbox" id="join_mk1" name="join_mk_mail" onChange={(e)=>handleData(e)}/>
                  <label className="chk_txt" htmlFor="join_mk1">
                      <span className="chk"></span>
                      <span className="txt">메일 수신</span>
                  </label>
                </span>
                <span className="chk_bx">
                  <input type="checkbox" id="join_mk2" name="join_mk_sms" onChange={(e)=>handleData(e)}/>
                  <label className="chk_txt" htmlFor="join_mk2">
                      <span className="chk"></span>
                      <span className="txt">SMS 수신</span>
                  </label>
                </span>
                <span className="chk_bx">
                  <input type="checkbox" id="join_mk3" name="join_mk_dm" onChange={(e)=>handleData(e)}/>
                  <label className="chk_txt" htmlFor="join_mk3">
                      <span className="chk"></span>
                      <span className="txt">DM 수신</span>
                  </label>
                </span>
                <span className="chk_bx">
                  <input type="checkbox" id="join_mk4" name="join_mk_coupon" onChange={(e)=>handleData(e)}/>
                  <label className="chk_txt" htmlFor="join_mk4">
                      <span className="chk"></span>
                      <span className="txt">쿠폰북 수신</span>
                  </label>
                </span>
              </div>
            </div>
            <div className="btn_wrap column">
              <button type="submit" className="btn_dark" onClick={(e)=>handleSubmit(e)}>회원가입</button>
              {/* <Link to="/member/join/result" className="btn_dark" onClick={(e)=>handleSubmit(e)}>회원가입</Link> */}
            </div>

          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;