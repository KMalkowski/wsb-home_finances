<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Income sources</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Amount</md-table-head>
        <md-table-head>Date</md-table-head>
        <md-table-head>Delete</md-table-head>
      </md-table-row>

      <md-table-row v-for="income in incomes" :key="income['@id']" :id="'income-item'+income.id">
        <md-table-cell>{{income.name}}</md-table-cell>
        <md-table-cell>{{income.amount / 100}} $</md-table-cell>
        <md-table-cell>{{income.date.substring(0, 10)}}</md-table-cell>
        <md-table-cell>
          <md-button @click="deleteIncome(income.id)" class="md-icon-button md-accent">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>

    </md-table>
    <md-snackbar :md-active.sync="incomeDeleted">The income was deleted with success!</md-snackbar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'incomeList',
  data: () => ({
    incomes : [],
    incomeDeleted: false,
    deleteIncome(id) {
      axios({
        method: 'delete',
        url: '/api/incomes/' + id,
        data: {}
      }).then(() => {
        document.getElementById('income-item'+id).remove();
        this.incomeDeleted = true;
        setTimeout(() => this.incomeDeleted = false, 1500);
      }, (error) => {
        console.log(error);
      });
    }
  }),
  async mounted() {
    const response = await axios.get('/api/incomes');
    this.incomes = response.data['hydra:member'];
  }
}
</script>

<style lang="scss" scoped>
.md-table{
  margin:10px;
}
.page-container {
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, .12);
}

.md-button.red{
  color: #fff;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
}
</style>
