// Go — structs, interfaces, goroutines, generics
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"sync"
	"time"
)

type Status int

const (
	Draft Status = iota
	Sent
	Paid
)

var ErrNotFound = errors.New("invoice not found")

type Invoice struct {
	ID     string    `json:"id"`
	Total  float64   `json:"total"`
	Status Status    `json:"status"`
	Date   time.Time `json:"date,omitempty"`
}

type Store interface {
	Get(ctx context.Context, id string) (*Invoice, error)
}

func Map[T, U any](xs []T, f func(T) U) []U {
	out := make([]U, 0, len(xs))
	for _, x := range xs {
		out = append(out, f(x))
	}
	return out
}

func handler(store Store) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		inv, err := store.Get(r.Context(), r.PathValue("id"))
		if errors.Is(err, ErrNotFound) {
			http.Error(w, "404", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(inv)
	}
}

func main() {
	var wg sync.WaitGroup
	results := make(chan string, 3)
	for i := range 3 {
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			results <- fmt.Sprintf("worker %d listo", n)
		}(i)
	}
	wg.Wait()
	close(results)
	for r := range results {
		fmt.Println(r)
	}
	fmt.Println(Map([]int{1, 2, 3}, func(n int) string { return fmt.Sprint(n * 2) }))
}
