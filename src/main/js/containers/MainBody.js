import React, { Component } from 'react';
import { Element } from 'react-scroll';
import {
	ActivityPage,
	InquiryPage,
	MainPage,
	SkillPage
} from './SubContent/SubContent';
import '../lib/css/MainBody.css';


export default class MainBody extends Component {

	constructor(props) {
		super(props);

		this.state = {
			slowViewEventHandler : {
				SkillPage : true,
				ActivityPage : true
			}
		};


		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(event) {
		const scrollY = window.scrollY;
		// state값을 변경하기 위해서 객체 값을 가져옴
		const { slowViewEventHandler } = this.state;
		//726/4
		if ( scrollY > 181 && scrollY < 1526 ) {
			if (this.state.slowViewEventHandler.SkillPage) {
				slowViewEventHandler.SkillPage = false;

				this.setState({
					...this.state, ...{ slowViewEventHandler, }
				});
			}
		// SkillPage 의 시작과 끝
		//console.log(window.scrollY);
		// 726 + 1526 / 4
		}  

		if ( scrollY > 1107 && scrollY < 2326 ){
			if (this.state.slowViewEventHandler.ActivityPage) {
				slowViewEventHandler.ActivityPage = false;

				this.setState({
					...this.state, ...{ slowViewEventHandler, }
				});
			}
		// ActivityPage 의 시작과 끝
		//console.log(window.scrollY);
		}
	}

	render() {
		return (
			<div className="MainBody">
				{/* 메인 */}
				<Element name="MainPage" className="SubContent parallax-scrolling parallax-center">
					<MainPage />
				</Element>
				{/* 기술력 */}
				<Element name="SkillPage" className="SubContent">
					<SkillPage viewEvent={this.state.slowViewEventHandler.SkillPage} />
				</Element>
				{/* 활동 */}
				<Element name="ActivityPage" className="SubContent parallax-scrolling parallax-center">
					<ActivityPage viewEvent={this.state.slowViewEventHandler.ActivityPage} />
				</Element>
				{/* 문의 */}
				<Element name="InquiryPage" className="SubContent">
					<InquiryPage />
				</Element>
			</div>
		);
	}


};