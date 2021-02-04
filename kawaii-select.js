class KawaiiSelect{

    constructor(elementID){
        this.elementID = elementID;
    }

    data(){
        return {
            defaultSelect: document.getElementById(this.elementID),
            defaultOptions: [...document.getElementById(this.elementID).options],
        }
    }
    render(){
        let firstOption = this.data().defaultOptions[0].innerText;
        let listOptions = this.data().defaultOptions;
        let selectPlace = this.data().defaultSelect;

        createSelectTemplate(firstOption, listOptions, selectPlace);
    }
}

function createSelectTemplate(selectInitialValue,selectOptions, selectInitPosition){
    let select = document.createElement('div');
    select.classList.add('kawaii-select');
    select.id  = `${selectInitPosition.id}-Kawaii-copy`;
    select.innerHTML = `
    <div class="kawaii-select__current">
        <button type="button" class="kawaii-select__current-text">${selectInitialValue}</button>
    </div>
    <div class="kawaii-select__drop">
        <ul class="kawaii-select__list"></ul>
    </div>
    `;
    selectOptions.forEach(function (item){
        select.lastElementChild.lastElementChild.innerHTML += `
    <li class="kawaii-select__list-item"><button type="button" class="kawaii-select__button"
    data-value="${item.getAttribute('value')}"
    >${item.innerText}</button></li>
`;
    })

    selectInitPosition.insertAdjacentElement('afterend', select);
}

function openSelect(target){

    if (target.classList.contains('kawaii-select__current-text')){
        if (target.classList.contains('kawaii-select__current-text--active')){
            target.classList.remove('kawaii-select__current-text--active')
            target.parentNode.parentNode.classList.remove('kawaii-select--active');
        }else{
            target.classList.add('kawaii-select__current-text--active')
            target.parentNode.parentNode.classList.add('kawaii-select--active');
        }
    }
}
// close all opened selects
function closeAllSelects(){
    let allSelects = document.querySelectorAll('.kawaii-select');
    let allSelectsCurrent = document.querySelectorAll('.kawaii-select__current-text');
    allSelects.forEach((item)=>{
        item.classList.remove('kawaii-select--active');
    })
    allSelectsCurrent.forEach((item)=>{
        item.classList.remove('kawaii-select__current-text--active');
    })
}

function changeOption(target){
    if (target.classList.contains('kawaii-select__button')){
        const clickedOption = target.parentNode.parentNode.parentNode.parentNode;
        const currentOption = target.parentNode.parentNode.parentNode.parentNode.childNodes[1].lastElementChild
        let getSelectID = clickedOption.id.replace('-Kawaii-copy', '');
        let getSelect = document.getElementById(getSelectID);
        getSelect.value = target.innerText;
        currentOption.innerText = getSelect.value;
    }

}


window.addEventListener('click', function (e){
    const target = e.target;
    closeAllSelects();
    openSelect(target);
    changeOption(target)
});

function $kawaiiSelect(elementID){
   return new KawaiiSelect(elementID).render();
}
$kawaiiSelect('selectID');
$kawaiiSelect('selectID2');
$kawaiiSelect('selectID3');
$kawaiiSelect('selectID4');







