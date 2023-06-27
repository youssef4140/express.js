export const bodyschema = 
    {
        "name": "string",
        "price": "number",
        "category_id": "number"
    };

export const validateProduct=(req,res,categories)=>{
        const {name,price,categoryId} = req.body
        const catExists = categories.some(c => c.categoryId === parseInt(categoryId))
        const validatename = (typeof name === "string" && name.length > 2)
        const validateprice = (typeof price === "number")
        return (catExists && validatename && validateprice)
    
        
    }
