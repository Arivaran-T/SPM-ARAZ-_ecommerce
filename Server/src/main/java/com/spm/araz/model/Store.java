package com.spm.araz.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("Store")
public class Store {

    @Id
    private String id;
    private String storeName;
    private int contactNo;
    private Address address;
    private String bankName;
    private int accountNumber;
    private boolean approval;
    private String userID;

    public Store(String id, String storeName, int contactNo, Address address, String bankName, int accountNumber) {
        this.id = id;
        this.storeName = storeName;
        this.contactNo = contactNo;
        this.address = address;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
    }

    public Store(String id, String storeName, int contactNo, Address address, String bankName, int accountNumber, boolean approval, String userID) {
        this.id = id;
        this.storeName = storeName;
        this.contactNo = contactNo;
        this.address = address;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.approval = approval;
        this.userID = userID;
    }

    public Store() {
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public boolean isApproval() {
        return approval;
    }

    public void setApproval(boolean approval) {
        this.approval = approval;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public int getContactNo() {
        return contactNo;
    }

    public void setContactNo(int contactNo) {
        this.contactNo = contactNo;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(int accountNumber) {
        this.accountNumber = accountNumber;
    }
}
