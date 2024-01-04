async function createPostHandler(event) {
  event.preventDefault();
console.log('submit')

var title = document.querySelector("#post-title").value
var content = document.querySelector("#post-content").value
console.log(title, content)
fetch("/api/posts",{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "title": title,
	"content": content
  })
})
.then(res=> res.json())
.then(data=>{
  document.location.replace('/dashboard')
})
  // document.location.replace('/dashboard/new')
}


document.querySelector('#create-new-post').addEventListener('submit', createPostHandler);