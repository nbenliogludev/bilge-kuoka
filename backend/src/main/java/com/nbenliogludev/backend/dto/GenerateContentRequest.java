package com.nbenliogludev.backend.dto;

public class GenerateContentRequest {
    private String mainCategory;
    private String innerCategory;
    private String age; // Change to String
    private String detail;
    private String additionalInfo;

    // Getters and Setters
    public String getMainCategory() {
        return mainCategory;
    }

    public void setMainCategory(String mainCategory) {
        this.mainCategory = mainCategory;
    }

    public String getInnerCategory() {
        return innerCategory;
    }

    public void setInnerCategory(String innerCategory) {
        this.innerCategory = innerCategory;
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
