const contendor=document.getElementById('contendor');// contenedor en cada pagina
const selection= document.querySelector('a[href="#"]').id;//el id del a no activo#
const formserch=document.forms[0];//formulario en cada pagina 
const checkselec=document.getElementById('select');
const checkmenu=document.getElementById('menu');
//------------for details-------------------------
const params= new URLSearchParams(location.search) ;//parametros de la pagina details
const id=params.get('id');//id enviado a la pagina details
const contenedor=document.getElementById('containerdetails');//conTenedor details
//----------------------for statistics------------------------------------------
const primerat=document.getElementById('statistics')
const segundat=document.getElementById('statisticsup')
const tercerat=document.getElementById('statisticspast')

let data=[];
let url="https://amazing-events.herokuapp.com/api/events"
//----------------TRAER DATA----------------------------
    fetch(url)
    .then(response => response.json()
        .then(dataapi => {
            data=dataapi
            //**************************MAIN-FUNCTION**********************
            pagina(selection)
            function pagina(actualpag){
    if(actualpag=="adetails"){
        cardgeneratord(foundelement(id,data.events))//recibe como parametro la card
    }else if(actualpag=="stats"){
        table1(data.events)
        tgenerator(segundat,arraycategorys(datefilterid("up",data.events,data.currentDate)))
        tgenerator(tercerat,arraycategorys(datefilterid("past",data.events,data.currentDate)))

    }
    else{
        cardgenerator(datefilterid(actualpag,data.events,data.currentDate));
    checksgenerator(arraycategorys(datefilterid(actualpag,data.events,data.currentDate)))
    
    //******************events************************//
    formserch.addEventListener('submit',(e)=>{
    e.preventDefault();
    let tex=formserch[0].value;
    let varserchfilter=serchfilter(tex,datefilterid(actualpag,data.events,data.currentDate))
    cardgenerator( categoryfilter(varserchfilter));
    } );
    checkmenu.addEventListener('change',()=>{
    let tex=formserch[0].value;
    let varserchfilter=serchfilter(tex,datefilterid(actualpag,data.events,data.currentDate))
    cardgenerator( categoryfilter(varserchfilter));
    })
    checkselec.addEventListener('change',()=>{
    let tex=formserch[0].value;
    let varserchfilter=serchfilter(tex,datefilterid(actualpag,data.events,data.currentDate))
    cardgenerator( categoryfilter(varserchfilter));
    })
    }
    }
    })
    )
    .catch(error => console.error(error.message))
//**************funciones********************//
    //------genera las cards-----------//
    function cardgenerator(arraydatos){ 
        contendor.innerHTML =''
        if(!arraydatos.length){
            contendor.innerHTML='<h6>NO FOUND EVENTS</h6>'
        }
        arraydatos.forEach(events=>{
            let bcard=document.createElement('div');
            bcard.className = 'cardconter'
            bcard.innerHTML= ` <div class="card " style="width: 18rem; padding: 1rem;">
                    <img src="${events.image}" class="card-img-top" alt=${events.name} style="box-shadow: -1px -1px 3px 3px rgba(80, 79, 79, 0.815) ;">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-center">${events.name}</h5>
                        <p class="card-text">${events.description}</p>
                        <p class="price"> Price $${events.price}<a href="./details.html?id=${events._id}" class="btn btn-primary" style="box-shadow: -1px -1px 3px 3px rgba(80, 79, 79, 0.815) ;">see more</a></p>
                    </div></div>`
                    contendor.appendChild(bcard);
        });
    }
        //---------------genera checks------//
    function checksgenerator(rcategorys){
        checkmenu.innerHTML=''
        checkselec.innerHTML=''
        rcategorys.forEach(element => {
            let limenu=document.createElement('li');
            let divselec=document.createElement('div');
            limenu.innerHTML=`<div>
            <input type="checkbox" name="${element}" id="${element}">
            <label for="${element}">${element}</label></div>` 
            divselec.innerHTML= `<input type="checkbox" name="${element}" id="${element}">
            <label for="${element}">${element}</label>` 
            checkmenu.appendChild(limenu) ;
            checkselec.appendChild(divselec);
        }); 
    }
    //******************functions filters  ******************//
        ///--------------------home,past,up---------------------//
    function datefilterid(selec,data,fecha){ 
        if(selec=="up"){
            let eventsfilter=data.filter((dat) => dat.date>=fecha);
            return eventsfilter;}else if(selec=="past"){
            let eventsfilter=data.filter((date) => date.date<=fecha);
            return eventsfilter; }else{
                    return eventsfilter=data;
            };
    };
        ///-------------------function filter-serch---------------------//
    function serchfilter(serchtex,dataserch){
        let evserchfilter=dataserch.filter((evento) =>evento.name.toLowerCase().includes(serchtex.toLowerCase()))
        return evserchfilter;
    } 
      ///-------------------function filter-categorys---------------------//
    function categoryfilter(datacheck){
        let checkactive= Array.from(document.querySelectorAll("input[type='checkbox']")).filter(activo =>activo.checked).map(elementoo =>elementoo.name);
        let fcategory=datacheck.filter(dat => checkactive.includes(dat.category));
        if(fcategory.length){
            return fcategory
        }
        return datacheck
    }
    //----------------function array categorys----------------------------//
    function arraycategorys(data){
        let arr=[];
        data.forEach(events =>arr.push(events.category));const dataarr= new Set(arr);let arraycategory=[...dataarr];
        return arraycategory;
    }
    //******************FUNCTIONS-DETAILS****************** */
        function foundelement(idf,array){
        let foundcard = array.find(i=>i._id ==idf);
        return foundcard
        }
    
        function cardgeneratord(elemento){ 
        contenedor.innerHTML = ''
            let bcardet=document.createElement('div');
            bcardet.innerHTML= ` <div class="card mb-3" style="min-width:80vw;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${elemento.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${elemento.name}</h5>
                    <p class="card-text">${elemento.description}</p>
                    <ul class="list-group">
                    <li class="list-group-item list-group-item-primary">Date: ${elemento.date}</li>
                    <li class="list-group-item list-group-item-secondary">Category: ${elemento.category}</li>
                    <li class="list-group-item list-group-item-success">Place: ${elemento.place}</li>
                    <li class="list-group-item list-group-item-danger">Capacity: ${elemento.capacity}</li>
                    <li class="list-group-item list-group-item-warning">Assistance:${elemento.assistance}</li>
                    <li class="list-group-item list-group-item-info">Price:${elemento.price}</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>`
            contenedor.appendChild(bcardet);
}
    //-----------------FUNCTIONS-STATS----------------------------
   //  el tercero es el evento con MAYOR capadidad.
    function table1(events) {
        let aasistencia=[];
        let nasistencia=[];
        events.forEach(event=>aasistencia.push(((Number(event.assistance)*100)/event.capacity)))
        aasistencia.forEach(elemento=>!elemento?NaN: nasistencia.push(elemento))  
        t1generator(indxmaycapacity(events),buscarindex(aasistencia,Math.min(...nasistencia)),buscarindex(aasistencia,Math.max(...nasistencia)),events)
    }
    function indxmaycapacity(events){
        let capacity=[];
        events.forEach(event=>capacity.push((Number(event.capacity))))
        return buscarindex(capacity,Math.max(...capacity))
    } 

    function buscarindex(array,num){
        return array.findIndex(ind=>ind==num)
    }

    function t1generator(capacityindexmax,minindex,maxindex,array){
        let tcard=document.createElement('tr');
        primerat.innerHTML =''
            tcard.innerHTML= ` <td><h6>${array[maxindex].name}</h6></td>
                                <td><h6>${array[minindex].name}</h6></td>
                                <td><h6>${array[capacityindexmax].name}</h6></td>`
        primerat.appendChild(tcard);
    }

    function tgenerator(contenedor,array){
        contenedor.innerHTML =''
        array.forEach(elemto=>{
            let bcard=document.createElement('tr');
            bcard.innerHTML= ` <td><h6>${elemto}</h6></td>
            `
                    contenedor.appendChild(bcard);
        });
    }
    
    /*function table2(events,array){
        console.log(array)
        console.log(events)
        t2generator(array)
    }*/


    