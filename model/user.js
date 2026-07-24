const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    phone:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    referralCode:{
        type:String,
        default:""
    },

    referredBy:{
        type:String,
        default:""
    },

    balance:{
        type:Number,
        default:0
    },

    totalEarnings:{
        type:Number,
        default:0
    },

    activeInvestment:{
        type:Number,
        default:0
    },

    totalWithdrawal:{
        type:Number,
        default:0
    },

    totalDeposit:{
        type:Number,
        default:0
    },

    accountName:{
        type:String,
        default:""
    },

    accountNumber:{
        type:String,
        default:""
    },

    bankName:{
        type:String,
        default:""
    },

    level:{
        type:Number,
        default:1
    },

    verified:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);