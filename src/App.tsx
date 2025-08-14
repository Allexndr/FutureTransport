import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import DemoInfo from './components/DemoInfo';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #0f0f23;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const MainContent = styled.main`
  padding-top: 80px; // Account for fixed header
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="stats">
          <Stats />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <DemoInfo />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
