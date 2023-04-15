
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './Components/Utils/PrivateRoutes';
import LoginPage from './Components/Login/Login';
import SignupPage from './Pages/Signup';
import HomePage from './Pages/Home';
import ProfilePage from './Pages/Profile';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import Admin from './Pages/Admin';
import PrivateRoutesAdmin from './Components/Utils/PrivateRoutesAdmin';
import EditUser from './Components/EditUser/EditUser';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route  path='/' element={<HomePage/>}/>
          </Route>
          <Route element={<PrivateRoutesAdmin/>}>
            <Route path='/admin/dashboard' element={<Admin/>}></Route>
          </Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/profile' element={<ProfilePage/>}></Route>
          <Route path='/admin' element={<AdminLogin/>}></Route>
          <Route path='/admin/edit-user' element={<EditUser/>}></Route>
          
          
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}


export default App;
