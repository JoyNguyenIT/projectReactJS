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


const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
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
                    <span className='brand'> Joy Nguyen </span>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className='nav-link'>Home</NavLink>
                        <NavLink to={'/users'} className='nav-link'>User</NavLink>
                        <NavLink to={'/admins'} className='nav-link'>Admin</NavLink>
                    </Nav>
                    {isAuthenticated === false ?
                        <div>
                            <button className='btn-login'
                                onClick={() => handleClickLoginBtn()}
                            >Log in</button>
                            <button className='btn-signup'
                                onClick={() => handleClickRegisterBtn()}>Sign up</button>
                        </div>
                        :
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => handleLogOut()}
                            >Log out</NavDropdown.Item>
                        </NavDropdown>
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