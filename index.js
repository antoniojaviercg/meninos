const URL ='https://api.thecatapi.com/v1/images/search?limit=3&api_key=15304a57-0d95-4f0e-9449-59b8247ae3b2';

const URL_favourite ='https://api.thecatapi.com/v1/favourites?&api_key=15304a57-0d95-4f0e-9449-59b8247ae3b2';

const URL_post ='https://api.thecatapi.com/v1/images/upload';

const URL_favourite_delete = (id) =>`https://api.thecatapi.com/v1/favourites/${id}?&api_key=15304a57-0d95-4f0e-9449-59b8247ae3b2`;

const spanError = document.getElementById('error')

/* fetch (URL)
.then ( res => res.json())
.then (data => {
    const img = document.querySelector("img");
    img.src = data[0].url;
}) */

async function myCat(){
     
const res = await fetch(URL);
    const data= await res.json();

    if(res.status !==200){
        spanError.innerHTML = "Hubo un error" + res.status ;
    }
    else {
         const imagen1 = document.getElementById("img1");
    const imagen2 = document.getElementById("img2");
    const imagen3 = document.getElementById("img3");
    const btn1= document.getElementById("btn1");
    const btn2= document.getElementById("btn2");
    const btn3= document.getElementById("btn3");
    imagen1.src = data[0].url;
    imagen2.src = data[1].url;
    imagen3.src = data[2].url; 

    btn1.onclick= ()=> savefavouriteMichis(data[0].id)
    btn2.onclick= ()=>savefavouriteMichis(data[1].id)
    btn3.onclick= ()=>savefavouriteMichis(data[2].id)
    }
  
    console.log(data)
    
}


document.getElementById("file").onchange= function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload= function(){
    form=document.getElementById("uploadingForm")
    const div=document.createElement("div")
    
     div.innerHTML="";
     div.classList.add("preview")
    const imagen = document.createElement("img")
    imagen.src=reader.result;
    div.append(imagen)  
    form.append(div)
    }
     
}




async function myCat_favorite(){
   
const res = await fetch(URL_favourite);
    const data= await res.json();
        console.log(data)

        if (res.status!==200){
            spanError.innerHTML = "Hubo un error" + res.status + data.message;
        }else {
            const section = document.getElementById("favouriteMichis");
            section.innerHTML = "";

            const h2 = document.createElement("h2");
            const h2Text = document.createTextNode("Tus marditos gatos guardados");
            ;
           /* const sectionFile=document.createElement("section")
            sectionFile.classList.add("uploadingMichis")
            const form=document.createElement("form")
            form.setAttribute("id","uploadingForm")
            const divFile=document.createElement("div")
            divFile.classList.add("div-file")
            const parrafo=document.createElement("p")
            parrafo.classList.add("text")
            const input=document.createElement("input")
            input.setAttribute("id", "file")
            input.setAttribute("name", "file")
            input.setAttribute("type", "file")
            const boton = document.createElement("button")
            boton.setAttribute("type", "button")
           boton.onclick=()=>uploadMichiPhoto(); 
           const botonText = document.createTextNode("Guarda tus marditos gatos");

           divFile.appendChild(parrafo)
           divFile.appendChild(input)
           boton.appendChild(botonText)
           form.appendChild(divFile)
           form.appendChild(boton)
           sectionFile.appendChild(form) */
             h2.appendChild(h2Text); 
            section.appendChild(h2)
            /* section.appendChild(sectionFile)   */

            data.forEach(michi=>{ 
                const section= document.getElementById ("favouriteMichis")
                /* const div = document.getElementById("michis-boxs") */
                const article = document.createElement("article")
                article.classList.add("heart-red_article")
                const imagen = document.createElement("img")
                /* const btn = document.createElement("button") */
                const heartRead=document.createElement("img")
                heartRead.classList.add("heart_red")
                /* const btnText= document.createTextNode("Sacar al mardito gato de aqui") */

             /*    btn.appendChild(btnText)*/
                heartRead.onclick = ()=> deleteFavouriteMichi(michi.id); 
                imagen.src=michi.image.url
                heartRead.src="/assets/corazon_1.svg"
                article.appendChild(imagen)
                article.appendChild(heartRead)
               /*  div.appendChild(article) */
               section.appendChild(article) 
                
               /* const sectionFile=document.createElement("section")
            sectionFile.classList.add("uploadingMichis")
            const form=document.createElement("form")
            const divFile=document.createElement("div")
            divFile.classList.add("div-file")
            const parrafo=document.createElement("p")
            parrafo.classList.add("text")
            const input=document.createElement("input")
            input.setAttribute("id", "file")
            input.setAttribute("name", "file")
            input.setAttribute("type", "file")
            const boton = document.createElement("button")
            boton.setAttribute("type", "button")
           boton.onclick=()=>uploadMichiPhoto(); 

           divFile.appendChild(parrafo)
           divFile.appendChild(input)
           form.appendChild(divFile)
           form.appendChild(boton)
           sectionFile.appendChild(form)
             */

            })


    
        }
    }
    
   

async function savefavouriteMichis(id){
 const res = await fetch(URL_favourite,{
    method: 'POST',
    headers: {
        'Content-type' : 'application/json'
    },
    body : JSON.stringify({
           
        image_id: id
    }),
 })

 console.log("hola mardita")
 console.log(res)

 const data = await res.json();

 if (res.status!==200){
    spanError.innerHTML = "Hubo un error" + res.status + data.message;
}else{
    console.log("michi guardado")
    myCat_favorite()
}

}


async function deleteFavouriteMichi(id){
    const res = await fetch(URL_favourite_delete(id),{
        method: 'DELETE',
         
     })
    
     console.log("hola mardita")
     console.log(res)
    
const data = await res.json();

if (res.status!==200){
    spanError.innerHTML = "Hubo un error" + res.status + data.message;
}else{
    console.log("michi eliminado")
    myCat_favorite()
}
}


async function uploadMichiPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form)

    const res = await fetch (URL_post,{
        method : "POST",
        headers: {
            'X-API-KEY': '15304a57-0d95-4f0e-9449-59b8247ae3b2' 
        },
        body : formData
    })

    const data = await res.json();

    if (res.status!==201){
        spanError.innerHTML = "Hubo un error" + res.status + data.message;
    }else{
        console.log("foto del mardito gato subida")
        savefavouriteMichis(data.id)
        
    }

}

myCat()
myCat_favorite()