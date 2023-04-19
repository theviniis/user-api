import { Schema, type Document, model } from 'mongoose'
import type User from './User'

export interface IRefreshToken {
  _id: string
  userId: string
  expiresIn: number
  user: typeof User
}

export type IRefreshTokenModel = IRefreshToken & Document

export const RefreshTokenSchema = new Schema({
  userId: String,
  expiresIn: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { versionKey: false })

const RefreshToken = model<IRefreshTokenModel>('refresh_token', RefreshTokenSchema)
export default RefreshToken
