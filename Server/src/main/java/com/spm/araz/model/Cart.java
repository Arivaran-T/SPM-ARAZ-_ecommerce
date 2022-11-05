package com.spm.araz.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Cart {
    private ArrayList<Item> products;

    public Cart() {
        products = new ArrayList<>();
    }

    public ArrayList<Item> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<Item> products) {
        this.products = products;
    }

    public void addToCart(String productId, int count) {
        products.add(new Item(productId, count));
    }

    public void removeFromCart(String productId) {
        for (Item item : this.products) {
            if (item.getProductID().equals(productId)) {
                products.remove(item);
                return;
            }
        }
    }

    public void emptyCart() {
        products.clear();
    }

}
