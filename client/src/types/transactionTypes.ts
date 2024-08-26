export enum CurrencyEnum {
  USD = 'USD',
  // Add other currencies if needed in the future
}

export enum TransactionTypeEnum {
  BUY = 1,
  SELL = -1,
}

export interface Transaction {
  id?: string //transaction of the id
  userId?: string //user id tha transaction belongs to
  currency: CurrencyEnum
  date: string // ISO 8601 string format (e.g., "2023-01-01T00:00:00Z")
  notes?: string // Optional field
  price: number
  ticker: string
  transactionType: TransactionTypeEnum
  units: number
}
