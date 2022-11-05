package com.spm.araz.response;

import com.spm.araz.model.Category;

import java.util.List;

public class CategoryResponse {
    private Category category;

    private List<Category> categoryList;

    private String msg;

    public CategoryResponse() {
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Category> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<Category> categoryList) {
        this.categoryList = categoryList;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
