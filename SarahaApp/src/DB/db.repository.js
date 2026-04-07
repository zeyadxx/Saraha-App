import { model } from "mongoose";

export const find = async ({
  model,
  filter = {},
  options = {},
  select = "",
}) => {
  const doc = model.find(filter).select(select);
  if (options?.populate) doc.populate(options.populate);
  if (options?.limit) doc.limit(options.limit);
  if (options?.skip) doc.skip(options.skip);
  if (options?.lean) doc.lean(options.lean);

  return await doc.exec();
};

export const findOne = async ({
  model,
  filter = {},
  options = {},
  select = "",
}) => {
  const doc = model.findOne(filter).select(select);
  if (options?.populate) doc.populate(options.populate);
  if (options?.lean) doc.lean(options.lean);

  return await doc.exec();
};

export const create = async ({ model, data, options = {} }) => {
  return await model.create([data], options);
};

export const insertMany = async ({ model, data, options = {} }) => {
  return await model.insertMany(data, options);
};

export const updateOne = async ({
  model,
  filter,
  update,
  options = { runValidators: true },
}) => {
  return await model.updateOne(
    filter,
    { ...update, $inc: { __v: 1 } },
    options,
  );
};

export const findById = async ({ id, model, select = "", options = {} }) => {
  const doc = model.findById(id).select(select);
  if (options?.populate) doc.populate(options.populate);
  if (options?.lean) doc.lean(options.lean);
  return await doc.exec();
};

export const findOneAndUpdate = async ({
  model,
  filter = {},
  update = {},
  options,
} = {}) => {
  return await model.findOneAndUpdate(
    filter,
    { ...update, $inc: { __v: 1 } },
    {
      runValidators: true,
      new: true,
      ...options,
    },
  );
};

export const deleteOne = async ({
  filter,
  model

}) => {
  return await model.deleteOne(filter || {});
}

export const deleteMany = async ({
  filter,
  model

}) => {
  return await model.deleteMany(filter || {});
}

export const findOneAndDelete = async ({
  filter,
  model

} = {}) => {
  return await model.findOneAndDelete(
    filter || {},
  );
}
