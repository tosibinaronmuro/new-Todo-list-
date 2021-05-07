let alert=document.querySelector('.alert')
let form=document.querySelector('.innput')
let item=document.querySelector('.item')
let subBtn=document.querySelector('#submit')
let container=document.querySelector('.space')
let ul=document.querySelector('.ul')
let list=document.querySelector('.list')
let clear=document.querySelector('.clear')
let inputValue=document.querySelector('#write')

let editElement;
let editFlag=false;
let editId="";

// load
window.addEventListener('DOMContentLoaded',setUpItems)
clear.classList.add('hidecontainer')
form.addEventListener('submit', addItem=(e)=>{
    e.preventDefault();
    // console.log(inputValue.value)
    value=inputValue.value;
    // item.innerHTML=value
    let id=new Date().getTime().toString();
    
     
    if(value!==''&& editFlag===false){
         console.log(id)
         createListItem(id,value)

        displayAlerts('Item added successfully !!!','success')
        clear.classList.remove('hidecontainer')
        //add to local storage
       addToLocalStorage(id,value);
        setBackToDefault();
    }
    else if(value!==''&& editFlag===true){
        editElement.innerHTML= inputValue.value
        displayAlerts('item edited successfully','success');
        //edit local storage
        editLocalStorage(editId,value)
        setBackToDefault()
    }
    else{
        displayAlerts('please enter Item','danger')
    }
    
    
})
//clear 
clear.addEventListener('click',clearItems)


//*********functions**********/


function clearItems(){
    let clearitt=document.querySelectorAll('.list')
    // console.log(clearitt)
    if( clearitt.length > 0){
         clearitt.forEach(function(list){
             list.remove(item)
             clear.classList.add('hidecontainer')
             
         } )
    }
    displayAlerts('items cleared successfully','danger')
            
             localStorage.removeItem('list');
             setBackToDefault();

}
 




//alerts
function displayAlerts(text , action){
        alert.textContent=text;
        alert.classList.add(`alert-${action}`)
        setTimeout(function(){
            alert.textContent='';
            alert.classList.remove (`alert-${action}`)
        },1000)
}
//set back to default
function setBackToDefault(){
    // console.log('set back to default');
    inputValue.value='';
    editFlag=false;
    editId='';
    subBtn.textContent='submit';
}

//setback to local storage
function addToLocalStorage(id,value){
     
    let addToLC= {id,value};
    // console.log(addToLC)
      gett=localStorage.getItem('list')
    
      var arrayy = getLocalStorage()
     console.log(arrayy)
    arrayy.push(addToLC);
    localStorage.setItem('list',JSON.stringify(arrayy))
}
// localStorage.removeItem('list')

function removeFromLocalStorage(id){
     let arrayy=getLocalStorage();

     arrayy=arrayy.filter(function (item){
         if(item.id !== id){
              
             return item;
            
         }
     })
    
     console.log(arrayy)
     localStorage.setItem('list',JSON.stringify(arrayy))
     console.log(arrayy)
}
function editLocalStorage(id,value){
 arrayy=getLocalStorage();
 arrayy=arrayy.map(function(item){
     if (item.id===id){
         item.value=value
     }
     return item
 })
 localStorage.setItem('list',JSON.stringify(arrayy));
}
function getLocalStorage(){
    
    return localStorage.getItem('list')? JSON.parse(localStorage.getItem('list') ):[]
}



//set up items
function setUpItems(){
    let arrayy=getLocalStorage();
    if(arrayy.length>0){
        arrayy.forEach(function(item){
            createListItem(item.id, item.value)
            clear.classList.remove('hidecontainer')
        })
    }
    
}

function createListItem(id,value){
    let elementt=document.createElement('li');
    elementt.classList.add('.list');
    let attr=document.createAttribute('data-id')
    attr.value=id;
    elementt.setAttributeNode(attr);
    elementt.innerHTML=`<li class="list"><span class="item"> ${value}</span>  <i class="far fa-edit" id="font-edit"></i> <i class="far fa-trash-alt" id="font-delete"></i></li>`
    //edit function
    let editBtn=elementt.querySelector('#font-edit')
    editBtn.addEventListener('click',editItem)
    //delete function
    let deleteBtn=elementt.querySelector('#font-delete')
    deleteBtn.addEventListener('click',deleteItem)
    
    function deleteItem(e){
   
        // console.log(ul.firstElementChild);
        
        let delll=deleteBtn.parentElement;
        delll.remove(delll);
        displayAlerts('item successfully removed', 'danger');
        let clearitt=document.querySelectorAll('.list')
        //  console.log(clearitt)
        if( clearitt.length == 0){
        clear.classList.add('hidecontainer')
        }
        let id=elementt.dataset.id;
        setBackToDefault();
        removeFromLocalStorage()
        
    }
//edit 

function editItem(){
let editt=editBtn.parentElement;
editElement=elementt.querySelector('.item');
inputValue.value=editElement.innerHTML;
 editFlag=true;
 editId=elementt.dataset.id;
 subBtn.textContent='edit'



}

    ul.appendChild(elementt)
}
//local storsage api
//set item
//get item
//remove item
//save as strings
// localStorage.setItem('orange',JSON.stringify(['item 1', 'item 2']))
// let orange=JSON.parse(localStorage.getItem('orange'))
// console.log(orange)
// localStorage.removeItem('orange)
// let elementt=document.createElement('li');
// elementt.classList.add('.list');
// let attr=document.createAttribute('data-id')
// attr.value=id;
// elementt.setAttributeNode(attr);
// elementt.innerHTML=`<li class="list"><span class="item"> ${value}</span>  <i class="far fa-edit" id="font-edit"></i> <i class="far fa-trash-alt" id="font-delete"></i></li>`
// //edit function
// let editBtn=elementt.querySelector('#font-edit')
// editBtn.addEventListener('click',editItem)
// //delete function


// let deleteBtn=elementt.querySelector('#font-delete')
// deleteBtn.addEventListener('click',deleteItem)

// //to delete

// function deleteItem(e){

//     // console.log(ul.firstElementChild);
    
//     let delll=deleteBtn.parentElement;
//     delll.remove(delll);
//     displayAlerts('item successfully removed', 'danger');
//     let clearitt=document.querySelectorAll('.list')
//     //  console.log(clearitt)
//     if( clearitt.length == 0){
//     clear.classList.add('hidecontainer')
//     }
//     let id=elementt.dataset.id;
//     setBackToDefault();
//     removeFromLocalStorage()
    
// }
// //edit 

// function editItem(){
// let editt=editBtn.parentElement;
// editElement=elementt.querySelector('.item');
// inputValue.value=editElement.innerHTML;
// editFlag=true;
// editId=elementt.dataset.id;
// subBtn.textContent='edit'



// }

// ul.appendChild(elementt)