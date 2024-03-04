import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
  },
  {
    methods: {
      comparePassword(password: string) {
        return Bun.password.verifySync(password, this.password);
      },
    },
  }
);

// Pre-save middleware to bcrypt the password
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = Bun.password.hashSync(this.password, {
      algorithm: "bcrypt"
    });
  }

  next();
});

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model('User', userSchema);
