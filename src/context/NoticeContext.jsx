import { createContext, useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import axios from "axios";

export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const [notice, setNotice] = useState([]);
  const [noticeCategory, setNoticeCategory] = useState([]); //한글카테고리
  const [noticeCategoryEn, setNoticeCategoryEn] = useState([]); //영문카테고리
  const categoryEnMapping = {
    '신메뉴': 'new',
    '공지': 'notice',
    '애슐리 오픈': 'open',
  };

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
            
            const addCategoryEn = res.data.noticeList.map(item => {
              // console.log("categoryEnItem", item)
              const categoryEn = categoryEnMapping[item.category] || "etc";
              // console.log("categoryEn", categoryEn);
              return categoryEn ? {...item, categoryEn} : item;
            })
            setNoticeCategoryEn([...new Set(addCategoryEn.map(el => el.categoryEn))]); //중복제거하고 저장
            setNotice(addCategoryEn);
          // setNotice(res.data);


          //한글 카테고리명
          const categroup = addCategoryEn.reduce((init,el)=>{            
          // const categroup = res.data.noticeList.reduce((init,el)=>{            
            const category = el.category || "기타";
            // console.log("cate====!!!!", category);
            if(!init[category]) {
              init[category] = [];
            }
            init[category].push(el);
            return init;
          }, {});
          setNoticeCategory(Object.keys(categroup));

        })
        .catch((err) => console.error(err));
      };
      fetchNotice();
    }, []);


    console.log("noticeCategory",noticeCategory)

  return (
    <NoticeContext.Provider value={{ notice, noticeCategory, noticeCategoryEn, categoryEnMapping }}>
      {children}
    </NoticeContext.Provider>
  );
};

// NoticeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };