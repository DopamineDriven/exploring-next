import React, { Component } from "react";
import DigitalClock from '../src/DigitalClock.jsx';

class Index extends Component {

    static async getInitialProps () {
        
    }

    constructor(props) {
        super(props);
        this.state = {
            //time: new Date().toISOString()
            time: props.time
        }
    }

    tick() {
        this.setState(() => {
            return ({
                time: new Date().toISOString()
            });
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return <DigitalClock time={this.state.time}></DigitalClock>
    }
}

export default Index;



