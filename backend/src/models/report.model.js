import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        user: {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User',
        },
        location: {
            type : String,
            required : true,
        },
        category: {
            type : String,
            enum : ['plastic', 'organic', 'e-waste', 'chemical', 'mixed', 'metal', 'glass', 'paper', 'others'],
            required : true,
        },
        status: {
            type : String,
            enum : ['pending', 'in-progress', 'resolved'],
            default : 'pending',
        },
        description: {
            type : String,
            required : true,
        },
        imageUrl : {
            type : String,
            required : true
        }
    },{timestamps: true}
)

reportSchema.index({user : 1});
reportSchema.index({location : 1, category : 1});

const Report = mongoose.model('report',reportSchema);

export default Report;