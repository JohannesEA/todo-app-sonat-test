package com.example.todo_api.models;

import org.hibernate.annotations.Generated;
import jakarta.persistence.*

@Entity
data class Todo (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null, 
    val title: String,
    val description: String?,
    val done: Boolean
) 
