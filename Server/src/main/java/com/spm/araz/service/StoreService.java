package com.spm.araz.service;

import com.spm.araz.model.Product;
import com.spm.araz.model.Store;
import com.spm.araz.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StoreService {
    @Autowired
    StoreRepository storeRepository;
    private int limit = 6;

    //add Store
    public boolean createStore(Store store) {
        store.setApproval(true);
        storeRepository.save(store);
        return true;
    }

    //get all stores
    public List<Store> getAllStores(int page) {
        int skip = (page - 1) * 6;
        List<Store> stores = storeRepository.findAllStores(skip, limit);
        return stores;
    }

    //get stores by title
    public List<Store> getStoreByTitle(String title, int page) {
        int skip = (page - 1) * 1;
        List<Store> stores = storeRepository.findByTitle(title, skip, limit);
        return stores;
    }

    //get by id
    public Store getById(String id) {
        Store store = storeRepository.getById(id);
        return store;
    }

    //delete by id
    public boolean deleteById(String id) {
        Long count = storeRepository.deleteById(id);
        return count > 0;

    }

    //update status
    public boolean updateStatus(Store store, boolean status) {
        store.setApproval(status);
        storeRepository.save(store);
        return true;
    }

    //search store
    public List<Store> search(String title) {
        List<Store> stores = storeRepository.search(title);
        return stores;
    }

    //get count
    public Integer getCount() {
        List<Store> stores = storeRepository.findAll();
        return stores.size();
    }

    //getStore by user id
    public Store getStoreByUserID(String id) {
        Store store = storeRepository.getByUserID(id);
        return store;
    }
}
