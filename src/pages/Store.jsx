import { useEffect, useState } from "react";
import axios from "axios";

import usePagination from "../hooks/usePagination";

import "../assets/scss/Heading.scss";

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

  const { currentPage, listItem, totalPagination, paginationGroup, setPage } = usePagination("store",store,10);
  

  return (
    <>
      <div id="container" className="store__list">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>매장안내</h2>
            </div>
            <table className="tb_store">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>매장명</th>
                  <th>주소</th>
                  <th>전화번호</th>
                </tr>
              </thead>
              <tbody>
              { listItem.length !== 0 ? (
                  listItem.map((el,idx)=> (
                    <tr key={store.length-(10*(currentPage-1)+idx)}>
                      {/* <td>{console.log(currentPage , 10 , idx)}</td>
                      <td>{console.log((currentPage - 1) * 10 + idx + 1)}</td> */}
                      <td className="idx">{store.length - (10 * (currentPage - 1) + idx) }</td>
                      {/* <td>{store.length - idx}</td> */}
                      <td className="name">{el.consumerplantname}</td>
                      <td className="addr">{el.address1}</td>
                      <td className="num">{el.comptelno}</td>
                    </tr>
                  ))
              ) : (
                <tr className="empty">
                  <td colSpan="4">일치하는 결과를 찾을 수 없습니다 !</td>
                </tr>
              )}
                 
              </tbody>
            </table>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
