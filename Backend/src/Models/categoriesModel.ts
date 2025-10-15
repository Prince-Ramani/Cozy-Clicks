import mongoose, { Document, ObjectId } from "mongoose";

interface CategorySchemaInterface extends Document {
  _id: ObjectId;
  name: string;
  desciption: string;
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
  },
});

const Category = mongoose.model<CategorySchemaInterface>(
  "Category",
  categorySchema,
);

export default Category;
