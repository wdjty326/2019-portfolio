package com.portfolio.root;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class RootController {
  
  @Autowired
  private MailSender sender; 

  @GetMapping("/")
  public String root() {
    return "index";
  }

  /**
   * 메일 전송
   */
  @PostMapping(value="/sendmail")
  public @ResponseBody Map<String, Object> sendmail(@RequestBody MultiValueMap<String, String> entity) {
      SimpleMailMessage msg = new SimpleMailMessage();
      String html = "<pre>" + entity.get("content") + "</pre>";

      try {
        // msg.setFrom(entity.get("mail"));
        msg.setTo("wdjty326@gmail.com");
        // msg.setSubject(entity.get("subject"));
        msg.setText(html);
        this.sender.send(msg);
      } catch (Exception e) {

      }
      return new HashMap<String, Object>();;
  }
  
}