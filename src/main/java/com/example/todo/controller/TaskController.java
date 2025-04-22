package com.example.todo.controller;

import com.example.todo.entity.Task;
import com.example.todo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {
    private final TaskService svc;

    public TaskController(TaskService svc) {
        this.svc = svc;
    }

    @PostMapping("/users/{userId}/tasks")
    public Task create(@PathVariable Long userId, @RequestBody Task t) {
        return svc.create(userId, t);
    }

    @GetMapping("/users/{userId}/tasks")
    public List<Task> listByUser(@PathVariable Long userId) {
        return svc.getByUser(userId);
    }

    @GetMapping("/tasks/{id}")
    public Task get(@PathVariable Long id) {
        return svc.getById(id);
    }

    @PutMapping("/tasks/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task t) {
        return svc.update(id, t);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.noContent().build();
    }
}