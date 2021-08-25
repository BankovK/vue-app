<template>
  <div>
    <FAQList :questions="questions" @open-faq-form="openFAQForm" @delete-question="removeQuestion"/>
    <FAQForm :faqFormData="faqFormData" @close-faq-form="closeFAQForm" @add-question="addQuestion" @update-question="updateQuestion" />
    <button @click="openFAQForm()">Add</button>
  </div>
</template>

<script>
import FAQForm from '../components/faq/FAQForm.vue'
import FAQList from '../components/faq/FAQList.vue'
import axios from 'axios'

export default {
  name: 'FAQ',
  components: {
    FAQList,
    FAQForm
  },
  data() {
    return {
      faqFormData: null,
      questions: []
    }
  },
  methods: {
    openFAQForm(data) {
      if (!data) {
        this.faqFormData = {
          question: '',
          answer: ''
        }
        return
      }
      this.faqFormData = data
    },
    closeFAQForm() {
      this.faqFormData = null
    },
    addQuestion(question) {
      this.questions.push(question)
    },
    updateQuestion(question) {
      const allQuestions = [...this.questions]
      allQuestions[allQuestions.findIndex(_question => _question.id === question.id)] = question
      this.questions = allQuestions
    },
    removeQuestion(id) {
      this.questions = this.questions.filter(question => question.id !== id)
    }
  },
  created() {
    axios.get(`http://localhost:5000/questions`)
      .then(({data}) => {
        this.questions = data
      })
  },
}
</script>
