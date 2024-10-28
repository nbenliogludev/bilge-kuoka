package com.nbenliogludev.backend.controller;

import com.nbenliogludev.backend.dto.CategoriesResponse;
import com.nbenliogludev.backend.dto.GenerateContentRequest;
import com.nbenliogludev.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    // Existing generateContent endpoint
    @PostMapping("/generateContent")
    public String generateContent(@RequestBody GenerateContentRequest request) {
        return geminiService.generateContent(
                request.getMainCategory(),
                request.getInnerCategory(),
                request.getAge(),
                request.getDetail(),
                request.getAdditionalInfo()
        );
    }

    // Endpoint to retrieve main categories by query
    @GetMapping("/categories")
    public CategoriesResponse getCategoriesByQuery(@RequestParam String query) {
        return geminiService.getCategoriesByQuery(query);
    }

    // Endpoint to retrieve inner categories by category and query
    @GetMapping("/inner-categories")
    public CategoriesResponse getInnerCategoriesByQuery(@RequestParam String category, @RequestParam String query) {
        return geminiService.getInnerCategoriesByQuery(category, query);
    }
}
