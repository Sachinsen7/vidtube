import mongoose from "mongoose";

const idempotencySchema = new mongoose.Schema(
    {
        key: { type: String, required: true, index: true, unique: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },
        scope: { type: String, required: true },
        resourceId: { type: mongoose.Schema.Types.ObjectId },
        statusCode: { type: Number, default: 200 },
        createdAt: { type: Date, default: Date.now, index: true },
        expiresAt: { type: Date, index: { expires: 60 * 60 * 24 } },
    },
    { timestamps: false }
);

idempotencySchema.pre("save", function (next) {
    if (!this.expiresAt) {
        this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    next();
});

const IdempotencyKeyModel = mongoose.model("IdempotencyKey", idempotencySchema);
export default IdempotencyKeyModel;
