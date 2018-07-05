const baseURL = `https://tech-blog-api.herokuapp.com/blog`;

// API calls using axios
const getPosts = () => axios.get(`${baseURL}/all`);
const getPost = (blog_post_id) => axios.get(`${baseURL}/${blog_post_id}`);
const createPost = (body) => axios.post(`${baseURL}`, body);
const updatePost = (blog_post_id, body) => axios.put(`${baseURL}/${blog_post_id}`, body);
const deletePost = (blog_post_id) => axios.delete(`${baseURL}/${blog_post_id}`);

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}
