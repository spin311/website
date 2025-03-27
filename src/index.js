import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "./context/ThemeContext";
import {LanguageProvider} from "./context/LanguageContext";
import {NotificationProvider} from "./context/NotificationContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ContactMe from "./components/contact-me/ContactMe";
import NotFound from "./components/not-found/NotFound";
import MicrosoftAutomaticRewards from "./components/extensions/microsoftAutomaticRewards/MicrosoftAutomaticRewards";
import SidebarButtons from "./components/sidebar-buttons/SidebarButtons";
import PageTitle from "./components/page-title/PageTitle";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <LanguageProvider>
            <NotificationProvider>
                <SidebarButtons/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/contact" element={<ContactMe />} />
                        <Route path="/microsoft-automatic-rewards" element={<MicrosoftAutomaticRewards />} >
                            <Route index element={<NotFound />} />
                            <Route path="website" element={<NotFound />} />
                            <Route path="mobile" element={<NotFound />} />
                        </Route>
                        <Route path="/donate" element={<NotFound />} />
                        <Route path="/uninstall" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </NotificationProvider>
        </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
