// C# — records, LINQ, async, pattern matching
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Devxi.Facturacion;

public record Invoice(string Id, decimal Total, bool Paid = false);

public static class Program
{
    private const decimal Tax = 0.13m;

    public static async Task Main(string[] args)
    {
        var invoices = new[] { new Invoice("A1", 100m), new Invoice("B2", 250.5m, true) };
        var pending = invoices.Where(i => !i.Paid).Select(i => i with { Total = i.Total * (1 + Tax) });

        foreach (var inv in pending)
        {
            var label = inv switch
            {
                { Total: > 100 } => "grande",
                { Total: <= 0 } => throw new InvalidOperationException(),
                _ => "normal",
            };
            Console.WriteLine($"{inv.Id}: {inv.Total:C} ({label})");
        }
        await Task.Delay(100);
    }
}
