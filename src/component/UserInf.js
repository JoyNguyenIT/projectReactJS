import React from "react";

class UserInf extends React.Component {
    state = {
        name: 'Huy',
        address: 'CTU-CanTho University',
        age: 19
    }



    handleOnChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleOnChangeAge(event) {
        this.setState({
            age: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <div>
                    My name is {this.state.name}, {this.state.age} ys, U can call me Evan &amp; I come from {this.state.address}
                    <form onSubmit={(event) => {
                        this.handleSubmit(event);
                    }}>
                        <label>Name:</label>
                        <input
                            value={this.state.name}
                            type='text'
                            onChange={(event) => {
                                this.handleOnChangeName(event);
                            }} />

                        <br />
                        <label>Age:</label>
                        <input
                            value={this.state.age}
                            type='text'
                            onChange={(event) => {
                                this.handleOnChangeAge(event);
                            }} />

                        <button>Submit</button>
                        {/* <button onMouseOver={this.handleMouseOver}>Hover Me</button> */}
                    </form>

                </div>
            </div>
        );
    }
}

export default UserInf