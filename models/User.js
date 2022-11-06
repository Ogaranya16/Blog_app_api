const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name: {
        type: String,
        required:true,
    },
    username: {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true, 'Please enter an password'],
        minlength: [8, 'Minimum length of 8 characters']
    },
    token: {
        type:String, 
    }

},
{timestamps: true}
)


//making changes after saving to db
// UserSchema.post('save', function (doc, next) {
//    console.log('new user was created & saved', doc)
//    next()
// })

//using a function before doc is saved to db
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
   
    next()
})

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})
    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        return user;
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


module.exports = mongoose.model("User", UserSchema)