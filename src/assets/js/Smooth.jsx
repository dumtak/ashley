import Lenis from '@studio-freight/lenis';

const Smooth = () => {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return null;
};

export default Smooth;