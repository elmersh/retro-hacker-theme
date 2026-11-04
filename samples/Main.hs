-- Haskell — tipos, type classes, pattern matching
module Main where

import Data.List (sortBy)
import Data.Ord (comparing)

data Status = Draft | Sent | Paid deriving (Show, Eq)

data Invoice = Invoice
  { invId    :: String
  , invTotal :: Double
  , invStatus :: Status
  } deriving (Show)

withTax :: Double -> Double
withTax x = x * 1.13

pending :: [Invoice] -> [Invoice]
pending = filter ((/= Paid) . invStatus)

main :: IO ()
main = do
  let invs = [Invoice "A1" 100 Draft, Invoice "B2" 50 Paid]
      sorted = sortBy (comparing invTotal) (pending invs)
  mapM_ (\i -> putStrLn $ invId i ++ ": " ++ show (withTax $ invTotal i)) sorted
