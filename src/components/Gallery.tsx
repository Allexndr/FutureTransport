import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = styled.section`
  padding: 8rem 0;
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
      radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(100, 255, 218, 0.1) 0%, transparent 50%);
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
  background: linear-gradient(135deg, #fff 0%, #ff6b9d 100%);
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(100, 255, 218, 0.2) 0%, 
      rgba(255, 107, 157, 0.2) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(100, 255, 218, 0.3);
  }
`;

const GalleryImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
  
  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const ImageTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const ExpandButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 3;
  
  svg {
    color: #fff;
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    color: #fff;
    width: 24px;
    height: 24px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction}: 2rem;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    color: #fff;
    width: 28px;
    height: 28px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    ${props => props.direction}: 1rem;
    width: 50px;
    height: 50px;
    
    svg {
      width: 24px;
      height: 24px;
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
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(255, 107, 157, 0.1));
    border-radius: 50%;
    animation: floatElement 25s ease-in-out infinite;
    
    &:nth-child(1) {
      width: 60px;
      height: 60px;
      top: 15%;
      left: 5%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      width: 40px;
      height: 40px;
      top: 70%;
      right: 10%;
      animation-delay: -8s;
    }
    
    &:nth-child(3) {
      width: 80px;
      height: 80px;
      bottom: 15%;
      left: 15%;
      animation-delay: -16s;
    }
  }
  
  @keyframes floatElement {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-20px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(20px) rotate(240deg) scale(0.9); }
  }
`;

const galleryData = [
  {
    id: 1,
    title: "Современный Автопарк",
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=800&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "Глобальная Логистика",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=800&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Умные Технологии",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Европейская Сеть",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop&crop=center"
  },
  {
    id: 5,
    title: "Безопасность Прежде Всего",
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=800&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "Готовность к Будущему",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop&crop=center"
  }
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && sectionRef.current) {
      gsap.fromTo('.gallery-item', 
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

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return;
    
    if (direction === 'next') {
      setSelectedImage((selectedImage + 1) % galleryData.length);
    } else {
      setSelectedImage(selectedImage === 0 ? galleryData.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <GallerySection ref={sectionRef}>
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
          Наша Галерея
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Исследуйте наши передовые объекты и инновационные технологии
        </SectionSubtitle>
        
        <GalleryGrid>
          {galleryData.map((item, index) => (
            <GalleryItem
              key={item.id}
              className="gallery-item"
              whileHover={{ 
                y: -5,
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
              <GalleryImage imageUrl={item.imageUrl} />
              <ImageOverlay>
                <ImageTitle>{item.title}</ImageTitle>
              </ImageOverlay>
              <ExpandButton onClick={() => openModal(index)}>
                <Maximize2 />
              </ExpandButton>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Container>

      <AnimatePresence>
        {selectedImage !== null && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={closeModal}>
                <X />
              </CloseButton>
              
              <NavigationButton 
                direction="left" 
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft />
              </NavigationButton>
              
              <ModalImage 
                src={galleryData[selectedImage].imageUrl} 
                alt={galleryData[selectedImage].title}
              />
              
              <NavigationButton 
                direction="right" 
                onClick={() => navigateImage('next')}
              >
                <ChevronRight />
              </NavigationButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GallerySection>
  );
};

export default Gallery;
