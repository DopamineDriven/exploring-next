import React, { Component } from "react";
import axios from "axios";
import SpeakerCard from "../src/SpeakerCard.jsx";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

class Speakers extends Component {
	// getting key-value pairs from .env
	static GetSpeakersUrl() {
		if (process.env.NODE_ENV === "production") {
			// return default rest_speakers_prod if .env var with same name DNE
			return (
				process.env.RESTURL_SPEAKERS_PROD ||
				publicRuntimeConfig.RESTURL_SPEAKERS_PROD
			);
		} else {
			return process.env.RESTURL_SPEAKERS_DEV;
		}
	}

	static async getInitialProps() {
		const promise = axios
			.get(Speakers.GetSpeakersUrl())
			.then((response) => {
				return {
					hasErrored: false,
					speakerData: response.data
				};
			})
			.catch((error) => {
				return {
					hasErrored: true,
					message: error.message
				};
			});
		return promise;
	}
	// getInitProps called before class is instantiated
	constructor(props) {
		super(props);
		this.state = {
			hasErrored: props.hasErrored,
			message: props.message,
			speakerData: props.speakerData
		};
	}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="card-deck">
						{this.state.speakerData.map((speaker) => (
							<div
								className="card col-4 cardmin margintopbottom20"
								key={speaker.id}
							>
								<SpeakerCard speaker={speaker} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Speakers;
