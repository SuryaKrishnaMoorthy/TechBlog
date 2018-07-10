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
