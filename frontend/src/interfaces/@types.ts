export interface Post {
    id:Number,
    thema:String,
    content:String,
    likes:Number[],
    comments:Comment[],
    userId:Number
}

export interface User {
    id:Number,
    name:String,
    posts?:Post[],
}

export interface Comment {
    id:Number,
    userId:Number,
    postId:Number,
    content:String
}