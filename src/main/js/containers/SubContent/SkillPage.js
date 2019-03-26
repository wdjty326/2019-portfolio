import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faJava, faHtml5, faReact, faJs } from '@fortawesome/free-brands-svg-icons';
import { Flipped, Flipper } from 'react-flip-toolkit';
import * as SkillList from './SkillList';

export default class SkillPage extends Component {
	skillList = [
		[
			{
				icon: faJava,
				name: 'Java',
				color: '#436E90',
				component: <SkillList.SkillJava />,
			}, {
				icon: faLeaf,
				name: 'SpringFramework',
				color: '#5DC430',
				component: <SkillList.SkillSpring />,
			}, {
				icon: faReact,
				name: 'React',
				color: '#54D1FA',
				component: <SkillList.SkillReact />,
			},
		], [
			{
				icon: faJs,
				name: 'ES6',
				color: '#F4DB26',
				component: <SkillList.SkillES6 />,
			}, {
				icon: faHtml5,
				name: 'HTML5',
				color: '#DA3626',
				component: <SkillList.SkillHTML5 />,
			},
		],
	];
	

	constructor(props) {
		super(props);

		this.state = {
			fullScreenName: null,
			style: {
				top: 0,
				left: 0,
			},
		};
	}

	toggleChange = (event, toggle = null) => {
		this.setState({
			fullScreenName: toggle,
		});
	}
	
	render() {
		const { fullScreenName } = this.state;
		const MainClassName = (!this.props.viewEvent) ? "SkillPage EventShowElement" : "SkillPage HideElement";

		return (
			<div className={MainClassName}>
				<div className="MainText">
					<p>다양한 기술력을 보유하고 있습니다.</p>
				</div>
				<div className="SubText">
					<p>어떤 기술을 보유하고 있는지 확인하세요.</p>
				</div>
				<Flipper flipKey={fullScreenName} className="SkillList">
					{
						this.skillList.map((row, idx) => (
							<div key={idx}> 
								{
									row.map((info) => {
										const { color } = info;
										return (fullScreenName !== info.name) ?
										(
											<Flipped key={info.name} flipId={info.name}>
												<div
													style={{
														color,
													}}
													role="presentaition"
													className="blockSkillview"
													onClick={(event)=>this.toggleChange(event, info.name)}
												>
													<FontAwesomeIcon icon={info.icon} />
													<span>{info.name}</span>
												</div>
											</Flipped>
										) : (
											<Flipped key={info.name} flipId={info.name}>
												<div
													className="fullscreenSkillview"
													style={{
														backgroundColor:color,
													}}
													role="presentaition"
													onClick={(event)=>this.toggleChange(event)}
												>
													<div>
														{info.component}
													</div>
												</div>
											</Flipped>
										)
									})
								}
							</div>
						))
					}
				</Flipper>
			</div>
		);
	}
};