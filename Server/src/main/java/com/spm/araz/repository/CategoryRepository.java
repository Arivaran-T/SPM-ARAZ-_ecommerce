package com.spm.araz.repository;


import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import  com.spm.araz.model.Category;

import java.util.List;


public interface CategoryRepository extends MongoRepository<Category,Integer>{
//    @Aggregation(pipeline = {
//            "{ '$skip' : ?0 }",
//            "{ '$limit' : ?1 }"
//    })
//    List<Category> findAllStores(int skip, int limit);


    @Override
    List<Category> findAll();

    Category getById(String id);

    public Long deleteById(String id);


}
