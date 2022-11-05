package com.spm.araz.model;

public class Item {
    private String productID;
    private int count;

    public Item(String productID, int count) {
        this.productID = productID;
        this.count = count;
    }

    public Item() {
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
