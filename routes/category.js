const router = require("express").Router();
const Category = require("../models/Category");

// Create a category
router.post("/", async (req, res) => {
  let {name, sub} = req.body;

  let data = {userID: req.body.userID, name: '', sub: []};
  // validate category name
  if(name.trim()) {
    name = name.trim().toLocaleLowerCase();
    // check in db that category already exists or not
    const category = await Category.findOne({name});
    if(category) {
      return res.status(403).json('Category already exist');
    }
    data.name = name;
  } else {
    return res.status(403).json('Provide a valid category name');
  }
  // validate sub category
  sub.forEach((c) => {
    if(c.trim()) {
      data.sub.push(c.trim().toLocaleLowerCase());
    }
  });

  // return res.send(data);

  const category = new Category(data);
  try {
    const createdCategory = await category.save();
    return res.status(200).json(createdCategory);
  } catch (error) {
    return res.status(500).json("Unable to create category");
  }
});

// Delete a category
router.delete("/:category", async (req, res) => {
  try {
    const category = await Category.findOne({name: req.params.category});
    if(category) {
      await category.deleteOne({name: req.params.category});
      res.status(200).json('Successfully deleted the category');
    } else {
      res.status(404).json('Category not found');
    }
  } catch(error) {
    res.status(402).json("Unable to delete the category");
  }
})

// Get all categories
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    const cat_list = [];
    categories.forEach((category) => {
      cat_list.push(category.name);
    })
    return res.status(200).json(cat_list);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
});

// Get subcategories of a category
router.get("/:category", async (req, res) => {
  let {category} = req.params;
  category = category.toLocaleLowerCase();
  try {
    const item = await Category.findOne({name: category});
    if(item) {
      return res.status(200).json(item.sub);
    } else {
      return res.status(404).json("Category does not exist");
    }
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
});

module.exports = router;
