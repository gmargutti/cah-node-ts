import { Schema, model, Document } from 'mongoose';

export interface CardInterface extends Document {
  language: string;
  text: string;
  type: string;
}

const CardSchema = new Schema({
  language: String,
  text: String,
  type: String,
});

export default model<CardInterface>('Card', CardSchema);
