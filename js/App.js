// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Замените на ваш компонент для главной страницы
import AboutUs from './pages/AboutUs'; // Замените на ваш компонент для страницы "About us"
import Documents from './pages/Documents'; // Замените на ваш компонент для страницы "Documents"
import Gallery from './pages/Gallery'; // Замените на ваш компонент для страницы "Photo"
import Order from './pages/Order'; // Замените на ваш компонент для страницы "Order"

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about_us" component={AboutUs} />
                <Route path="/documents" component={Documents} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/order" component={Order} />
            </Switch>
        </Router>
    );
}

export default App;
