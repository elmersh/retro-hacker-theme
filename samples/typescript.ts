// TypeScript — tipos, genéricos, decoradores, async
import { readFile } from "node:fs/promises";
import type { Request, Response } from "express";

export enum Status { Draft = "draft", Sent = "sent", Paid = 1 << 2 }

interface Invoice<T extends object = {}> {
  readonly id: string;
  total: number;
  items: Array<T>;
  status?: Status;
}

type Handler = (req: Request, res: Response) => Promise<void>;

function log(target: any, key: string, desc: PropertyDescriptor) {
  const original = desc.value;
  desc.value = function (...args: unknown[]) {
    console.log(`[${new Date().toISOString()}] ${key}`, args);
    return original.apply(this, args);
  };
}

export class InvoiceService {
  private static readonly TAX = 0.13;
  #cache = new Map<string, Invoice>();

  constructor(private readonly baseUrl: string) {}

  @log
  async fetch(id: string): Promise<Invoice | null> {
    if (this.#cache.has(id)) return this.#cache.get(id)!;
    const res = await fetch(`${this.baseUrl}/invoices/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Invoice;
    this.#cache.set(id, data);
    return data;
  }

  withTax = (amount: number): number => +(amount * (1 + InvoiceService.TAX)).toFixed(2);
}

const isValidNit = (nit: string) => /^\d{4}-\d{6}-\d{3}-\d$/.test(nit);
const config = await readFile("./config.json", "utf8").then(JSON.parse).catch(() => ({}));
export default { isValidNit, config, nullish: config?.debug ?? false };
