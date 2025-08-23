import mongoose from "mongoose";

const codeSchema = mongoose.Schema({
    codeHeading: {type: String, unique: true},
    code: { type: String, required: true },
    lang: { type: String, required: false },
})

module.exports = mongoose.models.Code || mongoose.model("Code", codeSchema)