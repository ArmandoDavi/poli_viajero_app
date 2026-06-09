import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registro from './Registro';
import './styles/index.css'; 

// App importado sin llaves
import App from './app/App'; 

// Las vistas de Figma importadas con llaves { }
import { Marketplace } from './app/components/Marketplace';
import { MessagesView } from './app/components/MessagesView';
import { ProfileView } from './app/components/ProfileView';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas de inicio de sesión y registro */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Rutas de tus vistas */}
        <Route path="/feed" element={<App />} /> 
        <Route path="/mercado" element={<Marketplace />} /> 
        <Route path="/mensajes" element={<MessagesView />} /> 
        <Route path="/perfil" element={<ProfileView />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);