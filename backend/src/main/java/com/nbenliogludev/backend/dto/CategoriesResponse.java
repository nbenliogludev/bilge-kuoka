package com.nbenliogludev.backend.dto;

import java.util.List;

public class CategoriesResponse {
    private List<String> data;

    public CategoriesResponse(List<String> data) {
        this.data = data;
    }

    public List<String> getData() {
        return data;
    }

    public void setData(List<String> data) {
        this.data = data;
    }
}
