import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(20px) rotate(-1deg); }
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: particleFloat 15s linear infinite;
  }
  
  &::before {
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    right: 10%;
    animation-delay: 7.5s;
  }
  
  @keyframes particleFloat {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px) scale(1); opacity: 0; }
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 1200px;
  padding: 0 2rem;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 0%, #64ffda 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 0 0 30px rgba(100, 255, 218, 0.5);
  
  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0f0f23;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(100, 255, 218, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(100, 255, 218, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  
  .scroll-text {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .scroll-arrow {
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, transparent, #64ffda, transparent);
    animation: scrollBounce 2s ease-in-out infinite;
  }
  
  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
`;

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo('.hero-content', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.2
        }
      );
    }
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer ref={containerRef}>
      <FloatingParticles />
      
      <HeroContent>
        <motion.div
          className="hero-content"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <MainTitle
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            ТРАНСПОРТ
            <br />
            <span style={{ fontSize: '0.7em', opacity: 0.8 }}>БУДУЩЕГО</span>
          </MainTitle>
          
          <Subtitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            Испытайте следующее поколение транспортных услуг с передовыми технологиями, 
            непревзойденной безопасностью и молниеносной доставкой по всей Европе
          </Subtitle>
          
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            НАЧАТЬ ПУТЕШЕСТВИЕ
          </CTAButton>
        </motion.div>
      </HeroContent>
      
      <ScrollIndicator
        onClick={handleScrollDown}
        whileHover={{ scale: 1.1 }}
        style={{ y, opacity }}
      >
        <div className="scroll-text">Прокрутить</div>
        <div className="scroll-arrow"></div>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;
