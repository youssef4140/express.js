import express from 'express'
import { registeration , login, getpro, getcat, authenticateToken , addCategory, updateCategory, DELETEcat,DELETEpro, addProduct, updateProduct} from './controllers/indexcontroller.js'
import { users, products, categories } from './models/model.js'



const app = express()

app.use(express.json())


app.post('/register',(req,res)=> registeration(req,res,users))

app.post('/login',(req,res)=>login(req,res,users))

app.get('/products', authenticateToken, (req,res)=>getpro(req,res,products))

app.delete('/products', authenticateToken, (req,res)=>DELETEpro(req,res,products))

app.post('/products', authenticateToken,(req,res)=>addProduct(req,res,products, categories))

app.put('/products', authenticateToken,(req,res)=>updateProduct(req,res,products, categories))



app.post('/category', authenticateToken,(req,res)=>addCategory(req,res,categories))

app.put('/category', authenticateToken,(req,res)=>updateCategory(req,res,categories))

app.get('/category', authenticateToken, (req,res)=>getcat(req,res,categories))

app.delete('/category', authenticateToken, (req,res)=>DELETEcat(req,res,categories))






app.listen(8080, ()=> console.log(users))