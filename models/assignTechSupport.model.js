import mongoose from 'mongoose';

const assignTechSupportSchema = new mongoose.Schema({
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    techSupport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    techSupportName: {
        type: String,
        default: null,
    }
});

export default mongoose.model('AssignTechSupport', assignTechSupportSchema);
