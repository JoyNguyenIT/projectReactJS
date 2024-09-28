import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Homepage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    const { t } = useTranslation();

    return (
        <div className='homepage-container'>
            <video width="500px" height="500px" autoPlay loop muted>
                <source
                    src={videoHomePage}
                    type="video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className='title-content'>
                    {t(`homepage.title`)}
                </div>
                <div className='description-content'>
                    {t(`homepage.description`)}
                </div>
                <div className='btn-getstarted'>
                    {isAuthenticated
                        ? <button onClick={() => navigate('/users')}>{t(`homepage.button1`)}</button>
                        : <button onClick={() => navigate('/login')}>{t(`homepage.button2`)}</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Homepage