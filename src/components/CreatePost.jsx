import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";
    addPost(userId, postTitle,
      postBody, reactions, tags)
    /*
        fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions:reactions ,
        userId:userId,
        tags:tags, 
        
        
      }),
    })
    .then((res) => res.json())
    .then((post)=>{addPost(post)});
    
    */

  };

  return (<form className="create-post" onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="userId" className="form-label"> Enter Your User Id here</label>
      <input type="text" className="form-control" id="userId" aria-describedby="emailHelp" placeholder=" UserId" ref={userIdElement} />
    </div>
    <div className="mb-3">
      <label htmlFor="title" className="form-label"> Post Title</label>
      <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="How are you feeling today..." ref={postTitleElement} />
    </div>
    <div className="mb-3">
      <label htmlFor="body" className="form-label"> Post Content</label>
      <textarea rows="4" type="text" className="form-control" id="body" aria-describedby="emailHelp" placeholder="Tell us more about it..." ref={postBodyElement} />
    </div>
    <div className="mb-3">
      <label htmlFor="reactions" className="form-label"> Number of reactions</label>
      <input type="text" className="form-control" id="reactions" aria-describedby="emailHelp" placeholder="How many people reacted to this post" ref={reactionsElement} />
    </div>
    <div className="mb-3">
      <label htmlFor="tags" className="form-label"> Enter Your hashtags here</label>
      <input type="text" className="form-control" id="tags" aria-describedby="emailHelp" placeholder="Please enter tags using space" ref={tagsElement} />
    </div>
    <button type="submit" className="btn btn-primary">Post</button>

  </form>
  );
};
export default CreatePost;
