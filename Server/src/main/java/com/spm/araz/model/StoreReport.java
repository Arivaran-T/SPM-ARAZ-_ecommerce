package com.spm.araz.model;

public class StoreReport {
    private String productName;
    private String productID;
    private int count;
    private float total;

    public StoreReport(String productName, String productID, int count, float total) {
        this.productName = productName;
        this.productID = productID;
        this.count = count;
        this.total = total;
    }

    public StoreReport() {
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }
}
