



function populateUFs () { 
 
    const ufselect = document.getElementById("uf")

     fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados") 
    .then( res => res.json () )
    .then( states => {


        for( const state of states ){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
       
    })

}
populateUFs()

function getcities(event) {
    const cityselect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")



    const ufvalue = event.target.value
     
    const indeOfSelectedStade = event.target.selectedIndex
    stateInput.value = event.target.options [indeOfSelectedStade].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    
    cityselect.innerHTML = "<option value>Selecione a Cidade</option>"
    cityselect.disabled = true

     fetch (url) 
    .then( res => res.json () )
    .then( cities => {

        for( const city of cities ){
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        cityselect.disabled = false
    })

}



document
.querySelector("select[name=uf]")
.addEventListener("change", getcities)  
   

//Itens de coleta
const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect ){
    item.addEventListener("click",handleSelectedItem)
} 

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com javaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se exisgtem items selecionados
    // pegar os item selecionados


    const alreadySelected = selectedItems.findIndex( item => {
     const itemFound = item == itemId //Isso será true ou false
     return itemFound
    })

    //se ja tiver selecionado,tirar da selecao

if( alreadySelected >= 0 ) {
    //tirar a seleção
    const filteredItems = selectedItems.filter( item => {
        const itemIsDifferent = item != itemId // false
        return itemIsDifferent
    })

    selectedItems = filteredItems
} else {
    //adicionar a seleção
    selectedItems.push(itemId)
}


    //se nao tiver ,adicionar á selecao

    // arualizar o campo encondido com items selecionados
    collectedItems.value = selectedItems
   
}