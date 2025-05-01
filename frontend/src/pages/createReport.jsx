import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { FiUpload, FiMapPin, FiCamera, FiLoader } from "react-icons/fi";
import useAuth from "../context/useAuth";

const CreateReport = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      alert("You must be logged in to submit a report!");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    location: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const getLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || `${lat}, ${lng}`;
    } catch (error) {
      console.error("Error getting location name:", error);
      return `${lat}, ${lng}`;
    }
  };

  const handleGetLocation = async () => {
    setLocationLoading(true);
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const placeName = await getLocationName(
          position.coords.latitude,
          position.coords.longitude
        );

        setFormData((prev) => ({ ...prev, location: placeName }));
      } else {
        alert("Geolocation not supported. Enter manually.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Please allow location access or enter manually.");
    } finally {
      setLocationLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = [];
  
    if (!formData.location?.trim()) {
      validationErrors.push("Location is required");
    }
    if (!formData.category) {
      validationErrors.push("Waste category is required");
    }
    if (!formData.description?.trim()) {
      validationErrors.push("Description is required");
    } else if (formData.description.trim().length < 10) {
      validationErrors.push("Description needs 10+ characters");
    }
    if (!image) {
      validationErrors.push("Image is required");
    }
  
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }
  
    setSubmitting(true);
  
    try {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", image);
      formDataCloudinary.append("upload_preset", "WasteImagesUploads");
      formDataCloudinary.append("cloud_name", "denav03vr");
  
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/denav03vr/image/upload",
        {
          method: "POST",
          body: formDataCloudinary,
        }
      );
  
      if (!cloudinaryRes.ok) throw new Error("Image upload failed");
  
      const cloudinaryData = await cloudinaryRes.json();
  
      const payload = {
        
        location: formData.location.trim(),
        category: formData.category,
        description: formData.description.trim(),
        imageUrl: cloudinaryData.secure_url,
      };
  
      const response = await axiosInstance.post("/reports", payload);
      console.log("Backend response:", response.data);
  
      alert("Report submitted successfully!");
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Submission error:", err);
      alert(`Submission failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Report Waste Issue
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Help us keep our community clean and green
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <FiMapPin className="mr-2 text-green-600" />
                    Location
                  </div>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    placeholder="Enter location or use current location"
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={locationLoading}
                    className="mt-1 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {locationLoading ? (
                      <FiLoader className="animate-spin h-4 w-4" />
                    ) : (
                      "Use Current"
                    )}
                  </button>
                </div>
              </div>

              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Waste Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="plastic">Plastic Waste</option>
                  <option value="organic">Organic Waste</option>
                  <option value="e-waste">Electronic Waste</option>
                  <option value="metal">Metal Waste</option>
                  <option value="glass">Glass Waste</option>
                  <option value="paper">Paper Waste</option>
                  <option value="chemical">Chemical Waste</option>
                  <option value="mixed">Mixed Waste</option>
                  <option value="others">Other Waste</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Please describe the waste issue in detail..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <FiCamera className="mr-2 text-green-600" />
                    Upload Photo Evidence
                  </div>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 rounded-md" />
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -m-2 shadow-sm"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <FiLoader className="animate-spin mr-2" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <FiUpload className="mr-2" />
                      Submit Waste Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>


        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800">Tips for better reports:</h3>
          <ul className="mt-2 text-sm text-green-700 list-disc list-inside space-y-1">
            <li>Take clear photos that show the extent of the waste</li>
            <li>Include any identifying landmarks in your photos</li>
            <li>Be specific about the type and quantity of waste</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;