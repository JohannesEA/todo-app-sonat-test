package com.example.todo_api.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import com.example.todo_api.service.TodoService
import com.example.todo_api.models.Todo


@RestController
@RequestMapping("/todos")
class TodoController(private val todoService: TodoService) {
    
    @GetMapping
    fun getAllTodos(): List<Todo> {
        return todoService.getAllTodos()
    }

    @PostMapping
    fun saveTodo(@RequestBody todo: Todo): Todo {
        return todoService.saveTodo(todo)
    }

    @PutMapping
    fun updateTodo(@RequestBody todo: Todo): Todo {
        return todoService.updateTodo(todo)
    }
    @DeleteMapping("/{id}")
    fun deleteTodo(@PathVariable id: Int) {
        todoService.deleteTodo(id)
    }

}
