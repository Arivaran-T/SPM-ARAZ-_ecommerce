package com.spm.araz.repository;

import com.spm.araz.model.Product;
import com.spm.araz.model.Store;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface StoreRepository extends MongoRepository<Store, Integer> {
    @Aggregation(pipeline = {
            "{ '$skip' : ?0 }",
            "{ '$limit' : ?1 }"
    })
    List<Store> findAllStores(int skip, int limit);

    @Aggregation(pipeline = {
            "{ '$match': {'storeName':{$regex:?0,$options:'i'}} }",
            "{ '$skip' : ?1 }",
            "{ '$limit' : ?2 }"
    })
    List<Store> findByTitle(String title, int skip, int limit);

    Store getById(String id);

    public Long deleteById(String id);

    @Aggregation(pipeline = {
            "{ '$match': {'storeName':{$regex:?0,$options:'i'}} }",
    })
    List<Store> search(String title);

    public Store getByUserID(String id);
}
