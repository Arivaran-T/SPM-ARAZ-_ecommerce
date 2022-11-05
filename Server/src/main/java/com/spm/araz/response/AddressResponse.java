package com.spm.araz.response;



import com.spm.araz.model.Address;

import java.util.List;

public class AddressResponse {
    private Address address;
    private List<Address> addressList;
    private String msg;




    public AddressResponse() {
        this.address = address;
        this.addressList = addressList;
        this.msg = msg;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Address> getAddressList() {
        return addressList;
    }

    public void setAddressList(List<Address> addressList) {
        this.addressList = addressList;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
