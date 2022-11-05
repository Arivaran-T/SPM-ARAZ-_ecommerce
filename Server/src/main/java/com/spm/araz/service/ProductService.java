package com.spm.araz.service;

import com.spm.araz.model.Offer;
import com.spm.araz.model.Product;
import com.spm.araz.model.Review;
import com.spm.araz.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    private int limit = 8;
    private int storeLimit = 8;
    private Path foundFile;

    //create product
    public boolean addProduct(Product product) {
        productRepository.save(product);
        return true;
    }

    //get all products
    public List<Product> getAllProducts(int page) {
        int skip = (page - 1) * limit;
        List<Product> products = productRepository.findAllProducts(skip, limit);
        return products;
    }

    //get products by category
    public List<Product> getProductsByCategory(String category, int page) {
        int skip = (page - 1) * limit;
        List<Product> products = productRepository.findByCategory(category, skip, limit);
        return products;
    }

    //get products by title
    public List<Product> getProductsByTitle(String title, int page) {
        int skip = (page - 1) * limit;
        List<Product> products = productRepository.findByTitle(title, skip, limit);
        return products;
    }

    //get product by id
    public Product getProduct(String id) {
        return productRepository.findById(id);
    }

    //add review
    public boolean addReview(Product product, Review review) {
        product.setReviews(review);
        productRepository.save(product);
        return true;
    }

    //add seller reply
    public boolean addReply(Product product, Review review) {

        ArrayList<Review> reviews = product.getReviews();

        int index = -1;
        for (int i = 0; i < reviews.size(); i++) {
            if (reviews.get(i).getUserName().equals(review.getUserName()) && reviews.get(i).getDate().equals(review.getDate()) && reviews.get(i).getReview().equals(review.getReview())) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            product.getReviews().get(index).setSellerReply(review.getSellerReply());
            productRepository.save(product);
            return true;
        } else {
            return false;
        }

    }

    //update product
    public boolean updateProduct(Product product) {
        productRepository.save(product);
        return true;
    }

    //find by store
    public List<Product> getStoreProducts(String id, int page) {
        int skip = (page - 1) * storeLimit;
        List<Product> products = productRepository.findByStoreId(id, skip, storeLimit);
        return products;
    }

    //get all products from store
    public List<Product> getStoreAllProducts(String id) {
        List<Product> products = productRepository.findByStoreId(id);
        return products;
    }

    //find by store
    public int getStoreProductsCount(String id) {
        List<Product> products = productRepository.findByStoreId(id);
        return products.size();
    }


    //delete by id
    public boolean deleteById(String id) {
        productRepository.deleteById(id);
        return true;
    }

    //add offer
    public boolean addOffer(Product product, Offer offer) {
        product.setOffer(offer);
        productRepository.save(product);
        return true;
    }

    //delete offer
    public boolean deleteOffer(Product product) {
        product.setOffer(null);
        productRepository.save(product);
        return false;
    }

    //search within store
    public List<Product> searchWithinStore(String id, String title) {
        return productRepository.searchWithStore(id, title);
    }

    //get all products count
    public int getProductsCount() {
        List<Product> products = productRepository.findAll();
        return products.size();
    }

    //find product count by category
    public int getProductCountByCategory(String category) {
        List<Product> products = productRepository.findByCategory(category);
        return products.size();
    }

    //delete products of store
    public boolean deleteProductsOfStore(String id) {
        productRepository.deleteByStoreID(id);
        return true;
    }
}
