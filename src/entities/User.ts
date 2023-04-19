import { model, type Document, Schema } from 'mongoose'
import type RefreshTokenSchema from './RefreshToken'

export type IUser = Record<'username' | 'email' | 'password', string> & {
  _id: string
  createdAt?: Date
  refreshToken?: typeof RefreshTokenSchema
}

export type IUserModel = IUser & Document

export const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  refreshToken: { type: Schema.Types.ObjectId, ref: 'refresh_token' }
}, { versionKey: false })

const User = model<IUserModel>('User', UserSchema)

export default User
