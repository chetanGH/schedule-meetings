const { userSchema,meetingSchema } = require('../models/user.model');
const moment = require('moment');
const _ = require('underscore');


module.exports.createNewMeeting = async(req,res)=>{
    try {
        let { RoomId,participants,event_date,from,to } = req.body;
        meetingSchema.find({
            $and:[
             
                {'event_date':event_date},
                {
                    'from':{
                        $gte:ISODate(from),//5pm
                        $lte:ISODate(to)//6pm
                    },
                    'to':{
                        $lte:ISODate(to),//5pm
                        $gte:ISODate(from)//6pm
                    }
                },
                {
                    participants:{$in:participants}
                }

            ]
        }).exec((err,exists)=>{
            if(err){
                console.log("error",err)
                return res.status(500).send({success:false,message:err.message});
            }else if(!exists){
                res.status(200).send({success:true,message:'Can create meeting now.'})
            }else{
                
            }
        })
        let newMeeting = new meetingSchema({
            'participants':["p1","p2","p3"],
            'RoomId':"R1",
            'schedule':{
                'event_date':new Date(),
                'from':new Date(),
                'to':new Date()
            }
        })
        await newMeeting.save((err,meetingCreated)=>{
            if(err){
                console.log(err);
                return res.status(500).send({success:false,message:err.message});
            }else{
                return res.status(201).send({success:true,message:'Meeting has been created.'})
            }
        }) 
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
        let { RoomId,participants,event_date,from,to } = req.body;
        if(!RoomId && !participants && !event_date && !from && !to){
            return res.status(400).send({success:false,message:'Bad Request.'});
        }

        meetingSchema.find({
                'from':{
                    $gte:new Date(moment(from)),
                    $lte:new Date(moment(to))
                },
                'to':{
                    $lte:new Date(moment(to)),
                    $gte:new Date(moment(from))
                }
        }).exec(async(err,exists)=>{
            if(err){
                console.log("error",err)
                return res.status(500).send({success:false,message:err.message});
            }else if(exists.length == 0){
                let newMeeting = new meetingSchema({
                    'participants':participants,
                    'RoomId':RoomId,
                    'event_date':moment(event_date),
                    'from':moment(from),
                    'to':moment(to)
                })
                await newMeeting.save((err,meetingCreated)=>{
                    if(err){
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
                        'participants':participants,
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
                }
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'Internal server error.'})
    }
}