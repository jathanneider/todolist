package com.example.todo.service;

import com.example.todo.entity.Task;
import com.example.todo.entity.User;
import com.example.todo.repository.TaskRepository;
import com.example.todo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepo;
    private final UserRepository userRepo;

    public TaskService(TaskRepository t, UserRepository u) {
        this.taskRepo = t;
        this.userRepo = u;
    }

    public Task create(Long userId, Task t) {
        User u = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        t.setUser(u);
        return taskRepo.save(t);
    }

    public List<Task> getByUser(Long userId) {
        return taskRepo.findByUserId(userId);
    }

    public Task getById(Long id) {
        return taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task update(Long id, Task updated) {
        Task t = getById(id);
        t.setTitle(updated.getTitle());
        // remove t.setDescription(…) — description no longer exists
        t.setDueDate(updated.getDueDate());
        return taskRepo.save(t);
    }

    public void delete(Long id) {
        taskRepo.deleteById(id);
    }
}