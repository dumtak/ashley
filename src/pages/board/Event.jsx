import { useContext } from "react";
import { Link } from "react-router-dom";

import { BoardContext } from "../../context/BoardContext";
import usePagination from "../../hooks/usePagination";

import "../../assets/scss/Heading.scss";
import "../../assets/scss/NoticeCard.scss";

const Event = () => {
  const { event } = useContext(BoardContext);
  const { currentPage, listItem, totalPagination, paginationGroup, setPage } = usePagination("event",event,6);
  
  return (
    <>
      <div id="container" className="event__list">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>이벤트</h2>
            </div>
            <div className="event_data">
              <ul className="card_list">
                { listItem && listItem.map(el => (
                  <li key={el.id}>
                    <Link to={`/event/detail?id=${el.id}`} className="item">
                      <span className="badge">{el.category}</span>
                      { event && (
                        <span className={`badge_date ${el.dDay < 0 ? "end" : "ing"}`}>{`${el.dDay === "0" ? "상시" : el.dDay === 0 ? "D-Day" : el.dDay > 0 ? `D-${el.dDay}` : "종료"}`}</span>
                      ) }
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
                  { totalPagination >= 3 && (
                    <span onClick={(e)=>setPage(e, 1)} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>&lt;&lt;</span>
                  ) }
                  <span onClick={(e)=>setPage(e, currentPage - 1)} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>&lt;</span>
                  <ol>
                    { paginationGroup.map((num) => (
                      <li onClick={(e) => setPage(e, num)} className={currentPage === num ? "active" : ""} key={num}>{num}</li>
                    ))}
                  </ol>
                  <span onClick={(e)=>setPage(e, currentPage + 1)} className={`next ${currentPage === totalPagination ? "disabled" : ""}`}>&gt;</span>
                  { totalPagination >= 3 && (
                    <span onClick={(e)=>setPage(e, totalPagination)} className={`next ${currentPage === totalPagination ? "disabled" : ""}`}>&gt;&gt;</span>
                  ) }
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