import mongoose, { Schema, Document} from "mongoose";

export interface ICaregory extends Document { 
    nameEn: string,
    nameAr: string
}

const categorySchema = new Schema<ICaregory>({
    nameEn: {
        type: String,
        required: true
    },
    nameAr: {
        type: String,
        required: true
    }
})

export default mongoose.model<ICaregory>("Category", categorySchema)