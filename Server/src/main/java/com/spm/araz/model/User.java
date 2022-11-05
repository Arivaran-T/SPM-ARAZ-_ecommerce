package com.spm.araz.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document("User")
public class User {
    @Id
    private String id;
    private Payment payments;
    private Cart cart;
    private int loyaltyPoint;
    private String name;
    private String email;
    private String password;
    private String userType;
    private int contactNo;
    private String address;
    private String gender;
    private String dob;
    private int otp;
    private ArrayList<Transaction> transactions;
    private ArrayList<String> favorites;
    private ArrayList<Address> addresses;
    private ArrayList<String> products;


    public User(String id, Payment payments, Cart cart, int loyaltyPoint, String name, String email, String password, String userType, int contactNo, String address, String gender, String dob,  ArrayList<String> favorites, ArrayList<Address> addresses, ArrayList<String> products) {

        this.id = id;
        this.payments = payments;
        this.cart = cart;
        this.loyaltyPoint = loyaltyPoint;
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.contactNo = contactNo;
        this.address = address;
        this.gender = gender;
        this.dob = dob;
        this.favorites = favorites;
        this.addresses = addresses;
        this.products = products;
        this.transactions = new ArrayList<>();

    }


    public User() {
        payments = new Payment();
        favorites = new ArrayList<>();
        otp = 0;
        addresses = new ArrayList<>();

        products = new ArrayList<>();

        this.transactions = new ArrayList<>();


    }

    public ArrayList<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(ArrayList<Transaction> transactions) {
        this.transactions = transactions;
    }

    public void addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
    }

    public Payment getPayments() {
        return payments;
    }

    public void setPayment(Payment payment) {
        this.payments = payment;
    }

    public Cart getCart() {
        if (this.cart == null) {
            cart = new Cart();
        }
        return this.cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public int getLoyaltyPoint() {
        return loyaltyPoint;
    }

    public void setLoyaltyPoint(int loyaltyPoint) {
        this.loyaltyPoint = loyaltyPoint;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getContactNo() {
        return contactNo;
    }

    public void setContactNo(int contactNo) {
        this.contactNo = contactNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public ArrayList<String> getFavorites() {
        return favorites;
    }

    public void setFavorites(ArrayList<String> favorites) {
        this.favorites = favorites;
    }


    public void addFavorite(String id) {
        favorites.add(id);
    }

    public void removeFavorite(String id) {
        favorites.remove(id);

    }

    public int getOtp() {
        return otp;
    }

    public void setOtp(int otp) {
        this.otp = otp;
    }

    public ArrayList<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(ArrayList<Address> addresses) {
        this.addresses = addresses;
    }


    public void addAddress(Address address) {
        addresses.add(address);
    }

    public void removeAddress(Address address) {
        addresses.remove(address);
    }


    public Address checkDefaultAddress(String defaultStatus) {
        for (Address address : addresses) {


            if (address.getDefaultStatus().equals(defaultStatus)) {


                return  address;
            }

        }
        return null;
    }


    public void removeFavoriteList(String favorite) {
        favorites.remove(favorite);
    }
    public ArrayList<String> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<String> products) {
        this.products = products;
    }


}