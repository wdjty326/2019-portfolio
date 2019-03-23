import React, { Component, Fragment } from 'react';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import SkillForm from './skillForm';

export default class SkillES6 extends Component {
  render() {
    return (
      <SkillForm
        title="새로운 개발 트랜드에 대한 학습"
        icon={faJs}
      >
         <blockquote>
            <p>개인 프로젝트 및 팀 프로젝트를 통해 React와 함께 역량 강화</p>
            <p>ES6의 기능인 aysnc-await, iterator, promise 활용</p>
            <p>React v16와 함께 다양한 Front Web Application 개발</p>
          </blockquote>
      </SkillForm>
    );
  }
}