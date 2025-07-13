const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    contact:{
        type:Number,
        required:true,
    },
    severity: {
    type: String,
    enum: ["low", "medium", "critical"],  // your 3 options
    default: "medium"
    },
        location: {
      type: {
        type: String,
        enum: ["Point"],     // must be 'Point'
        required: true,
        default: "Point"
      },
      coordinates: {
        type: [Number],      // [longitude, latitude]
        required: true,
        validate: {
        validator: v => v.length === 2,
        message: "Coordinates must be [lng, lat]"
        }
      }
    },
    image:{
        type:String,
    },
    
    timeDetected: {
         type: Date, default: Date.now 
    }
});

module.exports=mongoose.model("Report",reportSchema);