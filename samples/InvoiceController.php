<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Controlador de facturas (PHP / Laravel).
 */
final class InvoiceController extends Controller
{
    private const TAX_RATE = 0.13;

    public function __construct(private readonly InvoiceService $service) {}

    #[Route('/invoices/{id}', methods: ['GET'])]
    public function show(Request $request, int $id): JsonResponse
    {
        $invoice = Invoice::with(['client', 'items'])
            ->where('status', '!=', 'void')
            ->findOrFail($id);

        $total = array_reduce($invoice->items->all(), fn ($carry, $item) => $carry + $item->price, 0);

        return response()->json([
            'id'    => $invoice->id,
            'total' => round($total * (1 + self::TAX_RATE), 2),
            'label' => "Factura #{$invoice->number} — {$invoice->client?->name}",
            'paid'  => $invoice->paid_at !== null,
        ], 200);
    }

    public function status(Invoice $invoice): string
    {
        return match (true) {
            $invoice->isPaid()  => 'paid',
            $invoice->isDraft() => 'draft',
            default             => throw new \RuntimeException('Estado desconocido'),
        };
    }
}
