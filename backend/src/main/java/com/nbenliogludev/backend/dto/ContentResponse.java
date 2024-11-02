package com.nbenliogludev.backend.dto;

import java.util.List;

public class ContentResponse {
    private List<String> data;

    public ContentResponse(List<String> data) {
        this.data = data;
    }

    public List<String> getData() {
        return data;
    }

    public void setData(List<String> data) {
        this.data = data;
    }
}
