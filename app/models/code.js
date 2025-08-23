import mongoose from "mongoose";

const codeSchema = mongoose.Schema({
    codeHeading: {type: String, unique: true},
    code: String,
    lang: { type: String, required: false },
})

module.exports = mongoose.models.Code || mongoose.model("Code", codeSchema)