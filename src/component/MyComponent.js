
import React from 'react';

class App extends React.Component {

    state = {
        name: 'Huy',
        address: 'CTU-CanTho University',
        age: 19
    }

    handleClick = (event) => {
        event.preventDefault();
        console.log(this.state.name)
        this.setState({
            name: 'Yahoo!',
            age: Math.floor(Math.random() * 100 + 1)
        });
    }

    handleMouseOver(event) {
    }

    handleOnChange(event) {
        this.setState({
            name: event.target.value
        });
        console.log(event.target.value);
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
                        <input
                            type='text'
                            onChange={(event) => {
                                this.handleOnChange(event);
                            }} />
                        <button>Submit</button>
                        {/* <button onMouseOver={this.handleMouseOver}>Hover Me</button> */}
                    </form>
                </div>

            </div>
        );
    }
}



export default App;
