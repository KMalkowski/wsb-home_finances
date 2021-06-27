<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-secondary">
      <md-icon>request_quote</md-icon>
      <span class="md-title">Your finances dashboard</span>

      <div class="md-toolbar-section-end">
        <a v-if="user" href="/logout"><md-button class="md-accent">Logout</md-button></a>
        <a v-else href="/login"><md-button class="md-primary">Login</md-button></a>
      </div>
    </md-toolbar>

    <md-content v-if="user">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <md-button class="red lighten-1" @click="countBalance()">Count my balance</md-button>
          <span class="md-headline" v-if="showAccountBalance">Your finances balance is {{ accountBalance}} right now.</span>
        </div>
        <div class="md-layout-item md-medium-size-50 md-small-size-100">
          <md-button class="red lighten-1" @click="triggerAddExpense()">Add a new expense</md-button>
          <md-button v-if="showAddExpense" class="indigo darken-4" @click="triggerAddExpense()">Display the expenses list</md-button><br>
          <div v-if="showAddExpense">
            <AddExpense></AddExpense>
          </div>
          <div v-else>
            <ExpenseList></ExpenseList>
          </div>
        </div>
        <div class="md-layout-item md-medium-size-50 md-small-size-100">
          <md-button class="light-green" @click="triggerAddIncome()">Add a new income</md-button>
          <md-button v-if="showAddIncome" class="indigo darken-4" @click="triggerAddIncome()">Display the income list</md-button><br>
          <div v-if="showAddIncome">
            <AddIncome></AddIncome>
          </div>
          <div v-else>
            <IncomeList></IncomeList>
          </div>
        </div>
      </div>
    </md-content>

    <md-content v-else>
      <span class="md-display-1">If you want to see your finances, please log in.</span>
      <a href="/login"><md-button class="md-raised md-primary">Login</md-button></a>
    </md-content>

  </div>
</template>

<script>
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import IncomeList from './IncomeList';
import AddIncome from './AddIncome';
import axios from "axios";
export default {
  name: 'financesApp',
  components: {AddExpense, AddIncome, ExpenseList, IncomeList},
  data: () => ({
    user: window.user ? window.user : null,
    showAddExpense: false,
    showAddIncome: false,
    incomesList: [],
    incomesSum: null,
    expensesList: [],
    expensesSum: null,
    accountBalance: 0,
    showAccountBalance: false,
    triggerAddExpense(){
      this.showAddExpense = !this.showAddExpense;
    },
    triggerAddIncome(){
      this.showAddIncome = !this.showAddIncome;
    },
    async countBalance(){
      this.incomesSum = 0;
      this.expensesSum = 0;
      const response = await axios.get('/api/incomes');
      this.incomesList = response.data['hydra:member'];

      for (let i = 0; i < this.incomesList.length; i++) {
        this.incomesSum += parseInt(this.incomesList[i].amount);
      }

      const response2 = await axios.get('/api/expenses');
      this.expensesList = response2.data['hydra:member'];

      for (let j = 0; j < this.expensesList.length; j++) {
        this.expensesSum += parseInt(this.expensesList[j].amount);
      }

      this.accountBalance = (this.incomesSum - this.expensesSum) / 100;
      this.showAccountBalance = true;
    }
  })
}
</script>

<style lang="scss" scoped>
.light-green{
  color: #fff;
}
.indigo{
  color: #fff;
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
