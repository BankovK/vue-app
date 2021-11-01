<template>
  <div class="form-wrapper" v-if="faqFormData" >
    <div>
      <h1>{{$t('faq.question_form')}}</h1>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="question-group" :label="$t('faq.question')" label-for="question">
          <b-form-input
            id="question"
            v-model="faqFormData.question"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="answer-group" :label="$t('faq.answer')" label-for="answer">
          <b-form-textarea
            id="answer"
            v-model="faqFormData.answer"
          ></b-form-textarea>
        </b-form-group>
        <div v-if="error">{{error}}</div>
        <b-button type="button" @click="closeForm">{{$t('cancel')}}</b-button>
        <b-button type="submit">{{$t('submit')}}</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'FAQForm',
  props: {
    faqFormData: {
      question: String,
      answer: String
    }
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    ...mapActions([
      'setSnackbarMessage'
    ]),
    onSubmit() {
      if (!this.faqFormData.question || !this.faqFormData.answer) {
        this.error = this.$t('forms.fill_the_fields')
        return
      }
      const questionData = {
        question: this.faqFormData.question,
        answer: this.faqFormData.answer
      }
      if (this.faqFormData.id) {
        questionData.id = this.faqFormData.id
        axios.patch(`http://localhost:5000/questions/${this.faqFormData.id}`, questionData)
          .then(({data}) => {
            this.setSnackbarMessage(this.$t('faq.faq_editted'))
            this.$emit('update-question', data)
            this.closeForm()
          })
      } else {
        questionData.creationTime = moment().toISOString()
        axios.post("http://localhost:5000/questions", questionData)
          .then(({data}) => {
            this.setSnackbarMessage(this.$t('faq.faq_added'))
            this.$emit('add-question', data)
            this.closeForm()
          })
      }
    },
    closeForm() {
      this.error = ''
      this.$emit('close-faq-form')
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
