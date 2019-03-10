import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../lib/css/MainNavbar.css';

/*
 * @date 2018. 10. 14
 * @anather Jeong Taek You
 * @explanation
 	상단 고정 메뉴바를 구성 합니다.
 */
export default class MainNavbar extends Component {
	render() {
		return (
			<Navbar fixedTop={true}>
				<Navbar.Header>
					<Navbar.Brand><a href="#home">포트폴리오</a></Navbar.Brand>
						<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					{/* Nav 변환*/}
					<ul className="nav navbar-nav navbar-left">
						<li role="presentation" className="">
							<Link activeClass="activePage" to="MainPage" spy={true} smooth={true} duration={500}>메인</Link>
						</li>
						<li role="presentation" className="">
							<Link activeClass="activePage" to="SkillPage" spy={true} smooth={true} duration={500}>기술력</Link>
						</li>
						<li role="presentation" className="">
							<Link activeClass="activePage" to="ActivityPage" spy={true} smooth={true} duration={500}>활동</Link>
						</li>
						<li role="presentation" className="">
							<Link activeClass="activePage" to="InquiryPage" spy={true} smooth={true} duration={500}>문의</Link>
						</li>
					</ul>
					<Nav pullRight>
						<NavItem href="https://www.facebook.com/wdjty?ref=bookmarks" >
							<FontAwesomeIcon title="Facebook" icon={faFacebook} />
						</NavItem>
						<NavItem href="https://github.com/wdjty326?tab=repositories">
							<FontAwesomeIcon title="Github" icon={faGithub} />
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	};

};
