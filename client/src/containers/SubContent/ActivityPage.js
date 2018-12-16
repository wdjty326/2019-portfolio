import React, { Component } from 'react';
import { Carousel, Panel } from 'react-bootstrap';
import reactIcon from '../../lib/image/react.png';
import kakaoIcon from '../../lib/image/kakao.png';

/*
 * 추후에 nodejs에서 git 레파지토리 파싱 로직을 넣을 예정
 */
export default class ActivityPage extends Component {
	render() {
		const MainClassName = (!this.props.viewEvent) ? "ActivityPage EventShowElement" : "ActivityPage HideElement";

		return (
			<div className={MainClassName}>
				<div className="MainText">
					<p>어떤 활동들이 있었습니까?</p>
				</div>
				<div className="SubText">
					<p>개발한 Git 프로젝트를 확인하세요.</p>
				</div>
				<Carousel className="projectList">
					<Carousel.Item>
						<div className="section">
							<Panel className="panel-section">
								<Panel.Body>
									<img src={reactIcon} width={120} height={90} href="https://github.com/wdjty326/react-first-project"/>
								</Panel.Body>
								<Panel.Footer>react-first-project</Panel.Footer>
							</Panel>
							<Panel className="panel-section">
								<Panel.Body>
									<img src={kakaoIcon} width={120} height={90} href="https://github.com/wdjty326/kakao-plusfriend-autoreply"/>
								</Panel.Body>
								<Panel.Footer>kakao-plusfriend-autoreply</Panel.Footer>
							</Panel>
						</div>
					</Carousel.Item>
					{/*<Carousel.Item>
						<div class="img">
						</div>
					</Carousel.Item>*/}
				</Carousel>
			</div>
		);
	}
};