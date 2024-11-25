import jw from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access!  Please login first",
    });
  }
};
