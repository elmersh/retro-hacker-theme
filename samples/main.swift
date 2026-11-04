// Swift — structs, protocols, enums, async/await
import Foundation

protocol Taxable {
    var subtotal: Double { get }
}

extension Taxable {
    var total: Double { subtotal * 1.13 }
}

enum Status: String, Codable {
    case draft, sent, paid
}

struct Invoice: Taxable, Codable, Identifiable {
    let id: UUID
    var items: [Double]
    var status: Status = .draft
    var subtotal: Double { items.reduce(0, +) }
}

@MainActor
final class InvoiceStore: ObservableObject {
    @Published private(set) var invoices: [Invoice] = []

    func load() async throws {
        let (data, _) = try await URLSession.shared.data(from: URL(string: "https://api.devxi.com/invoices")!)
        invoices = try JSONDecoder().decode([Invoice].self, from: data)
        guard let first = invoices.first else { return }
        print("Primera: \(first.total, format: .number)")
    }
}
