import React, { useState } from 'react'

interface Comment {
  id: number;
  body: string;
  like: number;
}

function CommentBox() {
  //declare the state varaibles here so they can be rendered on the page
  const [comments, setComments] = useState<Comment[]>([]); //holds list of new comments on the page
  const [newComment, setNewComment] = useState<string>(''); //to hold new comment
  
  //to edit which comment and with new text
  const [editCommentById, setEditCommentById] = useState<number | null>(null);
  const [editCommentText, setCommentText] = useState<string>('');

  //manage unique IDs for new comments
  const [nextId, setNextId] = useState<number>(1);

  //handles changes in comment text area
  const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value)
  }

  //adds comment to the list
  const addCommentHandler = () => {
    if(newComment.trim() === '') return; //prevent empty comments
    const newCommentObj: Comment = {
      id: nextId, //use current ID
      body: newComment,
      like: 0
    };
    setComments([...comments, newCommentObj]); //adds comments to the list
    setNewComment(''); //clear the new comment text area
    setNextId(nextId + 1); //increment id for the next comment
  };

  //delete comment by id
  const deleteCommentHandler = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  }

  //handles the likes on the comment
  const likeCommentHandler = (id: number) => {
    setComments(comments.map(comment =>
      comment.id === id? {...comment, like: comment.like + 1} : comment
    ))
  }

  //handles comment editing
  const editHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value)
  }

  //prepares comment for editing
  const editCommentHandler = (id: number) => {
    const comment = comments.find(c => c.id === id)
    if (comment) {
      setEditCommentById(id) //set the comment Id to be edited
      setCommentText(comment.body) //poppulate the text area with comments current text
    }
  }

  //saves edited comment
  const saveEditedCommentHandler = () => {
    if(editCommentById !== null) {
      setComments(comments.map(comment => 
        comment.id === editCommentById ? {...comment, body: editCommentText} : comment
      ))
      setEditCommentById(null) //clear the edit ID
      setCommentText('') //clear the edit text area
    }
  }

  //create a new comment with the same body text as the shared comment
  const shareCommentHandler = (body: string) => {
    const newCommentObj: Comment = {
      id: nextId,
      body,
      like: 0,
    }
    setComments([...comments, newCommentObj])
    setNextId(nextId + 1)
  }
  
  return (
    <div className='comment-container'>
      <h2>Comments</h2>
      <textarea className='textarea'
        value={newComment}
        onChange={inputChangeHandler}
        placeholder='Add a comment...'
      />
      <br/>
      <button className='button' onClick={addCommentHandler}>Post</button>

      {editCommentById !== null && (
        <div>
          <textarea className='textarea-edit'
            value={editCommentText}
            onChange={editHandler}
            placeholder='Edit comment...'
          />
          <br/>
          <button className='button' onClick={saveEditedCommentHandler}>Save changes</button>
        </div>
        
      )}

      <div className='comments'>
        {comments.map(comment => (
          <div className='comment-box' key={comment.id}>
            {comment.body}
            <br/>
            <button className="button" onClick={() => likeCommentHandler(comment.id)}>Like({comment.like})</button>
            <button className="button" onClick={() => editCommentHandler(comment.id)}>Edit</button>
            <button className="button" onClick={() => shareCommentHandler(comment.body)}>Share</button>
            <button className="button" onClick={() => deleteCommentHandler(comment.id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CommentBox