import { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { NoticeContext } from "../../context/NoticeContext";

import "../../assets/scss/BoardTable.scss";

const DetailType = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const id = searchParams.get("id");
  // const page = searchParams.get("page") || 1;

  const { notice, event } = useContext(NoticeContext);
  const [ matchItem, setMatchItem ] = useState(null);
  const [ matchPrev, setMatchPrev ] = useState(null);
  const [ matchNext, setMatchNext ] = useState(null);

  useEffect(() => {
    if(type === "notice"){
      console.log("type%%", type)
      const findItem = notice.find((item) => (category === "all" || category === item.categoryEn) && id === String(item.id));
      console.log("console",)

      // const findPrev = findItem && findItem.id === 
      // const findPrev = notice.find((item) => (category === "all" || category === item.categoryEn) && id - 1 === String(item.id - 1));
      // const findNext = notice.find((item) => (category === "all" || category === item.categoryEn) && id + 1 === String(item.id + 1));
      setMatchItem(findItem);
      // setMatchPrev(findPrev);
      // setMatchNext(findNext);
    } else if(type === "event"){
      console.log("type%%", type)
      const findItem = event.find((item) => id === String(item.id));
      setMatchItem(findItem);
    }
  }, [category, id, notice, event]);

  console.log("##찾았다##", matchItem);
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
