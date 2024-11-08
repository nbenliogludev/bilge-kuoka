package com.nbenliogludev.backend.controller;

import com.nbenliogludev.backend.dto.*;
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

    @PostMapping("/get-full-article")
    public ContentResponse getFullArticle(@RequestBody ArticleRequest request) {
        return geminiService.getFullArticle(
                request.getTitle(),
                request.getAge(),
                request.getDetail(),
                request.getAdditionalInfo()
        );
    }

    @PostMapping("/article-detail")
    public ArticleDetailResponse getArticleDetail(@RequestBody ArticleDetailRequest request) {
        return geminiService.getArticleDetail(
                request.getArticle(),
                request.getSentence(),
                request.getAge(),
                request.getDetail(),
                request.getAdditionalInfo()
        );
    }
}