export interface Address {
    street?:string;
    city?:string;
    zipCode?:string;
    country?:string;
}


export interface UserImage {
    url:string;
    public_id?:string;
}

export interface UserProfile {
    _id:string;
    name:string;
    email:string;
    phone:string;
    gender:"erkek" | "kadın";
    address?:Address;
    image?:UserImage;
    images?:UserImage[];
}