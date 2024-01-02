async function commentFormHandler(event) {
    event.preventDefault();
  
    const commentTextElement = document.querySelector('textarea[name="comment-body"]');
    const commentText = commentTextElement.value.trim();
  
    const post_id = window.location.toString().split('/').pop();
  
    if (commentText) {
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ post_id, comment_text: commentText }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }
  
  const commentForm = document.querySelector('.comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', commentFormHandler);
  }