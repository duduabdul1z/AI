const router = require('express').Router();
const { MongoClient } = require('mongodb');MongoClient;


const todo = require('./todolist.json');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true});

let employeedb;
let todoCollection;

//this function connects to the mongodb
const mainConnect = async () => {  
    await client.connect(); 
    employeedb = client.db('employeedb');
    todoCollection = employeedb.collection('todo');

};
mainConnect();

const createMany = async (data) => {
    try{
        const result = await todoCollection.insertMany(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally {}
}

const createTodo = async (data) => {
    try{
        const result = await todoCollection.insertOne(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally{}
}

const getAll = async () => {
    try {
        const result = await todoCollection.find({}).toArray();
        return result;
    } catch (error) {
        console.log(error)
    }
    finally{}
}

const employees = [
    {
        employeeID: 0207104,
        name: "Josiah Gyamesi",
        position: "CEO"
    },
    {
        employeeID: 0207105,
        name: "Bright Kessoni",
        position: "Director"
    },
    {
    
        employeeID: 0207106,
        name: "Mohammed Konney",
        position: "Human resource"
    },
    {
        employeeID: 0207107,
        name: "Jeffery Atebi",
        position: "Cleaner"
    }
]

router.get('/', (req, res)=>{
    res.render('interface', {
        title:'home',
    })
});

router.get('/employeelist',  (req, res)=>{
    res.render('employee', {
        title:'Employees',
        employees
    })
    
});

router.get('/todolist', async (req, res)=>{
   const todolist = await getAll();
    res.render('todo',{
       todolist
   })
   
});
     
router.get('/createMany', async (req, res)=>{
    const todolist = await createMany(todo)
    res.redirect('/todolist')
 });
      
module.exports = router;