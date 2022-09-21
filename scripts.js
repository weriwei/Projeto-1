let components = ['addButtonContent', 'categoryButtonsContent', 'blank', 'budgetInputContent'];

const handleShowContent = (component) => {
    components.forEach((c) => {
        document.querySelector('#' + c).classList.add('hidden');
    });
    document.querySelector('#' + component).classList.remove('hidden');
};

const handleAddBudget = (budgetType) => {
console.log(budgetType)
}

onload = () => {
    document.querySelector('#addButton').onclick = (e) => {
        handleShowContent('categoryButtonsContent');
    }

    document.querySelector('#travelerButton').onclick = (e) => {
        handleShowContent('budgetInputContent');
        handleAddBudget('traveler');
    }
    document.querySelector('#busButton').onclick = (e) => {
        handleShowContent('budgetInputContent');
        handleAddBudget('bus');
    }
    document.querySelector('#carButton').onclick = (e) => {
        handleShowContent('budgetInputContent');
        handleAddBudget('car');
    }
}