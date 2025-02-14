import { useContext, useState,useEffect } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { BoardContext } from "../context/BoardContext";

import "../assets/scss/NoticeCard.scss";
import "./Home.scss";


const Home = () => {
  const { notice, event, visual } = useContext(BoardContext);

    //===Hello Modal
    const [hello,setHello] = useState(true);
    useEffect(()=>{
      const hasHello = localStorage.getItem('hasHello');
      hasHello ? setHello(false) : localStorage.setItem('hasHello', 'true');
    },[])
    const handleHello = ()=> setHello(false);


  //===Slick Setting
  const setVisual = {
    initialSlide: 0,
    infinite: true,
    className: "center",
    slide: 'div',
    draggable : false,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 1,
    vertical : false, //방향
    // slidesPerRow: 1,
    // rows: 3,
    arrows: true,
    appendArrows: document.querySelector(".main__visual .swiper-arrow"),
    prevArrow: document.querySelector(".main__visual .swiper-prev"),
    nextArrow: document.querySelector(".main__visual .swiper-next"),
    autoplay : true,
    autoplaySpeed: 3000,
    speed: 500,
    dots: true, // pagination
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          autoplay : true,
          autoplaySpeed: 2500,
          draggable : true,
          centerPadding: "0",
          arrows: false,
        }
      }
    ]
  };
  const setEvent = {
    initialSlide: 0,
    infinite: false,
    draggable : true,
    touchThreshold:10000,
    pauseOnHover: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: true,
    arrows: true,
    speed: 500,
    autoplay : false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          initialSlide: 0,
          infinite: true,
          pauseOnHover: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay : true,
          autoplaySpeed: 3000,
          arrows: false,
        }
      }
    ]
  }


  return (
    <>
     { hello && (
        <div id="modal" className="modal_info">
          <div className="contents">
            <div className="hello">
            <h2>🚩 프로젝트 기능을 소개해드리겠습니다!</h2>
            <p className="help">※ 해당 창을 다시 보시려면<br/>
              ( F12 )&nbsp;&nbsp;&gt;&nbsp;&nbsp;<button onClick={()=>{ navigator.clipboard.writeText('localStorage.removeItem("hasHello")'); alert("복사!"); }}>{`localStorage.removeItem("hasHello")`}</button>
            </p>
            <div className="txt">
              <b>## 공지사항</b><br/>
              - JSON 데이터<br/>
              - 카테고리 분류 (전체)<br/>
              - 카테고리별 이전글 / 다음글<br/>
              - 날짜 순서 정렬<br/>  
              - 페이지네이션<br/> 
              <br/>
              <b>## 이벤트</b><br/>
              - JSON 데이터<br/>
              - 카테고리 뱃지<br/>  
              - 날짜 남은 기간 및 진행상태 뱃지<br/>
              - 날짜 순서 정렬<br/>
              - 페이지네이션<br/>  
              <br/>
              <b>## 매장안내</b><br/>
              - JSON 데이터<br/>
              - 매장명 검색<br/> 
              - 페이지네이션<br/>
              <br/>
              <b>## 멤버십</b><br/>
              <br/>
              <b>## 고객센터</b><br/>
              - JSON 데이터<br/>
              - 카테고리 분류<br/>
              - 카테고리별 아코디언<br/> 
              <br/>
              <b>## 로그인 및 회원가입</b><br/>
              - SQLite3<br/>
              - Cloudtype 서버 배포<br/>
              - Vercel 프론트 배포<br/>
              <br/>
              <b>## 슬라이더</b><br/>
              - Slick<br/>
            </div>
            </div>
            <div className="btn_wrap">
              <button onClick={handleHello}>닫기</button>
            </div>
          </div>
        </div>
      ) }
      <div id="main">
        <div id="contents">
        <section className="main_section">
          <article className="main__visual" rel="js-main-visual">
            <div className="layout_fix">
            <Slider {...setVisual} className="slick_visual">
              { visual.map(el => (
                  <div key={el.id} className="slide_item">
                    <Link to={`/event/detail?id=${el.id}`} target="_blank">
                        <img src={el.imgPc} alt={el.subject} className="pc"/>
                        <img src={el.imgMo} alt={el.subject} className="mo"/>
                    </Link>
                  </div>
              )) }
            </Slider>
            </div>
          </article>
          <article className="main__notice">
            <div className="layout_fix">
              <div className="heading">
                <h2 className="tit">공지사항<Link to="/notice" className="btn_more">더보기</Link></h2>
              </div>
              <ul className="card_list">
                { notice && notice.slice(0,6).map(el=> (
                  <li key={el.id}>
                    <Link to={{ pathname:`/notice/detail`, search:`?category=all&id=${el.id}` }} className="item">
                    {/* <Link to={{ pathname:`/notice/detail`, search:`?category=${noticeEnMapping[el.category]}&id=${el.id}` }} className="item"> */}
                      <span className="badge_txt">{el.category}</span>
                      <p className="tit">{el.subject}</p>
                      <p className="date">{el.date}</p>
                    </Link>
                  </li>
                )) }
              </ul>
            </div>
          </article>
          <article className="main__banner">
            <div className="layout_fix">
              <h3>모두가 누리는 맛있는 세상<br/>당신의 열정과 꿈을 키우세요!</h3>
              <Link to="https://elandeats.career.greetinghr.com" target="_blank" className="btn_link">채용 바로가기</Link>
            </div>
          </article>
          <article className="main__event" rel="js-main-event">
            <div className="layout_fix">
              <div className="heading">
                <h2 className="tit">이벤트<Link to="/event" className="btn_more">더보기</Link></h2>
                {/* <div className="swiper-arrow">
                  <a className="swiper-prev" href="#">이전</a>
                  <a className="swiper-next" href="#">다음</a>
                </div> */}
              </div>
              <div className="event_data">
                <Slider {...setEvent} className="slick_event event_list">
                    { event.slice(0,6).map(el => {
                    return (
                      <div key={el.subject} className="slide_item">
                        <Link to={`/event/detail?id=${el.id}`}>
                          <div className="item">
                            <span className="badge">{el.category}</span>
                            {/* {console.log(el.dDay >= 0, el.dDay === 0, el.dDay !== 0, typeof el.dDay)} */}
                            { event && (
                              <span className={`badge_date ${el.dDay < 0 ? "end" : "ing"}`}>{`${el.dDay === "0" ? "상시" : el.dDay === 0 ? "D-Day" : el.dDay > 0 ? `D-${el.dDay}` : "종료"}`}</span>
                            ) }
                            <p className="tit">{el.subject}</p>
                            <p className="date">{ el.dateStart === el.dateEnd ? el.dateStart : `${el.dateStart} ~  ${el.dateEnd}` }</p>
                          </div>
                          <img src={el.imgThumb} alt={el.subject}/>
                        </Link>
                      </div>
                    )
                    } ) }
                  </Slider>
              </div>
            </div>
          </article>
          <article className="main__insta" onClick={()=>alert("이미지입니다!")}>
            <div className="layout_fix">
              <div className="heading">
                <h2 className="tit">Instagram</h2>
                <p className="desc">@Your_ashley</p>
              </div>
              <img className="pc" src="./images/insta-group.png" alt="인스타더미" style={{cursor:"pointer"}}/>
              <img className="mo" src="./images/insta-group-mo.png" alt="인스타더미" style={{cursor:"pointer"}}/>
            </div>
          </article>
        </section>
      </div>
      </div>
    </>
  );
};

export default Home;