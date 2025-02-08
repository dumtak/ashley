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

  const { notice, event, visual } = useContext(NoticeContext);
  const [ eventStart, setEventStart ] = useState(null);
  const [ eventEnd, setEventEnd ] = useState(null);
  const [ matchItem, setMatchItem ] = useState(null);
  const [ matchPrev, setMatchPrev ] = useState();
  const [ matchNext, setMatchNext ] = useState();

  useEffect(() => {
    if(type === "notice"){ //[#]공지사항
      console.log("type%%", type);
      //===글찾기
      const findItem = notice.find((item) => (category === "all" || category === item.categoryEn) && id === String(item.id));
      setMatchItem(findItem);

      //===이전다음찾기
      if(category === "all"){
        const findItemIdx = findItem && notice.findIndex((item)=> item.id === findItem.id);
        setMatchPrev(notice[findItemIdx - 1] || null);
        setMatchNext(notice[findItemIdx + 1] || null);
      } else {
        // const findItemIdx = findItem && notice.findIndex((item)=> console.log(item.categoryEn ,"%%%", findItem.categoryEn ,"////", item.id ,"%%%", findItem.id) );
        const findItemCate = findItem && notice.filter((cate)=> findItem.categoryEn === cate.categoryEn);
        const findItemIdx = findItemCate && findItemCate.findIndex((idx)=> findItem.id === idx.id);
        console.log("findItemCate", findItemCate, findItemIdx);
        
        // console.log("findItemCate[findItemIdx -+ 1]", findItemIdx && findItemCate[findItemIdx - 1] , findItemIdx && findItemCate[findItemIdx + 1]);
        console.log("findItemIdx", findItemIdx && findItemIdx );
        console.log("findItemCate.length", findItemCate && findItemCate.length - 1);
        setMatchPrev(findItemIdx && findItemCate[findItemIdx - 1] || null);
        setMatchNext(findItemCate && findItemIdx < findItemCate.length - 1 ? findItemCate[findItemIdx + 1] : null);
      }

    } else if(type === "event"){ //[#]이벤트
      console.log("type%%", type);
      // const today = new Date().toLocaleDateString("en-CA"); //"ko-KR":YYYY.MM.DD
      // const eventEndDate = new Date(eventEnd).toLocaleDateString("en-CA");
      // console.log("date==", today, "////", eventEndDate);
      // console.log("date???", today > eventEndDate);


      //===글찾기
      const findItem = [...event, ...visual].find((item) => id === String(item.id));
      setMatchItem(findItem);

      //===날짜비교
      const findItemDate = findItem && Object.keys(findItem).filter((key) => key.startsWith("date")).map(key => findItem[key]);
      setEventStart(findItemDate && findItemDate[0]);
      setEventEnd(findItemDate && findItemDate[1]);
      
      //===이전다음찾기
      const findItemIdx = findItem && event.findIndex((item)=>  item.id === findItem.id);
      setMatchPrev(event[findItemIdx - 1] || null);
      setMatchNext(event[findItemIdx + 1] || null);
    }
  }, [category, id, notice, event, visual, matchItem]);

  console.log("##이전##", matchPrev);
  console.log("##찾았다##", matchItem);
  console.log("##다음##", matchNext);
  

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
                      {/* <span className="date">{matchItem.date}</span> */}
                      <span className="date">{(matchItem.date) || ( eventStart === eventEnd ? eventStart : `${eventStart} ~ ${eventEnd}`)}</span>
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
              { (type === "notice" || (type === "event" && matchItem.category)) && (
                <>
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
              ) }
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
