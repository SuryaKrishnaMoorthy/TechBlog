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
