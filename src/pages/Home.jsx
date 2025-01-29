import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { NoticeContext } from "../context/NoticeContext";
import "../assets/scss/NoticeCard.scss";


// import "../context/NoticeContext.json";
import "./Home.scss";
// import { Link } from 'react-router-dom';


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


const Home = () => {
  const { notice } = useContext(NoticeContext);
  console.log("notice==",notice);
  // const noticePanel = notice.noticeList.slice(0,6);
  // console.log("noticePanel",noticePanel);
  
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
                <div className="slide_item">
                    <a href="#" target="_blank">
                      <img src="images/visual-banner1.png" alt="배너 이미지1" className="pc"/>
                      <img src="images/visual-banner1-mo.png" alt="배너 이미지1" className="mo"/>
                    </a>
                </div>
                <div className="slide_item">
                  <a href="#" target="_blank">
                    <img src="images/visual-banner-gif2.gif" alt="배너 이미지2" className="pc"/>
                    <img src="images/visual-banner-gif2-mo.gif" alt="배너 이미지2" className="mo"/>
                  </a>
                </div>
                <div className="slide_item">
                  <a href="#" target="_blank">
                    <img src="images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                    <img src="images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
                  </a>
                </div>
            </Slider>


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
                <h2 className="tit">공지사항<Link to="/notice" className="btn_more"></Link></h2>
              </div>
              <ul className="card_list">
                { notice.noticeList && notice.noticeList.slice(0,6).map(el=> (
                  <li key={el.id}>
                    <Link to="/" className="item">
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
              <a href="#" className="btn_link">채용 바로가기</a>
            </div>
          </article>
          <article className="main__event" rel="js-main-event" data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
            <div className="layout_fix">
              <div className="heading">
                <h2 className="tit">이벤트<a href="#" className="btn_more"></a></h2>
                <div className="swiper-arrow">
                  <a className="swiper-prev" href="#">이전</a>
                  <a className="swiper-next" href="#">다음</a>
                </div>
              </div>
              <div className="swiper-container">
                <ul className="event_list swiper-wrapper">
                    <li className="swiper-slide" data-index="1">
                      <a href="#" target="_blank">
                        <div className="item">
                          <span className="badge">슐리데이</span>
                          <p className="tit">
                            매월 마지막 화·수요일은<br/>
                            애슐리퀸즈 슐리데이
                          </p>
                          <p className="date">2024-08-30 ~ 2024-08-31</p>
                        </div>
                        <img src="./images/main-event-img1.jpg" alt="이벤트 이미지1"/>
                      </a>
                  </li>
                  <li className="swiper-slide" data-index="2">
                    <a href="#" target="_blank">
                      <div className="item">
                        <span className="badge">방문포장</span>
                        <p className="tit">
                          집에서 즐기는 뷔폐<br/>
                          애슐리 딜리버리<br/>
                          방문포장 10% 할인
                        </p>
                        <p className="date">2024-08-30 ~ 2024-09-31</p>
                      </div>
                      <img src="./images/main-event-img2.jpg" alt="이벤트 이미지2"/>
                    </a>
                  </li>
                  <li className="swiper-slide" data-index="3">
                    <a href="#" target="_blank">
                      <div className="item">
                        <span className="badge">프로모션</span>
                        <p className="tit">
                          초복에는 하루종일<br/>
                          애슐리 퀸즈<br/>
                          생맥주 무제한 무료!
                        </p>
                        <p className="date">2024-07-01 ~ 2024-08-08</p>
                      </div>
                      <img src="./images/main-event-img3.jpg" alt="이벤트 이미지3"/>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="swiper-pager"></div>
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