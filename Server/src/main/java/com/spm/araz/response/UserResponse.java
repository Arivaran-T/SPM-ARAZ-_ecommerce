package com.spm.araz.response;


import com.spm.araz.model.User;

import java.util.List;

public class UserResponse {
    private User user;
    private List<User> userList;
    private String msg;

    public UserResponse() {

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}