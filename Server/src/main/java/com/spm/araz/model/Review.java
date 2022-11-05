package com.spm.araz.model;


public class Review {
    private String userName;
    private String date;
    private String review;
    private int star;
    private String sellerReply;

    public Review(String userName, String date, String review, int star, String sellerReply) {
        this.userName = userName;
        this.date = date;
        this.review = review;
        this.star = star;
        this.sellerReply = sellerReply;
    }

    public Review() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public String getSellerReply() {
        return sellerReply;
    }

    public void setSellerReply(String sellerReply) {
        this.sellerReply = sellerReply;
    }
}
