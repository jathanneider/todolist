package com.example.todo.controller;

import com.example.todo.entity.User;
import com.example.todo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService svc;

    public UserController(UserService svc) {
        this.svc = svc;
    }

    @PostMapping
    public User create(@RequestBody User u) {
        return svc.create(u);
    }

    @GetMapping
    public List<User> list() {
        return svc.getAll();
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return svc.getById(id);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User u) {
        return svc.update(id, u);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.noContent().build();
    }
}