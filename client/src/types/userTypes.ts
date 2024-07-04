export interface UserDetails {
  id: string // Corresponds to '_id' in MongoDB, aliased to 'id' in Pydantic
  email: string
  name?: string // Optional in TypeScript to match Optional in Python
  isAdmin: boolean
  createdAt: string // Dates will be handled as ISO strings
  updatedAt: string
}
