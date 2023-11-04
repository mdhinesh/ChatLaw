import mongoose from 'mongoose';
import User from './userModel';

const qaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please enter a question'],
    },
    answer: {
        type: String,
        required: [true, 'Please enter an answer'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: String,
        required: [true, 'Please enter a userid'],
        ref: 'User'
    },
});


const Qa = mongoose.models.Qa || mongoose.model('Qa', qaSchema);

export default Qa;
