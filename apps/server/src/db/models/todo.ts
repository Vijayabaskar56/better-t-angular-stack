import { model, Schema, type InferSchemaType } from "mongoose";

const todoSchema = new Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

export type TodoType = InferSchemaType<typeof todoSchema>;
export { todoSchema }
