// C++ — templates, lambdas, smart pointers, concepts
#include <iostream>
#include <memory>
#include <vector>
#include <numeric>
#include <concepts>

namespace devxi {

template <typename T>
concept Number = std::integral<T> || std::floating_point<T>;

template <Number T>
class Ledger {
public:
    explicit Ledger(std::vector<T> entries) : entries_(std::move(entries)) {}
    [[nodiscard]] T sum() const noexcept {
        return std::accumulate(entries_.begin(), entries_.end(), T{});
    }
    virtual ~Ledger() = default;
private:
    std::vector<T> entries_;
};

} // namespace devxi

int main() {
    auto ledger = std::make_unique<devxi::Ledger<double>>(std::vector{1.5, 2.5, 3.0});
    constexpr int answer = 42;
    auto print = [&](const auto& label) { std::cout << label << ": " << ledger->sum() << '\n'; };
    print("Total");
    static_assert(answer == 42, "universo roto");
    return 0;
}
