import Report from "../models/report.model.js";
import User from "../models/auth.model.js"
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

//To handle user create new report
export const handleUserCreateReport = async (req, res) => {
    const { location, category, description, imageUrl } = req.body;
  
    try {
      if (!req.user) {
        return res.status(400).json({ error: "Unauthorized - no user found!" });
      }
  
      if (!location || !category || !description || !imageUrl) {
        return res.status(400).json({ message: "All fields including image are required!" });
      }
  
      const report = new Report({
        user: req.user._id,
        location,
        category,
        description,
        imageUrl,
      });
  
      const createdReport = await report.save();
  
      res.status(200).json({
        status: "success",
        message: "Report created successfully",
        data: createdReport,
      });
    } catch (error) {
      console.log("error in create user report controller:", error.message);
      res.status(500).json({ error: "Internal Server Error!" });
    }
  };
  

//To handle user to get all reports
export const handleUserGetReport = async(req,res) => {
    try {

        if(!req.user){
            return res.status(400).status({error : "Unauthorized - no user found!"})
        }

        const reports = await Report.find({user : req.user._id});
        res.status(200).json({message :"reports of the user", reports});

    } catch (error) {
        console.log("error in get user report controller : ",error.message)
        res.status(500).json({error : "Internal Server Error!"})
    }
}

//To handle the update in the report
export const handleUpdateReport = async(req, res) => {
    const { id } = req.params;
    const { location, category, description, status } = req.body;

    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized - no user found!" });
        }

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({ error: "No report found!" });
        }

        if(req.user.role !== "admin"){
            if (report.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: "Unauthorized to update this report!" });
            }
        }

        if (location) report.location = location;
        if (category) report.category = category;
        if (description) report.description = description;

 
        if (status) {
            if (req.user.role !== "admin") {
                return res.status(403).json({ error: "Unauthorized - Only admin can update status!" });
            }
            report.status = status;
        }

        const updatedReport = await report.save();

        res.status(200).json({
            status: "success",
            message: "Report updated successfully",
            data: updatedReport
        });

    } catch (error) {
        console.error("Error in update report controller:", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
}

//Handle to delete a report 
export const handleDeleteReport = async(req,res) => {
    const {id} = req.params;
    try {
        if(!req.user){
            return res.status(403).json({error : "Unauthorized - no user found!"})
        }

        const report = await Report.findById(id);

        if(!report){
            return res.status(404).json({error : "no report found!"})
        }

        if(report.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(403).json({error : "Unauthorized to delete this report!"})
        }

        await report.deleteOne();

        res.status(201).json({
            status : "success",
            message : "successfully deleted the report",
        })
    } catch (error) {
        console.error("Error in delete report controller:", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
}

//To handle get all reports based on user and admin
export const handleGetAllReports = async(req,res) => {
    const {location, category, status, sortBy, order, page = 1, limit = 10} = req.query;

    try {
        if(!req.user){
            return res.status(403).json({error : "Unauthorized - no user found!"})
        }

        const query = {};

        if(req.user.role !== "admin"){
            query.user = req.user._id;
        }

        //this is for filtering the reports based on the location, category and status
        if(location) query.location = { $regex : location, $options : "i"};
        if(category) query.category = category;
        if(status) query.status = status;

        //this is for sorting like ascending and descending order
        const sortOptions = {};
        if(sortBy){
            sortOptions[sortBy] = order === "desc" ? -1 : 1;
        }

        const skip = (page -1) * limit;

        const reports = await Report.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))

        //it will count the no.of reports are there based on the query
        const totalReports = await Report.countDocuments(query);

        res.status(201).json({
            status: "success",
            totalReports,
            totalPages : Math.ceil(totalReports / limit),
            currentPage : Number(page),
            reports
        });

    } catch (error) {
        console.error("Error in fetching reports : ", error.message);
        res.status(500).json({error : "Internal Server Error!"})
    }
}