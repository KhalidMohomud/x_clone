import User  from "../module/user.module.js";
import asyncHandle from "express-async-handler";
import {clerkClient, getAuth} from "@clerk/express";
 export const getUserprofile  = asyncHandle(async(req,res)=>{
    const {username} = req.params;
    const user  = await User.findone({username});
    if(!user) return res.status(404).json({error: " user not found "});
    res.status(201).json({user});

 });

export const updateProfile = asyncHandle(async(req,res)=>{
    const {userId} = getAuth(req);
    const user  = await User.findOneAndUpdate({clerKId: userId}, req.body ,{new: true});
     if(!user) return res.status(401).json({error: "user not found"});
    res.status(200).json({user});
})


export const synUser = asyncHandle(async(req,res)=>{
     const {userId} = getAuth(req);
    // checking if user all ready exist
    const existUser =  await  User.findOne({clerKId: userId});
    if(existUser) return res.status(200).json({user: existUser ,message: "User alreay exist" });



    //register user from clerk data

    const clerkUser = await  clerkClient.users.getUser(userId);


    const userDate = {
     clerKId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    //username: clerkUser.username || (clerkUser.emailAddresses?.[0]?.emailAddress.split("@")[0] || ""),
      profilePicture: clerkUser.imageUrl || "",
    }

    const user = await User.create(userDate);
    res.status(200).json({user, message: "successfully register "});

})

export const  getCurrentUser = asyncHandle(async(req,res)=>{
    const {userId} = getAuth(req);
    const user =  await User.findOne({clerKId: userId});
    if(!user) res.status(401).json({message: "not found user"});
     res.status(200).json({message: user});
})

export const followUser = asyncHandle(async (req, res) => {
  const { userId } = getAuth(req);
  const { targetUserId } = req.params;

  if (userId === targetUserId) return res.status(400).json({ error: "You cannot follow yourself" });

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) return res.status(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    // unfollow
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUser._id },
    });
  } else {
    // follow
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: currentUser._id },
    });

    // create notification
    await Notification.create({
      from: currentUser._id,
      to: targetUserId,
      type: "follow",
    });
  }

  res.status(200).json({
    message: isFollowing ? "User unfollowed successfully" : "User followed successfully",
  });
});