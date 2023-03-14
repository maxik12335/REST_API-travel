let idUpdateForm = null;

async function getPosts() {
  const res = await fetch("http://localhost/api/trips/list")
  const posts = await res.json()

  const postList = document.querySelector(".posts")
  postList.innerHTML = ""

  posts.forEach(post => {
    postList.innerHTML += `
      <div class="post">
        <h2 class="post__title">${post.title}</h2>
        <p class="post__description">${post.body}</p>
        <div class="links">
          <a href='#' class="post__link post-delete" id=${post.id}>delete</a>
          <a href='#' class="post__link post-update" data-value="${post.id}">update</a>
          <a href='product.html?id=${post.id}' class="post__link post-view">view</a>
        </div>
      </div>
    `
  })

  limitPostString()

  // delete post
  deletePost()

  // add data in update form
  addDataInUpdateForm()
  setListenersButtonsUpdatePost()
}

getPosts()


// ADD post ---------
    // open form add post
    const buttonAddPost = document.querySelector(".button-add-post")
    buttonAddPost.addEventListener('click', (event) => {
      document.querySelector(".section-form__add").style.display = "flex";
    })

    // close form add post
    const buttonCloseAddPost = document.querySelector(".close-form-add")
    buttonCloseAddPost.addEventListener('click', (event) => {
      document.querySelector(".section-form__add").style.display = "none";
    })

    const form = document.querySelector(".form")

    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      const title = document.querySelector("#title").value
      const body = document.querySelector("#body").value

      let formData = new FormData();
      formData.append('title', title)
      formData.append('body', body)

      const res = await fetch("http://localhost/api/trips/list", {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if(data.status === true) {
        await getPosts()
      }
      document.querySelector("#title").value = ""
      document.querySelector("#body").value = ""

      document.querySelector(".section-form__add").style.display = "none";
    })

// ADD post ---------

// UPDATE post ---------
    // open form UPDATE post
    let buttonUpdatePost = [];
    function setListenersButtonsUpdatePost() {
      buttonUpdatePost = document.querySelectorAll(".post-update")
      buttonUpdatePost.forEach(item => {
        item.addEventListener('click', async (event) => {
          document.querySelector(".section-form__edit").style.display = "flex";

          const id = event.target.dataset.value

          const res = await fetch(`http://localhost/api/trips/list/${id}`)
          const data = await res.json()

          document.querySelector("#title-edit").value = data.title
          document.querySelector("#body-edit").value = data.body
        })
      }) 
    }

    // close form UPDATE post
    const buttonCloseUpdatePost = document.querySelector(".close-form-edit")
    buttonCloseUpdatePost.addEventListener('click', (event) => {
      document.querySelector(".section-form__edit").style.display = "none";
    })


    const formUpdate = document.querySelector(".form-edit")

    formUpdate.addEventListener("submit", async (event) => {
      event.preventDefault()

      const title = document.querySelector("#title-edit").value
      const body = document.querySelector("#body-edit").value

      const data = {
        "title": title,
        "body": body,
      }

      const res = await fetch(`http://localhost/api/trips/list/${idUpdateForm}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })

      let resData = await res.json()

      if(resData.status === true) {
        await getPosts()
      }

      document.querySelector("#title-edit").value = ""
      document.querySelector("#body-edit").value = ""
      document.querySelector(".section-form__edit").style.display = "none";
    })

// UPDATE post ---------

// delete post
function deletePost() {
  const deletePost = document.querySelectorAll(".post-delete");
  deletePost.forEach(delPost => {
    delPost.addEventListener("click", async (event) => {
      const id = event.target.id

      const res = await fetch(`http://localhost/api/trips/list/${id}`, {
        method: "DELETE"
      })

      const data = await res.json()
      console.log(data)
      if(data.status === true) {
        getPosts()
      }
    })
  })
}

// add data in update form
function addDataInUpdateForm() {
  const updatePost = document.querySelectorAll(".post-update");
  updatePost.forEach(upPost => {
    upPost.addEventListener("click", async (event) => {
      const id = event.target.dataset.value

      const res = await fetch(`http://localhost/api/trips/list/${id}`)
      const data = await res.json()

      document.querySelector("#title-edit").value = data.title
      document.querySelector("#body-edit").value = data.body
      idUpdateForm = id
    })
  })
}

// лимит строк
function limitPostString() {
  const postTitles = document.querySelectorAll(".post__title")
  const postDescriptions = document.querySelectorAll(".post__description")

  postTitles.forEach((item, index) => {
    if(postTitles[index].textContent.length > 15) {
      postTitles[index].textContent = postTitles[index].textContent.slice(0, 15) + "..."
    }

    if(postDescriptions[index].textContent.length > 127) {
      postDescriptions[index].textContent = postDescriptions[index].textContent.slice(0, 127) + "..."
    }
  })
}
