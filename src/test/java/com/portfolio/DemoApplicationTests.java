package com.portfolio;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.portfolio.message.DemoMailMessage;

import org.springframework.http.MediaType;


@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

	@Autowired
	private DemoController controller;

	private MockMvc mockMvc;
	private ObjectMapper objectMapper;
	
	// Content-Type=application/JSON;charset=utf-8
	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
		MediaType.APPLICATION_JSON.getSubtype(),
		Charset.forName("utf8"));

	@Before
	public void initalize() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
		
		// object json 변환 객체 설정
		objectMapper = new ObjectMapper();
		
		SimpleModule simpleModule = new SimpleModule();
		objectMapper.registerModule(simpleModule);
	}


	/**
	 * DemoConroller 컨테스트 로드 확인
	 */
	@Test
	public void contextLoads() throws Exception {
		assertNotNull(controller);
	}

	/**
	 * 메일 전송 확인
	 */
	@Test
	public void mailSendTest() throws Exception {
		DemoMailMessage message = 
				new DemoMailMessage("홍길동", "wdjty326@gmail.com", "테스트제목", "테스트내용");
		mockMvc.perform(
				post("/sendmail")
				.contentType(contentType)
				.content(objectMapper.writeValueAsBytes(message))
				)
		.andExpect(status().isOk())
		.andDo(print());
	}

}
