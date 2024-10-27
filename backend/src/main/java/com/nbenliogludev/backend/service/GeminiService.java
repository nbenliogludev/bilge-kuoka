package com.nbenliogludev.backend.service;

import com.nbenliogludev.backend.builder.GeminiPromptBuilder;
import com.nbenliogludev.backend.client.GeminiClient;
import com.nbenliogludev.backend.parser.GeminiResponseParser;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

    @Value("${gemini.model}")
    private String geminiModel;

    @Value("${gemini.api-key}")
    private String apiKey;

    private String conversationHistory = "";

    private final GeminiClient geminiApiClient;
    private final GeminiResponseParser geminiResponseParser;
    private final GeminiPromptBuilder geminiPromptBuilder;

    public GeminiService(GeminiClient geminiApiClient, GeminiResponseParser geminiResponseParser, GeminiPromptBuilder geminiPromptBuilder) {
        this.geminiApiClient = geminiApiClient;
        this.geminiResponseParser = geminiResponseParser;
        this.geminiPromptBuilder = geminiPromptBuilder;
    }

    public String generateContent(String mainCategory, String innerCategory, String age, String detail, String additionalInfo) {
        // Build the request body for the Gemini API using all parameters
        String requestBody = geminiPromptBuilder.buildPrompt(mainCategory, innerCategory, age, detail, additionalInfo);

        // Make the API request
        String response = geminiApiClient.sendPostRequest(geminiModel, apiKey, requestBody);

        // Parse and handle response
        return handleResponse(response, mainCategory + " - " + innerCategory);
    }

    private String handleResponse(String response, String prompt) {
        try {
            // Parse the API response text
            String responseText = geminiResponseParser.parseResponse(response);

            // Update conversation history with the new request and response
            conversationHistory += prompt + "\n" + responseText + "\n";
            return responseText;
        } catch (Exception e) {
            logger.error("Error in Parsing", e);
            throw new RuntimeException("Failed to parse the response");
        }
    }
}
