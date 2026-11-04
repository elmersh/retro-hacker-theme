# R — análisis rápido
library(dplyr)

ventas <- data.frame(
  mes = c("ene", "feb", "mar"),
  total = c(1200.5, 980, 1500)
)

resumen <- ventas %>%
  filter(total > 1000) %>%
  mutate(iva = total * 0.13) %>%
  summarise(promedio = mean(total), n = n())

print(resumen)
plot(ventas$total, type = "l", col = "green", main = "Ventas")
