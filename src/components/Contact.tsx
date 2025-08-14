import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(135deg, #2d1b69 0%, #0f0f23 100%);
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
      radial-gradient(circle at 30% 30%, rgba(100, 255, 218, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(255, 107, 157, 0.1) 0%, transparent 50%);
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 4rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(100, 255, 218, 0.2);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    color: #0f0f23;
    width: 28px;
    height: 28px;
  }
`;

const ContactText = styled.div`
  h3 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: 1.5;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }
  
  &:hover {
    border-color: rgba(100, 255, 218, 0.5);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: #fff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }
  
  &:hover {
    border-color: rgba(100, 255, 218, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%);
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f0f23;
  border-radius: 12px;
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
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(100, 255, 218, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid rgba(100, 255, 218, 0.3);
  border-radius: 12px;
  color: #64ffda;
  font-weight: 500;
  
  svg {
    width: 20px;
    height: 20px;
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
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(255, 107, 157, 0.1));
    border-radius: 50%;
    animation: floatElement 30s ease-in-out infinite;
    
    &:nth-child(1) {
      width: 80px;
      height: 80px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      width: 60px;
      height: 60px;
      top: 60%;
      right: 15%;
      animation-delay: -10s;
    }
    
    &:nth-child(3) {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      animation-delay: -20s;
    }
  }
  
  @keyframes floatElement {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-25px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(25px) rotate(240deg) scale(0.9); }
  }
`;

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@futuretransport.com"
  },
  {
    icon: Phone,
    title: "Телефон",
    content: "+1 (555) 123-4567"
  },
  {
    icon: MapPin,
    title: "Адрес",
    content: "123 Future Street, Tech City, TC 12345"
  }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && sectionRef.current) {
      gsap.fromTo('.contact-item', 
        { 
          x: -100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          x: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2
        }
      );
      
      gsap.fromTo('.contact-form', 
        { 
          x: 100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          x: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out"
        }
      );
    }
  }, [isInView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <ContactSection ref={sectionRef}>
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
          Свяжитесь с Нами
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Готовы испытать будущее транспорта? Давайте начнем разговор
        </SectionSubtitle>
        
        <ContactGrid>
          <ContactInfo>
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <ContactItem
                  key={index}
                  className="contact-item"
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <IconContainer>
                    <IconComponent />
                  </IconContainer>
                  <ContactText>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </ContactText>
                </ContactItem>
              );
            })}
          </ContactInfo>
          
          <ContactForm
            className="contact-form"
            onSubmit={handleSubmit}
          >
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle />
                Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
              </SuccessMessage>
            )}
            
            <FormGroup>
              <Label htmlFor="name">Имя</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ваше полное имя"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Тема</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="О чем это?"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Сообщение</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Расскажите нам больше о ваших потребностях..."
                required
              />
            </FormGroup>
            
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Отправка...' : (
                <>
                  <Send style={{ marginRight: '0.5rem', width: '20px', height: '20px' }} />
                  Отправить Сообщение
                </>
              )}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
