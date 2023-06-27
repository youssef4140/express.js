export const bodyschema = 
    {
        "email": "must be a valid email",
        "password": "must be 8 characters with at least 1 capital and 1 small and 1 special character",
        "passwordrepeat": "must equal password"
    };

export const validateProduct=(req,res,categories)=>{
        const {name,price,categoryId} = req.body
        const catExists = categories.some(c => c.categoryId === parseInt(categoryId))
        const validatename = (typeof name === "string" && name.length > 2)
        const validateprice = (typeof price === "number")
        return (catExists && validatename && validateprice)
    
        
    }
