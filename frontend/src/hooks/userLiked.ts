export const userLiked = (posts:any,id:Number) => {
    const liked_posts = posts.filter((post:any) => post.likes.find((postLike:Number) => postLike === id))

    return liked_posts
}