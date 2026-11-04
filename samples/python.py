#!/usr/bin/env python3
"""Python — dataclasses, async, decoradores, f-strings."""
from __future__ import annotations

import asyncio
import re
from dataclasses import dataclass, field
from functools import wraps
from typing import Iterator

NIT_RE = re.compile(r"^\d{4}-\d{6}-\d{3}-\d$")


def retry(times: int = 3):
    def deco(fn):
        @wraps(fn)
        async def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return await fn(*args, **kwargs)
                except ConnectionError as exc:
                    print(f"intento {attempt}/{times} falló: {exc!r}")
            raise RuntimeError("sin suerte")
        return wrapper
    return deco


@dataclass(frozen=True, slots=True)
class Invoice:
    number: int
    client: str
    items: list[float] = field(default_factory=list)
    paid: bool = False

    @property
    def total(self) -> float:
        return round(sum(self.items) * 1.13, 2)

    def __iter__(self) -> Iterator[float]:
        yield from self.items


@retry(times=2)
async def fetch(n: int) -> Invoice:
    await asyncio.sleep(0.1)
    return Invoice(number=n, client="DEVXI", items=[10.5, 20, 0x1F])


async def main() -> None:
    invoices = await asyncio.gather(*(fetch(i) for i in range(3)))
    paid = {inv.number: inv.total for inv in invoices if not inv.paid}
    match paid:
        case {}:
            print("nada")
        case _:
            print(f"{len(paid)} pendientes → {paid}")


if __name__ == "__main__":
    asyncio.run(main())
