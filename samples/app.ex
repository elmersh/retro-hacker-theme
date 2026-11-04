# Elixir — módulos, pattern matching, pipes
defmodule Devxi.Invoice do
  @moduledoc "Facturas en Elixir"
  @tax 0.13

  defstruct [:id, items: [], paid: false]

  @spec total(%__MODULE__{}) :: float()
  def total(%__MODULE__{items: items}) do
    items
    |> Enum.sum()
    |> Kernel.*(1 + @tax)
    |> Float.round(2)
  end

  def status(%{paid: true}), do: :paid
  def status(_), do: :pending

  def run do
    with {:ok, data} <- File.read("invoices.json"),
         {:ok, json} <- Jason.decode(data) do
      Enum.map(json, &IO.inspect/1)
    else
      {:error, reason} -> IO.puts("Error: #{inspect(reason)}")
    end
  end
end
