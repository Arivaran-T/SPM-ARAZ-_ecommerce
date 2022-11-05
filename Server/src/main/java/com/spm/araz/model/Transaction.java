package com.spm.araz.model;

public class Transaction {
    private String id;
    private String date;
    private float amount;

    public Transaction(String id, String date, float amount) {
        this.id = id;
        this.date = date;
        this.amount = amount;
    }

    public Transaction() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }
}
