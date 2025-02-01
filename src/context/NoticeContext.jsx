import { createContext, useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import axios from "axios";

export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const [notice, setNotice] = useState([]);
  const [noticeCategory, setNoticeCategory] = useState([]);
  const [noticeCategoryEn, setNoticeCategoryEn] = useState([]);
  const mappingCategoryEn = {
    전체 : "all",
    신메뉴 : "new",
    공지 : "notice",
    "애슐리 오픈" : "open"
  }

  useEffect(() => {
    const fetchNotice = () => {
      axios.get("/data/notice.json")
        .then((res) => {
          // console.log("성공", res.data);

            // console.log(111111,res.data.noticeList);
            res.data.noticeList.sort((a, b) => {
              // console.log(a.date,b.date);
              return new Date(b.date) - new Date(a.date);
            });
            // console.log(222222,res.data.noticeList);
          setNotice(res.data);

          //한글 카테고리명
          const categroup = res.data.noticeList.reduce((init,el)=>{            
            const category = el.category || "기타";
            if(!init[category]) {
              init[category] = [];
            }
            init[category].push(el);
            return init;
          }, {});
          setNoticeCategory(categroup);

          //영문 카테고리명
          const categroupEn = Object.keys(mappingCategoryEn).map(en => {
            return {[en] : mappingCategoryEn[en]};
          })
          setNoticeCategoryEn(categroupEn);
        })
        .catch((err) => console.error(err));
      };
      
      fetchNotice();
    }, []);

    console.log("####", noticeCategoryEn)
    noticeCategoryEn.flatMap((el)=> {
      console.log("flat===", el)
    })

  return (
    <NoticeContext.Provider value={{ notice, noticeCategory, noticeCategoryEn }}>
      {children}
    </NoticeContext.Provider>
  );
};

// NoticeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };