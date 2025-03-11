package com.example.todo_api.service;

import org.springframework.stereotype.Service
import com.example.todo_api.repository.TodoRepository
import com.example.todo_api.models.Todo


@Service
class TodoService(private val todoRepository: TodoRepository) {
  
    fun getAllTodos(): List<Todo> = todoRepository.findAll()

    fun saveTodo(todo: Todo) : Todo = todoRepository.save(todo)

    fun updateTodo(updatedTodo: Todo): Todo = todoRepository.save(updatedTodo)

    fun deleteTodo(id: Int) = todoRepository.deleteById(id)
    
}