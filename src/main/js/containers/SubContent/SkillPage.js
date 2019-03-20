import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faJava, faHtml5, faReact, faJs } from '@fortawesome/free-brands-svg-icons';

export default class SkillPage extends Component {
	skillList = [
		[
			{
				icon: faJava,
				name: 'Java',
				color: '#436E90',
				description: 'java',
			}, {
				icon: faLeaf,
				name: 'SpringFramework',
				color: '#5DC430',
				description: 'java',
			}, {
				icon: faReact,
				name: 'React',
				color: '#54D1FA',
				description: 'java',
			},
		], [
			{
				icon: faJs,
				name: 'ES6',
				color: '#F4DB26',
				description: 'java',
			}, {
				icon: faHtml5,
				name: 'HTML5',
				color: '#DA3626',
				description: 'java',
			},
		],
	];
	
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
				<div className="SkillList">
					{
						this.skillList.map((row) => (
							<div> 
								{
									row.map((info) => {
										const { color } = info;
										return (
											<div
												key={info.name}
												style={{
													color,
												}}
											>
												<FontAwesomeIcon icon={info.icon} />
												<span>{info.name}</span>
											</div>
										)
									})
								}
							</div>
						))
					}
				</div>
			</div>
		);
	}
};