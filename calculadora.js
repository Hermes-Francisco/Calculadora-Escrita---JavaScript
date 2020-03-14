function prevent(e){
    e.preventDefault();
}

document.getElementById("formulario").addEventListener('submit', prevent);

var num = document.getElementById("texto");

i = new Interprete();
    
function interpretar(numero){
    return (!isNaN(parseInt(numero)))? iniMaiuscula(i.toExtenso(numero)) : i.toAlgarismo(numero);
}

function apagar(){num.value = ""; num.focus();}
function soma(){num.value += " mais "; num.focus()}
function subitracao(){num.value += " menos "; num.focus()}
function multiplicacao(){num.value += " vezes "; num.focus()}
function divisao(){num.value += " dividido por "; num.focus()}

function iniMaiuscula(palavra){
    return palavra.substring(0,1).toUpperCase() + palavra.substring(1);
}

var n1;
var operation;
var n2;

function separation(frase){
    
    frase = frase.toLowerCase();
    var palavra = frase.split(" ");
    
    for(var i = 0; i < palavra.length; i++){
        if(i == 0)i++;
        var p = palavra[i];
        if(p == "mais"||p == "menos"||p == "vezes"||p == "dividido"){
            operation = p + ((p == "dividido")? " por":"");
            break;
        }
        if(i == palavra.length - 1) alert("Você não escreveu a operação, ou a escreveu errado.")
    }
    frase = frase.split(" " + operation + " ");
    n1 = frase[0];
    n2 = frase[1];
        
}
function calculo(){
    separation(num.value);
    if (n1.split(",").length > 1) n1 = n1.split(",")[0] + "." + n1.split(",")[1];
    if (n2.split(",").length > 1) n2 = n2.split(",")[0] + "." + n2.split(",")[1];
    if (isNaN(n1)) n1 = interpretar(n1);
    if (isNaN(n2)) n2 = interpretar(n2);
    n1=parseFloat(n1);
    n2=parseFloat(n2);

    if(operation == "mais") num.value = interpretar(n1 + n2);
    if(operation == "menos") num.value = interpretar(n1 - n2);
    if(operation == "vezes") num.value = interpretar(n1 * n2);
    if(operation == "dividido por") num.value = interpretar(n1 / n2);
}
function regras(){
    alert("Você pode escrever '10,5 vezes dois'; 'dez vírgula cinco vezes 2'; ou 'dez vírgula cinco vezes dois', por exemplo. \nO maior número aceito é 999,99 e o menor é -999,99. \n"+
    "A precisão máxima é de duas casas decimais - numeros com mais casas decimais são arredondados.\n\nProgramado por: Hermes Francisco. Data: 14/03/2020")
}