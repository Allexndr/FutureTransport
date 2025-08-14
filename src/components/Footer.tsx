import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Truck, Mail, Phone, MapPin, Globe, Shield, Zap, Target } from 'lucide-react';

const FooterContainer = styled.footer`
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
      radial-gradient(circle at 20% 80%, rgba(100, 255, 218, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.05) 0%, transparent 50%);
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  position: relative;
  z-index: 2;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 568px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CompanyInfo = styled.div`
  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
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
    }
  }
  
  .description {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 400px;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    
    .social-link {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
        color: #0f0f23;
        border-color: transparent;
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(100, 255, 218, 0.3);
      }
    }
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.8rem;
      
      a {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        &:hover {
          color: #64ffda;
          transform: translateX(5px);
        }
        
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .copyright {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }
  
  .footer-links {
    display: flex;
    gap: 2rem;
    
    @media (max-width: 768px) {
      gap: 1rem;
    }
    
    a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
      
      &:hover {
        color: #64ffda;
      }
    }
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .floating-element {
    position: absolute;
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.05), rgba(255, 107, 157, 0.05));
    border-radius: 50%;
    animation: floatElement 40s ease-in-out infinite;
    
    &:nth-child(1) {
      width: 60px;
      height: 60px;
      top: 20%;
      left: 5%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      width: 40px;
      height: 40px;
      top: 60%;
      right: 10%;
      animation-delay: -20s;
    }
    
    &:nth-child(3) {
      width: 80px;
      height: 80px;
      bottom: 30%;
      left: 15%;
      animation-delay: -40s;
    }
  }
  
  @keyframes floatElement {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-20px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(20px) rotate(240deg) scale(0.9); }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FloatingElements>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </FloatingElements>
      
      <FooterContent>
        <FooterTop>
          <CompanyInfo>
            <motion.div
              className="logo"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="logo-icon">
                <Truck />
              </div>
              <div className="logo-text">FutureTransport</div>
            </motion.div>
            
            <motion.p
              className="description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ведущие будущее транспорта с передовыми технологиями, 
              непревзойденной безопасностью и молниеносной доставкой по всей Европе.
            </motion.p>
            
            <motion.div
              className="social-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a href="mailto:info@futuretransport.com" className="social-link">📧</a>
              <a href="tel:+15551234567" className="social-link">📱</a>
              <a href="https://futuretransport.com" className="social-link">🌐</a>
              <a href="https://linkedin.com/company/futuretransport" className="social-link">💼</a>
            </motion.div>
          </CompanyInfo>
          
          <FooterSection>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Услуги
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <li><a href="#features"><Shield /> Безопасность Прежде Всего</a></li>
              <li><a href="#features"><Zap /> Молниеносная Скорость</a></li>
              <li><a href="#features"><Target /> Точность до Миллиметра</a></li>
              <li><a href="#features"><Globe /> По Всей Европе</a></li>
            </motion.ul>
          </FooterSection>
          
          <FooterSection>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Компания
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <li><a href="#about">О Нас</a></li>
              <li><a href="#team">Наша Команда</a></li>
              <li><a href="#careers">Карьера</a></li>
              <li><a href="#news">Новости</a></li>
            </motion.ul>
          </FooterSection>
          
          <FooterSection>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Контакты
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <li><a href="mailto:info@futuretransport.com"><Mail /> info@futuretransport.com</a></li>
              <li><a href="tel:+15551234567"><Phone /> +1 (555) 123-4567</a></li>
              <li><a href="https://maps.google.com/?q=123+Future+Street+Tech+City"><MapPin /> 123 Future Street, Tech City</a></li>
            </motion.ul>
          </FooterSection>
        </FooterTop>
        
        <FooterBottom>
          <motion.div
            className="copyright"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            © 2025 FutureTransport. Все права защищены.
          </motion.div>
          
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <a href="/privacy">Политика Конфиденциальности</a>
            <a href="/terms">Условия Использования</a>
            <a href="/cookies">Политика Файлов Cookie</a>
          </motion.div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
