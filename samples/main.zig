// Zig
const std = @import("std");

const Invoice = struct {
    id: []const u8,
    total: f64,

    pub fn withTax(self: Invoice) f64 {
        return self.total * 1.13;
    }
};

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    const inv = Invoice{ .id = "A1", .total = 100.0 };
    try stdout.print("{s}: {d:.2}\n", .{ inv.id, inv.withTax() });
    var i: u8 = 0;
    while (i < 3) : (i += 1) {
        if (i == 1) continue;
    }
}
