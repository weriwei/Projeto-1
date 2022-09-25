let components = [
  "addButtonContent",
  "categoryButtonsContent",
  "blank",
  "budgetInputContent",
  "budgetListContainer",
];
let inputsId = ["#inputDescription", "#inputDate", "#inputValue"];
let budgets = [];

let selectedType = "";
let editMode = false;

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

const getBudgetText = (b) =>
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

const handleBudgets = () => {
  const budgetList = document.querySelector("#budgetList");
  budgetList.innerHTML = "";

  budgets.forEach((b) => {
    let elemBudget = document.createElement("li");
    elemBudget.innerHTML = getBudgetText(b);
    elemBudget.onclick = () => handleClickOnBudget(b);
    budgetList.appendChild(elemBudget);
  });

  if (budgets.length > 0) {
    budgetList.classList.remove("hidden");
    document.querySelector("#budgetListContainer").classList.remove("hidden");
    document.querySelector("#blank").classList.add("hidden");
  } else {
    budgetList.classList.add("hidden");
    document.querySelector("#budgetListContainer").classList.add("hidden");
    document.querySelector("#blank").classList.remove("hidden");
  }
};

const handleBudget = (budgetType) => {
  document.querySelector("#inputDescription").focus();
  selectedType = budgetType;
};

const handleCleanInputs = () => {
  document.querySelector("#inputDescription").value = "";
  document.querySelector("#inputDate").value = "";
  document.querySelector("#inputValue").value = "";
  document.querySelector("#selectedBudget").value = "";
};

const handleBackButton = () => {
  document.querySelector("#addButtonContent").classList.remove("hidden");
  document.querySelector("#budgetInputContent").classList.add("hidden");
  document.querySelector("#singleBudget").classList.add("hidden");

  handleBudgets();
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
    handleCleanInputs();
    getTotalBudget();
    handleBackButton();
    handleBudgets();
  }
};

const handleClickOnBudget = (b) => {
  const budget = document.querySelector("#selectedBudget");
  budget.innerHTML = getBudgetText(b);
  budget.setAttribute("data-id", b.id);

  document.querySelector("#budgetListContainer").classList.add("hidden");
  document.querySelector("#addButtonContent").classList.add("hidden");
  document.querySelector("#singleBudget").classList.remove("hidden");
};

const getSelectedBudget = () =>
  document.querySelector("#selectedBudget").getAttribute("data-id");

const deleteBudget = () => {
  const budget = getSelectedBudget();

  const index = budgets.map((b) => b.id).indexOf(budget);
  budgets.splice(index, 1);
};

const handleDeleteBudget = () => {
  deleteBudget();

  handleCleanInputs();
  getTotalBudget();
  handleBackButton();
  handleBudgets();
};

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
  handleBudgets();
  getTotalBudget();

  document.querySelector("#addButton").onclick = () => {
    handleShowContent("categoryButtonsContent");
  };
  document.querySelector("#cleanButton").onclick = () => handleCleanInputs();

  document.querySelector("#backButton").onclick = () => handleBackButton();

  document.querySelector("#cancelButton").onclick = () => handleBackButton();

  document.querySelector("#confirmButton").onclick = () => handleAddBudget();

  document.querySelector("#deleteButton").onclick = () => handleDeleteBudget();

  document.querySelector("#editButton").onclick = () => handleEditBudget();

  document.querySelector("#travelerButton").onclick = () => {
    handleShowContent("budgetInputContent");
    handleBudget("Viagem");
  };
  document.querySelector("#busButton").onclick = () => {
    handleShowContent("budgetInputContent");
    handleBudget("Ônibus");
  };
  document.querySelector("#carButton").onclick = () => {
    handleShowContent("budgetInputContent");
    handleBudget("Carro");
  };
};
