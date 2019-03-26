import React, { Component } from 'react';
import Navbar from './MainNavbar';
import Body from './MainBody';
import EllipsisSVG from '../lib/image/Ellipsis-3s-200px.svg';
import '../lib/css/MainLayout.css';

/*
 * @date 2018. 10. 14
 * @anather Jeong Taek You
 * @explanation 
 	화면 전체를 구성합니다.
 */
export default class MainLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ajaxload: false,
		};
	}

	toggleAjaxLoad = () => {
		this.setState(prevState => ({
			ajaxload: !prevState.ajaxload,
		}));
	}

	render() {
		const { ajaxload } = this.state;

		return (
		<div className="App">
			<Navbar />
			<Body toggleAjaxLoad={this.toggleAjaxLoad} />
			<div className={`ajax-loader ${(ajaxload) ? '' : 'hide'}`}>
				<img src={EllipsisSVG} />
			</div>
		</div>
		);
	};

};