package com.spm.araz.repository;

import com.spm.araz.model.*;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.management.Query;
import java.util.List;

public interface UserRepository extends MongoRepository<User,Integer> {
    User findById(String id);

    @Aggregation(pipeline = {
            "{ '$match': {'email':?0} }"

    })
    User findByEmail(String email);

    @Aggregation(pipeline = {
            "{ '$skip' : ?0 }",
            "{ '$limit' : ?1 }"
    })
    List<Favorite> findAllFavorite(int skip, int limit);

    public Long deleteById(String id);

    @Aggregation(pipeline = {
            "{ '$match': {'contactNo':?0} }"

    })
    User findByContactNo(int contactNo);

}
