const express = require('express');
const mongoConnect = require('./database').mongoConnect
const path = require('path')
const Course = require('./models/course')

const app = express();

app.use(express.urlencoded({extended : true}))

app.set("view engine","ejs")


app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname , 'views' , 'index.html'))
})

app.get('/add-course',(req,res) => {
    res.sendFile(path.join(__dirname , 'views' , 'add.html'))
})

app.get('/update-course',(req,res) => {
    res.sendFile(path.join(__dirname , 'views' , 'update.html'))
})


app.get('/delete-course',(req,res) => {
    res.sendFile(path.join(__dirname , 'views' , 'delete.html'))
})


app.get('/all-courses',(req,res) => {
    res.sendFile(path.join(__dirname , 'views' , 'add.html'))
})


app.get('/add-course',(req,res) => {
    res.sendFile(path.join(__dirname , 'views' , 'add.html'))
})

app.post('/new-course',(req,res) => {
    console.log(req.body)
    const course = new Course(req.body.id,req.body.name,req.body.desc,req.body.amount);

    course.save(() => {
        res.sendFile(path.join(__dirname , 'views' , 'index.html'))
    })
})

app.post('/update-course',(req,res) => {
    console.log(req.body)
    const id = req.body.id;
    Course.fetchOne(id,(course) => {
        console.log(course)

        const updatedCourse =  new Course(course._id,course.name,course.desciption,req.body.amount);

        updatedCourse.update(() => {
            res.sendFile(path.join(__dirname , 'views' , 'index.html'))

        })
    })
  
})


app.post('/delete-course',(req,res) => {
    const id = req.body.id;
    Course.deleteOne(id,() => {
        res.sendFile(path.join(__dirname , 'views' , 'index.html'))
    })
})

app.get("/fetchAllCourses",(req,res) => {
    Course.fetchAll((data) => {
        res.render(path.join(__dirname ,  'views' , 'all') , {courses : data})
    })
})


mongoConnect(() => {
    app.listen(3000,() => {
        console.log("app started")
    })
})


