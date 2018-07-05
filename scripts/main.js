const home = require('./render/home');
const createPost = require("./render/createPost");

document.addEventListener('DOMContentLoaded', function() {
   home();
   createPost.createForm();
});
