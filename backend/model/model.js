import mongoose from 'mongoose';
var Schema = mongoose.Schema
let UserModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    info: {
        type: String,
        required: true,
    }
})

export default mongoose.model('TaskBUserModel', UserModelSchema)
