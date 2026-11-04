// Java — records, streams, generics, anotaciones
package com.devxi.facxi;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Main {
    private static final double TAX = 0.13;

    public record Invoice(String id, double total, boolean paid) {}

    @FunctionalInterface
    interface Rule<T> { boolean test(T t); }

    public static <T> List<T> filter(List<T> xs, Rule<T> rule) {
        return xs.stream().filter(rule::test).collect(Collectors.toList());
    }

    @Override
    public String toString() { return "Main[]"; }

    public static void main(String[] args) throws Exception {
        var invoices = List.of(new Invoice("A1", 100.0, false), new Invoice("B2", 50.0, true));
        var pending = filter(invoices, inv -> !inv.paid());
        Optional<Invoice> first = pending.stream().findFirst();
        String msg = switch (pending.size()) {
            case 0 -> "nada";
            case 1 -> "una";
            default -> "varias";
        };
        System.out.printf("%s → %.2f%n", msg, first.map(i -> i.total() * (1 + TAX)).orElse(0d));
    }
}
