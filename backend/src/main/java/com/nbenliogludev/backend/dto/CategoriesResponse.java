package com.nbenliogludev.backend.dto;

import java.util.List;

public class CategoriesResponse {
    private List<Category> data;

    public CategoriesResponse(List<Category> data) {
        this.data = data;
    }

    public List<Category> getData() {
        return data;
    }

    public void setData(List<Category> data) {
        this.data = data;
    }

    public static class Category {
        private String value;
        private String label;

        public Category(String value, String label) {
            this.value = value;
            this.label = label;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value.toLowerCase();
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }
    }
}
