package com.spm.araz.model;




public class Address {
    private String name;
    private String province;
    private String district;
    private String address;
    private String contactNumber;
    private String defaultStatus;


    public Address(String name, String province, String district, String address, String contactNumber, String defaultStatus) {
        this.name = name;
        this.province = province;
        this.district = district;
        this.address = address;
        this.contactNumber = contactNumber;
        this.defaultStatus = defaultStatus;
    }

    public Address() {
    }

//    public Address(String province, String district, String address) {
//        this.province = province;
//        this.district = district;
//        this.address = address;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getDefaultStatus() {
        return defaultStatus;
    }

    public void setDefaultStatus(String defaultStatus) {
        this.defaultStatus = defaultStatus;
    }
}