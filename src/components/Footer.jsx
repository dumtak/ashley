import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <footer>
      <div className="bottom_cont">
        <div className="layout_fix">
          <ul className="link">
            <li><Link to="/" onClick={(e)=>e.preventDefault()}><b>개인정보처리방침</b></Link></li>
            <li><Link to="/" onClick={(e)=>e.preventDefault()}>영상정보처리기기관리방침</Link></li>
            <li><Link to="/" onClick={(e)=>e.preventDefault()}>서비스 이용약관</Link></li>
          </ul>
        </div>
      </div>
      <div className="bottom_corp">
        <div className="layout_fix">
          <div className="txt">
            <div>
              <span>(주) 이랜드이츠</span>
              <span>서울특별시 금천구 가산디지털1로 186, 213호(가산동) 제이플라츠</span>
            </div>
            <div>
              <span>대표이사 : 황성윤</span>
              <span>개인정보보호 책임자 : 황성윤</span>
            </div>
            <div>
              <span>매장 이용관련 문의 및 불편사항 : 1577-1259</span>
              <span>이메일 : <a href="mailto:elandfood@eland.co.kr">elandfood@eland.co.kr</a></span>
            </div>
            <div>
              <span>호스팅 서비스 제공자 : 라드씨엔에스</span>
            </div>
            <p>Copyright © 2025 ASHLEY</p>
          </div>
          <ul className="social">
            <li><Link to="https://www.facebook.com/wowAshley" target="_blank"><img src="/images/footer-social-facebook.png" alt="페이스북 아이콘"/></Link></li>
            <li><Link to="https://www.instagram.com/Your_ashley" target="_blank"><img src="/images/footer-social-insta.png" alt="인스타 아이콘"/></Link></li>
          </ul>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;