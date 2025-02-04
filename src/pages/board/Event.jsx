import { useContext } from "react";
import { Link } from "react-router-dom";

import { NoticeContext } from "../../context/NoticeContext";
import usePagination from "../../hooks/usePagination";

import "../../assets/scss/Heading.scss";
import "../../assets/scss/NoticeCard.scss";

const Event = () => {
  const { event } = useContext(NoticeContext);
  const { currentPage, listItem, totalPagination, paginationGroup, setPage } = usePagination("event",event,6);
  
  return (
    <>
      <div id="container" className="event__list">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>이벤트</h2>
              {/* <ul className="tab_category">
                <li>전체</li>
              </ul> */}
            </div>
            <div className="event_data">
              <ul className="card_list">
                { listItem && listItem.map(el => (
                  <li key={el.id}>
                    <Link to={`/event/detail?id=${el.id}`} className="item">
                      <div className="badge">{el.category}</div>
                      <p className="tit">{el.subject}</p>
                      <p className="date">{ el.dateStart === el.dateEnd ? el.dateStart : `${el.dateStart} ~  ${el.dateEnd}` }</p>
                    </Link>
                  </li>
                )) }
              </ul>
            </div>
            { listItem.length !== 0 && paginationGroup && (
              <>
                <div className="pagination">
                  <span onClick={(e)=>setPage(e, currentPage - 1)} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>이전</span>
                  <ol>
                    { paginationGroup.map((num) => (
                      <li onClick={(e) => setPage(e, num)} className={currentPage === num ? "active" : ""} key={num}>{num}</li>
                    ))}
                  </ol>
                  <span onClick={(e)=>setPage(e, currentPage + 1)} className={`next ${currentPage === totalPagination ? "disabled" : ""}`}>다음</span>
                </div>
              </>
            ) }
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;