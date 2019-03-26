import React, { Component, Fragment } from 'react';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import SkillForm from './skillForm';

export default class SkillSpring extends Component {
  render() {
    return (
      <SkillForm
        title="전자정부프레임웍 및 SpringBoot 경험"
        icon={faLeaf}
      >
        <blockquote>
          <p>2017년부터 자사 Web Application 에 전자정부프레임워크 도입</p>
          <p>전자정부프레임워크 기반의 Web Application을 적용한 사이트 운영 및 관리</p>
          <p>SpringBoot + Webpack4 환경 구성을 통한 역량 강화</p>
          <p>2019년도 SpringBoot + Spring5 + Webpack4 도입을 위한 프로젝트 설계 진행</p>
        </blockquote>
      </SkillForm>
    );
  }
}