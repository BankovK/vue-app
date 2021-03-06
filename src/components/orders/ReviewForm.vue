<template>
  <div class="form-wrapper" :class="{ hidden: !productId }">
    <div>
      <h1>{{$t('reviews.review_form_title')}}</h1>
      <b-form @submit.prevent="onSubmit">
        <b-icon v-for="value in [1,2,3,4,5]" :key="value" :icon="rating >= value ? 'star-fill' : 'star'" @click="setRating(value)"></b-icon>
        <b-form-group id="comment-group" :label="$t('reviews.comment')" label-for="comment">
          <b-form-textarea
            id="comment"
            v-model="comment"
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
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { BIcon } from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  name: 'ReviewForm',
  components: {
    BIcon
  },
  props: {
    productId: Number
  },
  data() {
    return {
      rating: 3,
      comment: null,
      error: ''
    }
  },
  methods: {
    ...mapActions([
      'setSnackbarMessage'
    ]),
    onSubmit() {
      const reviewData = {
        productId: this.productId,
        userId: this.$store.state.currentUser.id,
        userName: this.$store.state.currentUser.name,
        comment: this.comment,
        rating: this.rating,
      }
      axios.post("http://localhost:5000/reviews", {
        ...reviewData,
        creationTime: moment().toISOString()
      }).then(() => {
        this.setSnackbarMessage(this.$t('reviews.review_created'))
        this.$emit('close-review-form')
      })
    },
    setRating(value) {
      this.rating = value
    },
    closeForm() {
      this.$emit('close-review-form')
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
