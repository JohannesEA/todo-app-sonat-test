package com.example.todo_api.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController {
    
    @GetMapping("/")
    fun test(): String {
        return "Server is running"
    }
}
