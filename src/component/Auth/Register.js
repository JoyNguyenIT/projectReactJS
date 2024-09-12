import { useState } from "react"
import "./Register.scss"
import { useNavigate } from "react-router-dom"
import { postRegister } from "../../services/apiService"
import { toast } from "react-toastify"
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Languages from "../Header/Languages"


const Register = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [isShowPassword, setIsShowPassword] = useState(false)

    const navigate = useNavigate()
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    const handleClickLoginBtn = () => {
        navigate('/login')
    }

    const handleClickRegisterBtn = async () => {
        if (!validateEmail(email)) {
            toast.error("Invalid email!")
            return;
        }

        if (!password) {
            toast.error("Invalid password")
            return;
        }
        let res = await postRegister(email, password, username)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            navigate('/login')
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }

    return (
        <div className="register-content ">
            <div className="header">
                <span>Already have an account?</span>
                <button onClick={() => handleClickLoginBtn()}>Log in</button>
                <Languages />
            </div>
            <div className="title col-4 mx-auto">
                Joy Nguyen
            </div>
            <div className="caption col-4 mx-auto">
                Start your journey?
            </div>
            <div className="content-form">
                <div className="email-form col-4 mx-auto">
                    <label>Email (*)</label>
                    <div>
                        <input type="email col-4 mx-auto"
                            placeholder="ex123@gmail.com"
                            value={email}
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="password-form col-4 mx-auto">
                    <label>Password (*)</label>
                    <div>
                        <input type={isShowPassword ? "text" : "password"}
                            placeholder="At least 8 characters"
                            value={password}
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {isShowPassword ?
                            <span className="icon-eye"
                                onClick={() => setIsShowPassword(false)}> <VscEyeClosed /> </span>
                            :
                            <span className="icon-eye"
                                onClick={() => setIsShowPassword(true)}> <VscEye /> </span>
                        }

                    </div>
                </div>
                <div className="username col-4 mx-auto">
                    <label>Username</label>
                    <div>
                        <input type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        ></input>
                    </div>

                </div>
                <div className="item-content col-4 mx-auto">
                    <div>
                        <button
                            className="btn-register-submit"
                            onClick={() => handleClickRegisterBtn()}
                        >
                            Create my account</button>
                    </div>
                </div>
                <div className="go-homepage col-4 mx-auto">
                    <span onClick={() => navigate('/')}> &#60;&#60;Go to Homepage</span>
                </div>
            </div>

        </div>
    )
}

export default Register