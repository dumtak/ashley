import { useEffect, useState } from "react";
import axios from "axios";

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
                { store.slice().reverse().map((el,idx)=> (
                  <tr key={idx + 1}>
                    <td>{store.length - idx}</td>
                    <td>{el.consumerplantname}</td>
                    <td>{el.address1}</td>
                    <td>{el.comptelno}</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
