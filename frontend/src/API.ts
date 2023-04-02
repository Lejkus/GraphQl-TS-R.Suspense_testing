import axios from "axios";

// #1 method from SinglePost.tsx
//export function fetchProfileData(postId: any) 

export function fetchProfileData() {
  let profilesPromise = fetchProfiles();
  let postsPromise = fetchPosts();
  // #1 method from SinglePost.tsx
  // let singlePostPromise = fetchSinglePost(postId);

  return {
    posts: wrapPromise(postsPromise),
    // #1 method from SinglePost.tsx
    //post: wrapPromise(singlePostPromise),
    profiles: wrapPromise(profilesPromise),
  };
}

function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

export const fetchPosts = async () => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/graphql/",
    headers: {
      "content-type": "application/json",
    },
    data: {
      query: `{posts{id,thema,content,likes,user{id,name},comments{id,content,user {name} }}}`,
    },
  };
  return await axios.request(options);
};

export const fetchProfiles = async () => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/graphql/",
    headers: {
      "content-type": "application/json",
    },
    data: {
      query: `{users{id,name,posts{id}}}`,
    },
  };
  return await axios.request(options);
};

// #1 method from SinglePost.tsx
// export const fetchSinglePost = async (postId: any) => {
//   if (!postId) {
//     return { data: { data: { post: { id: 0 } } } };
//   } else {
//     const options = {
//       method: "POST",
//       url: "http://localhost:5000/graphql/",
//       headers: {
//         "content-type": "application/json",
//       },
//       data: {
//         query: `{post(id:${postId}){id,content,likes,user{name}comments {id,content,user {name}},}}`,
//       },
//     };

//     return await axios.request(options);
//   }
// };
