async function createPostHandler(event) {
  event.preventDefault();

  document.location.replace('/dashboard/new')

}

document.querySelector('#createbtn').addEventListener('click', createPostHandler);