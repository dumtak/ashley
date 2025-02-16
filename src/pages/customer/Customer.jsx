import axios from "axios";
import { useEffect, useState } from "react";

import "../../assets/scss/Heading.scss";

const Customer = () => {
  const [customer,setCustomer] = useState([]);
  const [customerCate,setCustomerCate] = useState([]);
  const [isTabActive,setIsTabActive] = useState("매장이용"); 
  const [isTabList,setIsTabList] = useState([]);

  console.log("isTabList",isTabList)

  useEffect(()=>{
    const fetchCustomer = ()=>{
      axios.get("/data/customer.json")
      .then((res)=>{
        // console.log(res.data);
        setCustomer(res.data.customerList);
      })
      .catch(err=>console.error(err))
    }
    fetchCustomer();
  },[])

  useEffect(()=>{ //카테고리
    const currentCustomer = [];
    customer.forEach(el=>{
      if(!currentCustomer.includes(el.category)){
        currentCustomer.push(el.category);
      }
      setCustomerCate(currentCustomer)
    })
  },[customer])
  useEffect(()=>{
    // customer.filter(cate=> console.log(cate.category.includes(isTabActive) ? cate : ""))
    const filterList = customer.filter(cate=> cate.category.includes(isTabActive) ? cate : "");
    setIsTabList(filterList);
  },[customer,isTabActive])

  const handleAccordion = (e)=>{
    e.preventDefault();

    const list = e.target.closest("li");
    const divA = list.querySelector("._a");
    list.classList.toggle("active");
    if(list.classList.contains("active")){
      divA.style.padding = "20px 24px";
      divA.style.height = `${divA.scrollHeight + 40}px`;
    } else {
      divA.style.padding = "0 24px"
      divA.style.height = `0px`;
    }
    // divA.style.height = list.classList.contains("active") ? `${divA.scrollHeight}px` : 0;
  }
  // console.log("customerCate",customerCate);

  return (
    <>
      <div id="container" className="customer__list">
        <div id="contents">
          <div className="layout_fix">
            <div className="heading">
              <h2>고객센터</h2>
              <p className="desc">자주하는 질문</p>
            </div>
                          {/* <ul className="tab_category"> */}
                          <ul className="tab_type">
                { customerCate.map((el,idx)=>(
                  <li className={isTabActive === el ? "active" : ""} key={idx}><button onClick={()=>setIsTabActive(el)}>{el}</button></li>
                ) ) }
              </ul>
              {/* { console.log("el===",el) } */}
              <ul className="faq_list">
                { isTabList.map((el)=>(
                  <li key={el.subject}>
                    <div className="_q" onClick={(e)=>handleAccordion(e)}><button>{el.subject}</button></div>
                    <div className="_a">{el.content}</div>
                  </li>
                ) ) }
              </ul>
              <ul className="loop_text">
                <li>Eats, Always Great!</li>
                <li>Ashley</li>
                <li>Eats, Always Great!</li>
                <li>Ashley</li>
                <li>Eats, Always Great!</li>
                <li>Ashley</li>
                <li>Eats, Always Great!</li>
                <li>Ashley</li>
                <li>Eats, Always Great!</li>
                <li>Ashley</li>
              </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;