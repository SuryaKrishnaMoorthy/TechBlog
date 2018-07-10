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
