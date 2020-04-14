import React from "react";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString()
        }
    }

    tick() {
        this.setState(() => {
            return ({
                time: new Date().toLocaleString()
            });
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return <h1>Hello From Pluralsight and React:
        &nbsp; {this.state.time}</h1>
    }
}

export default Index;



