import mongoose, { type Document, Schema } from 'mongoose'
import User, { UserSchema } from '../../entities/UserSchema'

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

export default mongoose.model<IRefreshToken & Document>('refresh_token', RefreshTokenSchema)
