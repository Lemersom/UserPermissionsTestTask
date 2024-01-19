import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import User from './pages/User.jsx'
import UpdateUser from './pages/UpdateUser.jsx'
import { AppContextProvider } from './context/appContext.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/update" element={<UpdateUser />} />
          </Routes>
        </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>,
)
