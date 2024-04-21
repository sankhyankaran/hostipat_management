import { Message } from "../models/messageSchema.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Errorhandler from "../middleware/errorMiddleware.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  // Get the values from request body
  const { firstName, lastName, email, phone, message } = req.body;

  // Check if any required field is missing
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new Errorhandler("please fill Full form", 400));
  }

  // All required fields are present, proceed to save the message
  try {
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    // Handle any errors that occur during message creation
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the message",
    });
  }
});

export const getAllMessage = catchAsyncError(async (req, res, next) => {
  const message = await Message.find();
  res.status(200).json({
    success: true,
    message,
  });
});
