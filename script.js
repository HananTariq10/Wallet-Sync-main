let transactions = [];
let totalExpenses = 0;
let totalDeposit = 0;

const transactionType = document.querySelectorAll('input[name="transaction-type"]');
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const transactionsTableBody = document.getElementById('transactions-table-body');
const totalAmountCell = document.getElementById('total-amount');
const totalExpensesCell = document.getElementById('total-expenses');
const totalDepositCell = document.getElementById('total-deposit');

addBtn.addEventListener('click', function () {
    const selectedType = [...transactionType].find(radio => radio.checked).value;
    const category = selectedType === 'Expense' ? categorySelect.value : '';
    let amount = Number(amountInput.value);
    const date = dateInput.value;

    if (selectedType === 'Expense' && category === '') {
        alert('Please select a category for the expense');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Make the amount negative for "Expense" transactions
    if (selectedType === 'Expense') {
        amount = -amount;
    }

    const transaction = { type: selectedType, category, amount, date };
    transactions.push(transaction);

    if (selectedType === 'Expense') {
        totalExpenses += amount;
        totalExpensesCell.textContent = totalExpenses;
    } else {
        totalDeposit += amount;
        totalDepositCell.textContent = totalDeposit;
    }

    totalAmountCell.textContent = totalDeposit + totalExpenses;

    const newRow = transactionsTableBody.insertRow();
    newRow.setAttribute('type', selectedType);

    const typeCell = newRow.insertCell();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('add-btn'); // Apply the same class as the add button
    deleteBtn.classList.add('delete-btn');

    if (transaction.type === 'Deposit') {
        deleteBtn.classList.add('delete-btn-deposit');
    } else if (transaction.type === 'Expense') {
        deleteBtn.classList.add('delete-btn-expense');
    }

    deleteBtn.addEventListener('click', function () {
        const index = transactions.indexOf(transaction);
        if (index !== -1) {
            if (transaction.type === 'Expense') {
                totalExpenses -= transaction.amount;
                totalExpensesCell.textContent = totalExpenses;
            } else {
                totalDeposit -= transaction.amount;
                totalDepositCell.textContent = totalDeposit;
            }
            totalAmountCell.textContent = totalExpenses + totalDeposit;

            transactions.splice(index, 1);
            transactionsTableBody.removeChild(newRow);
        }
    });

    deleteBtn.addEventListener('mouseover', function () {
        deleteBtn.style.backgroundColor = '#a80b07'; // Darker red on hover
    });

    deleteBtn.addEventListener('mouseout', function () {
        deleteBtn.style.backgroundColor = '#da1a0c'; // Restore the original color on mouseout
    });

    typeCell.textContent = transaction.type;
    categoryCell.textContent = transaction.category;
    amountCell.textContent = transaction.amount;
    dateCell.textContent = transaction.date;
    deleteCell.appendChild(deleteBtn);
});
