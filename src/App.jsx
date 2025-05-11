import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainDashboard from './components/MainDashboard'
import Login from './auth/Login'
import Home from './containers/Home'
import MyProfile from './containers/MyProfile'
import Schedule from './containers/Schedule'
import History from './containers/History'
import Settings from './containers/Settings'
import Help from './containers/Help'

function App() {
  return (
   <>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/main' element={<MainDashboard />}>
          <Route index element={<Home />} />
          <Route path='profile' element={<MyProfile />} />
          <Route path='schedule' element={<Schedule />} />
          <Route path='history' element={<History />} />
          <Route path='settings' element={<Settings />} />
          <Route path='help' element={<Help />} />
        </Route>
        
      </Routes>
   </>
  )
}

export default App
