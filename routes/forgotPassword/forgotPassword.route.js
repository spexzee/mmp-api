import exprss from "express";
import bcrypt from "bcrypt";
import UserModel from "../../models/user.model.js";
import HelperFunctions from "../../HelperFunctions/HelperFunctions.js";

const { isValidPhoneNumber, isValidEmail } = HelperFunctions;
const router = exprss.Router();

router.get("/:key", async (req, res) => {
  try {
    if (isValidPhoneNumber(req.params.key)) {
      const result = await UserModel.findOne({ phoneNumber: req.params.key });
      res.status(200).json({ message: "User Found!", data: result });
    } else if (isValidEmail(req.params.key)) {
      const result = await UserModel.findOne({ email: req.params.key });
      res.status(200).json({ message: "User Found!", data: result });
    } else {
      res
        .status(200)
        .json({ message: "Not a valid Phone Number or Email", data: null });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/updatePassword", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.findOneAndUpdate({ hashedPassword });
    const ans = await UserModel.findOne({ email: result.email });
    res.status(200).json({
      status: 200,
      message: "Password updated successfully!!",
      data: ans,
    });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

export default router;
