import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Quick = () => {
  const location = useLocation();
  const quickRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const [topPosition, setTopPosition] = useState(200);

  const pageTop = () =>{
    window.scrollTo({ top:0, behavior:"smooth" })
  }
  useEffect(() => {
    const notice = document.querySelector(".main__notice");
    const footer = document.querySelector("footer");

    !notice ? setIsVisible(true) : setIsVisible(false);

    const handleScroll = () => {
      if (!quickRef.current || !footer) return;

      const quick = quickRef.current;
      const footerTop = footer.offsetTop - 100;
      const scrollY = window.scrollY;

      if (notice) {
        setIsVisible(scrollY > notice.offsetTop - 150);
      } 
      // else { etIsVisible(true); }

      if (scrollY >= footerTop - quick.offsetHeight - 200) {
        setIsFixed(false);
        setTopPosition(footerTop - quick.offsetHeight);
      } else {
        setIsFixed(true);
        setTopPosition(200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <div id="quick" ref={quickRef}
      style={{
        position: isFixed ? "fixed" : "absolute",
        top: `${topPosition}px`,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.25s ease",
      }}
    >
      <ul>
        <li title="채용">
          <Link to="http://elandeats.career.greetinghr.com" target="_blank">채용</Link>
        </li>
        <li title="온라인몰">
          <Link to="http://eatsmarkeat.com/main/index.php" target="_blank">온라인몰</Link>
        </li>
        <li title="딜리버리/TO-GO">
          <Link to="http://myashley.co.kr/Delivery/Delivery.aspx" target="_blank">딜리버리 / TO-GO</Link>
        </li>
      </ul>
      <button className="pageTop" onClick={()=>pageTop()}>
        <img src="/images/quick-top.png" alt="상단으로"/>
      </button>
    </div>
  );
};

export default Quick;
