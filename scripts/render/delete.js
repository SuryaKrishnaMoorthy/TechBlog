const displayArticle = require("../templates/article");
const requests = require("../requests/requests");

// Function to delete post
const deleteForm = (id, sideBarItem) => {
  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", () => {

    // Remove the alert message if it exists
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "none";
    alertMessage.innerHTML = "";

    // Axios request to delete post
    requests.deletePost(id)
      .then(result => {
        sideBarItem.style.display = "none";

        // Display first post
        const dataId = sideBarItem.parentNode.childNodes[1].getAttribute("data_id");
        requests.getPost(dataId).then(data => {
          displayArticle(data.data.blogPost.title, data.data.blogPost.content);
          sideBarItem.parentNode.childNodes[1].classList.add("active");
        })
      })
      .catch((err) => {

        // Display error message
        const alertMessage = document.querySelector(".alert-message");
        const p = document.createElement("p");
        p.textContent = JSON.stringify(err.response.data.error.message);
        alertMessage.append(p);
        alertMessage.style.display = "block";
      })
  })
}

module.exports = deleteForm;
