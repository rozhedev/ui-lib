import React from "react";
import { render } from "@testing-library/react";

class ClassCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
        this.incrementHandler = this.incrementHandler.bind(this);
        this.decrementHandler = this.decrementHandler.bind(this);
    }

    incrementHandler() {
        this.setState({ count: this.state.count + 1 });
    }
    decrementHandler() {
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        return (
            <div>
                <h3>Class Counter</h3>
                <span>{this.state.count}</span>
                <button onClick={this.incrementHandler}> + </button>
                <button onClick={this.decrementHandler}> - </button>
            </div>
        );
    }
}

export default ClassCounter;
