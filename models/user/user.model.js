import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  FullName:{
    type : String,
    trim:true
  },
  image : {
    type:String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  userName: {
    type: String,
    unique: true,
    required:true,
    trim: true,
  },
  password: {
    type: String,
    required:true
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  role: {
    type: String,
    enum: ['mentee', 'mentor', 'admin'],
    default: 'mentee'
  },
  bio: {
    type: String,
    trim: true
  },
  isAdmin:{
    type:Boolean,
    default: false,
  },
  isMentor:{
    type:Boolean,
    default: false,
  },
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
