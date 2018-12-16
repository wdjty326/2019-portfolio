import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';


const FieldGroup = ({ id, label, help, ...props }) => {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
  );
}

/*
 * 메일 발송 기능 추가
 */
export default class InquiryPage extends Component {
	render() {
		return (
			<div className="InquiryPage">
				<div className="MainText">
				문의하기
				</div>
				<form>
					<FieldGroup
				      id="formControlsSubject"
				      type="text"
				      label="Subject"
				      placeholder="Ex)문의하기"
				    />
				    <FieldGroup
				      id="formControlsEmail"
				      type="email"
				      label="Email"
				      placeholder="Ex)gildong@gmail.com"
				    />
				    <FormGroup controlId="formControlsMessage">
      					<ControlLabel>Message</ControlLabel>
      					<FormControl componentClass="textarea" placeholder="Message" />
    				</FormGroup>
				</form>
				<footer className="page-footer font-small blue">
					<div className="footer-copyright text-center py-3">© 2018 Copyright:
						<a href="https://react-bootstrap.github.io/"> react-bootstrap.github.io</a>
					</div>
				</footer>
			</div>
		);
	}
};
