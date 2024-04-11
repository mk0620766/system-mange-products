// بسم الله الرحمن الرحيم
let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let btnmood='create';
let temp;
// get total
function getTotal(){
    if(price.value!=''){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }else{
        total.innerHTML='';
        total.style.background='#a00d02';
    }
}
// create product
let arrPro;
if(localStorage.product != null){
    arrPro=JSON.parse(localStorage.product);
}else{
    arrPro=[];
}
submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value != '' && total.innerHTML!='' && category.value!='' && count.value < 101){
        if(btnmood === 'create'){
            if(newPro.count > 1){
                for(let i=0;i < newPro.count ; i++){
                    arrPro.unshift(newPro)
                }
            }else{
                arrPro.unshift(newPro)
            }
        }
        else{
            arrPro[temp]=newPro;
            btnmood = 'create';
            submit.innerHTML='Create'
            count.style.display='content';
        }
        cleardata();
    }
// save items in local storage
    localStorage.setItem('product', JSON.stringify(arrPro));
    showdata();
}
// clear input data
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    title.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
}
// read data
function showdata(){
    let table='';
    getTotal()
    for(let i=0; i<arrPro.length;i++){
        table+=`
        <tr>
        <td>#${i+1}</td>
        <td>${arrPro[i].title}</td>
        <td>${arrPro[i].price}</td>
        <td>${arrPro[i].taxes}</td>
        <td>${arrPro[i].ads}</td>
        <td>${arrPro[i].discount}</td>
        <td>${arrPro[i].total}</td>
        <td>${arrPro[i].category}</td>
        <td><button id="update" onclick='updateone(${i})'>update</button></td>
        <td><button id="delet"  onclick='deletone(${i})'>delet</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML=table;
    // Create items by count order
    if(arrPro.length > 0){
        document.getElementById("deletAll").innerHTML=`
        <button onclick='deletAll()'>Delet All ( ${ arrPro.length} )</button>`
    }
    else{
        document.getElementById("deletAll").innerHTML='';
    }
}
showdata();
// delet
function deletone(i){
    arrPro.splice(i,1);
    localStorage.product=JSON.stringify(arrPro);
    showdata()
}
function deletAll(){
    localStorage.clear();
    arrPro.splice(0)
    showdata()
}

// updata
function updateone(i){
    title.value=arrPro[i].title;
    price.value=arrPro[i].price;
    taxes.value=arrPro[i].taxes;
    ads.value=arrPro[i].ads;
    discount.value=arrPro[i].discount;
    total.innerHTML=arrPro[i].total;
    category.value=arrPro[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='Update';
    btnmood='update';
    temp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}
// search
let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById("search")
    if(id == 'searchbytitle'){
        searchMood='title';
    }else{
        searchMood='category';
    }
    search.placeholder='search by '+searchMood;
    search.focus();
    search.value='';
    showdata()
}
function searchData(value){
    let table='';
    for(let i = 0; i < arrPro.length;i++){
        if(searchMood == 'title'){
                if(arrPro[i].title.includes(value.toLowerCase())){
                    table+=`
                    <tr>
                    <td>#${i}</td>
                    <td>${arrPro[i].title}</td>
                    <td>${arrPro[i].price}</td>
                    <td>${arrPro[i].taxes}</td>
                    <td>${arrPro[i].ads}</td>
                    <td>${arrPro[i].discount}</td>
                    <td>${arrPro[i].total}</td>
                    <td>${arrPro[i].category}</td>
                    <td><button id="update" onclick='updateone(${i})'>update</button></td>
                    <td><button id="delet"  onclick='deletone(${i})'>delet</button></td>
                    </tr>
                    `
                }
        }else{
                if(arrPro[i].category.includes(value.toLowerCase())){
                    table+=`
                    <tr>
                    <td>#${i}</td>
                    <td>${arrPro[i].title}</td>
                    <td>${arrPro[i].price}</td>
                    <td>${arrPro[i].taxes}</td>
                    <td>${arrPro[i].ads}</td>
                    <td>${arrPro[i].discount}</td>
                    <td>${arrPro[i].total}</td>
                    <td>${arrPro[i].category}</td>
                    <td><button id="update" onclick='updateone(${i})'>update</button></td>
                    <td><button id="delet"  onclick='deletone(${i})'>delet</button></td>
                    </tr>
                    `
                }
        }
    }
    document.getElementById("tbody").innerHTML=table;
}
// clean data