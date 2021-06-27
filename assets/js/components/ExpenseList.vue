<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Expenses</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Amount</md-table-head>
        <md-table-head>Date</md-table-head>
        <md-table-head>Delete</md-table-head>
      </md-table-row>

      <md-table-row v-for="expense in expenses" :key="expense['@id']" :id="'expense-item'+expense.id">
        <md-table-cell>{{expense.name}}</md-table-cell>
        <md-table-cell>{{expense.amount / 100}} $</md-table-cell>
        <md-table-cell>{{expense.date.substring(0, 10)}}</md-table-cell>
        <md-table-cell>
          <md-button @click="deleteExpense(expense.id)" class="md-icon-button md-accent">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>

    </md-table>
    <md-snackbar :md-active.sync="expenseDeleted">The expense was deleted with success!</md-snackbar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'expenseList',
  data: () => ({
    sum: 500,
    expenses : [],
    expenseDeleted: false,
    deleteExpense(id) {
      axios({
        method: 'delete',
        url: '/api/expenses/' + id,
        data: {}
      }).then(() => {
        document.getElementById('expense-item'+id).remove();
        this.expenseDeleted = true;
        setTimeout(() => this.expenseDeleted = false, 1500);
      }, (error) => {
        console.log(error);
      });
    }
  }),
  async mounted() {
    const response = await axios.get('/api/expenses');
    this.expenses = response.data['hydra:member'];
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
