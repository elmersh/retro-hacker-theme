import { useState, useEffect, type FC } from "react";

type Props = { title: string; count?: number; onReset?: () => void };

export const Counter: FC<Props> = ({ title, count = 0, onReset }) => {
  const [value, setValue] = useState<number>(count);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setValue((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="terminal" data-state={loading ? "busy" : "idle"}>
      <h1 style={{ color: "#39ff14", fontFamily: "monospace" }}>{title}</h1>
      {value > 10 && <p className="warn">Overflow: {value}</p>}
      <ul>
        {[1, 2, 3].map((n) => (
          <li key={n}>Item #{n}</li>
        ))}
      </ul>
      <button onClick={() => { setValue(0); onReset?.(); }} disabled={loading}>
        Reset
      </button>
    </section>
  );
};
