const e = require("cors");
const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
      image1,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already ten da co san",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        countInStock: Number(countInStock),
        price,
        rating,
        description,
        discount: Number(discount),
        image1,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined cap nhat loii 2",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The productid ko co de ma xoa",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "ERR",
          message: "The product khong co id",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  // console.log("sort", sort);
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      // console.log("filter", filter);
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          // co tatalapge trang moi trang 1 san pham
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        console.log("okok");
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log("objectSort", objectSort);
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          // co tatalapge trang moi trang 1 san pham
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      let allProduct = [];
      // if (filter) {
      //   const label = filter[0];
      //   const allObjectFilter = await Product.find({
      //     [label]: { $regex: filter[1] },
      //   })
      //     .limit(limit)
      //     .skip(page * limit)
      //     .sort({ createdAt: -1, updatedAt: -1 });
      //   resolve({
      //     status: "OK",
      //     message: "Success",
      //     data: allObjectFilter,
      //     total: totalProduct,
      //     pageCurrent: Number(page + 1),
      //     totalPage: Math.ceil(totalProduct / limit),
      //   });
      // }
      // if (sort) {
      //   const objectSort = {};
      //   objectSort[sort[1]] = sort[0];
      //   const allProductSort = await Product.find()
      //     .limit(limit)
      //     .skip(page * limit)
      //     .sort(objectSort)
      //     .sort({ createdAt: -1, updatedAt: -1 });
      //   resolve({
      //     status: "OK",
      //     message: "Success",
      //     data: allProductSort,
      //     total: totalProduct,
      //     pageCurrent: Number(page + 1),
      //     totalPage: Math.ceil(totalProduct / limit),
      //   });
      // }
      // if (!limit) {
      //   allProduct = await Product.find().sort({
      //     createdAt: -1,
      //     updatedAt: -1,
      //   });
      // } else {
      //   allProduct = await Product.find()
      //     .limit(limit)
      //     .skip(page * limit)
      //     .sort({ createdAt: -1, updatedAt: -1 });
      // }
      if (!limit) {
        allProduct = await Product.find();
      } else {
        allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit);
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        // co tatalapge trang moi trang 1 san pham
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
};
