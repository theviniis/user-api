import mongoose, { type Document, Schema } from 'mongoose'
import bcryptjs from 'bcryptjs'

export type IUser = Record<'username' | 'email' | 'password', string> & {
  createdAt?: Date
  _id?: string
}

export type IUserModel = IUser & Document

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String, required: true
    // select: false
  },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
})

UserSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.password as string, 10)
  this.password = hash
  next()
})

export default mongoose.model<IUserModel>('User', UserSchema)
