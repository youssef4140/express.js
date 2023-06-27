import { bodyschema, validateProduct } from "../services.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const registeration = (req,res,users)=>{
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const {email, password, passwordrepeat} = req.body
    const newuser = {email: email , password: password}
    
    if (emailRegex.test(email) && passwordRegex.test(password) && passwordrepeat === password ){
        if (users.some(user => user.email === email)){
            res.send("email already exists");
        }else {
            users.push(newuser)
            res.send("user added successfully")
            console.log(users)
        }
    }else{
        res.send(bodyschema)
    }
}

export const login = (req,res,users)=>{
    const {email, password} = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) res.status(401).json({status: "error", message:"Unauthenticated"})

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({...user, token});
}

export const authenticateToken=(req,res,next)=> {
    try{ 
        const token = req.headers.authorization?.split(" ")[1]
        if(token == null) return res.sendStatus(401)

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error){
        return res.status(401).json({status: "error", message:"Unauthenticated"})
    }

}


export const get = (req, res,products)=>{
    const productId = req.query.id 
    if (productId){
        const product = products.find(p => p.categoryId === parseInt(productId));
        if(product){
            res.send(product)
        } else {
            res.status(404).send('Product not found')
        }
    }else{
        res.send(products)
    }
}

export const addCategory=(req,res,categories)=>{
    const name = req.body.name
    if(name && (typeof name) === "string" && name.length > 2){
        let category = {name: name,categoryId: Date.now()}
        categories.push(category)
        res.send(category)
    }else{
        res.status(400).json({name: "string with at least 3 characters"})
    }
}

export const updateCategory = (req,res,categories)=>{
    const id = req.query.id
    const name =req.body.name
    if(id){
        const categoryToUpdate = categories.find(c=> c.categoryId === parseInt(id))
        if(categoryToUpdate){
            if(name && (typeof name) === "string" && name.length > 2){
            categoryToUpdate.name = name
            res.send(categoryToUpdate)
            } else {
                    res.status(400).json({name: "string with at least 3 characters"})
            }
        } else {
            res.status(404).json("category not found")
        }
    } else {
        res.status(400).send("insert an id")
    }
}

export const DELETEcat = (req,res,array)=>{
    const productId = req.query.id 
    if (productId){
        const product = array.find(el => el.categoryId === parseInt(productId));
        const index = array.indexOf(product)
        if(product){
            array.splice(index, 1);
            res.send(`Product with Id:${productId} has been deleted`)
        } else {
            res.status(404).send('Product not found')
        }
    }else{
        res.send("you need to specify a product Id")
}

}
export const DELETEpro = (req,res,array)=>{
    const productId = req.query.id 
    if (productId){
        const product = array.find(el => el.productId === parseInt(productId));
        const index = array.indexOf(product)
        if(product){
            array.splice(index, 1);
            res.send(`Product with Id:${productId} has been deleted`)
        } else {
            res.status(404).send('Product not found')
        }
    }else{
        res.send("you need to specify a product Id")
}

}


export const addProduct=(req,res,products,categories)=>{
    const validation = validateProduct(req,res,categories)
    const {name,price,categoryId} = req.body
    if(validation){
        const addedproduct = {name:name ,price:price ,categoryId: categoryId, productId: Date.now()}

        products.push(addedproduct)
        res.send(req.body)
    } else {
        res.status(404).json({name: "must be a string with at least 3 characters",
                            price: "must be a Number",
                            categoryId: "Must exist in categories"})
    }

}

export const updateProduct=(req,res,products,categories)=>{
    const id = req.query.id
    if (!validateProduct(req,res,categories)) res.status(404).json({name: "must be a string with at least 3 characters",
    price: "must be a Number",
    categoryId: "Must exist in categories"})

    const {name,price,categoryId} = req.body
    if(id){
        const productToUpdate = products.find(c=> c.productId === parseInt(id))
        if(productToUpdate){
            productToUpdate.name = name
            productToUpdate.price = price
            productToUpdate.categoryId = categoryId
            res.send(productToUpdate)
        } else {
            res.status(404).json("category not found")
        }
    } else {
        res.status(402).send("insert an id")
    }

}










