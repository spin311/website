import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "./context/ThemeContext";
import {LanguageProvider} from "./context/LanguageContext";
import {NotificationProvider} from "./context/NotificationContext";
import {HashRouter, Route, Routes} from "react-router-dom";
import ContactMe from "./components/contact-me/ContactMe";
import NotFound from "./components/not-found/NotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <LanguageProvider>
            <NotificationProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/contact" element={<ContactMe />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </HashRouter>
            </NotificationProvider>
        </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
