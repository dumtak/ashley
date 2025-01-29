import { useContext } from "react";
import { Link } from "react-router-dom";
import { NoticeContext } from "../context/NoticeContext";

import "../assets/scss/NoticeCard.scss";

const Notice = () => {
  const { notice, noticeGroup } = useContext(NoticeContext);
  console.log("noticeGroup==",notice, noticeGroup)


  console.log("sort==",notice.noticeList);
  

  return (
    <>
      <div id="container" className="notice__list">
        <div id="contents">
          <div className="layout_fix">
           <div className="heading">
            <h2>공지사항</h2>
           </div>
            <ul className="card_list">
              {notice.noticeList &&
                notice.noticeList.map((el) => (
                  <li key={el.id}>
                    <Link to="/" className="item">
                      <span className="badge_txt">{el.category}</span>
                      <p className="tit">{el.subject}</p>
                      <p className="date">{el.date}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
