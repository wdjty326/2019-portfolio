package com.portfolio;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class DemoController {

  @GetMapping("/")
  public String root() {
    return "index";
  }

  /**
   * 메일 전송
   */
  @PostMapping(value="/sendmail")
  public @ResponseBody Map<String, Object> sendmail(@RequestBody MultiValueMap<String, String> entity) {
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
      return new HashMap<String, Object>();
  }
  
}