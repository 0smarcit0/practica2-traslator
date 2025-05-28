import { POST } from "../pages/api/save.json";
//tablas necesarias para la conversion
let glifos = ["Ξ","ΦΞ","Ψ","ΦΨ","Φ","ΩΦ","Δ","ΔΦ","ΩΔ","Ω","ΣΩ","Λ","ΛΩ","ΣΛ","Σ"];
let tabla =new  Map();
tabla.set("xi",1000);
tabla.set("phi/xi",900);
tabla.set("psi",500);
tabla.set("phi/psi",400);
tabla.set("phi",100);
tabla.set("omega/phi",90);
tabla.set("delta",50);
tabla.set("delta/phi",50);
tabla.set("omega/delta",40);
tabla.set("omega",10);
tabla.set("sigma/omega",9);
tabla.set("lambda",5);
tabla.set("lambda/omega",5);
tabla.set("sigma/lambda",4)
tabla.set("sigma",1);
//manipulacion del DOM
let output = document.querySelector(".output");
let outputG = document.querySelector(".outputG");
let input = document.querySelector(".input");
let form = document.querySelector("form")

//evento para  guardar la data accediendo al endpoint
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("hola");
    let data = new FormData(form);
    let d = Object.fromEntries(data);

    let res =  fetch("/api/save.json",{
        method: "POST",
        body: JSON.stringify(d)
    }).then((res)=>{
        console.log("subido")
    }).catch((err)=>{
        console.log("error");
    })
    console.log(d);
})
//funcion para la traduccion en tiempo real
input.addEventListener("keyup",()=>{
      async function poner() {
        output.value = await procesar(input.value); 
      }
      poner();
           
});

//funcion para tomar el valor del input y convertirlo
async function procesar(data){
    let n;
    let r;
    let final = "";
    let final2= "";
    let separation;
    let p_data = data.split("\n");
    
    for (let index = 0; index < p_data.length; index++) {
        n = Number(p_data[index]);
        //cuando se tiene el input, este se traduce llamando a traslate
        r = await traslate(n);
        separation = r.split("=");
        console.log(r)
        final = final+separation[0]+"\n";
        final2 = final2+separation[1]+"\n";
    }
    
    console.log(final);
    outputG.value = final2;
    return final;
}

//funcion de conversion

function traslate(num){
    //variables auxiliares
    let i =0;
    let j =0;
    let n = num;
    let r = ""+n+"  $"
    let r2="";
    let key = tabla.keys();
    //usamos asincronia para que funcione correctamente
    return new Promise((resolve, reject) =>{
        //validaciones
        if (Number.isNaN(n)) {
            r = "ERROR: entrada invalida, no es un numero.";
            r2 = "ERROR: entrada invalida, no es un numero.";
        }else{
            if (n>3999) {
                r = "ERROR: entrada invalida, debe ser un numero menor a 4000";
                r2 = "ERROR: entrada invalida, debe ser un numero menor a 4000"
            }else{
                
                if (n>0) {
                    key.forEach(element =>{
                
                    n = Math.floor(num/tabla.get(element))
                    if(n>0){
                        //se divide el numero y se pone el signo tantas veces diga el resultado de la division
                        while(i<n) {
                            r = r+"/"+element;
                            r2 = r2+glifos[j];
                            i++;
                        }
                        //se usa el % para quitar esa parte del numero que ya se hizo
                        num = num%tabla.get(element);       
                        i=0;
                    }
                    j++;
                });
                }
            }
           j=0;
        }
        //se resuelve la promise enviando una cadena con el valor en palabra=glifo
        resolve(r+"="+r2);
    });
}
