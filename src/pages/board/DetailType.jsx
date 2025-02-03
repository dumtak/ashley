import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";

import { NoticeContext } from "../../context/NoticeContext";

import "../../assets/scss/BoardTable.scss";

const DetailType = () => {
  const location = useLocation();
  const { type } = useParams();
  const [ searchParams ] = useSearchParams();
  const category = searchParams.get("category");
  const id = searchParams.get("id");
  // const page = searchParams.get("page") || 1;

  const { notice, event } = useContext(NoticeContext);
  const [ matchItem, setMatchItem ] = useState(null);
  const [ matchPrev, setMatchPrev ] = useState();
  const [ matchNext, setMatchNext ] = useState();

  useEffect(() => {
    if(type === "notice"){
      console.log("type%%", type);
      const findItem = notice.find((item) => (category === "all" || category === item.categoryEn) && id === String(item.id));
      setMatchItem(findItem);

      const findItemIdx = findItem && notice.findIndex((item)=> item.id === findItem.id);
      setMatchPrev(notice[findItemIdx - 1] || null);
      setMatchNext(notice[findItemIdx + 1] || null);
    } else if(type === "event"){
      console.log("type%%", type)
      const findItem = event.find((item) => id === String(item.id));
      setMatchItem(findItem);

      const findItemIdx = findItem && event.findIndex((item)=> item.id === findItem.id);
      setMatchPrev(event[findItemIdx - 1] || null);
      setMatchNext(event[findItemIdx + 1] || null);
    }
  }, [category, id, notice, event]);
  
  console.log("##찾았다##", matchItem);
  console.log("findItemPrevNext", matchPrev, matchNext);
  // console.log("##이전##", matchPrev);
  // console.log("##다음##", matchNext);

  return (
    <div id="container" className="board__detail">
      <div id="contents">
        <div className="layout_fix">
          {matchItem ? (
            <>
              <table className="tb_board">
                <thead>
                  <tr>
                    <th>
                      <h3 className="category">{matchItem.category}</h3>
                      <h2 className="subject">{matchItem.subject}</h2>
                      <span className="date">{matchItem.date}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {matchItem.imgDetail && (
                        <div className="banner">
                          <img src={matchItem.imgDetail} alt={matchItem.subject}/>
                        </div>
                      )}
                      {matchItem.content && (
                        <div className="info">{matchItem.content}</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <ul className="nav_post">
                { matchPrev && matchPrev !== null && (
                  <li className="prev">
                    <span>이전글</span>
                    <Link to={{pathname:location.pathname, search:`${location.search.replace(`id=${matchItem.id}`,`id=${matchPrev.id}`)}`}}>{matchPrev.subject}</Link>
                  </li>
                ) }
                { matchNext && matchNext !== null && (
                  <li className="next">
                    <span>다음글</span>
                    <Link to={{pathname:location.pathname, search:`${location.search.replace(`id=${matchItem.id}`,`id=${matchNext.id}`)}`}}>{matchNext.subject}</Link>
                  </li>
                ) }
              </ul>
              <div className="btn_wrap">
                <Link to={category ? `/${type}?category=${category}` : `/${type}`} className="btn_basic">목록으로</Link>
              </div>
            </>
          ) : (
            <div>일치하는 결과를 찾을 수 없습니다 !</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailType;
