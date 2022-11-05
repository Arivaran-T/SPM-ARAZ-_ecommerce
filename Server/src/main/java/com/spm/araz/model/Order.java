package com.spm.araz.model;

import com.mongodb.internal.connection.Time;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.ArrayList;
import java.util.Date;

@Data
@Document("Order")
public class Order {
    @Id
    private String id;
    private String userId;
    private String total;
    private boolean payment;
    private Address address;
    private ArrayList<OrderItem> products;
    private String date;
    private String time;

    public Order(String id, String userId, String total, boolean payment, Address address, ArrayList<OrderItem> products, String date, String time) {
        this.id = id;
        this.userId = userId;
        this.total = total;
        this.payment = payment;
        this.address = address;
        this.products = products;
        this.date = date;
        this.time = time;
    }

    public Order() {
    }

    public void addProduct(OrderItem item) {
        this.products.add(item);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public boolean isPayment() {
        return payment;
    }

    public void setPayment(boolean payment) {
        this.payment = payment;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ArrayList<OrderItem> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<OrderItem> products) {
        this.products = products;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

}
