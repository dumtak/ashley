import { useState } from "react";


const usePagination = (list)=>{
  const [category, serCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  console.log("######", list);
  return { category, currentPage };
}


export default usePagination;