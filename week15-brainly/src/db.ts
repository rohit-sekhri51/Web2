import mongoose, { Types } from "mongoose";
import { MONGO_URL } from "./config";

mongoose.connect(MONGO_URL);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minLength: 3, maxLength: 10 },
    password: { type: String, required: true, match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/ },
  });

export const userModel = mongoose.model("Users", userSchema);  

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
  });
  
export const tagModel = mongoose.model('Tag', tagSchema);

const contentTypes = ['image', 'youtube', 'twitter', 'audio']; // Extend as needed

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: 'Tag',
    validate: async function (val: Types.ObjectId) {
      const tag = await tagModel.findById(val);
      if(!tag) {
        throw new Error("Tag does exit. contentSchema tagId ref: Tag");
      }
    }
   }],
  userId: { type: Types.ObjectId, ref: 'Users', required: true,
    validate: async function (value: Types.ObjectId) {
      const user = await userModel.findById(value);
      if(!user) {
        throw new Error("User does exit. contentSchema userId ref: Users");
      }
    }
   },
});

// Using pre-save hook
contentSchema.pre('save', async function(next) {
  const user = await userModel.findById(this.userId);
  if (!user) {
    throw new Error('User does not exist. Inside pre-save hook.');
  }
  next();
});

export const contentModel = mongoose.model("Contents", contentSchema);

const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, unique: true },
  });

export const linkModel = mongoose.model("Links", linkSchema);