package com.portfolio;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.apache.GoogleApacheHttpTransport;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.Base64;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailRequestInitializer;
import com.google.api.services.gmail.GmailScopes;
import com.google.api.services.gmail.model.Message;
import com.portfolio.message.DemoMailMessage;
import com.portfolio.message.DemoResponseMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.Setter;


@EnableConfigurationProperties
@ConfigurationProperties(prefix="mail")
@Controller
public class DemoController {
  private final Logger logger = LoggerFactory.getLogger(getClass());
  @Setter
  private String credentialFilePath;
  @Setter
  private String sender;
  @Setter
  private String apiKey;
  @Setter
  private String clientId;
  @Setter
  private String clientSecret;
  
  private final JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
  private final List<String> scopes = Collections.singletonList(GmailScopes.GMAIL_LABELS);
    
  @GetMapping("/")
  public String indexPage() {
    return "index";
  }

  // https://www.programcreek.com/java-api-examples/index.php?api=com.google.api.services.gmail.model.Message
  // https://developers.google.com/gmail/api/v1/reference/users/messages/send
  @PostMapping(path="/sendmail", consumes="application/json")
  @ResponseBody
  public DemoResponseMessage postMethodName(@RequestBody DemoMailMessage message) {
    try {
      HttpTransport httpTransport = GoogleApacheHttpTransport.newTrustedTransport();
      // NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
      Gmail service = new Gmail.Builder(httpTransport, jsonFactory, getCredentials(httpTransport))
      .setGoogleClientRequestInitializer(new GmailRequestInitializer(apiKey))
      .build();

      // com.google.api.services.gmail.model.Profile profile = requestBody("google-mail://users/getProfile?inBody=userId", CURRENT_USERID);
      Properties props = new Properties();
      Session session = Session.getDefaultInstance(props);
      
      MimeMessage mimeMessage = new MimeMessage(session);
      // mimeMessage.addRecipients(javax.mail.Message.RecipientType.TO, profile.getEmailAddress());
      mimeMessage.setFrom(message.getAddress());
      mimeMessage.setSubject(message.getSubject());
      mimeMessage.setText(message.getContent());
      
      ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
      mimeMessage.writeTo(byteArrayOutputStream);
      String encodedEmail = Base64.encodeBase64URLSafeString(byteArrayOutputStream.toByteArray());

      Message googleMessage = new Message();
      googleMessage.setRaw(encodedEmail);
      service.users().messages().send(message.getAddress(), googleMessage).execute();
    } catch (IOException | GeneralSecurityException | MessagingException e) {
      e.printStackTrace();
      logger.error(e.getMessage());
    }
    return new DemoResponseMessage();
  }
  
  // https://developers.google.com/gmail/api/quickstart/java
  // 참고 예제
  private Credential getCredentials(HttpTransport httpTransport) throws IOException {
    InputStream in = new FileInputStream(getClass().getClassLoader().getResource(credentialFilePath).getFile());
    GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(jsonFactory, new InputStreamReader(in));
    GoogleCredential googleCredential = new GoogleCredential.Builder()
      .setClientSecrets(clientSecrets)
      //.setClientSecrets(clientId, clientSecret)
      .setJsonFactory(jsonFactory)
      .setTransport(httpTransport)
      // .setRequestInitializer((new HttpRequestInitializer(){
      //   @Override
      //   public void initialize(HttpRequest request)
      //           throws IOException {
      //       request.getHeaders().put("Authorization", "Bearer ya29.GlvXBtM-I6lwz0nsv_53xYDXQSCyFIg8JmRbL89KGqj3Kjf87kOkZfUE1ZMR3oSQFpycSCd9ijhYcSszPuTCvL-m1gBQue1dQ1tTfXdN51tuS6xE3gXMfNdpdAi6");
      //   }
      // }))
      .build();
    googleCredential.refreshToken();
    return googleCredential;
  }
}