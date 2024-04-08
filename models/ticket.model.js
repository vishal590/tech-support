import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    userName: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const ticketSchema = new mongoose.Schema({
    query: {
        type: String,
        required: [true, 'Query is required']
    },
    // file: String, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    userName: {
        type: String,
    },
    status: {
        type: String,
        enum: ['incomplete', 'complete'],
        default: 'incomplete',
    }, 
    messages: [messageSchema],
    techSupport: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    techSupportName: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('ticket', ticketSchema);
