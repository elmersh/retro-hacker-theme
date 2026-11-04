# Ruby — clases, bloques, símbolos
require 'json'

module Devxi
  class Invoice
    attr_reader :id, :items
    TAX = 0.13

    def initialize(id:, items: [])
      @id = id
      @items = items
    end

    def total = (items.sum * (1 + TAX)).round(2)

    def to_s
      "Factura ##{id}: $#{total}"
    end
  end
end

invoices = [1, 2, 3].map { |n| Devxi::Invoice.new(id: n, items: [10, n * 5.5]) }
invoices.select(&:total).each do |inv|
  puts inv unless inv.total.zero?
end
puts({ count: invoices.size, ok: true }.to_json) if __FILE__ == $PROGRAM_NAME
