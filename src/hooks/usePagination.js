import { object } from "prop-types";
import { useSearchParams } from "react-router-dom";


const usePagination = (type, list, listLimit = 10, paginationLimit = 5)=>{
  const [searchParams, setSearchParams] = useSearchParams();
  

  //#####includes 사용해서 전체 아닐때도 체크하는거 추가하기
  const category = (!searchParams.get("category") || searchParams.get("category") === "all") ? "all" : searchParams.get("category"); //현재 카테고리
  const currentPage = (parseInt(searchParams.get("page")) === 0 || !searchParams.get("page")) ? 1 : parseInt(searchParams.get("page")); //현재 페이지번호
  const filterList = category === "all" ? list : list.filter(el => category === el.categoryEn);
  const searchWord = type === "event" && searchParams.get("result");


  //===list
  const listSplit = (currentPage - 1) * listLimit; //0번에서부터 9번까지 (1)
  const listItem = filterList.slice(listSplit, listSplit + listLimit);
  
  //===pagination
  const totalPagination = Math.ceil(filterList.length / listLimit); //총 몇 페이지
  const pagination = [...Array(totalPagination)].map((_, i) => i + 1); //실제 페이지네이션
  console.log("총==",totalPagination, "현재==",pagination);
  console.log("카테고리==",category, "==listArrIdx==",listSplit, "보이기==",listItem);

  const startPage = Math.floor((currentPage - 1) / paginationLimit) * paginationLimit + 1;
  const endPage = Math.min(startPage + paginationLimit - 1, totalPagination);
  const paginationGroup = pagination.slice(startPage - 1, endPage);


  const setCategory = (cate)=> {
    setSearchParams( {category:cate, page:1} );
  }
  const setPage = (e, num)=>{
    console.log("???", e, searchWord)
    const numLimit = Math.max(1, Math.min(num, totalPagination)); //최소1,최대제한
    (type === "notice") ? setSearchParams( {category, page:numLimit} ) : setSearchParams( {page:numLimit} );
    (type === "store") && typeof e !== "object" ? setSearchParams( {result:e, page:numLimit} ) : setSearchParams( {page:numLimit} );
    if(currentPage === numLimit){
      e.preventDefault();
      return;
    }
  }

  return { category, currentPage, listItem, totalPagination, paginationGroup, setCategory,setPage };
  //카테고리, 현재페이지번호, 현재카테고리리스트, 페이지네이션, set(쿼리스트링 변경)
  
}


export default usePagination;