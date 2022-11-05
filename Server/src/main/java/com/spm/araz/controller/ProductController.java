package com.spm.araz.controller;

import com.spm.araz.helper.FilesStorageService;
import com.spm.araz.model.*;
import com.spm.araz.response.ProductResponse;
import com.spm.araz.service.ProductService;
import com.spm.araz.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductService productService;
    @Autowired
    StoreService storeService;


    //add new product
    @PostMapping(value = "", produces = {MediaType.IMAGE_JPEG_VALUE, "application/json"})
    public ResponseEntity<ProductResponse> addProduct(@RequestParam("images") MultipartFile[] item,
                                                      @RequestParam("price") int price,
                                                      @RequestParam("title") String title,
                                                      @RequestParam("description") String description,
                                                      @RequestParam("category") String category,
                                                      @RequestParam("storeID") String storeID) {
        Product product = new Product();
        product.setTitle(title);
        product.setPrice(price);
        product.setDescription(description);
        product.setCategory(category);
        product.setStoreID(storeID);

        ArrayList<String> images = new ArrayList<>();

        //store images
        Path uploadDir = Paths.get("Product-images");
        for (MultipartFile file : item) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            images.add(file.getOriginalFilename());
            try (InputStream inputStream = file.getInputStream()) {
                Path filePath = uploadDir.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException E) {
                System.out.println(E.getStackTrace());
            }
        }

        product.setImages(images);

        productService.addProduct(product);

        ProductResponse productResponse = new ProductResponse();
        productResponse.setMsg("Product added");
        return new ResponseEntity<>(productResponse, HttpStatus.OK);

    }

    //get all products
    @GetMapping("/")
    public ResponseEntity<ProductResponse> getProducts(@RequestParam(required = false, name = "category") String category,
                                                       @RequestParam(required = false, name = "title") String title,
                                                       @RequestParam(required = false, defaultValue = "1") int page) {
        List<Product> products;
        ProductResponse productResponse = new ProductResponse();

        //get by category
        if (category != null) {
            products = productService.getProductsByCategory(category, page);

            productResponse.setProductList(products);
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        }
        //search by title
        if (title != null) {
            products = productService.getProductsByTitle(title, page);

            productResponse.setProductList(products);
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        }
        //get all products
        products = productService.getAllProducts(page);

        productResponse.setProductList(products);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    //get products by store id
    @GetMapping("/stores/{id}")
    public ResponseEntity<ProductResponse> getProductsByStore(@PathVariable(required = true) String id,
                                                              @RequestParam(required = false) boolean count,
                                                              @RequestParam(required = false, defaultValue = "1") int page) {
        ProductResponse productResponse = new ProductResponse();

        Store store = storeService.getStoreByUserID(id);

        List<Product> products = productService.getStoreProducts(store.getId(), page);

        if (count) {
            productResponse.setMsg(products.size() + "");
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        }

        productResponse.setProductList(products);

        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }


    //get product by id
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable String id) {
        Product product = productService.getProduct(id);
        ProductResponse productResponse = new ProductResponse();

        if (product != null) {

            productResponse.setProduct(product);
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        } else {
            productResponse.setMsg("No product found");
            return new ResponseEntity<>(productResponse, HttpStatus.NOT_FOUND);
        }

    }

    //add review
    @PostMapping("/{id}/reviews")
    public ResponseEntity<ProductResponse> addReview(@PathVariable(required = true) String id, @RequestBody Review review) {
        ProductResponse productResponse = new ProductResponse();

        //check product existence
        Product product = productService.getProduct(id);

        if (product == null) {
            return new ResponseEntity<>(productResponse, HttpStatus.NOT_FOUND);
        } else {
            boolean res = productService.addReview(product, review);
            if (res) {
                productResponse.setMsg("Review added");
                return new ResponseEntity<>(productResponse, HttpStatus.OK);
            } else {
                productResponse.setMsg("Unable to update");
                return new ResponseEntity<>(productResponse, HttpStatus.NOT_MODIFIED);
            }
        }
    }

    //add seller reply
    @PostMapping("/{id}/reviews/reply")
    public ResponseEntity<ProductResponse> addSellerReply(@PathVariable(required = true) String id, @RequestBody Review review) {
        ProductResponse productResponse = new ProductResponse();

        //check product existence
        Product product = productService.getProduct(id);
        if (product == null) {
            productResponse.setMsg("No product found");
            return new ResponseEntity<>(productResponse, HttpStatus.NOT_FOUND);
        } else {
            boolean res = productService.addReply(product, review);
            if (res) {
                productResponse.setMsg("reply Added");
                return new ResponseEntity<>(productResponse, HttpStatus.OK);
            } else {
                productResponse.setMsg("Unable to update");
                return new ResponseEntity<>(productResponse, HttpStatus.NOT_MODIFIED);
            }
        }
    }

    //update product
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable(required = true) String id,
                                                         @RequestParam(value = "images", required = false) MultipartFile[] item,
                                                         @RequestParam(value = "price", required = false) int price,
                                                         @RequestParam(value = "title", required = false) String title,
                                                         @RequestParam(value = "description", required = false) String description,
                                                         @RequestParam(value = "category", required = false) String category) {


        ProductResponse productResponse = new ProductResponse();

        //check product existence
        Product existingProduct = productService.getProduct(id);

        if (item != null) {
            ArrayList<String> images = new ArrayList<>();
            //store images
            Path uploadDir = Paths.get("Product-images");
            for (MultipartFile file : item) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                images.add(file.getOriginalFilename());
                try (InputStream inputStream = file.getInputStream()) {
                    Path filePath = uploadDir.resolve(fileName);
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException E) {
                    System.out.println(E.getStackTrace());
                }
            }

            existingProduct.setImages(images);
        }

        if (existingProduct == null) {
            productResponse.setMsg("No product found");
            return new ResponseEntity<>(productResponse, HttpStatus.NOT_FOUND);
        } else {
            if (category != null) {
                existingProduct.setCategory(category);
            }
            if (description != null) {
                existingProduct.setDescription(description);
            }
            if (price != 0) {
                existingProduct.setPrice(price);
            }
            if (title != null) {
                existingProduct.setTitle(title);
            }
            //save
            boolean res = productService.updateProduct(existingProduct);

            if (res) {
                productResponse.setMsg("Updated");
                return new ResponseEntity<>(productResponse, HttpStatus.OK);

            } else {
                productResponse.setMsg("Unable to update");
                return new ResponseEntity<>(productResponse, HttpStatus.NOT_MODIFIED);
            }
        }
    }

    //delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponse> deleteProduct(@PathVariable("id") String id) {
        Product product = productService.getProduct(id);
        ProductResponse productResponse = new ProductResponse();

        if (product != null) {
            productService.deleteById(id);
            productResponse.setMsg("Product Deleted");
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        } else {
            productResponse.setMsg("Product is not Deleted");
            return new ResponseEntity<>(productResponse, HttpStatus.NOT_FOUND);
        }
    }


    //get images
    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        FilesStorageService filesStorageService = new FilesStorageService();
        Resource file = filesStorageService.load(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);

    }

    // add offer
    @PostMapping("/offer/{id}")
    public ResponseEntity<ProductResponse> addOffer(@RequestBody Offer offer, @PathVariable("id") String id) {
        Product product = productService.getProduct(id);

        ProductResponse productResponse = new ProductResponse();

        if (product == null) {
            productResponse.setMsg("Not found");
            return new ResponseEntity<>(productResponse, HttpStatus.NOT_FOUND);
        } else {
            productService.addOffer(product, offer);
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        }
    }

    //delete offer
    @DeleteMapping("/offer/{id}")
    public ResponseEntity<ProductResponse> deleteOffer(@PathVariable("id") String id) {
        Product product = productService.getProduct(id);

        ProductResponse productResponse = new ProductResponse();

        if (product == null) {
            productResponse.setMsg("Not found");
            return new ResponseEntity<>(productResponse, HttpStatus.NOT_FOUND);
        } else {
            productService.deleteOffer(product);
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        }
    }

    //get store product count
    @GetMapping("/store/{id}/count")
    public ResponseEntity<Integer> getProductCountForStore(@PathVariable("id") String id) {
        Store store = storeService.getStoreByUserID(id);

        int count = productService.getStoreProductsCount(store.getId());

        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    //get total product count
    @GetMapping("/count")
    public ResponseEntity<Integer> getProductCount(@RequestParam(required = false, name = "category") String category) {
        int count;

        if (category != null) {
            count = productService.getProductCountByCategory(category);

        } else {
            count = productService.getProductsCount();
        }
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    //search within store id
    @GetMapping("/store/{id}/search/{title}")
    public ResponseEntity<List<Product>> searchWithinStore(@PathVariable("id") String id,
                                                           @PathVariable("title") String title) {
        Store store = storeService.getStoreByUserID(id);
        List<Product> products = productService.searchWithinStore(store.getId(), title);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    //test
    @PostMapping("/file")
    public void test(@RequestParam("file") MultipartFile[] item) {
        Path uploadDir = Paths.get("Product-images");
        for (MultipartFile file : item) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            try (InputStream inputStream = file.getInputStream()) {
                Path filePath = uploadDir.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException E) {
                System.out.println(E.getStackTrace());
            }
        }

    }
}