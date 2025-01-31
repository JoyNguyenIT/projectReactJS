import DisplayInfor from './DisplayInfor';
import AddUserInf from './AddUserInf';
import React, { useState } from 'react';


// class MyComponent extends React.Component {


//     state = {
//         listUsers: [
//             { id: 1, name: "Tuan", age: "15" },
//             { id: 2, name: "Huuuu", age: "20" },
//             { id: 3, name: "Akaka", age: "23" }
//         ]
//     }



//     handleAddNewUser = (userInfor) => {
//         this.setState({
//             listUsers: [userInfor, ...this.state.listUsers]
//         })
//     }

//     handleDeleteUser = (userId) => {
//         let listUsersClone = this.state.listUsers
//         listUsersClone = listUsersClone.filter(item => item.id !== userId)
//         this.setState({
//             listUsers: listUsersClone
//         })
//     }

//     render() {


//         return (
//             <div>
//                 <AddUserInf
//                     handleAddNewUser={this.handleAddNewUser}
//                     listUsers={this.state.listUsers}
//                 />
//                 <br /><br />
//                 <DisplayInfor listUsers={this.state.listUsers}
//                     handleDeleteUser={this.handleDeleteUser}
//                 />
//             </div>
//         );
//     }
// }

const MyComponent = (props) => {


    const [listUsers, setUser] = useState(
        [
            { id: 1, name: "Tuan", age: "15" },
            { id: 2, name: "Huuuu", age: "20" },
            { id: 3, name: "Akaka", age: "23" }
        ]
    );

    const handleAddNewUser = (userInfor) => {
        setUser([userInfor, ...listUsers])
    }


    const handleDeleteUser = (userId) => {
        setUser(listUsers.filter(item => item.id !== userId))
    }

    return (

        <div>

            <AddUserInf
                handleAddNewUser={handleAddNewUser}
                listUsers={listUsers}
            />
            <br /><br />
            <DisplayInfor listUsers={listUsers}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    );
}

export default MyComponent;
