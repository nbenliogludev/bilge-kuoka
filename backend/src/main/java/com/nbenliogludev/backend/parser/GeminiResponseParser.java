package com.nbenliogludev.backend.parser;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

@Component
public class GeminiResponseParser {

    public String parseResponse(String jsonResponse) throws ParseException {
        // Parse the JSON string
        JSONObject jsonObject = (JSONObject) new JSONParser().parse(jsonResponse);

        // Get the "candidates" array
        JSONArray candidatesArray = (JSONArray) jsonObject.get("candidates");

        // Extract the first candidate's content
        JSONObject candidateObject = (JSONObject) candidatesArray.get(0);
        JSONObject contentObject = (JSONObject) candidateObject.get("content");

        // Extract the first part's text
        JSONArray partsArray = (JSONArray) contentObject.get("parts");
        JSONObject partObject = (JSONObject) partsArray.get(0);
        return (String) partObject.get("text");
    }
}
