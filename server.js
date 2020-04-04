const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { CategoryModel, EmployeeModel, CompanyModel } = require("./models")


mongoose.connect("mongodb://localhost:27017/tset")
app.use(express.json())

app.post("/addcompany", async (req, resp) => {
    try {
        const { company_name } = req.body
        let newCompany = new CompanyModel({
            _id: mongoose.Types.ObjectId(),
            company_name
        })
        await newCompany.save()
        resp.json({ message: 'success' })
    } catch (error) {
        resp.json({ message: error })

    }
})

app.post("/addcategory", async (req, resp) => {
    try {
        const { category_name, company } = req.body
        let newCategory = new CategoryModel({
            _id: mongoose.Types.ObjectId(),
            category_name,
            company
        })
        await newCategory.save()
        resp.json({ message: 'success' })
    } catch (error) {
        resp.json({ message: error })

    }
})

app.post('/addemployee', async (req, resp) => {
    try {
        const { name, age, category } = req.body
        let newEmployee = new EmployeeModel({
            _id: mongoose.Types.ObjectId(),
            name, age, category
        })
        await newEmployee.save()
        resp.json({ message: 'success' })
    } catch (error) {
        resp.json({ message: error })

    }
})


app.get('/allemployees', async (req, resp) => {
    let employees = await EmployeeModel.find({}).populate({
        path: 'category', populate: {
            path: "company",
            model: "company"
        }
    })
    resp.json({ employees, message: 'success' })
})


app.get('/allcategories', async (req, resp) => {
    let categories = await CategoryModel.find({}).populate("company").lean()
    if (categories.length) {
        for (let i = 0; i < categories.length; i++) {
            let employees = await EmployeeModel.find({ category: categories[i]._id }).select("name age")
            categories[i].employees = employees
        }
        resp.json({ categories, message: 'success' })

    }
})

app.get('/', async (req, resp) => {
    resp.json({ message: 'running...' })
})


app.listen(8085)