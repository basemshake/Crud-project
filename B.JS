let titel = document.getElementById('titel');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let adds = document.getElementById('adds');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let datee = document.getElementById('datee');
let count =document.getElementById ('count');
let category =document.getElementById ('category');
let submit =document.getElementById ('submit');
let searchtitle = document.getElementById("searchtitle");
let searchcategory = document.getElementById("searchcategory");

let mood='cereat'
let tem='';


function gettotal(){
   
       if( price.value !=''){ 
        let result = ( +price.value + +taxes.value + +adds.value ) - +discount.value ;

                 total.innerHTML = result ;
                 total.style.background='green';

        }else{
        
         total.innerHTML='';
         total.style.background='red';

         }



}



function gettotal(){
    let result= ( +price.value + +taxes.value + +adds.value ) - +discount.value ;
    total.innerHTML = result;
     total.style.background = 'green';

   
        if( total.innerHTML == 0){

            total.style.backgroundColor = 'red';

        }
}







//cereat and seve data

let datapro;

if( localStorage.product != null){

    datapro = JSON.parse(localStorage.product)
}else{
    datapro=[];
}

 

submit.onclick = function(){
    let newPro = {
        titel:titel.value,
        price:price.value,
        taxes:taxes.value,
        adds:adds.value,
        discount:discount.value,
        total:total.innerHTML,
        datee:datee.value,
        count:count.value,
        category:category.value,
    }
    if(mood==='cereat'){
        if(newPro.count > 1){
        for( let i=0 ; i <newPro.count; i++){
            datapro.push(newPro)
        }

        }else{
        datapro.push(newPro);
        }
    
    }else{

        datapro[ tem ]=newPro;
        mood='cereat'
        submit.innerHTML='cereat'
        count.style.display='block'
    }
    
    localStorage.setItem( 'product', JSON.stringify(datapro)   )
    total.style.background='red';
    


        clearData()
        showeData()

}


//clear data

function clearData(){

    titel.value = '';
    price.value = '';
    taxes.value = '';
    adds.value = '';
    discount.value = '';
    total.innerHTML = '';
    datee.value='';
    count.value = '';
    category.value = '';
   

}



//showeData



function showeData(){
    let table=''; 
    for (let i = 0; i < datapro.length; i++) {
        table +=`
        <tr>
            <td> ${i+1} </td>
            <td> ${datapro[i].titel} </td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].adds}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].datee}</td>
            <td> ${datapro[i].category}</td>
            <td><button onclick=updatedata(${i}) id="update">UPDATE</button></td>
            <td><button onclick="deleatData(${i})" id="deleat">DELEAT</button></td>
       </tr>
     `
    }  
        document.getElementById('tabel').innerHTML=table;
    
      let deleatall = document.getElementById('ptndeleatall');
       
       if(datapro.length > 0){
        deleatall.innerHTML=`
        <button onclick=" deleatall()">Deleat All (${datapro.length}) </button>
        `
       }else{
        deleatall.innerHTML='';

       }

}

   showeData()





   //deleat
  
   

function deleatData(i)
   {
        datapro.splice(i,1);
        localStorage.product= JSON.stringify(datapro) ;

        showeData()
   }


    //deleat all
    function deleatall(){
        localStorage.clear();
        datapro.splice(0)
        showeData()
    }    
  // update
  function updatedata(i)
  {
     titel.value=datapro[i].titel;
     price.value=datapro[i].price;
     taxes.value=datapro[i].taxes;
     adds.value=datapro[i].adds;
     discount.value=datapro[i].discount;
     gettotal();
     datee.value=datapro[i].datee;
     count.style.display='none';
     category.value=datapro[i].category;
     submit.innerHTML="Update";
     mood = 'update'
     tem= i ;
     scroll({
        top:0,
        behavior:"smooth",
     })
  }

  //search();
  
    let sereachMood = 'titel';
    function getsereachmood(id)
    {
        let search=document.getElementById('search')
        if(id=="searchtitel"){
         sereachMood = 'titel';
         search.placeholder= 'search by titel'

        }else{
        sereachMood = 'category';
        search.placeholder= 'search by category'

        }
        search.focus()
        search.value='';
        showeData()
    }


function searchData(value){
    let table='';
    if(sereachMood=='titel')
        for(let i =0; i<datapro.length; i++){

                if(datapro[i].titel.toLowerCase().includes(value)){

                table +=`
                <tr>
                    <td> ${i+1} </td>
                    <td> ${datapro[i].titel} </td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].adds}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].datee}</td>
                    <td> ${datapro[i].category}</td>
                    <td><button onclick=updatedata(${i}) id="update">UPDATE</button></td>
                    <td><button onclick="deleatData(${i})" id="deleat">DELEAT</button></td>
            </tr>
            `

         }



    }else{
        for(let i =0; i<datapro.length; i++){
            if(datapro[i].category.toLowerCase().includes(value)){table +=`
            <tr>
                <td> ${i+1} </td>
                <td> ${datapro[i].titel} </td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].adds}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].datee}</td>
                <td> ${datapro[i].category}</td>
                <td><button onclick=updatedata(${i}) id="update">UPDATE</button></td>
                <td><button onclick="deleatData(${i})" id="deleat">DELEAT</button></td>
        </tr>
        `


}
        }
    }

    document.getElementById('tabel').innerHTML=table;

}

