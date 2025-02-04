import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { NoticeContext } from "../context/NoticeContext";
import "../assets/scss/NoticeCard.scss";


// import "../context/NoticeContext.json";
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
    autoplay : false,
    speed: 500,
    dots: true, // pagination
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
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
    autoplay : true,
    // afterChange: handleChange,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          initialSlide: 0,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          // afterChange: handleAfterChange,
        }
      }
    ]
  }


  return (
    <>
      <div id="main">
        <div id="quick">
          <ul>
            <li title="채용"><a href="#">채용</a></li>
            <li title="온라인몰"><a href="#">온라인몰</a></li>
            <li title="딜리버리/TO-GO"><a href="#">딜리버리 / TO-GO</a></li>
          </ul>
          <a href="#!" className="pageTop"><img src="images/quick-top.png" alt=""/></a>
        </div>
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
              {/* <div className="slide_item">
                <Link to="/" target="_blank">
                    <img src="images/visual-banner1.png" alt="배너 이미지1" className="pc"/>
                    <img src="images/visual-banner1-mo.png" alt="배너 이미지1" className="mo"/>
                </Link>
              </div>
              <div className="slide_item">
                <Link to="/" target="_blank">
                  <img src="images/visual-banner-gif2.gif" alt="배너 이미지2" className="pc"/>
                  <img src="images/visual-banner-gif2-mo.gif" alt="배너 이미지2" className="mo"/>
                </Link>
              </div>
              <div className="slide_item">
                <Link to="/" target="_blank">
                  <img src="images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                  <img src="images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
                </Link>
              </div> */}


            {/* <div className="swiper-container">
                <ul className="swiper-wrapper">
                    <li className="swiper-slide" data-index="1">
                      <a href="#" target="_blank">
                        <img src="images/visual-banner1.png" alt="배너 이미지1" className="pc"/>
                        <img src="images/visual-banner1-mo.png" alt="배너 이미지1" className="mo"/>
                      </a>
                  </li>
                  <li className="swiper-slide" data-index="2">
                    <a href="#" target="_blank">
                      <img src="images/visual-banner-gif2.gif" alt="배너 이미지2" className="pc"/>
                      <img src="images/visual-banner-gif2-mo.gif" alt="배너 이미지2" className="mo"/>
                    </a>
                  </li>
                  <li className="swiper-slide" data-index="3">
                    <a href="#" target="_blank">
                      <img src="images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                      <img src="images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
                    </a>
                  </li>
                  <li className="swiper-slide" data-index="1">
                      <a href="#" target="_blank">
                        <img src="images/visual-banner1.png" alt="배너 이미지1" className="pc"/>
                        <img src="images/visual-banner1-mo.png" alt="배너 이미지1" className="mo"/>
                      </a>
                  </li>
                  <li className="swiper-slide" data-index="2">
                    <a href="#" target="_blank">
                      <img src="images/visual-banner-gif2.gif" alt="배너 이미지2" className="pc"/>
                      <img src="images/visual-banner-gif2-mo.gif" alt="배너 이미지2" className="mo"/>
                    </a>
                  </li>
                  <li className="swiper-slide" data-index="3">
                    <a href="#" target="_blank">
                      <img src="images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                      <img src="images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="swiper-pager"></div>
              <div className="swiper-arrow">
                <a className="swiper-prev" href="#">이전</a>
                <a className="swiper-next" href="#">다음</a>
              </div> */}


            {/* <Swiper className="swiper_visual"
                modules={[Autoplay, Navigation, Pagination, A11y]}
                init={true}
                // effect='slide'
                initialSlide={0}
                loop={document.querySelectorAll(".main__visual .swiper-slide").length > 2 ? true : false}
                // loop={true}
                // observer={true}
                // observeParents={true}
                slidesPerView={1}
                // loopedSlides={1} //err
                // loopedSlides={3}
                // loopAdditionalSlides={1}
                // loopAdditionalSlides={1}
                spaceBetween={0}
                // centeredSlides={true}
                watchOverflow={true}
                allowTouchMove={false}
                // grabCursor={false}
                // navigation={{ prevEl:'.swiper-prev', nextEl:'.swiper-next' }}
                navigation={{
                  prevEl: '[rel="js-main-visual"] .swiper-prev',
                  nextEl: '[rel="js-main-visual"] .swiper-next',
                }}
                pagination={{ type:'bullets', clickable: true }}
                // autoplay={{
                //   delay: 3500,
                //   disableOnInteraction: false,
                // }}
                    //     navigation: {
    //       prevEl: '[rel="js-main-visual"] .swiper-prev',
    //       nextEl: '[rel="js-main-visual"] .swiper-next',
    //     },
                // onSwiper={(e) => { console.log("load",e) }}
                // onSwiper={handleSwiperInit}
                // onActiveIndexChange={(e)=> { console.log(e) } }
                onSlideChange={(swiper) => {
                  console.log(swiper)
                  // const maxTranslate = -1300; // 최대 이동 범위 설정
                  // if (swiper.translate < maxTranslate) {
                  //   swiper.setTranslate(maxTranslate);  // transform 값을 최대 범위로 제한
                  // }
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.update();
                }}
                // onSlideChange={(swiper)=>{ swiper.update(); }}
                // onActiveIndexChange={(swiper) => {
                //   setTimeout(() => {
                //     if(swiper.slides){
                //       console.log(swiper.slides[swiper.activeIndex].getAttribute('data-swiper-slide-index'))
                //     }
                //   }, 0);
                // }}
                // swiperRef.current.update();
                // onActiveIndexChange={(e)=> { console.log("change",e) }}
                breakpoints={{
                  992: {
                    spaceBetween: 60
                  }
                }}
              >
              <SwiperSlide data-index="1">
                <Link to="/" target="_blank">
                  <img src="./images/visual-banner1.png" alt="배너 이미지1" className="pc"/>
                  <img src="./images/visual-banner1-mo.png" alt="배너 이미지1" className="mo"/>
                </Link>
              </SwiperSlide>
              <SwiperSlide data-index="2">
                <Link to="/" target="_blank">
                  <img src="./images/visual-banner-gif2.gif" alt="배너 이미지2" className="pc"/>
                  <img src="./images/visual-banner-gif2-mo.gif" alt="배너 이미지2" className="mo"/>
                </Link>
              </SwiperSlide>
              <SwiperSlide data-index="3">
                <Link to="/" target="_blank">
                  <img src="./images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                  <img src="./images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
                </Link>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-arrow">
              <span className="swiper-prev" ref={prevRef}>left</span>
              <span className="swiper-next" ref={nextRef}>right</span>
            </div> */}

           


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