import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UserInfor from './UserInfor';
import ChangePass from './ChangePass';
import History from './History';


const ProfileUser = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false)
    }
    return (

        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        navbar={false}
                        defaultActiveKey="infor"
                        id="uncontrolled-tab-example"
                        className="mb-3 tabs"
                    >
                        <Tab eventKey="infor" title="User Infor">
                            <UserInfor
                                setShow={setShow}
                            />
                        </Tab>
                        <Tab eventKey="password" title="Change Password">
                            <ChangePass />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>

        </>

    );
}


export default ProfileUser;