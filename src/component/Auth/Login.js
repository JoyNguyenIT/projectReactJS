import { useState } from "react"
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { postLogin } from "../../services/apiService"
import { toast } from "react-toastify"


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleClickLoginBtn = async () => {
        let res = await postLogin(email, password)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            navigate('/')
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }

    return (
        <div className="login-content ">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
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
                        ></input>
                    </div>
                </div>
                <div className="item-content col-4 mx-auto">
                    <span className="forgot-password">Forgot password?</span>
                    <div>
                        <button
                            className="btn-login-submit"
                            onClick={() => handleClickLoginBtn()}
                        >
                            Login</button>
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