package com.nbenliogludev.backend.dto;

public class ArticleDetailRequest {
    private String article;
    private String sentence;
    private String age;
    private String detail;
    private String additionalInfo;

    // Constructors
    public ArticleDetailRequest() {}

    public ArticleDetailRequest(String article, String sentence, String age, String detail, String additionalInfo) {
        this.article = article;
        this.sentence = sentence;
        this.age = age;
        this.detail = detail;
        this.additionalInfo = additionalInfo;
    }

    // Getters and Setters
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

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
}
