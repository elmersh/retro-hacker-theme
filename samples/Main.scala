// Scala 3
package devxi

case class Invoice(id: String, total: Double, paid: Boolean = false)

enum Status:
  case Draft, Sent, Paid

object Main:
  val Tax = 0.13

  extension (d: Double) def withTax: Double = d * (1 + Tax)

  @main def run(): Unit =
    val invs = List(Invoice("A1", 100), Invoice("B2", 50, paid = true))
    for inv <- invs if !inv.paid do
      println(s"${inv.id}: ${inv.total.withTax}%.2f")
    invs match
      case head :: _ => println(head)
      case Nil       => println("vacío")
