import DisplayInfor from './DisplayInfor';
import UserInf from './UserInf';
import React from 'react';


class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: "Tuan", age: "19" },
            { id: 2, name: "Huuuu", age: "20" },
            { id: 3, name: "Akaka", age: "23" }
        ]
    }


    render() {


        return (
            <div>
                <UserInf />
                <DisplayInfor listUsers={this.state.listUsers} />
            </div>
        );
    }
}



export default MyComponent;
