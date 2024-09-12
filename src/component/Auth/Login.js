import { useState } from "react"
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { postLogin } from "../../services/apiService"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { dataLogin } from "../../redux/action/userAction"
import { ImSpinner9 } from "react-icons/im";
import Languages from "../Header/Languages"


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
    const handleClickLoginBtn = async () => {
        if (!validateEmail(email)) {
            toast.error("Invalid email!")
            return;
        }

        if (!password) {
            toast.error("Invalid password")
            return;
        }

        setIsLoading(true)
        let res = await postLogin(email, password)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setIsLoading(false)
            dispatch(dataLogin(res))
            navigate('/')

        }

        if (res && res.EC !== 0) {
            toast.error(res.EM)
            setIsLoading(false)
        }
    }
    const handleClickSignupBtn = () => {
        navigate('/register')
    }

    const handleOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClickLoginBtn();
        }
    }

    return (
        <div className="login-content ">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button onClick={() => handleClickSignupBtn()}>Sign up</button>
                <Languages />
            </div>
            <div className="title col-4 mx-auto">
                Joy Nguyen
            </div>
            <div className="caption col-4 mx-auto">
                Hello, who's this?
            </div>
            <div className="content-form">
                <div className="email-form col-4 mx-auto">
                    <label>Email</label>
                    <div>
                        <input type="email col-4 mx-auto"
                            placeholder="ex123@gmail.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="password-form col-4 mx-auto">
                    <label>Password</label>
                    <div>
                        <input type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={handleOnKeyPress}
                        ></input>
                    </div>
                </div>
                <div className="item-content col-4 mx-auto">
                    <span className="forgot-password">Forgot password?</span>
                    <div >
                        <button
                            className="btn-login-submit"
                            onClick={() => handleClickLoginBtn()}
                            disabled={isLoading}
                        >
                            {isLoading && <ImSpinner9 className="loader-icon" />}
                            <span>Login</span>
                        </button>

                    </div>
                </div>
                <div className="go-homepage col-4 mx-auto">
                    <span onClick={() => navigate('/')}> &#60;&#60;Go to Homepage</span>
                </div>
            </div>

        </div>
    )
}

export default Login