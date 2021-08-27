<template>
  <div class="page-wrapper">
    <div class="question-card" v-for="question in questions" :key="question.id">
      <h3 class="question-card__question">
        {{question.question}}
        <span v-if="isUserAdmin" class="button-line">
          <button type="button" @click="editQuestion(question)">{{$t('edit')}}</button>
          <button type="button" @click="deleteQuestion(question)">{{$t('delete')}}</button>
        </span>
      </h3>
      <div>{{question.answer}}</div>
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
.question-card__question {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
