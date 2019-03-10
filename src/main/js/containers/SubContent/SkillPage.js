import React, { Component } from 'react';
import { ProgressBar, Row, Col } from 'react-bootstrap';

const SkillProgressBar = ({ title, now }) => (
	<Row>
		<Col xs={4}>
			<span className="label">{title}</span>
		</Col>
		<Col xs={8}>
			<ProgressBar bsStyle="success" now={now} label={`${now}%`}/>
		</Col>
	</Row>
);

export default class SkillPage extends Component {
	render() {
		const MainClassName = (!this.props.viewEvent) ? "SkillPage EventShowElement" : "SkillPage HideElement";

		return (
			<div className={MainClassName}>
				<div className="MainText">
					<p>다양한 기술력을 보유하고 있습니다.</p>
				</div>
				<div className="SubText">
					<p>어떤 기술을 보유하고 있는지 확인하세요.</p>
				</div>
				<div className="SkillProgressbar">
					<SkillProgressBar now={45} title="JAVA" />
					<SkillProgressBar now={51} title="Spring" />
					<SkillProgressBar now={89} title="HTML5" />
					<SkillProgressBar now={78} title="JavaScript" />
					<SkillProgressBar now={21} title="NodeJS" />
					<SkillProgressBar now={68} title="ReactJS"/>
				</div>
			</div>
		);
	}
};