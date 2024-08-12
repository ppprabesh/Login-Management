import { WebUser } from "../schema/model.js";

export const creatWebUserService = async (data) => {
  return await WebUser.create(data);
};

export const readAllWebUserService = async () => {
  return await WebUser.find({});
};

export const readSpecificWebUserService = async (id) => {
  return await WebUser.findById(id);
};

export const updateWebUserService = async (id, body) => {
  // console.log(await WebUser.findByIdAndUpdate(id, body, { new: true }));
  return await WebUser.findByIdAndUpdate(id, body, { new: true });
};

export const deleteWebUserService = async (id) => {
  return await WebUser.findByIdAndDelete(id);
};
export const loginWebUserService = async (email) => {
  return await WebUser.findOne({ email });
};
