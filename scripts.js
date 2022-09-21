let components = ['addButtonContent', 'categoryButtonsContent', 'blank'];

const handleShowButtons = (component) => {
    components.forEach((c) => {
        document.querySelector('#' + c).classList.add('hidden');
    });
    document.querySelector('#' + component).classList.remove('hidden');
};

onload = () => {
    document.querySelector('#addButton').onclick = (e) => {
        handleShowButtons('categoryButtonsContent');
    }
}