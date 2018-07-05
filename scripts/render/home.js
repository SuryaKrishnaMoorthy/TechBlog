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
      if(ul.childNodes[1]) ul.childNodes[1].classList.add("active");
      sideBar.displayArticle();
      renderFirstPost(posts[0].id, ul.childNodes[1]);
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
