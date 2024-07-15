import videoHomePage from '../../assets/video-homepage.mp4';

const Homepage = (props) => {
    return (
        <div className='homepage-container'>
            <video width="500px" height="500px" autoPlay loop muted>
                <source
                    src={videoHomePage}
                    type="video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className='title-content'>There's a better way to ask</div>
                <div className='description-content'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead-and make everyone happy.</div>
                <div className='btn-getstarted'>
                    <button>Get's started-it's free</button>
                </div>
            </div>
        </div>
    )
}

export default Homepage