import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import App from './App';
import User from './component/User/User';
import Admin from './component/Admin/Admin';
import Homepage from './component/Home/Homepage';
import DashBoard from './component/Admin/Content/DashBoard';
import ManageUser from './component/Admin/Content/ManageUser';
import Login from './component/Auth/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Layout = (props) => {
    return (
        <>

            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Homepage />} />
                    <Route path="/users" element={<User />} />
                </Route>
                <Route path="/admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes >


            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Layout