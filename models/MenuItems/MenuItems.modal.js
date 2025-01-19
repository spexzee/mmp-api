import mongoose from "mongoose";

const menuItemsSchema = new mongoose.Schema(
  {
    menuId: {
      type: Number,
    },
    key: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      trim: true,
      required: true,
    },
    label: {
      type: String,
      trim: true,
      required: true,
    },
    path: {
      type: String,
      trim: true,
      required: true,
    },
    sequence: {
      type: Number,
      trim: true,
      required: true,
    },
    roleType: {
      type: String,
      trim: true,
      required: true,
    },
    subMenus: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const MenuItemsModal = mongoose.model("MenuItems", menuItemsSchema);

export default MenuItemsModal;
