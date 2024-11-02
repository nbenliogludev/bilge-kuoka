package com.nbenliogludev.backend.controller;

import com.nbenliogludev.backend.dto.CategoriesResponse;
import com.nbenliogludev.backend.dto.ContentResponse;
import com.nbenliogludev.backend.dto.GenerateContentRequest;
import com.nbenliogludev.backend.dto.RelatedArticlesRequest;
import com.nbenliogludev.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generateContent")
    public ContentResponse generateContent(@RequestBody GenerateContentRequest request) {
        return geminiService.generateContent(
                request.getMainCategory(),
                request.getInnerCategory(),
                request.getAge(),
                request.getDetail(),
                request.getAdditionalInfo()
        );
    }

    @GetMapping("/categories")
    public CategoriesResponse getCategoriesByQuery(@RequestParam String query) {
        return geminiService.getCategoriesByQuery(query);
    }

    @GetMapping("/inner-categories")
    public CategoriesResponse getInnerCategoriesByQuery(@RequestParam String category, @RequestParam String query) {
        return geminiService.getInnerCategoriesByQuery(category, query);
    }

    @PostMapping("/related-articles")
    public ContentResponse getRelatedArticles(@RequestBody RelatedArticlesRequest request) {
        return geminiService.getRelatedArticles(request.getArticle());
    }
}