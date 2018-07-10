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
