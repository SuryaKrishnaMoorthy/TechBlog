(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const home = require('./render/home');
const createPost = require("./render/createPost");

document.addEventListener('DOMContentLoaded', function() {
   home();
   createPost.createForm();
});

},{"./render/createPost":2,"./render/home":5}],2:[function(require,module,exports){
const inputForm = require("../templates/inputForm");
const displayArticle = require("../templates/article");
const request = require("../requests/requests");
const sideBar = require("./sideBarRender");
const deleteArticle = require("./delete");
const editArticle = require("./edit");

// Function to submit create form
const submitForm = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Hides alert message
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "none";
    alertMessage.innerHTML = "";

    // Acquire the user input of title and content
    const title = document.querySelector(".title").value;
    const content = document.querySelector(".content").value;
    const body = {
      title,
      content
    };

    // Axios response for the post request
    request.createPost(body)
      .then(result => {

        // Append the new post to sidebar.
        const id = result.data.blogPost.id;
        sideBar.appendItem(id, title);

        // Show the new element as selected in sidebar. Remove and add active class
        const div = document.querySelector(".list-group");
        const activeANode = Array.from(div.childNodes).filter((aTag, index, array) => index !== 0 && aTag.classList && aTag.classList.contains("active"));
        Array.from(activeANode)[0].classList.remove("active");
        div.firstChild.classList.add("active");

        // Display the created post. Enable the edit and delete button
        displayArticle(title, content);
        deleteArticle(id, div.firstChild);
        editArticle(id, title, content, div.firstChild);
      })
      .catch(err => {

        // Display error message
        const alertMessage = document.querySelector(".alert-message");
        const p = document.createElement("p");
        p.textContent = JSON.stringify(err.response.data.error.message);
        alertMessage.append(p);
        alertMessage.style.display = "block";
      })
  });
};

// Display input form
const createForm = () => {
  const createButton = document.querySelector(".create-button");
  createButton.addEventListener("click", (e) => {

    // Remove the alert message if it exists
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "none";
    alertMessage.innerHTML = "";

    // Display input form and call submit function
    const formDiv = document.querySelector(".blog-post .row .col");
    const currentDOM = formDiv.innerHTML;
    formDiv.innerHTML = inputForm();
    const cancelButton = document.querySelector(".form-cancel-button");
    cancelButton.addEventListener("click", (event) => {
      formDiv.innerHTML = currentDOM;
      const showEditDelete = document.querySelector(".edit-delete");
      showEditDelete.style.display = "inline-block";
      showEditDelete.style.float = "right";
    });
    const hideEditDelete = document.querySelector(".edit-delete");
    hideEditDelete.style = "display:none;";
    submitForm();
  });
};

module.exports = {
  createForm,
  submitForm
};

},{"../requests/requests":7,"../templates/article":8,"../templates/inputForm":10,"./delete":3,"./edit":4,"./sideBarRender":6}],3:[function(require,module,exports){
const displayArticle = require("../templates/article");
const requests = require("../requests/requests");
//const editArticle = require("./edit");

// Function to delete post
const deleteForm = (id, sideBarItem) => {
  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", () => {

    // Remove the alert message if it exists
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "none";
    alertMessage.innerHTML = "";
    deleteFromServer(id, sideBarItem);
  })
}

const deleteFromServer = (id, sideBarItem) => {

  // Axios request to delete post
  requests.deletePost(id)
    .then(result => {
      location.reload();
    })
    .catch((err) => {

      // Display error message
      const alertMessage = document.querySelector(".alert-message");
      const p = document.createElement("p");
      p.textContent = JSON.stringify(err.response.data.error.message);
      alertMessage.append(p);
      alertMessage.style.display = "block";
    })
}

module.exports = deleteForm;

},{"../requests/requests":7,"../templates/article":8}],4:[function(require,module,exports){
const inputForm = require("../templates/inputForm");
const displayArticle = require("../templates/article");
const requests = require("../requests/requests");
const deletePost = require("./delete");

// Submit update form to server
const updatePost = (id, sideBarItem) => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Remove the alert message
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "none";
    alertMessage.innerHTML = "";

    const title = document.querySelector(".title").value;
    const content = document.querySelector(".content").value;
    const body = {
      title,
      content
    };

    // Axios request for put
    requests.updatePost(id, body)
      .then(result => {
        sideBarItem.textContent = title;
      })
      .catch((err) => {

        // Display error message
        const alertMessage = document.querySelector(".alert-message");
        const p = document.createElement("p");
        p.textContent = JSON.stringify(err.response.data.error.message);
        alertMessage.append(p);
        alertMessage.style.display = "block";
      })

    // Display post after submission
    const formDiv = document.querySelector(".blog-post .row .col");
    displayArticle(title, content);
    editArticle(id, title, content, sideBarItem);
    deletePost(id, sideBarItem);
  });
};

// Display input form with corresponding title and contents
const editArticle = (id, title, content, sideBarItem) => {
  const editButton = document.querySelector(".edit");
  editButton.addEventListener("click", () => {

    // Remove the alert message if it exists
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "none";
    alertMessage.innerHTML = "";

    // Display input form with corresponding title and contents
    const formDiv = document.querySelector(".blog-post .row .col");
    const currentDOM = formDiv.innerHTML;
    formDiv.innerHTML = inputForm();
    const cancelButton = document.querySelector(".form-cancel-button");
    cancelButton.addEventListener("click", (event) => {
      formDiv.innerHTML = currentDOM;
      const showEditDelete = document.querySelector(".edit-delete");
      showEditDelete.style.display = "inline-block";
      showEditDelete.style.float = "right";
    });
    const titleNode = document.querySelector(".title");
    const contentNode = document.querySelector(".content");
    const createButtonNode = document.querySelector(".form-create-button");
    titleNode.value = title;
    contentNode.textContent = content;
    createButtonNode.textContent = "Update Post";
    updatePost(id, sideBarItem);
    const hideEditDelete = document.querySelector(".edit-delete");
    hideEditDelete.style = "display:none;";
  })
}

module.exports = editArticle;

},{"../requests/requests":7,"../templates/article":8,"../templates/inputForm":10,"./delete":3}],5:[function(require,module,exports){
const displayArticle = require("../templates/article");
const request = require("../requests/requests");
const sideBar = require("./sideBarRender");

// Function to display first post when the page loads
const renderFirstPost = (data, sideBarItem) => {
  request.getPost(data)
  .then(data => {

    // Display post and enable edit and delete button
    displayArticle(data.data.blogPost.title, data.data.blogPost.content);
    sideBar.editArticle(data.data.blogPost.id, data.data.blogPost.title, data.data.blogPost.content, sideBarItem);
    sideBar.deletePost(data.data.blogPost.id, sideBarItem);
  })
  .catch((err) => {

    // Display error message
    const alertMessage = document.querySelector(".alert-message");
    const p = document.createElement("p");
    p.textContent = JSON.stringify(err.response.data.error.message);
    alertMessage.append(p);
    alertMessage.style.display = "block";
  })
}

// Display side bar when the page loads from server
const displayTitles = () => {

  // Axios request for get all posts.
  request.getPosts()
    .then(data => {

      // Append all sidebar items
      const posts =  data.data.blogPosts;
      posts.map(post => {
        sideBar.appendItem(post.id, post.title);
      })

      // Display first post as active and corresponding article on post body
      const ul = document.querySelector(".list-group");
      if(ul.childNodes) ul.childNodes[0].classList.add("active");
      sideBar.displayArticle();
      renderFirstPost(posts[posts.length-1].id, ul.childNodes[0]);
    })
    .catch((err) => {

      // Display error message
      const alertMessage = document.querySelector(".alert-message");
      const p = document.createElement("p");
      p.textContent = JSON.stringify(err.error.message);
      alertMessage.append(p);
      alertMessage.style.display = "block";
    })
}

module.exports = displayTitles;

},{"../requests/requests":7,"../templates/article":8,"./sideBarRender":6}],6:[function(require,module,exports){
const sideBarItem = require("../templates/sideBarItem");
const article = require("../templates/article");
const request = require("../requests/requests");
const editArticle = require("./edit");
const deletePost = require("./delete");

// Function to append each post to sidebar
const sideBarDiv = document.querySelector(".list-group");
const appendItem = (id, title) => {
  const sideBaritem = sideBarItem(id, title);
  sideBarDiv.insertBefore(sideBaritem, sideBarDiv.childNodes[0]);
  clickEvent(sideBaritem);
}

// Display title and content of post when side bar post is clicked
const displayArticle = () => {
  const sideBarItems = Array.from(document.querySelectorAll(".list-group a"));
  sideBarItems.forEach(sideBaritem => clickEvent(sideBaritem));
};

const clickEvent = (sideBaritem) => {
  sideBaritem.addEventListener("click", () => {
    // Remove the alert message if it exists
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "none";
    alertMessage.innerHTML = "";

    // Axios get one request
    const id = sideBaritem.getAttribute("data_id");
    request.getPost(id)
      .then(post => {

        // Display corresponding article
        const postExact = post.data.blogPost;
        article(postExact.title, postExact.content);

        // Displays form when user clicks the sidebar and then edit button
        editArticle(postExact.id, postExact.title, postExact.content, sideBaritem);

        // Enable deleteButton by fn call;
        deletePost(postExact.id, sideBaritem);
      })
      .catch(err => {

        // Display error message
        const alertMessage = document.querySelector(".alert-message");
        const p = document.createElement("p");
        p.textContent = JSON.stringify(err.response.data.error.message);
        alertMessage.append(p);
        alertMessage.style.display = "block";
      })
  });
};

module.exports = {
  appendItem,
  displayArticle,
  editArticle,
  deletePost
};

},{"../requests/requests":7,"../templates/article":8,"../templates/sideBarItem":11,"./delete":3,"./edit":4}],7:[function(require,module,exports){
const baseURL = `https://tech-blog-api.herokuapp.com/blog`;

// API calls using axios
const getPosts = () => axios.get(`${baseURL}/all`);
const getPost = (blog_post_id) => axios.get(`${baseURL}/${blog_post_id}`);
const createPost = (body) => axios.post(`${baseURL}`, body);
const updatePost = (blog_post_id, body) => axios.put(`${baseURL}/${blog_post_id}`, body);
const deletePost = (blog_post_id) => axios.delete(`${baseURL}/${blog_post_id}`);

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}

},{}],8:[function(require,module,exports){
// Template for post title, content, edit and delete buttons
const editAndDelete = require("./editAndDelete");

// Template for post content
const displayPost = (title, content) => {

  // Create title for post content
  const postTitle = document.createElement("h3");
  postTitle.classList.add("blog-title");
  postTitle.textContent = title;
  const hr = document.createElement("hr");

  // Create body of post content
  const postContent = document.createElement("p")
  postContent.classList.add("blog-content");
  postContent.textContent = content;

  // Remove any child of post content (form, existing article etc)
  const postSection = document.querySelector(".blog-post .row .col");
  if (postSection.hasChildNodes()) {
    postSection.innerHTML = "";
  }

  // Append title and body of post to section
  postSection.append(postTitle);
  postSection.append(hr);
  postSection.append(postContent);

  // Display edit and delete buttons after the article
  editAndDelete();
}

module.exports = displayPost;

},{"./editAndDelete":9}],9:[function(require,module,exports){
// Template for edit and delete buttons
const editAndDelete = () => {

  // Remove childnodes of edit section
  const editButtonSection = document.querySelector(".edit-delete .row .col");
  if (editButtonSection.hasChildNodes()) {
    editButtonSection.innerHTML = "";
  }

  // Template for edit button as 'a' tag and append
  const edit = document.createElement("a");
  edit.setAttribute("href", "#");
  edit.classList.add("edit");
  edit.textContent = "Edit\t";
  editButtonSection.append(edit);

  // Template for delete button as 'a' tag and append
  const deleteButton = document.createElement("a");
  deleteButton.setAttribute("href", "#");
  deleteButton.classList.add("delete", "text-danger", "ml-3");
  deleteButton.textContent = "Delete";
  editButtonSection.append(deleteButton);

  // Show the edit and delete button
  const showEditDelete = document.querySelector(".edit-delete");
  showEditDelete.style.display = "inline-block";
  showEditDelete.style.float = "right";
}

module.exports = editAndDelete;

},{}],10:[function(require,module,exports){
// Template of form to fill in the post title and content.
const inputForm = () => {
  return `<form>
  <div class="form-group">
    <label for="title-input">Title</label>
    <input type="text" class="form-control title" id="title-input" placeholder="Title goes here..">
  </div>
  <div class="form-group">
    <label for="content-input">Content</label>
    <textarea class="form-control content" id="content-input" aria-label="With textarea" placeholder="Content here.."></textarea>
  </div>
  <button type="submit" class="form-create-button btn btn-primary mb-2">Create New Post</button>
  <button type="button" class="form-cancel-button btn btn-primary mb-2">Cancel</button>
</form>`
}

module.exports = inputForm;

},{}],11:[function(require,module,exports){
// Template for single sidebar item
const sideBarItem = (id, title) => {
  const a = document.createElement("a");
  a.classList.add("list-group-item");
  a.setAttribute("data_id", id);
  a.setAttribute("data-toggle", "list");
  a.setAttribute("href","#");
  a.textContent = title;
  return a;
}

module.exports = sideBarItem;

},{}]},{},[1]);
