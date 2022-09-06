package com.spm.araz.service;

import com.spm.araz.model.Payment;
import com.spm.araz.model.User;
import com.spm.araz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    //add to card
    public boolean addToCart(User user, String id, int count) {
        user.getCart().addToCart(id, count);
        userRepository.save(user);
        return true;
    }

    //remove from cart
    public boolean removeItemFromCart(User user, String id) {
        user.getCart().removeFromCart(id);
        userRepository.save(user);
        return true;
    }

    //empty cart
    public boolean emptyCart(User user) {
        user.getCart().emptyCart();
        userRepository.save(user);
        return true;
    }

    //add payment
    public boolean addPayment(User user, Payment payment) {
        user.addPayment(payment);
        userRepository.save(user);
        return true;
    }

    //delete payment
    public boolean deletePayment(User user, int cardNumber) {
        user.removePayment(cardNumber);
        userRepository.save(user);
        return true;
    }

}