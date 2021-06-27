<template>
  <div>
    <form class="md-layout" @submit.prevent="validateExpense">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Income</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <md-field>
              <label for="name">Name</label>
              <md-input name="name" id="name" v-model="form.name" />
            </md-field>

            <md-field :class="getValidationClass('lastName')">
              <label for="amount">Amount</label>
              <md-input name="amount" id="amount" v-model="form.amount" />
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Confirm new income</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="incomeSaved">The income was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  decimal,
  minLength,
} from 'vuelidate/lib/validators'
import axios from 'axios';
export default {
  name: 'AddExpense',
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      amount: null,
    },
    incomeSaved: false,
    sending: false,
    timestamp: null
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      amount: {
        required,
        decimal
      },
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.name = null
      this.form.amount = null
    },
    saveExpense () {
      this.sending = true
      this.getNow()
      axios({
        method: 'post',
        url: '/api/incomes',
        data: {
          name: this.form.name,
          amount: String(parseInt(this.form.amount * 100)),
          date: this.timestamp
        }
      }).then((response) => {
        console.log(response);
        this.incomeSaved = true
        this.sending = false
        this.clearForm()
      }, (error) => {
        console.log(error);
      });
    },
    validateExpense () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveExpense()
      }
    },
    getNow: function() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.timestamp = date;
    }
  }
}
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
form{
  margin: 10px;
}
</style>