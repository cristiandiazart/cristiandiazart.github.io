


(async()=> {

const{value:pais}= await Swal.fire({
    
title:'Bienvenido/a!',
text: "Selecciona tu país",
confirmButtonText:'seleccionar',
input: 'select',
inputPlaceholder: 'pais',
inputOptions: {     'Argentina': 'Argentina'

,
'Mexico': 'Mexico',
'España': 'España'
},

});

if (pais){

    Swal.fire({
        title: `Has seleccionado ${pais}`
    });
}

})() 
