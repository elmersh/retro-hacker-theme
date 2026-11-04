-- SQL — esquema y consultas
CREATE TABLE IF NOT EXISTS invoices (
    id          BIGSERIAL PRIMARY KEY,
    client_id   BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    number      VARCHAR(32) UNIQUE NOT NULL,
    total       NUMERIC(12, 2) DEFAULT 0.00,
    status      TEXT CHECK (status IN ('draft', 'sent', 'paid')),
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_invoices_status ON invoices (status) WHERE status <> 'paid';

WITH monthly AS (
    SELECT date_trunc('month', created_at) AS mes,
           SUM(total) AS total,
           COUNT(*) FILTER (WHERE status = 'paid') AS pagadas
    FROM invoices
    GROUP BY 1
)
SELECT c.name, m.mes, m.total * 1.13 AS con_iva
FROM monthly m
JOIN clients c ON c.id = 42
WHERE m.total > 1000
ORDER BY m.mes DESC
LIMIT 10;

UPDATE invoices SET status = 'paid' WHERE id = $1 RETURNING *;
