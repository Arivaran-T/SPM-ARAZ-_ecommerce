package com.spm.araz.repository;

import com.spm.araz.model.Order;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, Integer> {
    @Aggregation(pipeline = {
            "{ '$match': {'userId':?0} }"

    })
    List<Order> findUserOder(String userId);
}