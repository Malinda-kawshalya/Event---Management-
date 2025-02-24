const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const organizerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: { 
        type: String, 
        required: [true, 'Phone number is required']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    companyName: { 
        type: String, 
        required: [true, 'Company name is required'],
        trim: true
    },
    companyAddress: { 
        type: String, 
        required: [true, 'Company address is required']
    },
    role: {
        type: String,
        default: 'organizer',
        enum: ['organizer', 'admin']
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    statistics: {
        totalEvents: { type: Number, default: 0 },
        totalTicketsSold: { type: Number, default: 0 },
        totalRevenue: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

// Hash password before saving
/*organizerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});*/

// Compare password method
organizerSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Update statistics method
organizerSchema.methods.updateStatistics = async function() {
    const Event = mongoose.model('Event');
    const events = await Event.find({ organizer: this._id });
    
    this.statistics = events.reduce((acc, event) => ({
        totalEvents: acc.totalEvents + 1,
        totalTicketsSold: acc.totalTicketsSold + (event.ticketsSold || 0),
        totalRevenue: acc.totalRevenue + ((event.ticketsSold || 0) * event.ticketPrice)
    }), {
        totalEvents: 0,
        totalTicketsSold: 0,
        totalRevenue: 0
    });
    
    this.statistics.lastUpdated = Date.now();
    return this.save();
};

module.exports = mongoose.model('Organizer', organizerSchema);