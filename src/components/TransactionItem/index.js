import './index.css'

const TransactionItem = props => {
  const {details, deleteTransaction} = props
  const {title, amount, type, id} = details
  const onClickDeleteIcon = () => {
    deleteTransaction(id)
  }
  return (
    <li className="table-row-container">
      <p className="cell">{title}</p>
      <p className="cell">{amount}</p>
      <p className="cell">{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeleteIcon}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
