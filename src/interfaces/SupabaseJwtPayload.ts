export interface SupabaseJwtPayload {
  sub: string
  email?: string
  role?: string
  exp?: number
  iss?: string
  aud?: string
  app_metadata?: Record<string, any>
  user_metadata?: Record<string, any>
  phone?: string
  is_anonymous?: boolean
  id?: string
}