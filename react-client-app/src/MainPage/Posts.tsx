import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Userfetch from '../fetchData/User';  
import '../CSS/main.css'

interface Users {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  bio: string;
  user_id: number;
}

interface Post {
  post_id: number;
  user: Users;
  message: string;
  comments: Comment[];
  likes: number;
  shares: number;
}

interface Comment {
  post_post_id: number;
  comments: string;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostMessage, setNewPostMessage] = useState<string>('');
  const [newComment, setNewComment] = useState<string>(''); 
  const [editCommentById, setEditCommentById] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>('');
  const [nextCommentId, setNextCommentId] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<Users | null>(null);
  const BASE_URL = 'http://localhost:8080/posts'

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const currentUserURL = Userfetch.loadLocal(); // Fetch the URL/ID from local
        if (currentUserURL) {
          const response = await axios.get(currentUserURL);
          console.log('Fetched current user:', response.data);
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.log('Error fetching current user:', error);
      }
    }

    
    async function fetchPosts() {
      try {
        // axios with credential true document :https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
        const response = await axios.get<Post[]>(BASE_URL, {withCredentials: true,  baseURL:BASE_URL});
        console.log('Fetched posts:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchCurrentUser();
    fetchPosts();
  }, []);

 
 // Handle new post
 async function handleNewPost() {
  if (!currentUser) {
    console.error('User not logged in');
    return;
  }
  console.log(`current user: ${currentUser.first_name} ${currentUser.last_name}`);

  try {
    const newPost = {
      user: currentUser,
      message: newPostMessage, 
      likes: 0,
      shares: 0,
      comments: [],
    };

    const response = await axios.post(`http://localhost:8080/users/posts/${currentUser.user_id}`, newPost);
    setPosts((prevPosts) => [...prevPosts, response.data]);
    setNewPostMessage('');
  } catch (error) {
    console.error('Error creating new post:', error);
  }
}

  async function handleLike(user_id: number, post_id: number) {
    try {
      await axios.put(`http://localhost:8080/posts/${post_id}/like`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === post_id ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }

  // Handle new comment
  async function handleComment(post_id: number){
    if (newComment.trim() === '') return;

  try {
    const response = await axios.post(`http://localhost:8080/posts/${post_id}/comment`, { post_post_id: post_id,comments: newComment });
    const newCommentData: Comment = response.data;
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post_id === post_id? { ...post, comments: [...post.comments, newCommentData] }: post
      )
    );
    setNewComment('');
  } catch (error) {
    console.error('Error commenting on post:', error);
  }
  };


 // Handle share
 async function handleShare(user_id: number, post_id: number) {
  try {
    const response =await axios.put(`http://localhost:8080/users/posts/${user_id}/${post_id}/share`);
    const shareCommentData: Comment = response.data;
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post_id === post_id ? { ...post, comments: [...post.comments, shareCommentData] , shares: post.shares + 1 }: post
      )
    );
  } catch (error) {
    console.error('Error sharing post:', error);
  }
 }


  // Handle edit comment
  function handleEditComment(id: number) {
    
  }

  // Save edited comment
  const handleSaveEditedComment = () => {
    
  };

  // Handle delete comment post
  function handleDeleteComment(post_id: number, post: Post) {
    
  }
// handle delete comment share
  function handleDeleteCommentshare(post_id: number, comment_id: number) {
    
  }

  return (
    <div className='poststuff'>
      <h1>Create a Post</h1>
      <textarea
        value={newPostMessage}
        onChange={(e) => setNewPostMessage(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleNewPost}>Post</button>

      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.post_id} className="post">
            <h2>{post.user.username}'s Post</h2>
            <h4>{post.message}</h4>
            <div className="post-actions">
              <span>Likes: {post.likes}</span>
              
                <button className="button" onClick={() => handleLike(post.user.user_id, post.post_id)}>Like({post.likes})</button>
              </div>
              <button className="button" onClick={() => handleShare(post.user.user_id, post.post_id)}>Share({post.shares})</button>
            
            {editCommentById === null ? (
              <>
              <p>{newComment}</p> {/* place holder for comments */}
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={2}
                  cols={40}
                />
                <button onClick={() => handleComment(post.post_id)}>Post Comment</button>
                <button className="button" onClick={() => handleDeleteComment(post.post_id, post)}>Delete</button>
              </>
            ) : (
              <>
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  placeholder="Edit comment..."
                  rows={2}
                  cols={40}
                />
                <button onClick={handleSaveEditedComment}>Save changes</button>
              </>
            )}

          <div>
            
            {post.comments.map((comment) => (
              <div key={comment.post_post_id} className="comment-box">
                {comment.comments}
                <br />
                <span>Likes: {post.message}</span>
                <button className="button" onClick={() => handleEditComment(comment.post_post_id)}>Edit</button>
                <button className="button" onClick={() => handleDeleteCommentshare(post.post_id, comment.post_post_id)}>Delete</button>
              </div>
            ))}
          </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default Posts;