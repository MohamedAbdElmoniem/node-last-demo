const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" }
})

const CategorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category_name: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "company" }
})

const CompanySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    company_name: String
})


const EmployeeModel = new mongoose.model("employee", EmployeeSchema)
const CategoryModel = new mongoose.model("category", CategorySchema)
const CompanyModel = new mongoose.model("company", CompanySchema)

module.exports = {
    EmployeeModel,
    CategoryModel,
    CompanyModel
}