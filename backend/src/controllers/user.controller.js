import bcrypt from "bcryptjs";

// to handle to get user profile
export const handleGetUserProfile = async(req,res) => {
    try {
        if(!req.user){
            return res.status(401).json({error : "Unauthorized - no user found!"})
        }
        res.status(201).json({
            status : true,
            message : "user profile fetched successfully",
            data : {
                name : req.user.fullName,
                email : req.user.email,
                contact : req.user.phoneNumber,
                role : req.user.role,
                createdAt : req.user.createdAt
            }
        });
    } catch (error) {
        console.log("error in get user profile controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

// to handle to update the user profile
export const handleUpdateUserProfile = async(req,res) => {
    const {fullName, email, phoneNumber} = req.body;
    try {
        if(!req.user){
            return res.status(401).json({error : "Unauthorized - no user found!"})
        }

        if(fullName) req.user.fullName = fullName;
        if(email) req.user.email = email;
        if(phoneNumber) req.user.phoneNumber = phoneNumber;

        const updatedUserProfile = await req.user.save();

        res.status(201).json({
            status : true,
            message : "user profile updated successfully",
            data : {
                name : updatedUserProfile.fullName,
                email : updatedUserProfile.email,
                contact :  updatedUserProfile.phoneNumber,
                role : updatedUserProfile.role,
                createdAt : updatedUserProfile.createdAt
            }
        });
    } catch (error) {
        console.log("error in update user profile controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

// to handle update the current user password
export const handleUpdateUserPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        if (!req.user) {
            return res.status(403).json({ error: "Unauthorized - No user found!" });
        }

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Both current and new passwords are required!" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: "New password must be at least 6 characters long!" });
        }

        const isMatch = await req.user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ error: "Current password is incorrect!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        req.user.password = hashedPassword;
        await req.user.save();

        res.status(200).json({
            status: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Error in update user password controller:", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};



// to handle to delete user account
export const handleDeleteUserAccount = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(403).json({ error: "Unauthorized - No user found!" });
      }
  
      await req.user.deleteOne();
  
      res.status(200).json({
        status: true,
        message: "Account deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting user account:", error.message);
      res.status(500).json({ error: "Internal Server Error!" });
    }
  };
  
