import { Route, Routes } from 'react-router-dom';
import './App.css'
import IndexPage from './pages/Userpages/IndexPage';
import LoginPage from "./pages/Userpages/LoginPage";
import Layout from './assets/Layout';
import RegisterPage from "./pages/Userpages/RegisterPage";
import axios from 'axios';
import { UserContextProvider } from './Contexts/UserContext';
import ProfilePage from './pages/Userpages/ProfilePage';
import UserPrivateRoute from './components/UserComponents/UserPrivateRoute';
import Home from './pages/HostPages/Home';
import Login from './pages/HostPages/Login';
import Register from './pages/HostPages/Register';
import HostPrivate from './components/HostComponents/HostPrivate';
import AddPlaces from './pages/HostPages/AddPlaces';
import PlaceListingPage from './pages/HostPages/PlaceListingPage';
import AdminLogin from './pages/AdminPages/AdminLogin';
import Dashboard from './pages/AdminPages/Dashboard';
import UserPage from './pages/AdminPages/UserPage';
import HostPage from './pages/AdminPages/HostPage';
import AdminPrivateRoute from './components/AdminComponents/AdminPrivateRoutes';
import PlaceDetails from './pages/Userpages/PlaceDetails';
import BookingDetailsPage from './pages/Userpages/BookingDetailsPage';
import HostBookingsPage from './pages/HostPages/HostBookingsPage';
import SuccessPage from './pages/Userpages/SuccessPage';


const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/placedetails/:id' element={<PlaceDetails/>} />

          <Route path="" element={<UserPrivateRoute />}>
            <Route path="/profile/:subpage?" element={<ProfilePage />} />
            <Route path='/profile/bookings/:id' element={<BookingDetailsPage />} />
            <Route path='/profile/success' element={<SuccessPage />} />
          </Route>

          <Route path="/host" element={<Home />} />
          <Route path="/host/login" element={<Login />} />
          <Route path="/host/register" element={<Register />} />

          <Route path="" element={<HostPrivate />}>
            <Route path="/host/addplaces" element={<AddPlaces />} />
            <Route path="/host/listings" element={<PlaceListingPage />} />
            <Route path="/host/editplace/:id" element={<AddPlaces />} />
            <Route path='/host/bookings' element={<HostBookingsPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="" element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/host" element={<HostPage />} />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
 