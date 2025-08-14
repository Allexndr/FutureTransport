import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Info, Globe, Code, Palette, Smartphone, Zap } from 'lucide-react';

const DemoInfoSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%);
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
      radial-gradient(circle at 30% 70%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(100, 255, 218, 0.1) 0%, transparent 50%);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const DemoBanner = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(100, 255, 218, 0.1) 100%);
  border: 2px solid rgba(255, 107, 157, 0.3);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const DemoTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff6b9d 0%, #64ffda 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const DemoSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const LanguageSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const LanguageButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#0f0f23' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(100, 255, 218, 0.3);
  }
`;

const ContentArea = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: 2rem;
`;

const ContentTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ContentText = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  
  svg {
    color: #0f0f23;
    width: 28px;
    height: 28px;
  }
`;

const FeatureTitle = styled.h4`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const content = {
  kz: {
    title: "Демо-версия Визитки",
    subtitle: "Бұл жоба - сіздің компанияңыздың мүмкіндіктерін көрсететін демо-нұсқа",
    description: "Бұл сайт - біздің технологиялық шешімдеріміздің көрінісі. Мұнда қысқаша админ-панель, көптілді қолдау және заманауи веб-дизайнның барлық мүмкіндіктері көрсетілген.",
    features: [
      {
        icon: Code,
        title: "Заманауи Технологиялар",
        description: "React 19, TypeScript, Framer Motion"
      },
      {
        icon: Palette,
        title: "Дизайн 2025",
        description: "Neumorphism, Glassmorphism, 3D-эффекттер"
      },
      {
        icon: Smartphone,
        title: "Адаптивті Дизайн",
        description: "Барлық құрылғыларға бейімделген"
      },
      {
        icon: Zap,
        title: "Жылдам Анимациялар",
        description: "GSAP, Framer Motion, WebGL"
      }
    ]
  },
  ru: {
    title: "Демо-версия Визитки",
    subtitle: "Этот проект - демо-версия для демонстрации возможностей вашей компании",
    description: "Данный сайт - демонстрация наших технологических решений. Здесь кратко реализована админ-панель, многоязычная поддержка и все возможности современного веб-дизайна.",
    features: [
      {
        icon: Code,
        title: "Современные Технологии",
        description: "React 19, TypeScript, Framer Motion"
      },
      {
        icon: Palette,
        title: "Дизайн 2025",
        description: "Neumorphism, Glassmorphism, 3D-эффекты"
      },
      {
        icon: Smartphone,
        title: "Адаптивный Дизайн",
        description: "Адаптирован под все устройства"
      },
      {
        icon: Zap,
        title: "Быстрые Анимации",
        description: "GSAP, Framer Motion, WebGL"
      }
    ]
  },
  en: {
    title: "Demo Version for Business Card",
    subtitle: "This project is a demo version to showcase your company's capabilities",
    description: "This website is a demonstration of our technological solutions. Here is briefly implemented an admin panel, multilingual support and all the capabilities of modern web design.",
    features: [
      {
        icon: Code,
        title: "Modern Technologies",
        description: "React 19, TypeScript, Framer Motion"
      },
      {
        icon: Palette,
        title: "Design 2025",
        description: "Neumorphism, Glassmorphism, 3D effects"
      },
      {
        icon: Smartphone,
        title: "Responsive Design",
        description: "Adapted for all devices"
      },
      {
        icon: Zap,
        title: "Fast Animations",
        description: "GSAP, Framer Motion, WebGL"
      }
    ]
  }
};

const DemoInfo: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'kz' | 'ru' | 'en'>('ru');

  return (
    <DemoInfoSection>
      <Container>
        <DemoBanner
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <DemoTitle>🚀 Демо-версия Визитки</DemoTitle>
          <DemoSubtitle>
            Этот проект демонстрирует возможности современных веб-технологий для создания 
            впечатляющих сайтов-визиток и корпоративных порталов
          </DemoSubtitle>
        </DemoBanner>

        <LanguageSelector>
          <LanguageButton
            active={currentLanguage === 'kz'}
            onClick={() => setCurrentLanguage('kz')}
          >
            🇰🇿 Қазақша
          </LanguageButton>
          <LanguageButton
            active={currentLanguage === 'ru'}
            onClick={() => setCurrentLanguage('ru')}
          >
            🇷🇺 Русский
          </LanguageButton>
          <LanguageButton
            active={currentLanguage === 'en'}
            onClick={() => setCurrentLanguage('en')}
          >
            🇺🇸 English
          </LanguageButton>
        </LanguageSelector>

        <AnimatePresence mode="wait">
          <ContentArea
            key={currentLanguage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <ContentTitle>{content[currentLanguage].title}</ContentTitle>
            <ContentText>{content[currentLanguage].subtitle}</ContentText>
            <ContentText>{content[currentLanguage].description}</ContentText>
            
            <FeaturesGrid>
              {content[currentLanguage].features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureIcon>
                    <feature.icon />
                  </FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </ContentArea>
        </AnimatePresence>
      </Container>
    </DemoInfoSection>
  );
};

export default DemoInfo;
