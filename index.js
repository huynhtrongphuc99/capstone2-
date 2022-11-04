var ProductList = []
function GetProduct() {
  axios({
    url: "https://636201887521369cd0629672.mockapi.io/users",
    method: "GET"
  }).then(function (response) {
    // console.log(response.data)
    var Listdata = MapData(response.data)
    var phone = document.getElementById('phone').value
    var result = []
    for (var item of Listdata) {
      if (item.type === phone) {
        result.push(item)

      } else if (phone === 'ALL') {
        result = Listdata
        // ProductList.push(item)
      }
    }
    renderProduct(result)
    SumNumber()
    // return ProductList = Listdata
  }).catch(function (err) {
    console.log(err)
  })
}
// console.log(ProductList)
// console.log(ProductList)
function MapData(DataList) {
  var result = []
  for (var item of DataList) {
    var newProduct = new product(
      item.id,
      item.name,
      item.price,
      item.screen,
      item.backCamera,
      item.frontCamera,
      item.img,
      item.desc,
      item.type,
    )
    result.push(newProduct)
  }
  return result
}
function renderProduct(data) {
  var tableHTML = ""
  for (var item of data) {
    tableHTML += `
        <div class="card card-${item.type}">
        <div class="img-container">
          <img class="product-img"  src="${item.img}" alt="${item.name}">
        </div>
        <div class="details">
          <div class="name-fav">
            <strong class="product-name">${item.name}</strong>
          </div>
          <div class="wrapper">
          <h5>${item.backCamera}</h5>
          <p> ${item.screen, item.frontCamera}</p>
          </div>
          <div class="purchase">
            <p class="product-price">$ ${item.price}</p>
            <span class="btn-add" >
              <button " class="add-btn btn_shop"  onclick="ProductShop(${item.id - 1})"  id="${item.id}" >Add</button>
            </span>
          </div>
        </div>
      </div>
        `
  }
  document.getElementById('render').innerHTML = tableHTML
}
function ProductShop(number) {
  axios({
    url: "https://636201887521369cd0629672.mockapi.io/users",
    method: "GET"
  }).then(function (response) {
    var newList = MapData(response.data)
    ProductList.push(newList[number])
    SetLocal()
    GetLocal()
    renderTable()
    SumNumber()
  }).catch(function (err) { console.log(err) })
}

// LOCALL 
// save 
function SetLocal() {
  var ListLocal = JSON.stringify(ProductList)
  // console.log(ListLocal)
  localStorage.setItem('SL', ListLocal)
}
//GET
function GetLocal() {
  var ListLocal = localStorage.getItem('SL');
  ProductList = MapData(JSON.parse(ListLocal))
  document.getElementById('number').innerHTML = ProductList.length
}

function renderTable() {
  var PayHTML = ''
  var HtmlList = MapData(JSON.parse(localStorage.getItem('SL')))
  for (var item of HtmlList) {
    if (!item) return
    if (item)
      PayHTML += `
 <tr>
 <td><img class="img-phone" src="${item.img}" alt=""></td>
 <td>${item.name}</td>
 <td>$${item.price}</td>
 <td><button><i class="fa-regular fa-trash-can"  onclick="deleteItem(${+item.id})"></i></button></td> 
</tr>
 `
  }

  document.getElementById('ProductTable').innerHTML = PayHTML
}

function clearALL() {
  location.reload()
  window.localStorage.clear()
  GetLocal()
  renderTable()
}

function deleteItem(number) {
  console.log(number)
  console.log(ProductList)
  for (var i=ProductList.length-1 ; i>=0 ; i--) {
    if (number = ProductList[i].id) {
      ProductList.splice(i,1)
      console.log('ProductList',ProductList)
      SetLocal()
  renderTable()
  return
    }
  }
}
function SumNumber(){
  var sum =MapData(JSON.parse(localStorage.getItem('SL')))
  var total = 0
  var tongl = []
  for (var item of sum){
tongl.push(item.price)
  }
console.log(tongl)
for ( var i = 0; i <tongl.length ; i++) {
  total+= tongl[i]
}
console.log(total)
document.getElementById('total').innerHTML=total+'$'
}

function payShop(){
  document.getElementById('pay').style.display="inline-block"
}
function Continue(){
  window.localStorage.clear();
  location.reload() 

}


window.onload = function () {
  GetProduct()
  GetLocal()
  renderTable()
}






document.getElementById('pay').style.display="none"
document.getElementById('closeTable').style.display = "none"
document.getElementById('openTable').onclick = function () {
  document.getElementById('closeTable').style.display = "inline-block"

}
document.getElementById('close').onclick = function () {
  document.getElementById('closeTable').style.display = "none"
}
