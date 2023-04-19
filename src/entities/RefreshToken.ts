import { Schema, type Document, model } from 'mongoose'
import User, { UserSchema } from './User'

export interface IRefreshToken {
  _id: string
  userId: string
  expiresIn: number
  user: typeof User
}

export const RefreshTokenSchema = new Schema({
  userId: String,
  expiresIn: Number,
  expireAfterSeconds: Number,
  expireAt: Number,
  user: { type: UserSchema, ref: User }
})

export default model<IRefreshToken & Document>('refresh_token', RefreshTokenSchema)
