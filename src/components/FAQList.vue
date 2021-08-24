<template>
  <div class="page-wrapper">
    <div class="question-card" v-for="question in questions" :key="question.id">
      <h3>{{question.question}}</h3>
      <div>{{question.answer}}</div>
      <div v-if="isUserAdmin">
        <button type="button" @click="editQuestion(question)">Edit</button>
        <button type="button" @click="deleteQuestion(question)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FAQList',
  props: {
    questions: Array
  },
  methods: {
    editQuestion(question) {
      this.$emit('open-faq-form', question)
    },
    deleteQuestion(question) {
      console.log('here')
      axios.delete(`http://localhost:5000/questions/${question.id}`)
        .then(() => this.$emit('delete-question', question.id))
    },
  },
  computed: {
    isUserAdmin: function() {
      return this.$store.state.currentUser.role === 'ADMIN'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-wrapper {
  padding-top: 80px;
  font-size: 30px;
}
.question-card {
  width: 100%;
  border: 4px solid black;
  border-radius: 100px;
  margin: 10px;
  text-align: center;
  overflow: hidden;
}
</style>
