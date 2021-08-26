const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        lowercase:true
    },
    status:{
        type:String,
        enum:['Available','Busy']
    }
})
userSchema.set('timestamps',true);

const meetingSchema = new Schema({
    RoomId:{
        type:String,
        enum:['R1','R2','R3','R4','R5'],
        required:true,
        index:true
    },
    event_date:{
        type:Date
    },
    from:{
        type:Date
    },
    to:{
        type:Date   
    },
    participants:[Schema.Types.Mixed]
})
meetingSchema.set('timestamps',true);

exports.userSchema = mongoose.model('userSchema',userSchema,'users');
exports.meetingSchema = mongoose.model('meetingSchema',meetingSchema,'meetings');