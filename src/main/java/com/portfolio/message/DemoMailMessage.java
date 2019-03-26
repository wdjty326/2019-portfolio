package com.portfolio.message;

import lombok.Data;

@Data
public class DemoMailMessage {
	private String name;
	private String address;
	private String subject;
	private String content;
	
	public DemoMailMessage() {}	
	public DemoMailMessage(String name, String address, String subject, String content) {
		this.name = name;
		this.address = address;
		this.subject = subject;
		this.content = content;
	}
}
