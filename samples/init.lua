-- Lua — config tipo Neovim
local M = {}
local opts = { number = true, relativenumber = true, tabstop = 2 }

function M.setup(user)
  user = vim.tbl_extend("force", opts, user or {})
  for key, value in pairs(user) do
    vim.opt[key] = value
  end
  vim.keymap.set("n", "<leader>w", ":w<CR>", { desc = "Guardar" })
end

local function fib(n)
  if n < 2 then return n end
  return fib(n - 1) + fib(n - 2)
end

print(string.format("fib(10) = %d", fib(10)))
return M
