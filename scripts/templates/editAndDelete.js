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
