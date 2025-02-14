
import "./Membership.scss";
import "../../assets/scss/Heading.scss";

const Membership = () => {
  return (
    <>
      <div id="container" className="about__membership">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>멤버십</h2>
            </div>
            <ul className="membership_list">
              <li>
                <p>포인트 적립</p>
                <ul>
                  <li>E.POINT 회원을 대상으로 포인트가 적립됩니다.</li>
                  <li>당일 적립 포인트는 즉시 가용 포인트로 전환됩니다.</li>
                  <li>미적립 포인트는 결제 매장에서만 적립하실 수 있습니다.</li>
                  <li>포인트 사용금액을 제외한 구매 금액에 대해 포인트가 적립됩니다.</li>
                  <li>핸드폰 번호로 포인트 적립이 가능하며, 멤버십 바코드를 통해 적립 및 사용이 가능합니다.</li>
                </ul>
              </li>
              <li>
                <p>포인트 사용</p>
                <ul>
                  <li>가용 포인트 2,000 이상 시 100 포인트 단위로 현금처럼 사용하실 수 있습니다.</li>
                  <li>기본 적립 포인트의 유효기간은 적립일 기준 5년이며, 이벤트로 지급된 포인트의 유효기간은 이벤트에 따라 상이합니다.</li>
                </ul>
              </li>
              <li>
                <p>포인트 소멸</p>
                <ul>
                  <li>유효기간이 종료된 포인트는 해당 월 말일에 일괄 소멸됩니다.</li>
                  <li>멤버십 탈퇴 시 포인트와 회원정보는 영구 삭제됩니다.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>  
      </div> 
    </>
  ); 
};

export default Membership;