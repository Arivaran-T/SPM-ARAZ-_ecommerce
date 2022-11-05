package com.spm.araz.model;

public class Offer {
    private int percentage;
    private String validUntil;

    public Offer(int percentage, String validUntil) {
        this.percentage = percentage;
        this.validUntil = validUntil;
    }

    public Offer() {
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public String getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(String validUntil) {
        this.validUntil = validUntil;
    }
}
