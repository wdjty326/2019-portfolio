import React, { Component, Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SkillForm extends Component {
  render() {
    const {
      title,
      children,
      icon,
    } = this.props;

    return (
      <Fragment>
        <h1>{title}</h1>
        <Col xs={9}>
          {children}
        </Col>
        <Col xs={3}>
          <FontAwesomeIcon icon={icon} className="skillicon" />
        </Col>
      </Fragment>
    );
  }
}