import app from "./app.js";
import cloudinary from "cloudinary";

//cloudnary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`serveris runnig on ${PORT}`);
});
