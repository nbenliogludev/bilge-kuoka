package com.nbenliogludev.backend.client;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class GeminiClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public String sendPostRequest(String model, String apiKey, String requestBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey,
                HttpMethod.POST, requestEntity, String.class
        );

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            return responseEntity.getBody();
        } else {
            throw new RuntimeException("API request failed with status code: " + responseEntity.getStatusCode());
        }
    }

    public List<String> fetchCategories(String apiKey) {
        String url = "https://generativelanguage.googleapis.com/v1beta/categories?key=" + apiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, List.class);
        return response.getBody();
    }

    public List<String> fetchInnerCategories(String apiKey, String mainCategory) {
        String url = "https://generativelanguage.googleapis.com/v1beta/categories/" + mainCategory + "/inner-categories?key=" + apiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, List.class);
        return response.getBody();
    }
}
