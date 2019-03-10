import React, { Component } from 'react';
import Navbar from './MainNavbar';
import Body from './MainBody';
import '../lib/css/MainLayout.css';

/*
 * @date 2018. 10. 14
 * @anather Jeong Taek You
 * @explanation 
 	화면 전체를 구성합니다.
 */
export default class MainLayout extends Component {

	render() {
		return (
		<div className="App">
			<Navbar />
			<Body />
		</div>
		);
	};

};