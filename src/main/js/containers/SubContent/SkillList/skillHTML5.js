import React, { Component, Fragment } from 'react';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
import SkillForm from './skillForm';

export default class SkillHTML5 extends Component {
  render() {
    return (
      <SkillForm
        title="현장에서 쌓아올린 경험"
        icon={faHtml5}
      >
        <blockquote>
          <p>3년 이상의 Web Application 개발 및 유지보수 활동</p>
          <p>Websocket 기술을 활용한 웹 원격 응답 기술 구현</p>
          <p>Bootstrap 등의 IE 호환성 UI 라이브러리 활용</p>
        </blockquote> 
      </SkillForm>
    );
  }
}