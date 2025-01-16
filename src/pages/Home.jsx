import { useEffect } from 'react';

// import { Autoplay,Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

import "./Home.scss";


const Home = () => {
  useEffect(() => {
    if (window.Swiper) {
      const swiperVisual = new window.Swiper('[rel="js-main-visual"] .swiper-container', {
        loop: true,
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        // loopedSlides: 1,
        // loopAdditionalSlides: 1,

        // loopedSlides: 1,  // 한 번에 반복할 슬라이드 수 설정
        // loopAdditionalSlides: 0, // 추가 슬라이드가 복제되지 않도록 설정

        spaceBetween: 0,
        centeredSlides: true,
        watchOverflow: true,
        allowTouchMove: true,
        grabCursor: false,
        pagination: {
          el: '[rel="js-main-visual"] .swiper-pager',
          type: "bullets",
          clickable: true,
        },
        navigation: {
          prevEl: '[rel="js-main-visual"] .swiper-prev',
          nextEl: '[rel="js-main-visual"] .swiper-next',
        },
        speed: 1000,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          992: {
            spaceBetween: 60,
          },
        },
      });
      swiperVisual.on('slideChange', () => {
        swiperVisual.pagination.update();
      });
    }
  }, []);
  

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
            <div className="swiper-container">
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
                  <li className="swiper-slide" data-index="3">
                    <a href="#" target="_blank">
                      <img src="images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                      <img src="images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
                    </a>
                  </li>
                  <li className="swiper-slide" data-index="3">
                    <a href="#" target="_blank">
                      <img src="images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                      <img src="images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
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
              </div>



            {/* <Swiper className="swiper-visual" rel="js-main-visual"
                modules={[Autoplay, Navigation, Pagination]}
                // init={true}
                // initialSlide={0}
                loop={true}
                observer={true}
                observeParents={true}
                slidesPerView={1}
                // loopedSlides={1}
                // loopAdditionalSlides={1}
                spaceBetween={0}
                // centeredSlides={true}
                watchOverflow={true}
                allowTouchMove={true}
                grabCursor={false}
                navigation={{ prevEl:'.swiper-prev', nextEl:'.swiper-next' }}
                pagination={{ type:'bullets', clickable: true }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                // navigation={{
                //   prevEl: '.swiper-prev',
                //   nextEl: '.swiper-next',
                // }}
                breakpoints={{
                  992: {
                    spaceBetween: 60
                  }
                }}
              >
              <SwiperSlide data-index="1">
                <a href="#" target="_blank">
                  <img src="./images/visual-banner1.png" alt="배너 이미지1" className="pc"/>
                  <img src="./images/visual-banner1-mo.png" alt="배너 이미지1" className="mo"/>
                </a>
              </SwiperSlide>
              <SwiperSlide data-index="2">
                <a href="#" target="_blank">
                  <img src="./images/visual-banner-gif2.gif" alt="배너 이미지2" className="pc"/>
                  <img src="./images/visual-banner-gif2-mo.gif" alt="배너 이미지2" className="mo"/>
                </a>
              </SwiperSlide>
              <SwiperSlide data-index="3">
                <a href="#" target="_blank">
                  <img src="./images/visual-banner-gif1.gif" alt="배너 이미지3" className="pc"/>
                  <img src="./images/visual-banner-gif1-mo.gif" alt="배너 이미지3" className="mo"/>
                </a>
              </SwiperSlide>
            </Swiper> */}
           


            </div>
          </article>
          <article className="main__notice" data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
            <div className="layout_fix">
              <div className="heading">
                <h2 className="tit">공지사항<a href="#" className="btn_more"></a></h2>
              </div>
              <ul className="card_list">
                <li>
                  <a href="#" className="item">
                    <span className="badge_txt">애슐리 오픈</span>
                    <p className="tit">9월 27일 (금)<br/>던던 동대문점<br/>GRAND OPENING</p>
                    <p className="date">2024-09-11</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <span className="badge_txt">신메뉴</span>
                    <p className="tit">애슐리 퀸즈<br/>See Food Seafood<br/>9/5 (THU) 전매장 출시 출시</p>
                    <p className="date">2024-09-02</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <span className="badge_txt">신메뉴</span>
                    <p className="tit">애슐리 퀸즈<br/>시푸드 신메뉴<br/>선출시 매장 안내</p>
                    <p className="date">2024-08-12</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <span className="badge_txt">애슐리 오픈</span>
                    <p className="tit">8월 23일 (금)<br/>롯데백화점 대구점<br/>GRAND OPENING</p>
                    <p className="date">2024-08-09</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <span className="badge_txt">공지</span>
                    <p className="tit">신메뉴 소비자 조사<br/>참여 포인트 적립<br/>당첨자 안내</p>
                    <p className="date">2024-08-08</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <span className="badge_txt">공지</span>
                    <p className="tit">How To Use<br/>Ashley Queens</p>
                    <p className="date">2024-07-29</p>
                  </a>
                </li>
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