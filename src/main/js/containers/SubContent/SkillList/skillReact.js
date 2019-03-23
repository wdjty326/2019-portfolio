import React, { Component, Fragment } from 'react';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import SkillForm from './skillForm';

export default class SkillReact extends Component {
  render() {
    return (
      <SkillForm
        title="새로운 개발 트랜드에 대한 학습"
        icon={faReact}
      >
        <blockquote>
          <p>2018년부터 웹 프론트 개발의 선두주자인 React 라이브러리에 대한 이해</p>
          <p>개인 프로젝트 및 팀 프로젝트를 통한 React 활용도 역량 강화</p>
          <p>React 라이프사이클을 활용한 animation Component를 직접 작성</p>
          <p>react-router-dom, code-splitting 등 SPA에 최적화된 다양한 라이브러리 및 기법 사용</p>
        </blockquote>
      </SkillForm>
    );
  }
}