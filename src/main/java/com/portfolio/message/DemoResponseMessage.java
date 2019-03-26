package com.portfolio.message;

import lombok.Data;

@Data
public class DemoResponseMessage<T> {
	private boolean success;
	private T object;
	
	public DemoResponseMessage() {}
	public DemoResponseMessage(boolean success) {
		this.success = success;
	}
	public DemoResponseMessage(boolean success, T object) {
		this.success = success;
		this.object = object;
	}
}
