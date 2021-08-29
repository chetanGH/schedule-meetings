const { meetingSchema } = require('../models/user.model');
const moment = require('moment');
const _ = require('underscore');
const ExistingRooms = ["R1","R2","R3","R4","R5"]


const existingParticipants = async(a, b)=> {
    return a.filter(el => b.includes(el));
}

/**
 * @createNewMeeting function which schedules new advanced Meeting as per the Room availability.
 * @param Request in Body [RoomId(R1,R2,R3,R4,R5). participants, event_date, from, to]
 * @param Response
 * @returns Object, containing Boolean as Success, TextMessage as Message.
 * @author Chetan Hebsur
 * */ 
module.exports.createNewMeeting = async(req,res)=>{
    try {
        const { RoomId,participants,event_date,from,to } = req.body;
        if(!RoomId && !participants && !event_date && !from && !to){
            return res.status(400).send({success:false,message:'Bad Request.'});
        }
        if(!ExistingRooms.includes(RoomId)){
            return res.status(404).send({success:false,message:"Room isn\'t available."})
        }
        if(moment(from).isValid() == true && moment(to).isValid() == true && moment(event_date).isValid() == true){
            const membersArr = participants.split(',');
            if(membersArr.length > 1){
                meetingSchema.find({
                    'from':{
                        $gte:new Date(moment.utc(from)),
                        $lte:new Date(moment.utc(to))
                    },
                    'to':{
                        $lte:new Date(moment.utc(to)),
                        $gte:new Date(moment.utc(from))
                    }
                }).exec(async(err,exists)=>{
                    if(err){
                        console.log("error",err)
                        return res.status(500).send({success:false,message:err.message});
                    }else if(exists.length == 0){
                        
                            let newMeeting = new meetingSchema({
                                'participants':membersArr,
                                'RoomId':RoomId,
                                'event_date':moment(event_date),
                                'from':moment(from),
                                'to':moment(to)
                            })
                            await newMeeting.save((err,meetingCreated)=>{
                                if(err){
                                    console.log(err);
                                    return res.status(500).send({success:false,message:"Internal server error."});
                                }else{
                                    return res.status(201).send({success:true,message:'Meeting has been created.'})
                                }
                            }) 
                        
                    }else{
                        let exisitngRooms = await _.pluck(exists,'RoomId')
                        if(exisitngRooms.includes(RoomId) == true){
                          return res.status(200).send({success:false,message:'Room is busy wih meeting, you can try next Room.'})  
                        }else{
                            let members = _.flatten(_.pluck(exists,'participants'));
                            let getParticipantsAvailability = await existingParticipants(members,membersArr);
    
                            if(getParticipantsAvailability.length == 0){
                                let newMeeting = new meetingSchema({
                                    'participants':membersArr,
                                    'RoomId':RoomId,
                                    'event_date':moment(event_date),
                                    'from':moment(from),
                                    'to':moment(to)
                                })
                                await newMeeting.save((err,meetingCreated)=>{
                                    if(err){
                                        console.log(err);
                                        return res.status(500).send({success:false,message:err.message});
                                    }else{
                                        return res.status(201).send({success:true,message:'Meeting has been created.'})
                                    }
                                }) 
                            }else{
                                res.status(200).send({success:true,message:`Can't schedule meeting now, because ${String(membersArr)} participants are not available.`})
                            }
                        }
                    }
                })
            }else{
                return res.status(200).send({success:false,message:'At least two participants are required to schedule meeting.'})
            }
        }else{
            return res.status(405).send({success:false,message:"Invalid data."})            
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'Internal server error.'})
    }
}

/**
 * @basicMeeting function which schedules new Meeting as per the Room availability.
 * @param Request in Body [RoomId(R1,R2,R3,R4,R5). participants, event_date, from, to]
 * @param Response
 * @returns Object, containing Boolean as Success, TextMessage as Message.
 * @author Chetan Hebsur
 * */ 
module.exports.basicMeeting = async(req,res)=>{
    try {
        console.log(`
            from:${moment.utc(req.body.from)},
            to:${moment.utc(req.body.to)}
        
        `)
        
        let { RoomId,participants,event_date,from,to } = req.body;
        if(!RoomId && !participants && !event_date && !from && !to){
            return res.status(400).send({success:false,message:'Bad Request.'});
        }
        if(!ExistingRooms.includes(RoomId)){
            return res.status(404).send({success:false,message:"Room isn\'t available."})
        }
        if(moment(from).isValid() == true && moment(to).isValid() == true && moment(event_date).isValid() == true){

            let members = participants.split(',');
            if(members.length > 1){
                meetingSchema.find({
                        'from':{
                            $gte:new Date(moment.utc(from)),
                            $lte:new Date(moment.utc(to))
                        },
                        'to':{
                            $lte:new Date(moment.utc(to)),
                            $gte:new Date(moment.utc(from))
                        }
                }).exec(async(err,exists)=>{
                    if(err){
                        console.log(err.stringValue);
                        if(err.stringValue == "Invalid Date"){
                            return res.status(405).send({success:false,message:"Invalid date."});
                        }
                        return res.status(500).send({success:false,message:err.message});
                    }else if(exists.length == 0){
                        let newMeeting = new meetingSchema({
                            'participants':members,
                            'RoomId':RoomId,
                            'event_date':moment(event_date),
                            'from':moment(from),
                            'to':moment(to)
                        })
                        await newMeeting.save((err,meetingCreated)=>{
                            if(err){
                                if(err.stringValue == 'Invalid Date'){
                                    return res.status(405).send({success:false,message:"Invalid date."});
                                }
                                return res.status(500).send({success:false,message:err.message});
                            }else{
                                return res.status(201).send({success:true,message:'Meeting has been created.'})
                            }
                        }) 
                    }else{
                        let exisitngRooms = await _.pluck(exists,'RoomId')
                        if(exisitngRooms.includes(RoomId) == true){
                          return res.status(200).send({success:false,message:'Room is busy wih meeting, you can try next Room.'})  
                        }else{
                            let newMeeting = new meetingSchema({
                                'participants':members,
                                'RoomId':RoomId,
                                'event_date':moment(event_date),
                                'from':moment(from),
                                'to':moment(to)
                            })
                            await newMeeting.save((err,meetingCreated)=>{
                                if(err){
                                    console.log(err.stringValue);
                                    if(err.stringValue == 'Invalid Date'){
                                        return res.status(405).send({success:false,message:"Invalid date."});
                                    }
                                    return res.status(500).send({success:false,message:err.message});
                                }else{
                                    return res.status(201).send({success:true,message:'Meeting has been created.'})
                                }
                            })
                        }
                    }
                })
            }else{
                return res.status(200).send({success:false,message:"Atleast 2 members are required to create meeting."})
            }
        }else{
            return res.status(405).send({success:false,message:"Invalid data."})            
        }
    } catch (error) {
        console.log(error.stringValue);
        return res.status(500).send({success:false,message:'Internal server error.'})
    }
}