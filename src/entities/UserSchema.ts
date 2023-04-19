import mongoose, { type Document, Schema } from 'mongoose'
import type RefreshTokenSchema from '../useCases/refreshToken/RefreshTokenSchema'

export type IUser = Record<'username' | 'email' | 'password', string> & {
  createdAt?: Date
  refreshToken?: typeof RefreshTokenSchema
  _id?: string
}

export type IUserModel = IUser & Document

export const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  refreshToken: { type: Schema.Types.ObjectId, required: false, ref: 'refresh_token' }
})

export default mongoose.model<IUserModel>('User', UserSchema)
