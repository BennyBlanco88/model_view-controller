async function signupFormHandler(event) {
    event.preventDefault();
  
    const usernameElement = document.querySelector('#username-signup');
    const passwordElement = document.querySelector('#password-signup');
  
    const username = usernameElement.value.trim();
    const password = passwordElement.value.trim();
  
    if (username && password) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }
  
  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }