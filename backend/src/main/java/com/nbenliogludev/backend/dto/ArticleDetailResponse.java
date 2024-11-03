package com.nbenliogludev.backend.dto;

public class ArticleDetailResponse {
    private String contextInfo;
    private String article;
    private String sentence;

    // Constructors
    public ArticleDetailResponse() {}

    public ArticleDetailResponse(String contextInfo, String article, String sentence) {
        this.contextInfo = contextInfo;
        this.article = article;
        this.sentence = sentence;
    }

    // Getters and Setters
    public String getContextInfo() {
        return contextInfo;
    }

    public void setContextInfo(String contextInfo) {
        this.contextInfo = contextInfo;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public String getSentence() {
        return sentence;
    }

    public void setSentence(String sentence) {
        this.sentence = sentence;
    }
}
