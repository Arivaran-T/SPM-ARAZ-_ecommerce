package com.spm.araz.response;

import com.spm.araz.model.Store;

import java.util.List;

public class StoreResponse {
    private  List<Store> storeList;
    private Store store;
    private String msg;

    public StoreResponse() {
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List<Store> getStoreList() {
        return storeList;
    }

    public void setStoreList(List<Store> storeList) {
        this.storeList = storeList;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}
