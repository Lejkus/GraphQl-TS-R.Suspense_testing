import { fetchData } from "./fetchData";
import { Post } from "../interfaces/@types";

export function addLike(postID: number, posts: Array<Post>, user: Number) {
  fetchData(`mutation{addLike(userId:${user},postId:${postID}){
      id,likes
    }}`);

  const objIndex = posts.findIndex((post: Post) => post.id == postID);
  posts[objIndex].likes.push(user);
  return posts;
}

export function deleteLike(postID: number, posts: Array<Post>, user: Number) {
  fetchData(`mutation{deleteLike(userId:${user},postId:${postID}){id,likes}}`);

  const postIndex = posts.findIndex((post) => post.id == postID);
  const likeIndex = posts[postIndex].likes.findIndex((like) => like == user);
  posts[postIndex].likes.splice(likeIndex, 1);

  return posts;
}
