import { useContext } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { NoticeContext } from "../context/NoticeContext";

import "../assets/scss/NoticeCard.scss";
import "./Home.scss";


const Home = () => {
  const { notice, event, visual } = useContext(NoticeContext);

  const setVisual = {
    infinite: true,
    className: "center",
    // slide: "div",
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
    // slide: 'ul',
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: true,
    arrows: true,
    speed: 500,
    autoplay : false,
    // afterChange: handleChange,
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
          // afterChange: handleAfterChange,
        }
      }
    ]
  }


  return (
    <>
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
          <article className="main__notice" data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
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
          <article className="main__banner" data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
            <div className="layout_fix" data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
              <h3>모두가 누리는 맛있는 세상<br/>당신의 열정과 꿈을 키우세요!</h3>
              <Link to="https://elandeats.career.greetinghr.com" target="_blank" className="btn_link">채용 바로가기</Link>
            </div>
          </article>
          <article className="main__event" rel="js-main-event" data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
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
          <article className="main__insta">
            <div className="layout_fix" data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
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