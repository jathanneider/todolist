package com.example.todo.service;

import com.example.todo.entity.User;
import com.example.todo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User create(User u) {
        return repo.save(u);
    }
    public List<User> getAll() {
        return repo.findAll();
    }
    public User getById(Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public User update(Long id, User updated) {
        User u = getById(id);
        u.setUsername(updated.getUsername());
        u.setPassword(updated.getPassword());
        return repo.save(u);
    }
    public void delete(Long id) {
        repo.deleteById(id);
    }
}