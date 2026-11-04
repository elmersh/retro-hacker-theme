@extends('layouts.app')

@section('content')
  <div class="container">
    <h1>{{ $title }}</h1>
    @forelse ($invoices as $invoice)
      <x-invoice-card :invoice="$invoice" wire:key="{{ $invoice->id }}" />
    @empty
      <p>No hay facturas.</p>
    @endforelse

    @auth
      <a href="{{ route('invoices.create') }}">Nueva</a>
    @endauth
    {{-- comentario blade --}}
    {!! $html !!}
  </div>
@endsection
