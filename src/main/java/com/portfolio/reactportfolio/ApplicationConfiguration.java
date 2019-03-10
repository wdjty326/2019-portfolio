package com.portfolio.reactportfolio;

import java.util.List;
import java.util.ArrayList;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="spring")
public class ApplicationConfiguration {
  private String host = null;
  private String username = null;
  private String password = null;

  public void setHost(String host) {
    this.host = host;
  }
  public String getHost() {
    return this.host;
  }

  public void setUsername(String username) {
    this.username = username;
  }
  public String getUsername() {
    return this.username;
  }

  public void setPassword(String password) {
    this.password = password;
  }
  public String getPassword() {
    return this.password;
  }
}