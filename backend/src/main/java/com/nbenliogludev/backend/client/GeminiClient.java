package com.nbenliogludev.backend.client;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class GeminiClient {

    public String sendPostRequest(String model, String apiKey, String requestBody) {
        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Perform HTTP POST request
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        HttpStatusCode statusCode = responseEntity.getStatusCode();

        if (statusCode.is2xxSuccessful()) {
            return responseEntity.getBody();
        } else {
            throw new RuntimeException("API request failed with status code: " + statusCode);
        }
    }
}
