package com.portfolio;

import java.util.Properties;
import java.util.Map.Entry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class DemoApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(DemoApplication.class);
	}

	public static void main(String[] args) {
		Properties properties = System.getProperties();
		for(Entry entry : properties.entrySet()) {
			System.out.println(entry.getKey()+"="+entry.getValue());
		}

		SpringApplication.run(DemoApplication.class, args);
	}
}
