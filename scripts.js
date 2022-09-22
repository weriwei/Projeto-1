let components = ['addButtonContent', 'categoryButtonsContent', 'blank', 'budgetInputContent', 'budgetListContainer'];
let inputsId = ['#inputDescription', '#inputDate', '#inputValue'];

let budgets = [{description: 'Diamantina', date: '2022-09-10', value: '177.95', type: 'Viagem', id: '1'},
{description: 'Bh', date: '2022-09-11', value: '2.05', type: 'Viagem', id: '2'},
{description: 'Sp', date: '2022-09-12', value: '79.90', type: 'Viagem', id: '3'}]
let selectedType = '';

const handleShowContent = (component) => {
    components.forEach((c) => {
        document.querySelector('#' + c).classList.add('hidden');
    });
    document.querySelector('#' + component).classList.remove('hidden');
};

const getTotalBudget = () => {
    const total = document.querySelector('#totalBudget');

    let value = budgets.map((b) => parseFloat(b.value)).reduce((prev, curr) => prev + curr, 0);

    total.innerHTML = toBRLCurrency(value);
}

const getBudget = (b) => 
b.type + " - " + b.description + " - " + getFormatedDate(new Date(b.date)) + " - " + "R$" + b.value; 

const toBRLCurrency = (value) => Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value);

const getFormatedDate = (date) => 
    ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear(); 

const handleBudgets = () => {
    const budgetList = document.querySelector('#budgetList');
    budgetList.innerHTML = "";

    budgets.forEach((b) => {
        let elemBudget = document.createElement('li');
        elemBudget.innerHTML= getBudget(b); 
        elemBudget.onclick = () => (handleClickOnBudget(b));
        budgetList.appendChild(elemBudget);
    })

    if(budgets.length > 0) {
        budgetList.classList.remove('hidden');
        document.querySelector('#budgetListContainer').classList.remove('hidden');
        document.querySelector('#blank').classList.add('hidden');
    }
    else {
        budgetList.classList.add('hidden');
        document.querySelector('#budgetListContainer').classList.add('hidden');
        document.querySelector('#blank').classList.remove('hidden');
    }
}

const handleBudget = (budgetType) => {
    document.querySelector('#inputDescription').focus();
    selectedType = budgetType;
}

const handleCleanInputs = () => {
    document.querySelector('#inputDescription').value = '';
    document.querySelector('#inputDate').value = '';
    document.querySelector('#inputValue').value = '';
}

const handleBackButton = () => {
    document.querySelector('#budgetListContainer').classList.remove('hidden');
    document.querySelector('#addButtonContent').classList.remove('hidden');
    document.querySelector('#budgetInputContent').classList.add('hidden');
}

const handleAddBudget = () => {
    budgets.push({
        description: document.querySelector(inputsId[0]).value,
        date: document.querySelector(inputsId[1]).value,
        value: document.querySelector(inputsId[2]).value,
        type: selectedType,
        id: Math.random().toString().replace('0.', '')
    });

    handleCleanInputs();
    getTotalBudget();
    handleBackButton();
    handleBudgets();

}

const handleClickOnBudget = (b) => {
    const budget = document.querySelector('#selectedBudget');
    budget.innerHTML = getBudget(b);
    budget.setAttribute('data-id', b.id);

    document.querySelector('#budgetListContainer').classList.add('hidden');
    document.querySelector('#addButtonContent').classList.add('hidden');
    document.querySelector('#singleBudget').classList.remove('hidden');
    // const index = budgets.indexOf(b)
    // delete budgets[index];

    // budgets.length += -1;

    // handleCleanInputs();
    // getTotalBudget();
    // handleBackButton();
    // handleBudgets();
}
const handleDeleteBudget = () => {
    const budget = document.querySelector('#selectedBudget').getAttribute('data-id');
    console.log("budgets antes o splice: ", budgets);
    const index = budgets.indexOf(budget);
    budgets.splice(index);
    console.log("budgets após o splice: ", budgets);

    handleCleanInputs();
    getTotalBudget();
    handleBackButton();
    handleBudgets();
}

onload = () => {
    handleBudgets();
    getTotalBudget();

    document.querySelector('#addButton').onclick = () => {
        handleShowContent('categoryButtonsContent');
    }
    document.querySelector('#cleanButton').onclick = () => (handleCleanInputs());

    document.querySelector('#backButton').onclick = () => (handleBackButton());

    document.querySelector('#confirmButton').onclick = () => (handleAddBudget());

    document.querySelector('#deleteButton').onclick = () => (handleDeleteBudget());

    document.querySelector('#travelerButton').onclick = () => {
        handleShowContent('budgetInputContent');
        handleBudget('Viagem');
    }
    document.querySelector('#busButton').onclick = () => {
        handleShowContent('budgetInputContent');
        handleBudget('Ônibus');
    }
    document.querySelector('#carButton').onclick = () => {
        handleShowContent('budgetInputContent');
        handleBudget('Carro');
    }
}