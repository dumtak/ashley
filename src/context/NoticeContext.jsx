import { createContext, useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import axios from "axios";

export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const [notice, setNotice] = useState([]);
  const [noticeGroup, setNoticeGroup] = useState([]);

  useEffect(() => {
    const fetchNotice = () => {
      axios.get("/data/notice.json")
        .then((res) => {
          // console.log("성공", res.data);

            // console.log(111111,res.data.noticeList)
            res.data.noticeList.sort((a, b) => {
              // console.log(a.date,b.date)
              return new Date(b.date) - new Date(a.date);
            });
            // console.log(222222,res.data.noticeList)


          setNotice(res.data);
          const categroup = res.data.noticeList.reduce((init,el)=>{            
            const category = el.category || "기타";
            if(!init[category]) {
              init[category] = [];
            }
            init[category].push(el);
            return init;
          }, {});
          setNoticeGroup(categroup);
        })
        .catch((err) => console.error(err));
    };
    
    fetchNotice();
  }, []);

  return (
    <NoticeContext.Provider value={{ notice, noticeGroup }}>
      {children}
    </NoticeContext.Provider>
  );
};

// NoticeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };