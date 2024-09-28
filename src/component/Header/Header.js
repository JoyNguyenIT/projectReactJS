import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown, NavItem } from 'react-bootstrap';
import { postLogOut } from '../../services/apiService';
import { dataLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';
import Languages from './Languages';
import { useTranslation } from 'react-i18next';
import { FaReact } from "react-icons/fa";
import { useState } from 'react';
import ProfileUser from '../User/Profile/ProfileUser';


const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const [showProfile, setShowProfile] = useState(false);

    const handleShowProfile = () => {
        setShowProfile(true)
    }

    const handleClickLoginBtn = () => {
        navigate('/login')
    }
    const handleClickRegisterBtn = () => {
        navigate('/register')
    }
    const navigate = useNavigate()

    const handleLogOut = async () => {
        let res = await postLogOut("account.email", account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(dataLogout())
            navigate('/login')
        }
        else {
            toast.error(res.EM)
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <NavLink to={'/'} className='navbar-brand'>
                    <span className='logo'><FaReact className='icon-logo' /></span>
                    <span className='brand'> Joy Nguyen </span>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className='nav-link'>{t(`header.homepage`)}</NavLink>
                        <NavLink to={'/users'} className='nav-link'>{t(`header.user`)}</NavLink>
                        <NavLink to={'/admins'} className='nav-link'>{t(`header.admin`)}</NavLink>
                    </Nav>
                    {isAuthenticated === false ?
                        <div>
                            <button className='btn-login'
                                onClick={() => handleClickLoginBtn()}
                            >{t(`header.login`)}</button>
                            <button className='btn-signup'
                                onClick={() => handleClickRegisterBtn()}>{t(`header.signup`)}</button>
                        </div>
                        : (
                            <>
                                <NavDropdown title={t(`header.setting`)} id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => handleShowProfile()}
                                    >{t(`header.profile`)}</NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => handleLogOut()}
                                    >{t(`header.logout`)}</NavDropdown.Item>
                                </NavDropdown>
                                <ProfileUser
                                    show={showProfile}
                                    setShow={setShowProfile}
                                />
                            </>
                        )
                    }
                    <Languages />
                    <Nav>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;