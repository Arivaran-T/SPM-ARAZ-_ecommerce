package com.spm.araz.repository;


import com.spm.araz.model.Address;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AddressRepository extends MongoRepository<Address, Integer> {

//    @Aggregation(pipeline = {
//            "{ '$skip' : ?0 }",
//            "{ '$limit' : ?1 }"
//    })
//    List<Address> findAllAddress();


    Address findById(String id);

    Address deleteById(String id);


    @Aggregation(pipeline = {
            "{ '$match': {'defaultStatus':{$regex:?0,$options:'i'}} }",

    })
    List<Address> findDefaultStatus(String defaultStatus);
}