import { useContext } from "react";
import { Link } from "react-router-dom";
import { NoticeContext } from "../context/NoticeContext";

import usePagination from "../hooks/usePagination";

import "../assets/scss/Heading.scss";
import "../assets/scss/NoticeCard.scss";

const Notice = () => {
  const { notice, noticeCategory, noticeCategoryEn } = useContext(NoticeContext);
  const { category, currentPage, listItem, paginationGroup, setCategory,setPage } = usePagination(notice.noticeList, 3);
  // console.log("noticeCategory==",notice, noticeCategory);
  // console.log("sort==",notice.noticeList);
  // console.log("##list##",notice);


  // console.log(category, noticeCategory)
  console.log(category, Object.keys(noticeCategory))

  return (
    <>
      <div id="container" className="notice__list">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>공지사항</h2>
              { category && noticeCategory && (
                <ul className="tab_category">
                  <li onClick={()=>setCategory("전체")} className={category === "전체" ? "active" : ""}>전체</li>
                  { Object.keys(noticeCategory).map(cate => (
                    <li onClick={()=>setCategory(cate)} className={category === cate ? "active" : ""} key={cate}>{cate}</li>
                  )) }
                </ul>
              )}
            </div>
            <ul className="card_list">
              { listItem && listItem.map((el) => (
                  <li key={el.id}>
                    <Link to="/" className="item">
                      <span className="badge_txt">{el.category}</span>
                      <p className="tit">{el.subject}</p>
                      <p className="date">{el.date}</p>
                    </Link>
                  </li>
                ))}
            </ul>
            { paginationGroup && (
              <>
                <div className="pagination">
                  <span onClick={(e)=>setPage(e, currentPage - 1)} className="prev">이전</span>
                  <ol>
                    { paginationGroup.map((num) => (
                      <li onClick={(e) => setPage(e, num)} className={currentPage === num ? "active" : ""} key={num}>{num}</li>
                    ))}
                  </ol>
                  <span onClick={(e)=>setPage(e, currentPage + 1)} className="next">다음</span>
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
