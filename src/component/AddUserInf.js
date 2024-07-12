import React, { useState } from "react";

// class AddUserInf extends React.Component {
//     state = {
//         name: 'Huy',
//         address: 'CTU-CanTho University',
//         age: 19
//     }



//     handleOnChangeName(event) {
//         this.setState({
//             name: event.target.value
//         });
//     }

//     handleOnChangeAge(event) {
//         this.setState({
//             age: event.target.value
//         });
//     }


//     handleSubmit(event) {
//         event.preventDefault();
//         this.props.handleAddNewUser({
//             name: this.state.name,
//             id: Math.floor(Math.random() * 100) + 1 + '-Random',
//             age: this.state.age
//         })

//     }


//     render() {
//         return (
//             <>
//                 <div>
//                     My name is {this.state.name}, {this.state.age} ys, U can call me Evan &amp; I come from {this.state.address}
//                     <form onSubmit={(event) => {
//                         this.handleSubmit(event);
//                     }}>
//                         <label>Name:</label>
//                         <input
//                             value={this.state.name}
//                             type='text'
//                             onChange={(event) => {
//                                 this.handleOnChangeName(event);
//                             }} />

//                         <br />
//                         <label>Age:</label>
//                         <input
//                             value={this.state.age}
//                             type='text'
//                             onChange={(event) => {
//                                 this.handleOnChangeAge(event);
//                             }} />

//                         <button>Submit</button>
//                         {/* <button onMouseOver={this.handleMouseOver}>Hover Me</button> */}
//                     </form>

//                 </div>
//             </>
//         );
//     }
// }

const AddUserInf = (props) => {

    const [User, setNewUser] = useState({
        name: 'Huy',
        address: 'CTU-CanTho University',
        age: 19,
    });




    const handleOnChangeName = (event) => {
        setNewUser({
            ...User,
            name: event.target.value
        });
    }

    const handleOnChangeAge = (event) => {
        setNewUser({
            ...User,
            age: event.target.value
        });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewUser({
            name: User.name,
            id: Math.floor(Math.random() * 100) + 1 + '-Random',
            age: User.age
        })

    }

    return (
        <>
            <div>
                My name is {User.name}, {User.age} ys, U can call me Evan &amp; I come from {User.address}
                <form onSubmit={(event) => {
                    handleSubmit(event);
                }}>
                    <label>Name:</label>
                    <input
                        value={User.name}
                        type='text'
                        onChange={(event) => {
                            handleOnChangeName(event);
                        }} />

                    <br />
                    <label>Age:</label>
                    <input
                        value={User.age}
                        type='text'
                        onChange={(event) => {
                            handleOnChangeAge(event);
                        }} />

                    <button>Submit</button>
                    {/* <button onMouseOver={this.handleMouseOver}>Hover Me</button> */}
                </form>

            </div>
        </>
    );
}


export default AddUserInf