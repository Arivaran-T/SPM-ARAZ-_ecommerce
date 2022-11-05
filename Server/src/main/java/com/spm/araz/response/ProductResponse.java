package com.spm.araz.response;

import com.spm.araz.model.Product;

import java.util.List;

public class ProductResponse {
    private Product product;
    private List<Product> productList;
    private String msg;

    public ProductResponse() {
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
