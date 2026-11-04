// Kotlin — data classes, coroutines, extension functions
package com.devxi

import kotlinx.coroutines.*

data class Invoice(val id: String, val total: Double, val paid: Boolean = false)

sealed interface Result<out T> {
    data class Ok<T>(val value: T) : Result<T>
    data class Err(val message: String) : Result<Nothing>
}

fun Double.withTax(rate: Double = 0.13) = this * (1 + rate)

suspend fun load(id: String): Result<Invoice> {
    delay(100L)
    return if (id.isNotBlank()) Result.Ok(Invoice(id, 99.9)) else Result.Err("vacío")
}

fun main() = runBlocking {
    val results = listOf("A1", "", "C3").map { async { load(it) } }.awaitAll()
    results.forEach { r ->
        when (r) {
            is Result.Ok -> println("${r.value.id}: ${"%.2f".format(r.value.total.withTax())}")
            is Result.Err -> println("Error: ${r.message}")
        }
    }
}
