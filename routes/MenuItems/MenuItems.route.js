import express, { query } from "express";
import MenuItemsModel from "../../models/MenuItems/MenuItems.modal.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const items = await MenuItemsModel.find();
    let id = items[items.length - 1]?.menuId;

    if (id >= 0) {
      id++;
    } else {
      id = 0;
    }
    const data = new MenuItemsModel({
      ...req.body,
      menuId: id,
    });
    const ans = await data.save();
    res
      .status(200)
      .json({ status: 200, message: "Saved Successfully!!!", data: ans });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItemsModel.find();
    res.status(200).json({
      status: 200,
      message: "Items fetched successfully!!!",
      data: data,
    });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.patch("/", async (req, res) => {
  try {
    const data = await MenuItemsModel.findOneAndUpdate(
      { menuId: req.body.menuId },
      { $set: req.body },
      { new: true }
    );
    if (!data) {
      return res
        .status(404)
        .send({ message: `No document found with menuId: ${req.body.menuId}` });
    }
    res.status(200).json({
      status: 200,
      message: "Items updated successfully!!!",
      data: data,
    });
  } catch (e) {
    res.sendStatus(400).json({ message: e });
  }
});

router.delete("/:menuId", async (req, res) => {
  try {
    if (!req.params.menuId) {
      res.status(404).send({ message: `menuId is Required.` });
    } else {
      const data = await MenuItemsModel.findOneAndDelete({
        menuId: req.params.menuId,
      });
      if (!data) {
        return res.status(404).send({
          message: `No document found with menuId: ${req.params.menuId}`,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Menu Item deleted with the menuId:${req.params.menuId}`,
        data: data,
      });
    }
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

export default router;
