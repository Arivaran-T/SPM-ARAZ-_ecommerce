package com.spm.araz.repository;

import com.spm.araz.model.Order;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;
import java.util.List;

public interface OrderRepository extends MongoRepository<Order, Integer> {
    @Aggregation(pipeline = {
            "{ '$match': {'userId':?0} }"

    })
    List<Order> findUserOder(String userId);



    @Aggregation(pipeline = {
            "{ '$match': {'products.productID':?0} }"

    })
    List<Order> findByProductID(String productID);

    @Aggregation(pipeline = {
            "{ '$match': {'products.productID':{$in :?0}} }"
    })
    List<Order> getOrderByProductID(String[] productID);

    @Aggregation(pipeline = {
            "{ '$match': {'id':?0} }"

    })
  Order getOrder(String id);



}
