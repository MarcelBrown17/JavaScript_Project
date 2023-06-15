
let products = JSON.parse(localStorage.getItem('products'));
// let idNumber = products[products.length-1] ? products[products.length-1].id + 1: 1;
// Buttons
let name = document.querySelector('#name')
let price = document.querySelector('#price')
let picture = document.querySelector('#picture')
let itemRender = document.querySelector('#itemRender')
let description = document.querySelector('#description')

// Delete button
function  deleteButtons(){
  dotoDelete = [...document.querySelectorAll(".close-btn")];
  dotoDelete.forEach((item) => {
      item.addEventListener('click', deleteItem)
  })
}
function deleteItem(event) {
  let startPoint = dotoDelete.indexOf(event.target);
          products.splice(startPoint, 1);
          localStorage.setItem("products", JSON.stringify(products))
          bookData();
}
// Edit button
function editItem(){
  editbtn = [...document.querySelectorAll('.edit-btn')];
  editbtn.forEach((item)=>{
      item.addEventListener('click', editTodoItem)
  })
  }
  function editTodoItem(){
      let newItem = prompt('Enter new Item:');
      let index = editbtn.indexOf(event.target);
      clientItems[index].name = newItem;
      localStorage.setItem("itemlist", JSON.stringify(clientItems))
      bookData();
  }

addBoard.addEventListener('click', addData)
function addData(e){
    e.preventDefault();
    if(nameBoard.value == '' && price.value == ''){
      alert('Inputs are empty')
    } else{
      products.push({
          id: 1,
          name: nameBoard.value,
          price: price.value,
          description: description.value,
        category: category.value,
          picture: picture.value,
      })
    }
    nameBoard.value = ''
    author.value = ''
    price.value = ''
    picture.value = ''
    itemRender.value = ''
    category.value = ''
    description.value = ''
    boardData()
    localStorage.setItem('products', JSON.stringify(products))
}
sorting.addEventListener("click", sortFunc )
function sortFunc(){
    products.sort((a,b) => {
        return a.cost - b.id
    })
}
function skateboardData(){
    itemRender.innerHTML = ''
    products.forEach((item) =>{
        itemRender.innerHTML +=
        `
                    <tr>
                      <th>${item.id}</th>
                      <th><img src="${item.picture}" class="" style="height:22rem;" alt=""></th>
                      <td>${item.name}</td>
                      <td>${item.title}</td>
                      <td>${item.cost}</td>
                      <td>
                      <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      id="delBtn"
                    >
                      Edit
                    </button>
                        <button>Delete</button>
                      </td>
                    </tr>
        `
      })
      localStorage.getItem('products')
      deleteButtons()
}
skateboardData()


//FUTURE USE
{/* <button class="btn btn-secondary" onclick='deleteProduct(${JSON.stringify(item)})'>Delete</button> */}

// // Sorting
// let isToggle = false;
// btnSorting.addEventListener('click',()=>{
//     if(!isToggle) {
//         products.sort((a, b)=> b.id - a.id);
//         btnSorting.textContent = "Sorted by descending (ID)";
//         isToggle = true;
//     }else {
//         products.sort((a, b)=> a.id - b.id);
//         btnSorting.textContent = "Sorted by ascending (ID)";
//         isToggle = false;
//     }
//     display();
// })