
/*
/const usuarios = [{
    nombre: 'marta',
    mail: 'marta@mail.com',
    pass: '123m',

},
{
    nombre: 'sandro',
    mail: 'sandro@mail.com',
    pass: 'damefuego123',

},

{
    nombre: 'cajlo',
    mail: 'cajlito@mail.com',
    pass: 'terelover123',
    


}]*/


const shopContent = document.getElementById ("shopContent");
const verCarrito = document.getElementById ('verCarrito');
const modalContainer = document.getElementById ('modal-container');


 
const equipos = [

    {
    id: 1,    
    nombre:'sony a7 III',
    precio: 10000,
    img: './img/a7 III.jpg',
    sensor:'fullframe',
    resolucion: '4k',
    cantidad: 1,
    },
    {
    id: 2,        
    nombre:'sony a7 SIII',
    precio: 20000,
    img: './img/a7 SIII.jpg',
    sensor:'fullframe',
    resolucion: '4k',
    cantidad: 1,
    },
    
    {
    id: 3,           
    nombre:'sony fx3',
    precio: 25000,
    img: './img/fx3.jpg',
    sensor:'fullframe',
    resolucion: '4k',
    cantidad: 1,
    },

] 


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

equipos.forEach ((equipments) => {

let content = document.createElement('div');
content.className = 'card';
content.innerHTML = `
    <img src="${equipments.img}">
    <h3>${equipments.nombre}</h3>
    <p>${equipments.precio}</p>
    <p>${equipments.resolucion}</p>
`;

shopContent.append (content)

let comprar = document.createElement ('div')
comprar.innerHTML = 
'<button type="button" class="btn btn-primary">comprar</button>';
comprar.className = 'comprar';

content.append (comprar);

comprar.addEventListener ('click',()=>{

    const repeat = carrito.some((repeatProduct)=> repeatProduct.id === equipments.id);

    if(repeat){
        carrito.map((prod)=>{
            if(prod.id === equipments.id){
                prod.cantidad++;
            }
        })
    }else{

  


    carrito.push({
            id: equipments.id,
            img: equipments.img,
            nombre: equipments.nombre,
            precio: equipments.precio,
            cantidad: equipments.cantidad,  

    });
    console.log(carrito);
    saveLocal();
    }

})
    
});



const pintarCarrito = () => {

modalContainer.innerHTML = '';
modalContainer.style.display = 'flex';
const modalHeader = document.createElement('div');
modalHeader.className ='modal-header'
modalHeader.innerHTML = `
<h1 class="modal-header-tittle"> Tu carrito </h1>

`
modalContainer.append(modalHeader);





const modalButton = document.createElement ("h1");
modalButton.innerText = 'x';
modalButton.className = 'modal-header-button';

modalButton.addEventListener('click',()=>{
    modalContainer.style.display = 'none';
})


modalHeader.append(modalButton);




carrito.forEach ((equipments)=>{

let carritoContent = document.createElement('div');
carritoContent.className = 'modal-content'
carritoContent.innerHTML = `

<img src="${equipments.img}">
<h3>${equipments.nombre}</h3>
<p>${equipments.precio}$</p>
<spa class="restar">-</spa>
<p>Cantidad:${equipments.cantidad}</p>
<spa class="sumar">+</spa>
<p>Total:${equipments.cantidad*equipments.precio}</p>
<span class="delete-product">❌</span>

`;

modalContainer.append(carritoContent);


let restar = carritoContent.querySelector(".restar")

restar.addEventListener('click',()=>{
    if(equipments.cantidad!==1){
        equipments.cantidad--;    
    }
    saveLocal();
    pintarCarrito();
})

let sumar= carritoContent.querySelector('.sumar')
sumar.addEventListener('click',()=>{
    equipments.cantidad++;
    saveLocal();
    pintarCarrito();
})

let eliminar = carritoContent.querySelector('.delete-product');

eliminar.addEventListener('click',()=>{
    eliminarProducto(equipments.id);

})



});



const total = carrito.reduce((acc,el)=> acc+ el.precio * el.cantidad,0);
const totalBuying = document.createElement ('div')
totalBuying.className = 'total-content'
totalBuying.innerHTML = `

total a pagar: ${total}$


`;


modalContainer.append(totalBuying);

};

verCarrito.addEventListener('click',pintarCarrito); 

const eliminarProducto = (id) => {
    const foundId = carrito.find ((Element)=> Element.id === id );

    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId;

    });

    saveLocal();
    pintarCarrito();
};

const saveLocal = ()=>{

localStorage.setItem('carrito',JSON.stringify (carrito));    
};



let listado = document.querySelector("#lista");


fetch("./data.json") 
.then((res)=> res.json())
.then ((data)=>{
    console.log(data);

    data.map((item)=>{
        const content = document.createElement("div")
        content.innerHTML = `
        <h4>${item.nombre}:</h4>
        <h5>${item.descripcion}</h5>
        `;

        listado.append(content);
    })
});