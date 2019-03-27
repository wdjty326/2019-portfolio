import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import { Carousel, Panel } from 'react-bootstrap';
// import reactIcon from '../../lib/image/react.png';
// import kakaoIcon from '../../lib/image/kakao.png';

/*
 * 추후에 nodejs에서 git 레파지토리 파싱 로직을 넣을 예정
 */
export default class ActivityPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gitList : [],
		};
	}

	componentDidMount() {
		axios.get('/gitList').then(response => {
			this.setState({
				gitList: response.data.object,
			});
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		const { gitList } = this.state;
		const MainClassName = (!this.props.viewEvent) ? "ActivityPage EventShowElement" : "ActivityPage HideElement";
		
		return (
			<div className={MainClassName}>
				<div className="MainText">
					<p>어떤 활동들이 있었습니까?</p>
				</div>
				<div className="SubText">
					<p>개발중인 최신 Git 프로젝트를 확인하세요.</p>
				</div>
				<div className="projectList">
					<ListGroup variant="flush">
						{
							gitList.filter((gitInfo, idx) => idx < 4).map(gitInfo => (
								<ListGroupItem
									key={gitInfo.name}
									href={gitInfo.href}	
								>
									<h3>{gitInfo.name}</h3>
									<p>{gitInfo.content}</p>
								</ListGroupItem>
							))
						}
					</ListGroup>
				</div>
				{/* <Carousel className="projectList">
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
				</Carousel> */}
			</div>
		);
	}
};