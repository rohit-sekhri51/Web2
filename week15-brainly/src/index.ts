import mongoose, { get } from "mongoose";
import jwt from "jsonwebtoken"
import express from "express";
import z from 'zod';
import { contentModel, linkModel, tagModel, userModel } from "./db";
import {JWT_SECRET} from "./config";
import { userAuth } from "./auth";
import { random } from "./util";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

// app.get     
// LSP (Language Server Protocol)
// Define the schema for profile update
const userProfileSchema = z.object({
    username: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",})
    .min(3, { message: "Name cannot be less than 3" })
    .max(10, { message: "Name cannot be more than 10"}),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/)
    .min(8, { message: "Password cannot be less than 8" })
    .max(20, { message: "Password cannot be more than 20" })
  });

app.post("/api/v1/signup", async (req, res) => {

    try {
    const { success } = userProfileSchema.safeParse(req.body);
    // const updateBody = req.body; // how to assign a type to updateBody?
    const { username, password } = req.body;

    if (!success) {
      res.status(411).json({
        message: "Error in inputs, Zod failure"
      });
    }
    console.log("Reached userModel");
    const newUser = await userModel.create({
        username: username,
        password: password
    });

    res.status(200).json({
        message: "New User Signed Up "      // + newUser
    });
    } catch(Error) {
        console.log("Catch the Error is encountered");
        res.status(403).json({
            message: "User already exists with this username"
        })
    }
});

app.post("/api/v1/signin", async (req, res) => {

    try {
        const { success } = userProfileSchema.safeParse(req.body);
        // const updateBody = req.body; // how to assign a type to updateBody?
        const { username, password } = req.body;
    
        if (!success) {
          res.status(411).json({
            message: "Error in inputs, Zod failed"
          });
        }

    const userValid = await userModel.findOne({
        username: username,
        password: password
    });

    if(userValid) {
        const token = jwt.sign({
            id: userValid._id
        },JWT_SECRET, {expiresIn: '24h'});

        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "JWT Token failed. User does not exist or incorrect credentials"
        });
    }
    } catch(error) {
        res.status(500).json({
            message: "Internal server error"
        });
        console.log("Internal server error");
    }

});

app.post("/api/v1/content", userAuth, async (req, res) => {

    const { link, type, title, tag } = req.body;

    const userId = req.userId;
    
    const objectIdUser = new mongoose.Types.ObjectId(userId as string);
    // contentModel.findOneAndUpdate()

    const tagResponse = await tagModel.findOne({
        title: tag
    })

    const objectIdTag = tagResponse?._id

    const content = await contentModel.create({
        link: link,
        type: type,
        title: title,
        tags: [objectIdTag],
        userId: objectIdUser
    });

    if(content) {
        
        res.status(200).json({
            message: "New Content Added"
        });
    }
    else {
        res.status(402).json({
            message: "Error in Content"
        })
    }

});

app.get("/api/v1/content", userAuth, async (req, res) => {

    const userId = req.userId;
    
    const objectId = new mongoose.Types.ObjectId(userId as string);

    const getContent = await contentModel.find({
        userId: objectId
    }).populate("userId","username").populate("tags","title");

    if(getContent) {
        
        res.status(200).json({
            getContent
        });
    }
    else {
        res.status(401).json({
            message: "Error in getting content"
        });
    }
});

app.delete("/api/v1/content", userAuth, async (req, res) => {

    const userId = req.userId;
    
    const objectId = new mongoose.Types.ObjectId(userId as string);

    const title = req.body.title;

    console.log("Title & ObjectId are: " + title + objectId);

    const delContent = await contentModel.deleteMany({
        title: title,
        userId: objectId
    });
    console.log("Deleted Content is: " + JSON.stringify(delContent));

    if(delContent.deletedCount > 0) {
        res.status(200).json({
            message: "Deleted Content"
        })
    }
    else {
        res.status(403).json({
            message: "Unable to delete Content"
        })
    }
});

app.post("/api/v1/brain/share", userAuth, async (req, res) => {

    const share = req.body.share;
    const hash = random(15);

    const userId = req.userId;
    const objectId = new mongoose.Types.ObjectId(userId as string);

    if(share) {

        const existingLink = await linkModel.findOne({
            userId: objectId
        });
        if(existingLink) {
            res.status(408).json({
                message: existingLink.hash       // /share/
            });
            return;
        }

        await linkModel.create({
            hash: hash,
            userId: objectId
        });
        
        res.status(200).json({
            message: hash       // /share/
        });
    }
    else {
        await linkModel.deleteOne({
            userId: objectId
        });
        res.status(405).json({
            message: "Deleted link"
        });
    }
});

app.get("/api/v1/brain/:link", async (req, res) => {

    const link = req.params.link;

    const find = await linkModel.findOne({
        hash: link
    });

    if(!find) {
        res.status(404).json({
            message: "If the share link is invalid or sharing is disabled"
        });
        return;
    }

    const linkContent = await contentModel.find({
        userId: find.userId
    }).populate({
        path: "userId",
        select: "username"
    });

    console.log("linkContent: "  + linkContent );
    res.status(200).json({
        linkContent
    });

});

app.listen(3000);
console.log("Server running on port 3000");