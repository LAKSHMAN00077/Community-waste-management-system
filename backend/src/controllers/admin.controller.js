import Report from "../models/report.model.js";
import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";

// to handle admin to get all reports 
export const handleGetAllReports = async (req, res) => {
    try {
      const reports = await Report.find()
        .sort({ createdAt: -1 })
        .populate('user', 'fullName');
  
      res.status(200).json({
        status: "success",
        message: "Successfully fetched all reports",
        data: reports
      });
    } catch (error) {
      console.log("error in admin get all reports controller: ", error.message);
      res.status(500).json({ error: "Internal Server Error!" });
    }
};
  
  

//to handle reports summary
export const handleGetReportSummary = async(req,res) => {
    try {
        const totalReports = await Report.countDocuments();

        const reportsByStatus = await Report.aggregate([
            {$group : {_id : "$status", count : {$sum : 1}}}
        ])
    
        const reportsByCategory = await Report.aggregate([
            {$group : {_id : "$category", count : {$sum : 1}}}
        ])

        const monthlyReports = await Report.aggregate([
            {
                $group : {
                    _id : {
                        year : {$year : "$createdAt"},
                        month : {$month : "$createdAt"}
                    },
                    count : {$sum : 1}
                }
            },
            {$sort : {"_id.year" : 1 , "_id.month" : 1}}
        ])

        const recentReports = await Report.find()
                                    .sort({createdAt : -1})
                                    .limit(5);
    
        res.status(200).json({
            success : true,
            totalReports,
            reportsByStatus,
            reportsByCategory,
            monthlyReports,
            recentReports
        })
    } catch (error) {
        console.log("error in admin get reports summary controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

// to handle admin to update the users report status
export const handleAdminUpdateReportStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const validStatuses = ["pending", "in-progress", "resolved"];
      if (!validStatuses.includes(status?.trim().toLowerCase())) {
        return res.status(400).json({ error: "Invalid status value!" });
      }
  
      const updatedReport = await Report.findByIdAndUpdate(
        id,
        { status: status.trim().toLowerCase() },
        { new: true }
      );
  
      if (!updatedReport) {
        return res.status(404).json({ error: "Report not found!" });
      }
  
      res.status(200).json({
        status: "success",
        message: "Successfully updated the status",
        data: updatedReport
      });
    } catch (error) {
      console.log("Error in admin update report status controller:", error.message);
      res.status(500).json({ error: "Internal Server Error!" });
    }
  };
  


// to hanlde admin delete the user report 
export const handleAdminDeleteReport = async(req,res) => {
    const {id} = req.params;
    try {
        const report = await Report.findById(id);

        if(!report){
            return res.status(403).json({error : "Unauthorized - no reports found!"});
        }

        await Report.deleteOne(report);

        res.status(200).json({
            status : "success",
            message : "successfully deleted the report"
        })
    } catch (error) {
        console.log("error in admin delete user report controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

// to handle admin to get all users
export const handleAdminGetAllUsers = async(req,res) => {
    const { page = 1, limit =1} = req.query;
    try {
        const role = "user";
        const query = {};
        if(role) query.role = role;

        const skip = (page-1) * limit;

        const users = await User.find(query)
                                    .select("-password")
                                    .skip(skip)
                                    .limit(Number(limit))
                                    .sort({createdAt : -1})

        const totalUsers = await User.countDocuments(query);

        res.status(201).json({
            status : true,
            totalUsers,
            currentPage : Number(page),
            totalPages : Math.ceil(totalUsers / limit),
            users
        })
    } catch (error) {
        console.error("Error in admin get all users:", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
}


// to handle admin delete a user
export const handleAdminDeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    await User.deleteOne({ _id: id });

    res.status(200).json({
      status: "success",
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error in admin delete user controller:", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};





// to handle admin reset a user password
export const handleAdminResetPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters long." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error("Error in admin reset password controller:", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
