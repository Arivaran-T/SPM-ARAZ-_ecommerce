package com.spm.araz.controller;

import com.spm.araz.model.*;
import com.spm.araz.response.StoreResponse;
import com.spm.araz.service.OrderService;
import com.spm.araz.service.ProductService;
import com.spm.araz.service.StoreService;
import com.spm.araz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/stores")
public class StoreController {

    @Autowired
    StoreService storeService;
    @Autowired
    UserService userService;
    @Autowired
    ProductService productService;
    @Autowired
    OrderService orderService;

    //new store
    @PostMapping("")
    public ResponseEntity<StoreResponse> addStore(@RequestBody(required = true) Store store) {
        //check with user id for already exist
        boolean res = storeService.createStore(store);

        StoreResponse storeResponse = new StoreResponse();

        if (res) {
            User user = userService.getUser(store.getUserID());
            user.setUserType("seller");
            userService.updateUser(user);

            storeResponse.setMsg("Store Created");
            return new ResponseEntity<>(storeResponse, HttpStatus.OK);
        } else {
            storeResponse.setMsg("Unable to create Store");
            return new ResponseEntity<>(storeResponse, HttpStatus.BAD_REQUEST);
        }
    }

    //get all stores
    @GetMapping("")
    public ResponseEntity<StoreResponse> getStores(@RequestParam(required = false, defaultValue = "1") int page,
                                                   @RequestParam(required = false) String title) {
        List<Store> stores;

        if (title != null) {
            stores = storeService.getStoreByTitle(title, page);
        } else {
            stores = storeService.getAllStores(page);
        }

        StoreResponse storeResponse = new StoreResponse();
        storeResponse.setStoreList(stores);
        return new ResponseEntity<>(storeResponse, HttpStatus.OK);
    }

    //get store by id
    @GetMapping("/{id}")
    public ResponseEntity<StoreResponse> getStoreById(@PathVariable(required = true, name = "id") String id) {
        Store store = storeService.getById(id);
        StoreResponse storeResponse = new StoreResponse();
        if (store != null) {
            storeResponse.setStore(store);
            return new ResponseEntity<>(storeResponse, HttpStatus.OK);
        } else {
            storeResponse.setMsg("No store found");
            return new ResponseEntity<>(storeResponse, HttpStatus.NO_CONTENT);
        }

    }

    //delete store
    @DeleteMapping("/{id}")
    public ResponseEntity<StoreResponse> deleteStore(@PathVariable(required = true, name = "id") String id) {
        Store store = storeService.getById(id);

        User user = userService.getUser(store.getUserID());

        boolean res = storeService.deleteById(id);


        StoreResponse storeResponse = new StoreResponse();
        if (res) {

            user.setUserType("buyer");
            userService.updateAddress(user);

            productService.deleteProductsOfStore(id);

            storeResponse.setMsg("Deleted");
            return new ResponseEntity<>(storeResponse, HttpStatus.OK);
        } else {
            storeResponse.setMsg("Unable to delete");
            return new ResponseEntity<>(storeResponse, HttpStatus.NOT_FOUND);
        }
    }

    //disapprove store
    @PutMapping("/status/{id}/{status}")
    public ResponseEntity<StoreResponse> updateApproval(@PathVariable("id") String id, @PathVariable(required = true) boolean status) {
        Store store = storeService.getById(id);
        StoreResponse storeResponse = new StoreResponse();

        if (store != null) {
            boolean res = storeService.updateStatus(store, status);
            if (res) {
                storeResponse.setMsg("updated");
                return new ResponseEntity<>(storeResponse, HttpStatus.OK);
            } else {
                storeResponse.setMsg("unable to update");
                return new ResponseEntity<>(storeResponse, HttpStatus.NOT_MODIFIED);
            }
        } else {
            storeResponse.setMsg("unable to update");
            return new ResponseEntity<>(storeResponse, HttpStatus.NOT_FOUND);
        }
    }

    //search store
    @GetMapping("/search")
    public ResponseEntity<List<Store>> searchStore(@RequestParam(required = true) String title) {
        List<Store> stores = storeService.search(title);

        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getStoreTotalCount() {
        int count = storeService.getCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    //get store by user id
    @GetMapping("/user/{id}")
    public ResponseEntity<Store> getStoreByUserId(@PathVariable("id") String id) {
        Store store = storeService.getStoreByUserID(id);

        if (store != null) {
            return new ResponseEntity<>(store, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    //generate report
    @GetMapping("/report/{id}")
    public ResponseEntity<ArrayList<StoreReport>> getReportData(@PathVariable("id") String id) {
        Store store = storeService.getStoreByUserID(id);

        String storeID = store.getId();

        List<Product> products = productService.getStoreAllProducts(storeID);

        String[] productID = new String[products.size()];

        int index = 0;
        for (Product product : products) {
            productID[index] = product.getId();
            index++;
        }

        ArrayList<StoreReport> storeReports = new ArrayList<>();
        StoreReport storeReport = new StoreReport();

        for (String pid : productID) {

            Product product = productService.getProduct(pid);

            storeReport.setProductID(pid);
            storeReport.setProductName(product.getTitle());

            List<Order> orders = orderService.getAllOrdersOfProduct(pid);

            int count = 0;

            for (Order order : orders) {
                for (OrderItem item : order.getProducts()) {
                    if (item.getProductID().equals(pid)) {
                        count += item.getCount();
                    }
                }

            }

            storeReport.setCount(count);
            storeReport.setTotal(Float.parseFloat(count * product.getPrice() + ""));


            storeReports.add(storeReport);
            storeReport = new StoreReport();

        }

        return new ResponseEntity<>(storeReports, HttpStatus.OK);
    }
}
