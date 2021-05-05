package eduAll.springboot.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;


public class HttpRequest {

    public static String getParamsString(Map<String, String> params) throws UnsupportedEncodingException
    {
        StringBuilder result = new StringBuilder();

        for (Map.Entry<String, String> entry : params.entrySet()) {
          result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
          result.append("=");
          result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
          result.append("&");
        }

        String resultString = result.toString();
        return resultString.length() > 0
          ? resultString.substring(0, resultString.length() - 1)
          : resultString;
    }

    // call HTTP GET request to user service and get userId
	public static long getUserId(String token) throws Exception {
		URL url = new URL("http://localhost:8080/api/users/16/token?token=" + token);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");

		BufferedReader in = new BufferedReader(
				  new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer content = new StringBuffer();
		while ((inputLine = in.readLine()) != null) {
		    content.append(inputLine);
		}
		in.close();
		con.disconnect();
		// content looks like {"userID":"123....."}
		// better if deal with broken response -> empty etc...
		return Long.parseLong(content.substring(11, content.length()-2));
	}


	public static void updateContacts(String token, List<Long> students) throws Exception {

		long id = getUserId(token);
		String update = "{\"contacts\": " + students.toString() + ", ";
		update += "\"additionals\": " + "[" + id + "] }";


		URL url = new URL("http://localhost:4000/contacts/" + token);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("PUT");
		con.setDoOutput(true);

		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Accept", "application/json");

		OutputStreamWriter out = new OutputStreamWriter(
				con.getOutputStream());
		out.write(update);
		out.flush();
		out.close();
		con.getResponseCode();
		con.disconnect();
	}

}
