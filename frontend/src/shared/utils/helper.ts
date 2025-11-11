import slugify from "slugify"
import moment from "moment"

export const generateSlugify = (title:string) => {
    return slugify(title,{
        lower:true,
        strict:true,
        trim:true,
    })
}


export const formatDate = (date:Date):string=> {
    return moment(date).format("DD/MM/YYYY")
}