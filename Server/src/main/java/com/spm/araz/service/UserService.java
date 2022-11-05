package com.spm.araz.service;

import com.spm.araz.model.*;
import com.spm.araz.repository.ProductRepository;
import com.spm.araz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;


    @Autowired
    ProductRepository productRepository;


    @Autowired
    private JavaMailSender javaMailSender;


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
        user.setPayment(payment);
        userRepository.save(user);
        return true;
    }

    //delete payment
    public boolean deletePayment(User user, int cardNumber) {
        user.setPayment(null);
        userRepository.save(user);
        return true;
    }

    //find user
    public User getUser(String id) {
        User user = userRepository.findById(id);
        return user;
    }

    //save updated user
    public boolean updateUser(User user) {
        userRepository.save(user);
        return true;
    }

    //add user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    //get user by email
    public User getByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }


    public boolean addFavorite(User user, String id) {
        user.addFavorite(id);
        userRepository.save(user);
        return true;
    }

    public boolean removeFavorite(User user, String id) {
        user.removeFavorite(id);
        userRepository.save(user);
        return true;
    }


    public User updateUserRe(User user) {

        return userRepository.save(user);
    }

    public boolean addAddress(User user, Address address) {
        user.addAddress(address);
        userRepository.save(user);
        return true;
    }

    public boolean removeAddress(User user, Address address) {
        user.removeAddress(address);
        userRepository.save(user);
        return true;
    }


    public boolean updateAddress(User user) {
        userRepository.save(user);
        return true;
    }


    public Address checkDefaultAddress(User user, String defaultStatus) {

        return user.checkDefaultAddress(defaultStatus);

    }

    public void sendSimpleEmail(String toEmail,
                                String body,
                                String subject) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("project2020sliit@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);


        javaMailSender.send(message);
        System.out.println("Mail Send...");
    }


    // remove favorite list
    public boolean removeFavoriteList(User user, String favorite) {
        user.removeFavoriteList(favorite);
        userRepository.save(user);
        return true;
    }


    //get all the users
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    //delete user
    public boolean deleteById(String id) {
        Long count = userRepository.deleteById(id);
        return count > 0;
    }

    //get the user by their contactNo
    public User getByContactNo(int contactNo) {
        User user = userRepository.findByContactNo(contactNo);
        return user;
    }


}
