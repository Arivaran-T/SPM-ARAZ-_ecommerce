package com.spm.araz.service;

import com.spm.araz.model.Category;
import com.spm.araz.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public boolean createCategory(Category category){
        categoryRepository.save(category);
        return true;
    }

    public Category getById(String id){
        Category category=categoryRepository.getById(id);
        return category;
    }

    public List<Category> getAllCategory(){
        List<Category> categories=categoryRepository.findAll();
        return categories;
    }

    public boolean updateCategory(Category category){
        categoryRepository.save(category);
        return true;
    }

    public boolean deleteById(String id){
        Long count=categoryRepository.deleteById(id);
        return count>0;
    }
}
