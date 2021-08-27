<template>
  <div class="form-wrapper" v-if="tagFormData" >
    <div>
      <h1>{{$t('tags_admin.tag_form_title')}}</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <label htmlFor="name">{{$t('name')}}</label>
          <input
            v-model="tagFormData.name"
            id="name"
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="priority">{{$t('tags_admin.priority')}}</label>
          <input
            v-model="tagFormData.priority"
            id="priority"
            type="number"
          />
        </div>
        <div v-if="error">{{error}}</div>
        <button type="button" @click="closeForm">{{$t('cancel')}}</button>
        <button type="submit">{{$t('submit')}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TagForm',
  props: { 
    tagFormData: {
      name: String,
      priority: Number
    },
    tagNames: Array
  },
  data() {
    return {
      error: ''
    }
  },
  methods: {
    onSubmit() {
      if (!this.tagFormData.name || !this.tagFormData.priority) {
        this.error = this.$t('forms.fill_the_fields')
        return
      }
      const tagData = {
        name: this.tagFormData.name,
        priority: this.tagFormData.priority,
      }
      if (this.tagFormData.id) {
        tagData.id = this.tagFormData.id
        axios.patch(`http://localhost:5000/tags/${this.tagFormData.id}`, tagData)
          .then(({data}) => {
            this.$emit('update-tag', data)
            this.closeForm()
          })
      } else {
        if (this.tagNames.includes(this.tagFormData.name)) {
          this.error = this.$t('forms.name_exists')
          return
        }
        axios.post("http://localhost:5000/tags", tagData)
          .then(({data}) => {
            this.$emit('add-tag', data)
            this.closeForm()
          })
      }
    },
    closeForm() {
      this.error = ''
      this.$emit('close-tag-form')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  border-radius: 4px;
  border: solid 1px black;
  min-height: 110px;
  color: black;
  width: 100%;
  resize: none;
  font-size: 15px;
}

.form-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 30px;
  overflow: hidden;
  font-size: 30px;
  background-color: white;
  padding: 10px;
}

.form-wrapper h1 {
  text-align: center;
}

.form-wrapper label {
  display: block;
}

.form-wrapper .input-invalid {
  background-color: red;
}

.form-wrapper input {
  display: block;
  box-shadow: 0 0 3px black;
  font-size: 50px;
  width: 100%;
}

.form-wrapper small {
  font-size: 25px;
  color: red;
}

.form-wrapper .request-message-loading {
  background-color: yellow;
  border-radius: 10px;
  text-align: center;
}

.form-wrapper .request-message-failed {
  background-color: red;
  border-radius: 10px;
  text-align: center;
}

.form-wrapper button {
  margin-top: 30px;
  font-size: 50px;
}

.form-wrapper button:last-child {
  float: right;
}

</style>
