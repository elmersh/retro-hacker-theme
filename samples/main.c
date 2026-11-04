/* C — punteros, structs, macros */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TAX_RATE 0.13
#define MAX(a, b) ((a) > (b) ? (a) : (b))

typedef struct {
    char name[64];
    double *items;
    size_t count;
} Invoice;

static double total(const Invoice *inv) {
    double sum = 0.0;
    for (size_t i = 0; i < inv->count; ++i) sum += inv->items[i];
    return sum * (1 + TAX_RATE);
}

int main(int argc, char **argv) {
    Invoice inv = { .count = 3 };
    strncpy(inv.name, argc > 1 ? argv[1] : "DEVXI", sizeof inv.name - 1);
    inv.items = malloc(inv.count * sizeof *inv.items);
    if (!inv.items) return EXIT_FAILURE;

    inv.items[0] = 10.5; inv.items[1] = 0x14; inv.items[2] = 3e2;
    printf("%s: %.2f (max %d)\n", inv.name, total(&inv), MAX(4, 7));
    free(inv.items);
    return 0;
}
