import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: 100,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "Please provide rating"],
    },
    comment: {
      type: String,
      required: [true, "Please provide review text"],
      maxLength: 1000,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  await this.model("Product").findByIdAndUpdate(productId, {
    averageRating: result.length ? result[0].averageRating : 0,
    numOfReviews: result.length ? result[0].numOfReviews : 0,
  });
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("deleteOne", { document: true }, async function () {
  await this.constructor.calculateAverageRating(this.product);
});

export default mongoose.model("Review", ReviewSchema);
