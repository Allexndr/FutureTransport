import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 70%, rgba(100, 255, 218, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(255, 107, 157, 0.1) 0%, transparent 50%);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #64ffda 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(100, 255, 218, 0.1) 0%, 
      rgba(255, 107, 157, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(100, 255, 218, 0.2);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
    border-radius: 50%;
    z-index: -1;
    opacity: 0.5;
    filter: blur(10px);
  }
  
  svg {
    color: #0f0f23;
    width: 40px;
    height: 40px;
  }
`;

const StatNumber = styled.div`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 0%, #64ffda 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1;
`;

const StatLabel = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StatDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .floating-element {
    position: absolute;
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(255, 107, 157, 0.1));
    border-radius: 50%;
    animation: floatElement 35s ease-in-out infinite;
    
    &:nth-child(1) {
      width: 70px;
      height: 70px;
      top: 15%;
      left: 8%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      width: 50px;
      height: 50px;
      top: 65%;
      right: 12%;
      animation-delay: -12s;
    }
    
    &:nth-child(3) {
      width: 90px;
      height: 90px;
      bottom: 25%;
      left: 18%;
      animation-delay: -24s;
    }
  }
  
  @keyframes floatElement {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-25px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(25px) rotate(240deg) scale(0.9); }
  }
`;

const stats = [
  {
    icon: TrendingUp,
    number: 15000,
    label: "Выполненных Доставок",
    description: "Успешно доставленные посылки по всей Европе"
  },
  {
    icon: Users,
    number: 5000,
    label: "Довольных Клиентов",
    description: "Доверяют нам бизнес и частные лица"
  },
  {
    icon: Globe,
    number: 25,
    label: "Обслуживаемых Стран",
    description: "Комплексное европейское покрытие"
  },
  {
    icon: Award,
    number: 99,
    label: "Процент Удовлетворенности",
    description: "Процент удовлетворенности клиентов"
  }
];

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (isInView && sectionRef.current) {
      gsap.fromTo('.stat-card', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      const targetNumbers = stats.map(stat => stat.number);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters(targetNumbers.map(target => 
          Math.floor(target * progress)
        ));

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(targetNumbers);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <StatsSection ref={sectionRef}>
      <FloatingElements>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </FloatingElements>
      
      <Container>
        <SectionTitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Наше Влияние
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Цифры, которые говорят сами за себя - наша приверженность совершенству в числах
        </SectionSubtitle>
        
        <StatsGrid>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <StatCard
                key={index}
                className="stat-card"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + index * 0.1, 
                  ease: "easeOut" 
                }}
              >
                <IconContainer>
                  <IconComponent />
                </IconContainer>
                <StatNumber>
                  {counters[index].toLocaleString()}
                  {stat.label === "Процент Удовлетворенности" && "%"}
                </StatNumber>
                <StatLabel>{stat.label}</StatLabel>
                <StatDescription>{stat.description}</StatDescription>
              </StatCard>
            );
          })}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};

export default Stats;
