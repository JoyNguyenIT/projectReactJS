import { NavDropdown } from "react-bootstrap"
import i18n from 'i18next';
import { useTranslation } from "react-i18next";

const Languages = (props) => {
    const { i18n } = useTranslation()
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? 'Tiếng Việt' : 'English'} id="basic-nav-dropdown" className='languages'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Languages