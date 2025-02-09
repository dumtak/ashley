import { useEffect, useState } from "react";
import axios from "axios";

import usePagination from "../hooks/usePagination";

import "../assets/scss/Heading.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Store = () => {
  const [store, setStore] = useState([]); //전체리스트
  const [sido, setSido] = useState([]); //지역

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


  //=== 검색
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search).get("result") || "";
  const [search, setSearch] = useState(searchParams); //검색어
  const [searchResult, setSearchResult] = useState([]); //검색결과
  
  useEffect(()=>{
    searchResult && setSearchResult(store.filter(el => el.consumerplantname.includes(search)));
  },[store])
  const handleSearch = (e)=>{
    if(e.key === "Enter"){
      setSearchResult(store.filter(el => el.consumerplantname.includes(search)));
      navigate(`/store?result=${search}&page=1`);
    }
  }
  
    // const { currentPage, listItem, totalPagination, paginationGroup, setPage } = usePagination("store",store,10);
    const { currentPage, listItem, totalPagination, paginationGroup, setPage } = usePagination("store", searchResult ? searchResult : store, 10);

  return (
    <>
      <div id="container" className="store__list">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>매장안내</h2>
              <div className="search_cont">
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>handleSearch(e)} placeholder="매장명 입력 (Enter)"/>
              </div>
            </div>
            <table className="tb_store">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>매장명</th>
                  <th>영업시간</th>
                  <th>주소</th>
                  <th>전화번호</th>
                </tr>
              </thead>
              <tbody>
              { listItem.length !== 0 && (
                listItem.map((el,idx)=> (
                  <tr key={store.length-(10*(currentPage-1)+idx)}>
                    {/* <td className="idx">{ !searchParams ? store.length - (10 * (currentPage - 1) + idx) : (10 * (currentPage - 1) + idx + 1) }</td> */}
                    <td className="idx">{ !searchParams ? store.length - (10 * (currentPage - 1) + idx) : searchResult.length - (10 * (currentPage - 1) + idx) }</td>
                    <td className="name">{el.consumerplantname}</td>
                    <td className="time">{el.opentime}</td>
                    <td className="addr">{el.address1}</td>
                    <td className="num">{el.comptelno}</td>
                  </tr>
                ))
              ) }
              { searchParams && searchResult.length === 0 && (
                <tr className="empty">
                  <td colSpan="5">일치하는 결과를 찾을 수 없습니다 !</td>
                </tr>
              )  }
              </tbody>
            </table>
            { listItem.length !== 0 && paginationGroup && (
              <>
                <div className="pagination">
                  { totalPagination >= 3 && (
                    <span onClick={(e)=>search ? setPage(search, 1) : setPage(e, 1)} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>&lt;&lt;</span>
                  ) }
                  <span onClick={(e)=>search ? setPage(search, currentPage - 1) : setPage(e, currentPage - 1)} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>&lt;</span>
                  <ol>
                    { paginationGroup.map((num) => (
                      <li onClick={(e) => search ? setPage(search, num) : setPage(e, num)} className={currentPage === num ? "active" : ""} key={num}>{num}</li>
                    ))}
                  </ol>
                  <span onClick={(e)=>search ? setPage(search, currentPage + 1) : setPage(e, currentPage + 1)} className={`next ${currentPage === totalPagination ? "disabled" : ""}`}>&gt;</span>
                  { totalPagination >= 3 && (
                    <span onClick={(e)=>search ? setPage(search, totalPagination) : setPage(e, totalPagination)} className={`next ${currentPage === totalPagination ? "disabled" : ""}`}>&gt;&gt;</span>
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
