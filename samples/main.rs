//! Rust — traits, enums, lifetimes, macros
use std::collections::HashMap;
use std::fmt;

#[derive(Debug, Clone, PartialEq)]
pub enum Status {
    Draft,
    Sent { at: u64 },
    Paid(f64),
}

pub trait Taxable {
    const RATE: f64 = 0.13;
    fn total(&self) -> f64;
}

#[derive(Debug)]
pub struct Invoice<'a> {
    pub client: &'a str,
    pub items: Vec<f64>,
    pub status: Status,
}

impl<'a> Taxable for Invoice<'a> {
    fn total(&self) -> f64 {
        self.items.iter().sum::<f64>() * (1.0 + Self::RATE)
    }
}

impl fmt::Display for Invoice<'_> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} => ${:.2}", self.client, self.total())
    }
}

macro_rules! square {
    ($x:expr) => {
        $x * $x
    };
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let inv = Invoice { client: "DEVXI", items: vec![10.0, 20.5], status: Status::Paid(30.5) };
    let mut counts: HashMap<&str, usize> = HashMap::new();
    *counts.entry("facturas").or_insert(0) += 1;

    match &inv.status {
        Status::Paid(amount) if *amount > 0.0 => println!("pagada: {amount}"),
        Status::Sent { at } => println!("enviada en {at}"),
        _ => unreachable!(),
    }
    println!("{inv} | {} | {:?}", square!(4), counts);
    Ok(())
}
