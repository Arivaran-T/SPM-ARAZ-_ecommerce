package com.spm.araz.controller;

import com.spm.araz.model.Category;
import com.spm.araz.response.CategoryResponse;
import com.spm.araz.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    //add new category
    @PostMapping("")
    public ResponseEntity<CategoryResponse> addCategory(@RequestBody(required = true)Category category){

        //get current date
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        String currentDate = formatter.format(date);
        category.setCreatedDate(currentDate);

        boolean res=categoryService.createCategory(category);
        CategoryResponse categoryResponse=new CategoryResponse();

        if(res){
            categoryResponse.setMsg("Store Created");
            return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(categoryResponse,HttpStatus.BAD_REQUEST);
        }
    }

    //get all categories
    @GetMapping("")
    public ResponseEntity<CategoryResponse> getCategories(){
        List<Category> categories;
        categories=categoryService.getAllCategory();


        CategoryResponse categoryResponse=new CategoryResponse();
        categoryResponse.setCategoryList(categories);
        return new ResponseEntity<>(categoryResponse, HttpStatus.OK);

    }

    //get category by id
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable(required = true, name = "id") String id){
        Category category=categoryService.getById(id);
        CategoryResponse categoryResponse=new CategoryResponse();

        if(category!=null){
            categoryResponse.setCategory(category);
            return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
        }
        else {
            categoryResponse.setMsg("No store found");
            return new ResponseEntity<>(categoryResponse, HttpStatus.NO_CONTENT);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable(required = true, name = "id") String id, @RequestBody(required = true) Category category){
        Category existingCategory=categoryService.getById(id);
        CategoryResponse categoryResponse=new CategoryResponse();

        if(existingCategory==null){
            categoryResponse.setMsg("Not Found");
            return new ResponseEntity<>(categoryResponse, HttpStatus.NOT_FOUND);

        }
        else {
            if(category.getName()!=null){
                existingCategory.setName(category.getName());
            }
            if(category.getDetails()!=null){
                existingCategory.setDetails(category.getDetails());
            }

            boolean res= categoryService.updateCategory(existingCategory);
            if (res){
                categoryResponse.setMsg("Updated");
                return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
            }
            else {
                categoryResponse.setMsg("Unable to update");
                return new ResponseEntity<>(categoryResponse, HttpStatus.NOT_MODIFIED);
            }
        }

    }
    //Delete category
        @DeleteMapping("/{id}")
    public ResponseEntity<CategoryResponse> deleteCategory(@PathVariable(required = true, name = "id") String id){
        boolean res=categoryService.deleteById(id);
        CategoryResponse categoryResponse=new CategoryResponse();

        if(res){
            categoryResponse.setMsg("Deleted category");
            return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
        }
        else {
            categoryResponse.setMsg("Unable to delete");
            return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
        }
    }
}
