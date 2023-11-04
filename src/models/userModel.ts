import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Please enter a username'],
    },
    email: { 
        type: String, 
        required: [true, 'Please enter an email'],
        unique: true
    },
    password: { 
        type: String,
        required: [true, 'Please enter a password'],
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    verifyToken: String,
    verifyExpire: Date,
    qa: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qa'
    }]
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
