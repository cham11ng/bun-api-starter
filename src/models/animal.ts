import * as mongoose from 'mongoose';

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sound: { type: String, required: true },
  },
  {
    methods: {
      speak() {
        console.log(`${this.sound}!`);
      },
    },
  }
);

export type Animal = mongoose.InferSchemaType<typeof animalSchema>;
export const Animal = mongoose.model('Animal', animalSchema);
