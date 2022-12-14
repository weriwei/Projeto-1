let components = [
  "addButtonContent",
  "categoryButtonsContent",
  "blank",
  "budgetInputContent",
  "budgetListContainer",
  "filterContent",
];
let inputsId = ["#inputDescription", "#inputDate", "#inputValue"];
let budgets = [];

let selectedType = "";
let editMode = false;

navigator.serviceWorker.register("./sw.js");

const getBudgetsInLocalStorage = () => {
  const hasBudgets = JSON.parse(localStorage.getItem("budgets"));
  if (hasBudgets) budgets = hasBudgets;
};

const saveBudgetsInLocalStorage = () => {
  localStorage.setItem("budgets", JSON.stringify(budgets));
};

const handleShowContent = (component) => {
  components.forEach((c) => {
    document.querySelector("#" + c).classList.add("hidden");
  });
  document.querySelector("#" + component).classList.remove("hidden");
};

const getTotalBudget = () => {
  const total = document.querySelector("#totalBudget");

  let value = budgets
    .map((b) => parseFloat(b.value))
    .reduce((prev, curr) => prev + curr, 0);

  total.innerHTML = toBRLCurrency(value);
};

const formatBudgetText = (b) =>
  b.type +
  " - " +
  b.description +
  " - " +
  getFormatedDate(new Date(b.date)) +
  " - " +
  "R$" +
  b.value;

const toBRLCurrency = (value) =>
  Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(
    value
  );

const getFormatedDate = (date) =>
  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

// Retorna a lista de gastos filtrada pelo parametro informado pelo usuário
const getFilteredList = () => {
  const selectedFilter = document.querySelector("#filter").value;
  if (selectedFilter === "All") return budgets;

  return budgets.filter((b) => b.type === selectedFilter);
};

// Lista na tela os elementos
const listBudgets = () => {
  const budgetList = document.querySelector("#budgetList");
  budgetList.innerHTML = "";

  const list = getFilteredList();

  list.forEach((b) => {
    let elemBudget = document.createElement("li");
    elemBudget.innerHTML = formatBudgetText(b);
    elemBudget.onclick = () => handleClickOnBudget(b);
    budgetList.appendChild(elemBudget);
  });

  // Se a lista não estiver vazia, exibe o componente para filtragem, remove a marca d'agua e exibe a listagem
  if (budgets.length > 0) {
    budgetList.classList.remove("hidden");
    document.querySelector("#budgetListContainer").classList.remove("hidden");
    document.querySelector("#blank").classList.add("hidden");
    document.querySelector("#filterContent").classList.remove("hidden");
  } else {
    budgetList.classList.add("hidden");
    document.querySelector("#budgetListContainer").classList.add("hidden");
    document.querySelector("#blank").classList.remove("hidden");
    document.querySelector("#filterContent").classList.add("hidden");
  }
};

// Salva o tipo do gasto em uma variavel para ser usada na criação e edição de gastos
const setSelectedType = (budgetType) => {
  document.querySelector("#inputDescription").focus();
  selectedType = budgetType;
};

const handleClearInputs = () => {
  document.querySelector("#inputDescription").value = "";
  document.querySelector("#inputDate").value = "";
  document.querySelector("#inputValue").value = "";
  document.querySelector("#selectedBudget").value = "";
};

const handleBackButton = () => {
  document.querySelector("#addButtonContent").classList.remove("hidden");
  document.querySelector("#budgetInputContent").classList.add("hidden");
  document.querySelector("#singleBudget").classList.add("hidden");

  listBudgets();
};

const isFieldsEmpty = () => {
  if (
    (document.querySelector(inputsId[0]).value &&
      document.querySelector(inputsId[1]).value &&
      document.querySelector(inputsId[2]).value) === ""
  )
    return true;

  return false;
};

// Adiciona um gasto na lista;
// Para modo edição, existe uma variavel de controle 'editMode'. Nesse caso, o item selecionado para edição é removido da lista atráves do método splice, e o novo item é adicionado no lugar.
const handleAddBudget = () => {
  if (editMode) {
    deleteBudget();
  }
  if (!isFieldsEmpty()) {
    budgets.push({
      description: document.querySelector(inputsId[0]).value,
      date: document.querySelector(inputsId[1]).value,
      value: document.querySelector(inputsId[2]).value,
      type: selectedType,
      id: Math.random().toString().replace("0.", ""),
    });

    editMode = false;
    handleClearInputs();
    getTotalBudget();
    handleBackButton();
    listBudgets();
    saveBudgetsInLocalStorage();
  }
};

// Quando o usuário clica em um gasto na listagem, é setado o id e apresentado o menu para edição ou exclusão.
// O id é utiizado para encontrar o item na lista atráves do método indexOf
const handleClickOnBudget = (b) => {
  const budget = document.querySelector("#selectedBudget");
  budget.innerHTML = formatBudgetText(b);
  budget.setAttribute("data-id", b.id);

  document.querySelector("#budgetListContainer").classList.add("hidden");
  document.querySelector("#addButtonContent").classList.add("hidden");
  document.querySelector("#singleBudget").classList.remove("hidden");
  document.querySelector("#filterContent").classList.add("hidden");
};

// Retorna o elemento que o usuário selecionou na listagem de gastos.
const getSelectedBudget = () =>
  document.querySelector("#selectedBudget").getAttribute("data-id");

const deleteBudget = () => {
  const budget = getSelectedBudget();

  const index = budgets.map((b) => b.id).indexOf(budget);
  budgets.splice(index, 1);
};

// Deleta o item selecionado, limpa os dados dos campos, calcula todos os gastos, atualiza a listagem e salva no localStorage
const handleDeleteBudget = () => {
  deleteBudget();

  handleClearInputs();
  getTotalBudget();
  handleBackButton();
  listBudgets();
  saveBudgetsInLocalStorage();
};

// Preenche os campos com os dados ja existentes e exibe a tela com os inputs e botões para confirmar ou cancelar a edição.
const handleEditBudget = () => {
  editMode = true;
  const budgetId = getSelectedBudget();
  const budget = budgets.filter((b) => b.id === budgetId);

  document.querySelector("#singleBudget").classList.add("hidden");
  document.querySelector("#budgetInputContent").classList.remove("hidden");

  document.querySelector("#inputDescription").value = budget[0].description;
  document.querySelector("#inputDate").value = budget[0].date;
  document.querySelector("#inputValue").value = budget[0].value;
  selectedType = budget[0].type;
};

onload = () => {
  getBudgetsInLocalStorage();
  listBudgets();
  getTotalBudget();

  document.querySelector("#addButton").onclick = () => {
    handleShowContent("categoryButtonsContent");
  };

  document.querySelector("#cleanButton").onclick = () => handleClearInputs();

  document.querySelector("#backButton").onclick = () => handleBackButton();

  document.querySelector("#cancelButton").onclick = () => handleBackButton();

  document.querySelector("#confirmButton").onclick = () => handleAddBudget();

  document.querySelector("#deleteButton").onclick = () => handleDeleteBudget();

  document.querySelector("#editButton").onclick = () => handleEditBudget();

  document.querySelector("#travelButton").onclick = () => {
    handleShowContent("budgetInputContent");
    setSelectedType("Viagem");
  };
  document.querySelector("#busButton").onclick = () => {
    handleShowContent("budgetInputContent");
    setSelectedType("Ônibus");
  };
  document.querySelector("#carButton").onclick = () => {
    handleShowContent("budgetInputContent");
    setSelectedType("Carro");
  };
};
