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
