package com.nbenliogludev.backend.builder;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class GeminiPromptBuilder {

    // Method for content generation prompt
    public String buildPrompt(String mainCategory, String innerCategory, String age, String detail, String additionalInfo) {
        String fullPrompt = String.format(
                "Generate content for category '%s' with a focus on '%s'. Target age: %s. Detail level: %s. Additional information: %s.",
                mainCategory, innerCategory, age, detail, additionalInfo
        );
        return buildJsonRequest(fullPrompt);
    }

    // Method for related articles prompt
    public String buildRelatedArticlesPrompt(String article) {
        String fullPrompt = String.format(
                "Generate a list of 4 related articles based on the topic '%s'. Each article should focus on different but relevant aspects of the main topic.",
                article
        );
        return buildJsonRequest(fullPrompt);
    }

    // Existing method for category queries
    public String buildCategoryQueryPromptInTurkish(String query) {
        String prompt = String.format("'%s' ile başlayan kategorileri Türkçe isimleriyle listele, örneğin matematik, biyoloji gibi.", query);
        return buildJsonRequest(prompt);
    }

    // Method for inner category queries
    public String buildInnerCategoryQueryPromptInTurkish(String category, String query) {
        String prompt = String.format("'%s' ana kategorisi altındaki, '%s' ile başlayan alt kategorileri Türkçe isimleriyle listele.", category, query);
        return buildJsonRequest(prompt);
    }

    private String buildJsonRequest(String fullPrompt) {
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
        JSONObject hateSpeechSetting = new JSONObject();
        hateSpeechSetting.put("category", "HARM_CATEGORY_HATE_SPEECH");
        hateSpeechSetting.put("threshold", "BLOCK_ONLY_HIGH");
        safetySettingsArray.add(hateSpeechSetting);

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
