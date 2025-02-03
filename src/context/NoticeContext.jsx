import { createContext, useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const pathcate = location.pathname.split("/")[1];

  const [ notice, setNotice ] = useState([]);
  const [ noticeMatch, setNoticeMatch ] = useState([]);

  const [ event, setEvent ] = useState([]);
  const [ eventMatch, setEventMatch ] = useState([]);
  // const [noticeCategory, setNoticeCategory] = useState([]); //한글카테고리
  // const [noticeCategoryEn, setNoticeCategoryEn] = useState([]); //영문카테고리
  const noticeEnMapping = {
    신메뉴: "new",
    공지: "notice",
    "애슐리 오픈": "open",
  };
  

  useEffect(() => {
    const fetchData = (type) => {
      if (location.pathname === "/" || type === "notice"){
        console.log("type##", type);
        axios.get("/data/notice.json")
          .then((res) => {
            // console.log("성공", res.data);

            res.data.noticeList.sort((a, b) => {
              // console.log(a.date,b.date);
              return new Date(b.date) - new Date(a.date);
            });

            const addCategoryEn = res.data.noticeList.map((item) => {
              const categoryEn = noticeEnMapping[item.category] || "etc";
              return categoryEn ? { ...item, categoryEn } : item;
            });
            // setNoticeCategoryEn([...new Set(addCategoryEn.map(el => el.categoryEn))]); //중복제거하고 영문카테고리 저장
            setNotice(addCategoryEn);
            // setNotice(res.data);

            //한글 카테고리명
            // const categroup = addCategoryEn.reduce((init,el)=>{
            //   const category = el.category || "기타";
            //   if(!init[category]) {
            //     init[category] = [];
            //   }
            //   init[category].push(el);
            //   return init;
            // }, {});
            // setNoticeCategory(Object.keys(categroup));
          })
          .catch((err) => console.error(err));
      }
      if(location.pathname === "/" || type === "event") {
        console.log("event%%", type);
        axios.get("/data/event.json")
        .then((res)=>{
          // console.log("event", res.data);
          setEvent(res.data.eventList);
        })
        .catch((err)=> console.log(err));
      }
      // else {
      //   console.log("etc");
      //   // navigate(-1);
      // }
    };

    fetchData(pathcate);
  }, [pathcate]);

  
  return (
    <NoticeContext.Provider value={{ notice, noticeEnMapping, event }}>
      {children}
    </NoticeContext.Provider>
  );
};

// NoticeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
