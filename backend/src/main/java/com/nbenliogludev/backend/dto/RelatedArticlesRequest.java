package com.nbenliogludev.backend.dto;

public class RelatedArticlesRequest {
    private String article;

    public RelatedArticlesRequest() {
    }

    public RelatedArticlesRequest(String article) {
        this.article = article;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }
}
