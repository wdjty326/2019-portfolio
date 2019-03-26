package com.portfolio;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.apache.GoogleApacheHttpTransport;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.Base64;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailRequestInitializer;
import com.google.api.services.gmail.GmailScopes;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.Profile;
import com.portfolio.message.DemoMailMessage;
import com.portfolio.message.DemoResponseMessage;

import org.asynchttpclient.AsyncHttpClient;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.Setter;


@EnableConfigurationProperties
@ConfigurationProperties(prefix="demo")
@Controller
public class DemoController {
  private final Logger logger = LoggerFactory.getLogger(getClass());
  @Setter
  private String credentialFilePath;
  @Setter
  private String dataDirectoryPath;
  @Setter
  private String adminAddress;
  @Setter
  private String apiKey;
  @Setter
  private String gitLink;

  private final JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
  private final List<String> scopes = Collections.singletonList(GmailScopes.GMAIL_SEND);
  private static final LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
  
  @GetMapping("/")
  public String indexPage() {
    return "index";
  }
  
  
  @GetMapping("/gitList")
  public DemoResponseMessage<List<Map<String, String>>> gitList() {
	  List<Map<String, String>> RepositoriesInfo = getRepositoriesInfo();
	  return new DemoResponseMessage<List<Map<String,String>>>(true, RepositoriesInfo);
  }

  // https://www.programcreek.com/java-api-examples/index.php?api=com.google.api.services.gmail.model.Message
  // https://developers.google.com/gmail/api/v1/reference/users/messages/send
  @PostMapping(path="/sendmail", consumes="application/json")
  @ResponseBody
  public DemoResponseMessage<String> postMethodName(@RequestBody DemoMailMessage message) throws IOException {
    DemoResponseMessage<String> responseMessage = null;
	  
	try {
      HttpTransport httpTransport = GoogleApacheHttpTransport.newTrustedTransport();
      // NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
      Gmail service = new Gmail.Builder(httpTransport, jsonFactory, getCredentials(httpTransport))
      .setGoogleClientRequestInitializer(new GmailRequestInitializer(apiKey))
      .build();

      // com.google.api.services.gmail.model.Profile profile = requestBody("google-mail://users/getProfile?inBody=userId", CURRENT_USERID);
      com.google.api.services.gmail.model.Profile profile = new Profile().setEmailAddress(adminAddress);
      
      Properties props = new Properties();
      Session session = Session.getDefaultInstance(props);
      MimeMessage mimeMessage = new MimeMessage(session);
      mimeMessage.addRecipients(javax.mail.Message.RecipientType.TO, profile.getEmailAddress());
      mimeMessage.setSubject(message.getSubject());
      mimeMessage.setText(
    		  "해당 메일은 http://ec2-18-191-69-198.us-east-2.compute.amazonaws.com 에서 발송된 메일입니다." +
    		  "\n발송자 : " + message.getName() +
    		  "\n발송메일 : " + message.getAddress() +
    		  "\n내용 : " + message.getContent());
      
      ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
      mimeMessage.writeTo(byteArrayOutputStream);
      String encodedEmail = Base64.encodeBase64URLSafeString(byteArrayOutputStream.toByteArray());

      Message googleMessage = new Message();
      googleMessage.setRaw(encodedEmail);
      service.users().messages().send(adminAddress, googleMessage).execute();
      
      responseMessage = new DemoResponseMessage<String>(true);
    } catch (IOException | GeneralSecurityException | MessagingException e) {
      e.printStackTrace();
      logger.error(e.getMessage());

      responseMessage = new DemoResponseMessage<String>(false);
    } finally {
    	if (receiver != null) 
    		receiver.stop();
	}
    return responseMessage;
  }
  
  // https://developers.google.com/gmail/api/quickstart/java
  // 참고 예제
  private Credential getCredentials(HttpTransport httpTransport) throws IOException {
    InputStream in = new FileInputStream(getClass().getClassLoader().getResource(credentialFilePath).getFile());
    GoogleClientSecrets clientSecret = GoogleClientSecrets.load(jsonFactory, new InputStreamReader(in));
    GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow = 
    		new GoogleAuthorizationCodeFlow.Builder(httpTransport, jsonFactory, clientSecret, scopes)
    		.setDataStoreFactory(new FileDataStoreFactory(new File(dataDirectoryPath))).setAccessType("offline").build();
    
    
//    GoogleCredential googleCredential = new GoogleCredential.Builder()
//      .setClientSecrets(clientSecrets)
//      //.setClientSecrets(clientId, clientSecret)
//      .setJsonFactory(jsonFactory)
//      .setTransport(httpTransport)
//      // .setRequestInitializer((new HttpRequestInitializer(){
//      //   @Override
//      //   public void initialize(HttpRequest request)
//      //           throws IOException {
//      //       request.getHeaders().put("Authorization", "Bearer ya29.GlvXBtM-I6lwz0nsv_53xYDXQSCyFIg8JmRbL89KGqj3Kjf87kOkZfUE1ZMR3oSQFpycSCd9ijhYcSszPuTCvL-m1gBQue1dQ1tTfXdN51tuS6xE3gXMfNdpdAi6");
//      //   }
//      // }))
//      .build();
//    googleCredential.refreshToken();
    return new AuthorizationCodeInstalledApp(googleAuthorizationCodeFlow, receiver).authorize("user");
  }
  
  private List<Map<String, String>> getRepositoriesInfo() {
	  List<Map<String, String>> RepositoriesInfo = new ArrayList<Map<String,String>>();  
	  
	  try {
		Elements elements = getDocument().select("#user-repositories-list").select("li.source > div:nth-child(1)");
		
		for(Element element : elements) {
			Map<String, String> RepositoryInfo = new HashMap<>();
			RepositoryInfo.put("name", element.select("div:nth-child(1) > h3 > a").text());
			RepositoryInfo.put("href", element.select("div:nth-child(1) > h3 > a").attr("href"));
			RepositoryInfo.put("content", element.select("div:nth-child(2)").text());
			
			RepositoriesInfo.add(RepositoryInfo);
		}
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	  
	  return RepositoriesInfo;
  }
  
  /**
   * document 객체 가져오기
   * @return
   * @throws IOException
   */
  private Document getDocument() throws IOException {
	 URL url = null;
	 Document document = null;
	 BufferedReader reader = null;
	 try {
		 url = new URL(gitLink);
		 reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
		 StringBuffer strBuf = new StringBuffer();
		 String line = "";
		 
		 while((line = reader.readLine()) != null)
			 strBuf.append(line);
		 
		 reader.close();
		 
		 document = Jsoup.parse(strBuf.toString());
	 } catch (IOException e) {
		 logger.error(e.getMessage());
	 } finally {
		if (reader != null) reader.close();
	}
	
	return document;
  }
}