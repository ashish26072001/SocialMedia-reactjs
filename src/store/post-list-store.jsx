import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
   postList: [],
   addPost: () => { },
   fetching: false,
   deletePost: () => { },
});
const postListReducer = (currPostList, action) => {
   let newPostList = currPostList;
   if (action.type === "DELETE_POST") {
      newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
   } else if (action.type === "ADD_INITIAL_POSTS") {
      newPostList = action.payload.posts;
   }
   else if (action.type === "ADD_POST") {
      newPostList = [action.payload, ...currPostList];
   }
   return newPostList;

};
const PostListProvider = ({ children }) => {

   const [postList, dispatchPostList] = useReducer(postListReducer, []);
   const [fetching, setFetching] = useState(false);
   const addPost = (userId, postTitle,
      postBody, reactions, tags) => {
      dispatchPostList({
         type: "ADD_POST", payload: {
            id: Date.now(),
            title: postTitle,
            body: postBody,
            reactions: {likes:reactions},
            userId: userId,
            tags: tags,
         },

      });

   };

   const addinitialPosts = (posts) => {
      dispatchPostList({
         type: "ADD_INITIAL_POSTS", payload: {
            posts,
         },
      });
   };
   const deletePost = (postId) => {
      dispatchPostList({ type: "DELETE_POST", payload: { postId, }, });
   };

   useEffect(() => {
      try{
      setFetching(true);
      const controller = new AbortController();
      const signal = controller.signal;

      fetch("https://dummyjson.com/posts", { signal })
         .then((res) => res.json())
         .then((data) => {
            addinitialPosts(data.posts);
            setFetching(false);
         });
      }catch(error){

      return () => {
         console.log("Cleaning up UseEffect.");
         controller.abort();
      };  }
   }, []);




   return (<PostList.Provider value={{ postList, addPost, fetching, deletePost }}>{children}</PostList.Provider>);


};



export default PostListProvider;