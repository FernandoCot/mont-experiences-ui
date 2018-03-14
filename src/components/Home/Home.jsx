import React, { Component } from "react";

import { inject, observer } from 'mobx-react';

import ExperienceList from "../Experiences/List/ExperienceList";

import { CircularProgress } from 'material-ui/Progress'
import './Home.css';

@inject('experience') @observer
export default class Home extends Component {
	componentDidMount() {
		// this.props.experiences.fetchAll();

		const experience = this.props.experience;

		experience.load({recommended: true});
	}

	renderExperiences(collection, isLoading) {
		if (isLoading) {
			return (<
			div className="container">
				<CircularProgress color='primary' thickness={7} />
			</div>
			)
		} else {
			return (
				<div className="experiences-section">
					<div className="container">
						<div className="row">
								<div className="experiences-list">
									<ExperienceList collection={collection} />
								</div>
						</div>
					</div>
				</div>
			)
		}
	}

	render() {
		const { collection, isLoading } = this.props.experience;
		
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="home-welcome">
							<h1 className="home-title">Descubra e agende experiências
							<br className="hidden-xs" />incríveis!
						</h1>
							<p className="lead">
								As melhores atividades, passeios e aventuras em um só lugar!
						</p>
						</div>
					</div>
				</div>
				{this.renderExperiences(collection, isLoading)}
			</div>
		)
	}
}
