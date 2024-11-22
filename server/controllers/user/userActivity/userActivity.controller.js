export const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "You are logged out",
      });
  } catch (error) {
    console.error(`Error during logout: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Error during logout: ${error.message}`,
    });
  }
};
