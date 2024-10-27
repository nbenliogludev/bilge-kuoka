package com.nbenliogludev.backend.builder;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class GeminiPromptBuilder {

    public String buildPrompt(String mainCategory, String innerCategory, String age, String detail, String additionalInfo) {
        // Construct the prompt content based on all parameters
        String fullPrompt = String.format(
                "Generate content for the category: %s with a focus on %s. Simplify for age %s. Detail level: %s. Additional information: %s.",
                mainCategory, innerCategory, age, detail, additionalInfo
        );

        JSONObject promptJson = new JSONObject();
        JSONArray contentsArray = new JSONArray();
        JSONObject contentsObject = new JSONObject();
        contentsObject.put("role", "user");

        JSONArray partsArray = new JSONArray();
        JSONObject partsObject = new JSONObject();
        partsObject.put("text", fullPrompt);
        partsArray.add(partsObject);
        contentsObject.put("parts", partsArray);

        contentsArray.add(contentsObject);
        promptJson.put("contents", contentsArray);
        promptJson.put("safetySettings", getSafetySettings());
        promptJson.put("generationConfig", getGenerationConfig());

        return promptJson.toJSONString();
    }

    private JSONArray getSafetySettings() {
        JSONArray safetySettingsArray = new JSONArray();

        // Adding safety settings for hate speech
        JSONObject hateSpeechSetting = new JSONObject();
        hateSpeechSetting.put("category", "HARM_CATEGORY_HATE_SPEECH");
        hateSpeechSetting.put("threshold", "BLOCK_ONLY_HIGH");
        safetySettingsArray.add(hateSpeechSetting);

        // Adding safety settings for dangerous content
        JSONObject dangerousContentSetting = new JSONObject();
        dangerousContentSetting.put("category", "HARM_CATEGORY_DANGEROUS_CONTENT");
        dangerousContentSetting.put("threshold", "BLOCK_ONLY_HIGH");
        safetySettingsArray.add(dangerousContentSetting);

        return safetySettingsArray;
    }

    private JSONObject getGenerationConfig() {
        JSONObject parametersJson = new JSONObject();
        parametersJson.put("temperature", 0.5);
        parametersJson.put("topP", 0.99);
        return parametersJson;
    }
}
