package com.nbenliogludev.backend.parser;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import com.nbenliogludev.backend.dto.CategoriesResponse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class GeminiResponseParser {

    // Method to parse content for the generateContent method
    public String parseResponse(String jsonResponse) throws ParseException {
        JSONObject jsonObject = (JSONObject) new JSONParser().parse(jsonResponse);
        JSONArray candidatesArray = (JSONArray) jsonObject.get("candidates");

        if (candidatesArray == null || candidatesArray.isEmpty()) {
            throw new ParseException(ParseException.ERROR_UNEXPECTED_TOKEN, "Missing 'candidates' array in response");
        }

        JSONObject candidateObject = (JSONObject) candidatesArray.get(0);
        JSONObject contentObject = (JSONObject) candidateObject.get("content");
        JSONArray partsArray = (JSONArray) contentObject.get("parts");
        JSONObject partObject = (JSONObject) partsArray.get(0);

        return (String) partObject.get("text");
    }

    // Method to parse categories for main category-related queries
    public List<CategoriesResponse.Category> parseCategoryResponse(String jsonResponse) throws ParseException {
        JSONObject jsonObject = (JSONObject) new JSONParser().parse(jsonResponse);
        JSONArray candidatesArray = (JSONArray) jsonObject.get("candidates");
        if (candidatesArray == null || candidatesArray.isEmpty()) {
            throw new ParseException(ParseException.ERROR_UNEXPECTED_TOKEN, "Missing 'candidates' array in response");
        }

        JSONObject candidateObject = (JSONObject) candidatesArray.get(0);
        JSONObject contentObject = (JSONObject) candidateObject.get("content");
        JSONArray partsArray = (JSONArray) contentObject.get("parts");
        JSONObject partObject = (JSONObject) partsArray.get(0);
        String responseText = (String) partObject.get("text");

        return extractCategories(responseText);
    }

    // New method to parse inner categories for inner category-related queries
    public List<CategoriesResponse.Category> parseInnerCategoryResponse(String jsonResponse) throws ParseException {
        JSONObject jsonObject = (JSONObject) new JSONParser().parse(jsonResponse);
        JSONArray candidatesArray = (JSONArray) jsonObject.get("candidates");
        if (candidatesArray == null || candidatesArray.isEmpty()) {
            throw new ParseException(ParseException.ERROR_UNEXPECTED_TOKEN, "Missing 'candidates' array in response");
        }

        JSONObject candidateObject = (JSONObject) candidatesArray.get(0);
        JSONObject contentObject = (JSONObject) candidateObject.get("content");
        JSONArray partsArray = (JSONArray) contentObject.get("parts");
        JSONObject partObject = (JSONObject) partsArray.get(0);
        String responseText = (String) partObject.get("text");

        return extractCategories(responseText);
    }

    // Helper method to extract categories and format as List<Category> with value and label
    private List<CategoriesResponse.Category> extractCategories(String responseText) {
        List<CategoriesResponse.Category> categories = new ArrayList<>();
        String[] lines = responseText.split("\n");

        for (String line : lines) {
            line = line.trim();
            if (line.startsWith("* **") && line.endsWith("**")) {
                String categoryLabel = line.substring(4, line.length() - 2);
                String categoryValue = categoryLabel.toLowerCase().replace(" ", "_");
                categories.add(new CategoriesResponse.Category(categoryValue, categoryLabel));
            }
        }
        return categories;
    }


    public List<String> parseResponseToList(String jsonResponse) throws ParseException {
        JSONObject jsonObject = (JSONObject) new JSONParser().parse(jsonResponse);
        JSONArray candidatesArray = (JSONArray) jsonObject.get("candidates");

        if (candidatesArray == null || candidatesArray.isEmpty()) {
            throw new ParseException(ParseException.ERROR_UNEXPECTED_TOKEN, "Missing 'candidates' array in response");
        }

        JSONObject candidateObject = (JSONObject) candidatesArray.get(0);
        JSONObject contentObject = (JSONObject) candidateObject.get("content");
        JSONArray partsArray = (JSONArray) contentObject.get("parts");
        JSONObject partObject = (JSONObject) partsArray.get(0);
        String responseText = (String) partObject.get("text");

        // Process each line, filtering out non-title lines and cleaning up titles
        List<String> titles = Arrays.stream(responseText.split("\n"))
                .map(String::trim)
                .filter(line -> !line.startsWith("İşte") && !line.isEmpty()) // Filter out the intro line
                .map(line -> line.replaceAll("^[0-9]+\\.", "").replaceAll("\\*\\*", "").trim()) // Remove numbers and asterisks
                .collect(Collectors.toList());

        // Limit to the first 4 titles if more are provided
        return titles.stream().limit(4).collect(Collectors.toList());
    }


}
