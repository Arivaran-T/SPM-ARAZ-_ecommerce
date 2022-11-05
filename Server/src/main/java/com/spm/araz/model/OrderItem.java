package com.spm.araz.model;

import lombok.Data;
import lombok.NoArgsConstructor;

public class OrderItem {
    private String productID;
    private int count;
    private String orderStatus;

    public OrderItem(String productID, int count, String orderStatus) {
        this.productID = productID;
        this.count = count;
        this.orderStatus = orderStatus;
    }

    public OrderItem() {
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
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
