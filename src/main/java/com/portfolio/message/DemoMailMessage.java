package com.portfolio.message;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class DemoMailMessage {
	private String name;
	private String address;
	private String subject;
	private String content;
	
	public DemoMailMessage() {}
	/*
	 * public DemoMailMessage(String name, String address, String subject, String
	 * content) { this.name = name; this.address = address; this.subject = subject;
	 * this.content = content; }
	 */
	
	@JsonCreator
    public DemoMailMessage(@JsonProperty("name") String name,  @JsonProperty("address") String address, @JsonProperty("subject") String subject, @JsonProperty("content") String content) {
		this.name = name;
		this.address = address;
		this.subject = subject;
		this.content = content;
    }
	
}
