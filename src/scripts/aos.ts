// Initialize AOS (Animate On Scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS with configuration
export function initAOS() {
  AOS.init({
    duration: 800,
    once: false
  });
}