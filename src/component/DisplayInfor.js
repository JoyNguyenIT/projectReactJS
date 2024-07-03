import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'
class DisplayInfor extends React.Component {

    state = {
        isHideUser: true
    }

    handleHideShow = () => {
        this.setState({
            isHideUser: !this.state.isHideUser
        })
    }

    render() {
        //destructuring array/object
        const { listUsers } = this.props;

        return (

            <div className="displayInfor-container">
                {/* <img src={logo} /> */}
                <div>
                    <span className='underline' onClick={() => { this.handleHideShow() }}>
                        {this.state.isHideUser === true ? "Hide List" : "Show List"}
                    </span>
                </div>
                <div />
                {this.state.isHideUser &&
                    <>
                        {listUsers.map((user) => {

                            return (
                                <div key={user.id} className={user.age > 18 ? "green" : "brown"}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                                    <hr />

                                </div>
                            )
                        })}
                    </>
                }
            </div>
        )
    }
}

export default DisplayInfor


