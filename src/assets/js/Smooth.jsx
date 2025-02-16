import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

const Smooth = () => {
  const lenis = new Lenis();

  useEffect(()=>{
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  },[])
  
  // useEffect(()=>{
  //   // lenis?.scrollTo(0, { immediate: true });
  //   // if (lenisRef .current) lenisRef.current?.scrollTo(0, { immediate: true });
  //   lenis.stop();
  //   lenis?.scrollTo(0, {immediate: true, force:true});
  //   lenis.start();
  //   // window.scrollTo({ top: 0 });
  //   // lenis.stop();
  //   // setTimeout(() => {
  //   // }, 10);
  //   // console.log("아")
  //   // const checkScroll = () => {
  //   //   if (!lenis.isScrolling) {
  //   //     window.scrollTo(0, 0);
  //   //   }
  //   // };
  //   // checkScroll();
  // }, [location]);

  return null;
};

export default Smooth;