// Dart / Flutter
import 'package:flutter/material.dart';

class Invoice {
  final String id;
  final double total;
  const Invoice({required this.id, this.total = 0});
}

class InvoiceTile extends StatelessWidget {
  const InvoiceTile({super.key, required this.invoice});
  final Invoice invoice;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text('Factura ${invoice.id}'),
      subtitle: Text('\$${invoice.total.toStringAsFixed(2)}'),
      trailing: const Icon(Icons.chevron_right, color: Color(0xFF39FF14)),
      onTap: () async => await Future.delayed(const Duration(milliseconds: 300)),
    );
  }
}
