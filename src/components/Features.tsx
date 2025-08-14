import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import { Shield, Zap, Target, Globe, Truck, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%);
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
  margin-bottom: 5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureCard = styled(motion.div)`
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
    width: 40px;
    height: 40px;
    color: #0a0a1a;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .orb {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.3), rgba(255, 107, 157, 0.3));
    animation: floatOrb 20s ease-in-out infinite;
    
    &:nth-child(1) {
      width: 100px;
      height: 100px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: -5s;
    }
    
    &:nth-child(3) {
      width: 80px;
      height: 80px;
      bottom: 20%;
      left: 20%;
      animation-delay: -10s;
    }
  }
  
  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-30px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(30px) rotate(240deg) scale(0.9); }
  }
`;

const features = [
  {
    icon: Shield,
    title: "Непревзойденная Безопасность",
    description: "Продвинутые протоколы безопасности и мониторинг в реальном времени обеспечивают полную защиту вашего груза на каждом этапе пути."
  },
  {
    icon: Zap,
    title: "Молниеносная Скорость",
    description: "Передовая оптимизация логистики и высокоскоростные маршруты доставляют ваши грузы в рекордные сроки."
  },
  {
    icon: Target,
    title: "Точность до Миллиметра",
    description: "GPS-точность и планирование маршрутов на базе ИИ гарантируют точное время и место доставки."
  },
  {
    icon: Globe,
    title: "Покрытие по Всей Европе",
    description: "Комплексная сеть, охватывающая все европейские страны с бесшовными трансграничными операциями."
  },
  {
    icon: Truck,
    title: "Умный Автопарк",
    description: "Современные, экологичные автомобили, оснащенные новейшими технологиями для оптимальной производительности."
  },
  {
    icon: Clock,
    title: "Поддержка 24/7",
    description: "Круглосуточное обслуживание клиентов и отслеживание в реальном времени доступны в любое время."
  }
];

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && sectionRef.current) {
      gsap.fromTo('.feature-card', 
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

  return (
    <FeaturesSection ref={sectionRef}>
      <FloatingOrbs>
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </FloatingOrbs>
      
      <Container>
        <SectionTitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Почему Выбирают Нас?
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Испытайте будущее транспорта с нашими передовыми технологиями и непревзойденным сервисом
        </SectionSubtitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <FeatureCard
                key={index}
                className="feature-card"
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
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            );
          })}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default Features;
