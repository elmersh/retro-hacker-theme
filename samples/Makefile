# Makefile
APP   := facxi
PORT ?= 8080

.PHONY: build run clean

build: ## Compila
	go build -o bin/$(APP) ./cmd/$(APP)

run: build
	@echo "Corriendo en :$(PORT)"
	./bin/$(APP) --port=$(PORT)

clean:
	rm -rf bin/
