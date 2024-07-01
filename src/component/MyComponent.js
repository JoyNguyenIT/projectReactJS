import DisplayInfor from './DisplayInfor';
import UserInf from './UserInf';
import React from 'react';


class MyComponent extends React.Component {



    render() {


        return (
            <div>
                <UserInf />
                <DisplayInfor name={"Huu"} age={19} />
            </div>
        );
    }
}



export default MyComponent;
