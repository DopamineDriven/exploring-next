import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';


class Sessions extends Component {

    static async getInitialProps() {
        // returns sessions instead of speakers
        const promise = axios.get('http://localhost:4000/sessions').then(response => {
            return {
                hasErrored: false,
                sessionData: response.data
            };
        })
            .catch(error => {
                return {
                    hasErrored: true,
                    message: error.message
                }
            });
        return promise;


    }

    constructor(props) {
        super(props);
        this.state = {
            hasErrored: props.hasErrored,
            message: props.message,
            sessionData: props.sessionData
        }
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            
            <div>
                <Link href='./'>
                    <a>SPEAKERS</a>
                </Link>
                <ul>
                    {this.state.sessionData.map((session) =>
                        <li key={session.id}>
                            {session.title} {session.id}
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}

export default Sessions;