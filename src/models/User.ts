import * as mongoose from 'mongoose';

import UnauthorizedError from '../domain/exceptions/UnauthorizedError';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
  },
  {
    timestamps: true
  }
);

// Pre-save middleware to bcrypt the password
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = Bun.password.hashSync(this.password, {
      algorithm: 'bcrypt'
    });
  }

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  const user = await User.findById(this._id).select('+password');

  if (!user) {
    throw new UnauthorizedError('User not found');
  }
  return Bun.password.verifySync(password, user.password);
};

type UserSchema = mongoose.InferSchemaType<typeof userSchema>;

export interface User extends UserSchema, mongoose.Document {
  comparePassword: (password: string) => boolean;
}

// eslint-disable-next-line sonarjs/no-redeclare
export const User = mongoose.model<User>('User', userSchema);
