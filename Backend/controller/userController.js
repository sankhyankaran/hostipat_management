import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Errorhandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import generateToken from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

//register
const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    // Send response directly instead of calling next()
    return res
      .status(400)
      .json({ success: false, message: "Please fill full Form!" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      // Send response directly instead of calling next()
      return res
        .status(400)
        .json({ success: false, message: "User is already Registered" });
    }
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      nic,
      role,
    });
    // genrate token
    generateToken(user, "User Registered", 200, res);
  } catch (error) {
    // Handle any internal server errors
    console.log(error);
    next(new Errorhandler(error.message, 500));
  }
});

export default patientRegister;

//login user
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new Errorhandler("Please provide all details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new Errorhandler("Password and Confirm password do not match!", 400)
    );
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new Errorhandler("Invalid Password or email!", 400));
    }

    // check compare password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new Errorhandler("Incorrect Password!", 400));
    }

    // If password matches, continue with the login process
    // For example, generate token, set cookies, etc.

    if (role !== user.role) {
      return next(new Errorhandler("User role not found", 400));
    }
    // genrate token
    generateToken(user, "User Login Successfully", 200, res);
  } catch (error) {
    return next(error); // Handle any unexpected errors
  }
});

//add new admin
export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new Errorhandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new Errorhandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

//get all the doctor
export const getAllDoctor = catchAsyncError(async (req, res, next) => {
  try {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);

    res.status(error);
  }
});

//get userDetail //and admin detail
export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//logout admin and remove  the cookie
export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "admin log out successfully",
    });
});

//logout patient and remove  the cookie
export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "patient log out successfully",
    });
});

//add new doctor
// data send in formData
export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new Errorhandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new Errorhandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new Errorhandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new Errorhandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new Errorhandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});
