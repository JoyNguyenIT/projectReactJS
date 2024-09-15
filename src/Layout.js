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
import Register from "./component/Auth/Register";
import ListQuiz from "./component/User/ListQuiz";
import DetailQuiz from "./component/User/DetailQuiz";
import ManageQuiz from "./component/Admin/Content/ManageQuiz/ManageQuiz";
import ManageQuestion from "./component/Admin/Content/ManageQuestion/ManageQuestion";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from "react";


const Layout = (props) => {
    const NotFound = () => {
        return (
            <div className="alert alert-danger container mt-3">
                404. Not found data with your current URL
            </div>
        )
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Homepage />} />

                    <Route path="/users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />

                    {/* <Route index element={<ListQuiz />} /> */}
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzies" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<ManageQuestion />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
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
        </Suspense>
    )
}

export default Layout