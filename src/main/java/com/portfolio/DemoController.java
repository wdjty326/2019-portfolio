package com.portfolio;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Store;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.Base64;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;

import com.portfolio.message.DemoMailMessage;
import com.portfolio.message.DemoResponseMessage;

import lombok.Setter;

@EnableConfigurationProperties
@ConfigurationProperties(prefix="google")
@Controller
public class DemoController {
	@Setter
	private String clientId;
	@Setter
	private String clientSecret;
	@Setter
	private String redirectUri;
	@Setter
	private String code;
	
  @GetMapping("/")
  public String root() {
    return "index";
  }

  /**
   * 메일 전송
   */
  @PostMapping("/sendmail")
  public @ResponseBody DemoResponseMessage sendmail() {
	try {
		Gmail gmailService = new GmailServiceImpl(GoogleNetHttpTransport.newTrustedTransport());
        gmailService.setGmailCredentials(GmailCredentials.builder()
                .userEmail("YOUR_EMAIL@gmail.com")
                .clientId("1078329436949-rspqf1hkbedrqavvcakn8k6l6qd9asnl.apps.googleusercontent.com")
                .clientSecret("7Axm_PMdL3lppLdkA-MmPo7h")
                .accessToken("ya29.GluCBY6YE-TzEU2-F86sRl_Gq5QyPmUNW2wEV0MynFN-L3HK2AHEUD09pknXfrvk8UY6NYnGwuCIxAh97s6ipVylgwoNIsxLs7uouIBqj8vWiAODGiS2a1ZDNa8D")
                .refreshToken("1/XyMnZb4UfU8WDt6SnHIeE3wFTPyTAg2K16ZA7NIF0bY")
                .build());

        gmailService.sendMessage("RECIPIENT_EMAIL@gmail.com", "Subject", "body text");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (MessagingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	 
	 
  
//      SimpleMailMessage msg = new SimpleMailMessage();
//      String html = "<pre>" + entity.getFirst("content") + "</pre>";
//
//      try {
//        String mail = entity.getFirst("mail");
//        String subject = entity.getFirst("subject");
//
//        msg.setFrom(mail);
//        
//        msg.setSubject(subject);
//        msg.setText(html);
//        this.sender.send(msg);
//      } catch (Exception e) {
//
//      }
      return new DemoResponseMessage();
  }
  
}