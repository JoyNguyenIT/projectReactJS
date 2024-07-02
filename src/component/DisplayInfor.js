import React from "react";
import './DisplayInfor.scss';
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

                <span className='underline' onClick={() => { this.handleHideShow() }}>
                    {this.state.isHideUser === true ? "Hide List" : "Show List"}
                </span>
                {this.state.isHideUser &&
                    <div>
                        {listUsers.map((user) => {

                            return (
                                <div key={user.id} className={user.age > 18 ? "green" : "brown"}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfor


