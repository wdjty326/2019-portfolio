import React, { Component, Fragment } from 'react';
import { faJava } from '@fortawesome/free-brands-svg-icons';
import SkillForm from './skillForm';

export default class SkillJava extends Component {
  render() {
    return (
      <SkillForm
        title="현장에서 쌓아올린 경험"
        icon={faJava}
      >
        <blockquote>
          <p>3년 이상의 Java Web Application 개발 및 유지보수 활동</p>
          <p>Websocket 기술을 활용한 웹 원격 응답 기술 구현</p>
          <p>다양한 Java Library 활용 및 분석 능력 소유</p>
        </blockquote>
      </SkillForm>
    );
  }
}