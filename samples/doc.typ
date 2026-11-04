// Typst
#set page(paper: "us-letter", margin: 2cm)
#set text(font: "Inter", size: 11pt, lang: "es")

= Cotización
#let total(items) = items.sum() * 1.13

*Cliente:* DEVXI \
*Total:* #total((10, 20, 30))

#table(columns: 2, [Item], [Precio], [Hosting], [\$20])
