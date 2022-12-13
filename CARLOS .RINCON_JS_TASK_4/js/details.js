const info=data.events;//guardo el array de eventos para details 
const params= new URLSearchParams(location.search) ;//parametros de la pagina details
const id=params.get('id');//id enviado a la pagina details
const contenedor=document.getElementById('containerdetails');//conyenedor details

cardgeneratord(foundelement(id,info))//recibe como parametro la card

//---------funtions--------------
