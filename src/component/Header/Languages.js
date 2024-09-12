import { NavDropdown } from "react-bootstrap"
const Languages = (props) => {
    return (
        <>
            <NavDropdown title="Vietnam" id="basic-nav-dropdown" className='languages'>
                <NavDropdown.Item >Vietnam</NavDropdown.Item>
                <NavDropdown.Item>English</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Languages