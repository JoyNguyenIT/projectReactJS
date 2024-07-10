import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'
// class DisplayInfor extends React.Component {





//     render() {
//         //destructuring array/object
//         const { listUsers } = this.props;

//         return (

//             <div className="displayInfor-container">
//                 {/* <img src={logo} /> */}

//                 {true &&
//                     <>
//                         {listUsers.map((user) => {

//                             return (
//                                 <div key={user.id} className={user.age > 18 ? "green" : "brown"}>
//                                     <div>My name's {user.name}</div>
//                                     <div>My age's {user.age}</div>
//                                     <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     <hr />

//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }


const DisplayInfor = (props) => {
    const { listUsers } = props

    return (

        <div className="displayInfor-container">
            {/* <img src={logo} /> */}

            {true &&
                <>
                    {listUsers.map((user) => {

                        return (
                            <div key={user.id} className={user.age > 18 ? "green" : "brown"}>
                                <div>My name's {user.name}</div>
                                <div>My age's {user.age}</div>
                                <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                <hr />

                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}

export default DisplayInfor


