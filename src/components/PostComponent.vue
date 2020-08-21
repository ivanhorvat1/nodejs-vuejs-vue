<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Say something...</label>
      <input
        type="text"
        class="form-control"
        id="create-post"
        v-model="$v.text.$model"
        placeholder="Create a post"
        :class="{ 'is-invalid': $v.text.$error, 'is-valid': !$v.text.$invalid }"
      />

      <div class="valid-feedback">Your text is valid</div>
      <div class="invalid-feedback">
        <span v-if="!$v.text.required">text is required</span>
        <span v-if="!$v.text.minLength">text must have atleast 3</span>
        <span v-if="!$v.text.maxLength">text must have atleast 10</span>
      </div>

      <button cursor="not-allowed" :disabled="$v.text.$invalid" @click="createPost" class="btn btn-primary mt-2">Post!</button>

      <!-- <pre>{{ $v }}</pre> -->
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        :item="post"
        :index="index"
        :key="post._id"
      >
        {{
          `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
        }}
        <p class="text">{{ post.text }}</p>
        <button class="delete btn btn-danger" @click="deletePost(post._id)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
    };
  },
  validations: {
    text: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid red;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid green;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

.delete {
  position: absolute;
  margin-left: 40%;
  margin-top: -8%;
}

button:disabled {
  cursor: not-allowed;
}  
</style>
