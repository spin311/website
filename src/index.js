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
import Donate from "./components/extensions/donate/Donate";
import Uninstall from "./components/extensions/uninstall/uninstall";
import Website from "./components/extensions/microsoftAutomaticRewards/mobile/website/website";
import Privacy from "./components/extensions/microsoftAutomaticRewards/mobile/privacy/Privacy";
import TestList from "./components/extensions/microsoftAutomaticRewards/mobile/test-list/TestList";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <LanguageProvider>
            <NotificationProvider>
                <BrowserRouter>
                    <SidebarButtons/>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/contact" element={<ContactMe />} />
                        <Route path="/donate" element={<Donate soloComponent={true} />} />
                        <Route path="/uninstall" element={<Uninstall />} />
                        <Route path="/microsoft-automatic-rewards" element={<MicrosoftAutomaticRewards />} />
                        <Route path="/microsoft-automatic-rewards/mobile/privacy" element={<Privacy />} />
                        <Route path="/microsoft-automatic-rewards/mobile/website" element={<Website />} />
                        <Route path="/microsoft-automatic-rewards/mobile/test-app" element={<TestList />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </NotificationProvider>
        </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
