package com.nbenliogludev.backend.parser;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GeminiResponseParser {

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

    public List<String> parseCategoryResponse(String jsonResponse) throws ParseException {
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

    private List<String> extractCategories(String responseText) {
        List<String> categories = new ArrayList<>();
        String[] lines = responseText.split("\n");

        for (String line : lines) {
            line = line.trim();
            if (line.startsWith("* **") && line.endsWith("**")) {
                // Extract the category name between ** markers
                String category = line.substring(4, line.length() - 2);
                categories.add(category);
            }
        }
        return categories;
    }
}
