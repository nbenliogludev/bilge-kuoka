package com.nbenliogludev.backend.service;

import com.nbenliogludev.backend.builder.GeminiPromptBuilder;
import com.nbenliogludev.backend.client.GeminiClient;
import com.nbenliogludev.backend.dto.CategoriesResponse;
import com.nbenliogludev.backend.parser.GeminiResponseParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeminiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

    @Value("${gemini.model}")
    private String geminiModel;

    @Value("${gemini.api-key}")
    private String apiKey;

    private final GeminiClient geminiApiClient;
    private final GeminiResponseParser geminiResponseParser;
    private final GeminiPromptBuilder geminiPromptBuilder;

    public GeminiService(GeminiClient geminiApiClient, GeminiResponseParser geminiResponseParser, GeminiPromptBuilder geminiPromptBuilder) {
        this.geminiApiClient = geminiApiClient;
        this.geminiResponseParser = geminiResponseParser;
        this.geminiPromptBuilder = geminiPromptBuilder;
    }

    public String generateContent(String mainCategory, String innerCategory, String age, String detail, String additionalInfo) {
        String requestBody = geminiPromptBuilder.buildPrompt(mainCategory, innerCategory, age, detail, additionalInfo);
        String response = geminiApiClient.sendPostRequest(geminiModel, apiKey, requestBody);

        try {
            return geminiResponseParser.parseResponse(response);
        } catch (ParseException e) {
            logger.error("Failed to parse response from Gemini API: {}", response, e);
            throw new RuntimeException("Failed to parse response from Gemini API", e);
        }
    }

    // Method for categories based on query
    public CategoriesResponse getCategoriesByQuery(String query) {
        String requestBody = geminiPromptBuilder.buildCategoryQueryPromptInTurkish(query);
        String response = geminiApiClient.sendPostRequest(geminiModel, apiKey, requestBody);

        try {
            List<CategoriesResponse.Category> categories = geminiResponseParser.parseCategoryResponse(response);
            return new CategoriesResponse(categories);
        } catch (ParseException e) {
            logger.error("Failed to parse response from Gemini API: {}", response, e);
            throw new RuntimeException("Failed to parse response from Gemini API", e);
        }
    }

    // Updated method for inner categories based on category and query
    public CategoriesResponse getInnerCategoriesByQuery(String category, String query) {
        String requestBody = geminiPromptBuilder.buildInnerCategoryQueryPromptInTurkish(category, query);
        String response = geminiApiClient.sendPostRequest(geminiModel, apiKey, requestBody);

        try {
            List<CategoriesResponse.Category> innerCategories = geminiResponseParser.parseInnerCategoryResponse(response);
            return new CategoriesResponse(innerCategories);
        } catch (ParseException e) {
            logger.error("Failed to parse response from Gemini API: {}", response, e);
            throw new RuntimeException("Failed to parse response from Gemini API", e);
        }
    }
}
