// Template of form to fill in the post title and content.
const inputForm = () => {
  return `<form>
  <div class="form-group">
    <label for="title-input">Title</label>
    <input type="text" class="form-control title" id="title-input" placeholder="Title goes here..">
  </div>
  <div class="form-group">
    <label for="content-input">Content</label>
    <textarea class="form-control content" id="content-input" aria-label="With textarea" placeholder="Content here.."></textarea>
  </div>
  <button type="submit" class="form-create-button btn btn-primary mb-2">Create New Post</button>
  <button type="submit" class="form-cancel-button btn btn-primary mb-2">Cancel</button>
</form>`
}

module.exports = inputForm;
