import UserModel from './model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';
// console.log(`Env is ${process.env.ENV}`)
let mongoDB = process.env.ENV === "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
// console.log(typeof mongoDB)
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
  return new UserModel(params)
}

export async function deleteUser(params) { 
  return UserModel.deleteOne(params)
}

export async function updateUserInfo(query, newData) { 
  return UserModel.findOneAndUpdate(query, newData)
}

export async function getUser(params) { 
  return UserModel.find(params)
}
