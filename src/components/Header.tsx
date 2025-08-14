import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Menu, X, Truck } from 'lucide-react';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(15, 15, 35, 0.98);
    border-bottom-color: rgba(100, 255, 218, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  
  @media (max-width: 768px) {
    height: 70px;
    padding: 0 1rem;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  
  .logo-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
    border-radius: 12px;
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
      border-radius: 12px;
      z-index: -1;
      opacity: 0.5;
      filter: blur(10px);
    }
    
    svg {
      color: #0f0f23;
      width: 28px;
      height: 28px;
    }
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #fff 0%, #64ffda 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #fff;
    
    &::after {
      width: 100%;
    }
  }
  
  &.active {
    color: #64ffda;
    
    &::after {
      width: 100%;
    }
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f0f23;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(100, 255, 218, 0.3);
  
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
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 968px) {
    display: block;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 15, 35, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const MobileNavLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5rem;
  position: relative;
  padding: 1rem 0;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #fff;
    
    &::after {
      width: 100%;
    }
  }
`;

const MobileCloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(100, 255, 218, 0.6);
    border-radius: 50%;
    animation: floatParticle 20s linear infinite;
    
    &:nth-child(1) {
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      left: 30%;
      animation-delay: -5s;
    }
    
    &:nth-child(3) {
      left: 50%;
      animation-delay: -10s;
    }
    
    &:nth-child(4) {
      left: 70%;
      animation-delay: -15s;
    }
    
    &:nth-child(5) {
      left: 90%;
      animation-delay: -20s;
    }
  }
  
  @keyframes floatParticle {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px) scale(1); opacity: 0; }
  }
`;

const navItems = [
  { href: '#hero', label: 'Главная' },
  { href: '#features', label: 'Услуги' },
  { href: '#stats', label: 'Статистика' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#contact', label: 'Контакты' }
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <>
      <HeaderContainer
        className={isScrolled ? 'scrolled' : ''}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FloatingParticles>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </FloatingParticles>
        
        <HeaderContent>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="logo-icon">
              <Truck />
            </div>
            <div className="logo-text">FutureTransport</div>
          </Logo>
          
          <Navigation>
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </NavLink>
            ))}
          </Navigation>
          
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => scrollToSection('#contact')}
          >
            Начать
          </CTAButton>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            <Menu />
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <MobileCloseButton onClick={closeMobileMenu}>
              <X />
            </MobileCloseButton>
            
            {navItems.map((item, index) => (
              <MobileNavLink
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </MobileNavLink>
            ))}
            
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => scrollToSection('#contact')}
            >
              Начать
            </CTAButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
