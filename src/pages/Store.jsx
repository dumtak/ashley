import { useEffect, useState } from "react";
import axios from "axios";

import usePagination from "../hooks/usePagination";

const Store = () => {
  const [store, setStore] = useState([]);
  const [sido, setSido] = useState([]);

  useEffect(()=>{
    const fetchStore = ()=>{
      axios.get("/data/store.json")
      .then((res)=> {
        // console.log("!!store!!", res.data);
        setStore(res.data);
      })
      .catch((err)=> console.log(err))
    }
    fetchStore();
  },[])

  useEffect(()=>{
    const currentSido = [];
    store.forEach(el => {
      if(!currentSido.includes(el.sido)){
        currentSido.push(el.sido);
      }
      setSido(currentSido);
    })
  },[store])
  console.log(sido);

  const { currentPage, listItem, totalPagination, paginationGroup, setPage } = usePagination(store, 10);
  

  return (
    <>
      <div id="container" className="store__list">
        <div id="contents">
          <div className="layout_fix">
            <table>
              <thead>
                <tr>
                  <th>idx</th>
                  <th>매장명</th>
                  <th>주소</th>
                  <th>전화번호</th>
                </tr>
              </thead>
              <tbody>
                { listItem.map((el,idx)=> (
                  <tr key={idx + 1}>
                    {/* <td>{console.log(currentPage , 10 , idx)}</td>
                    <td>{console.log((currentPage - 1) * 10 + idx + 1)}</td> */}
                    <td>{store.length - (10 * (currentPage - 1)  + idx) }</td>
                    {/* <td>{store.length - idx}</td> */}
                    <td>{el.consumerplantname}</td>
                    <td>{el.address1}</td>
                    <td>{el.comptelno}</td>
                  </tr>
                )) }
              </tbody>
            </table>
            { paginationGroup && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
