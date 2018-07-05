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
