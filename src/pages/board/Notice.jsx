import { useContext } from "react";
import { Link } from "react-router-dom";
import { NoticeContext } from "../../context/NoticeContext";

import usePagination from "../../hooks/usePagination";

import "../../assets/scss/Heading.scss";
import "../../assets/scss/NoticeCard.scss";

const Notice = () => {
  const { notice, noticeEnMapping } = useContext(NoticeContext);
  const { category, currentPage, listItem, totalPagination, paginationGroup, setCategory,setPage } = usePagination("notice",notice,9);

  return (
    <>
      <div id="container" className="notice__list">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>공지사항</h2>
              { listItem.length !==0 && (
                <ul className="tab_category">
                  <li onClick={()=>setCategory("all")} className={category === "all" || listItem.length === 0 ? "active" : ""}>전체</li>
                  { Object.keys(noticeEnMapping).map(key=> (
                    <li onClick={()=>setCategory(noticeEnMapping[key])}
                    className={category === noticeEnMapping[key] ? "active" : ""}
                    key={noticeEnMapping[key]}>{key}</li>
                  )) }
                </ul>
              ) }
            </div>
            <ul className="card_list">
              { listItem.length !== 0 ? (
                listItem.map((el) => (
                  <li key={el.id}>
                    <Link to={{ pathname:`/notice/detail`, search:`?category=${category}&id=${el.id}` }} className="item">
                      <span className="badge_txt">{el.category}</span>
                      <p className="tit">{el.subject}</p>
                      <p className="date">{el.date}</p>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="empty">일치하는 결과를 찾을 수 없습니다 !</li>
              )}
            </ul>
            { listItem.length !== 0 && paginationGroup && (
              <>
                <div className="pagination">
                  { totalPagination > 3 && (
                    <span onClick={(e)=>setPage(e, 1)} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>&lt;&lt;</span>
                  ) }
                  <span onClick={(e)=>setPage(e, currentPage - 1)} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>&lt;</span>
                  <ol>
                    { paginationGroup.map((num) => (
                      <li onClick={(e) => setPage(e, num)} className={currentPage === num ? "active" : ""} key={num}>{num}</li>
                    ))}
                  </ol>
                  <span onClick={(e)=>setPage(e, currentPage + 1)} className={`next ${currentPage === totalPagination ? "disabled" : ""}`}>&gt;</span>
                  { totalPagination > 3 && (
                    <span onClick={(e)=>setPage(e, totalPagination)} className={`next ${currentPage === totalPagination ? "disabled" : ""}`}>&gt;&gt;</span>
                  ) }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
