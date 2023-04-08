import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const inittransactionList = [
  {
    id: uuidv4(),
    title: 'Salary',
    amount: 50000,
    type: 'Income',
  },
  {
    id: uuidv4(),
    title: 'Car Loan',
    amount: 10000,
    type: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'Income',
    transactionList: [],
  }

  calculateAmounts = () => {
    const {transactionList} = this.state
    let income = 0
    let expenses = 0
    transactionList.forEach(eachTrans => {
      if (eachTrans.type === 'Income') {
        income += eachTrans.amount
      } else {
        expenses += eachTrans.amount
      }
    })
    return {income, expenses, balance: income - expenses}
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    // if (title === '' || amount === '') {
    //   return
    // }
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: type[0] + type.slice(1).toLowerCase(),
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      type: 'Income',
    }))
  }

  deleteTransaction = id => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))
  }

  updateTitle = event => this.setState({title: event.target.value})

  updateAmount = event => this.setState({amount: event.target.value})

  updateType = event => this.setState({type: event.target.value})

  render() {
    const {transactionList} = this.state
    const {title, amount, type} = this.state
    const {income, expenses, balance} = this.calculateAmounts()
    return (
      <div className="main-bg-container">
        <div className="welcome-section">
          <h1 className="greeting-text">Hi, Richard</h1>
          <p className="welcome-text">
            Welcome back to your{' '}
            <span className="money-manager-span-text">Money Manager</span>
          </p>
        </div>
        <div className="money-details-list">
          <MoneyDetails income={income} expenses={expenses} balance={balance} />
        </div>

        <div className="addTransaction-history-container">
          <form
            className="add-transaction-container"
            onSubmit={this.addTransaction}
          >
            <h1 className="add-form-heading">Add Transaction</h1>
            <div>
              <label htmlFor="title" className="input-label">
                TITLE
              </label>
              <br />
              <input
                id="title"
                type="text"
                className="title-input"
                placeholder="TITLE"
                onChange={this.updateTitle}
                value={title}
              />
            </div>
            <div>
              <label htmlFor="amount" className="input-label">
                AMOUNT
              </label>
              <br />
              <input
                id="amount"
                type="text"
                className="title-input"
                placeholder="AMOUNT"
                onChange={this.updateAmount}
                value={amount}
              />
            </div>
            <div>
              <label htmlFor="type" className="input-label">
                TYPE
              </label>
              <br />
              <select
                className="income-type-input"
                id="type"
                onChange={this.updateType}
                value={type}
              >
                {transactionTypeOptions.map(eachType => (
                  <option key={eachType.optionId} value={eachType.optionId}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-transaction-button" type="submit">
              Add
            </button>
          </form>

          <div className="transaction-history-container">
            <h1 className="history-heading">History</h1>
            <div className="table-header">
              <p className="table-header-cell">Title</p>
              <p className="table-header-cell">Amount</p>
              <p className="table-header-cell">Type</p>
            </div>
            <ul className="transaction-items-list">
              {transactionList.map(each => (
                <TransactionItem
                  details={each}
                  key={each.id}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
