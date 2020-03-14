class Interprete{

    nExtenso(indice){
       indice = indice.split(",");

       const extenso = [
            ["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez",
             "onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove"],
            ["","","vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"],
            ["cem","cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos",
             "oitocentos","novecentos"]];

        var word = extenso[indice[0]][indice[1]];
        if(word == "cem")indice[1] = 1;
        return [word, indice[0], indice[1]];
    }
    toAlgarismo(numero){
        
        var numero = numero.toLowerCase();
        var palavra = numero.split(" ");

        var sinal = 1;
        var soma = 0;
        var virgula = "-";
        var erro = false;
        
        for(var i = 0; i < palavra.length; i++){
                   
            if(palavra[i] == "menos"){sinal = -1; i++}
            if(palavra[i] == "e") {i++};
            if(palavra[i] == "vírgula" || palavra[i] == "ponto"){
                virgula = soma.toString() + "."; 
                soma = 0; 
                i++;
                if(palavra [i] == "zero"){soma = "0"; i++}
            }
                        
            for(var j = 0; j < this.index(palavra[i]).length; j++){

                var indice = this.index(palavra[i])[j];
                
                if(palavra[i] == this.nExtenso(indice)[0]){
                    
                    indice = this.nExtenso(indice);
                    soma += (indice[2] * Math.pow(10,indice[1]));
                    console.log(soma);
                    break;
                
                }
                
                if(j == this.index(palavra[i]).length - 1)erro = true;
            }
            if(erro == true){alert( 'erro "' + palavra[i] + '".');return "erro"}         
        }

        return ((virgula != "-")?virgula + soma.toString(): soma)* sinal;
    }
    index(palavra){
        
        var inicio = palavra.substring(0,1);

        if(inicio == "z") return ["0,0"];
        if(inicio == "u") return ["0,1"];
        if(inicio == "d") return ["0,2","0,10","0,12","0,16","0,17","0,18","0,19","2,2"]
        if(inicio == "o") return ["0,8","0,11","1,8","2,8"];
        if(inicio == "c") return ["0,5","1,5","2,0","2,1"];
        if(inicio == "v") return ["1,2"];
        if(inicio == "t") return ["0,3","0,13","1,3","2,3"];
        if(inicio == "q") return ["0,4","0,14","0,15","1,4","2,4","2,5"];
        if(inicio == "s") return ["0,6","0,7","1,6","1,7","2,6","2,7"];
        if(inicio == "n") return ["0,9","1,9","2,9"];

        return ["0,0"];
    }

    toExtenso(numero){
       
        if(isNaN(parseInt(numero))) return "erro";
        if(numero > 999.99 || numero < -999.99) {
            numero = numero.toString();
            if(numero.split(".").length > 1)numero = numero.split(".")[0] + "," + numero.split(".")[1]; 
            return numero + " (fora do alcance do intérprete)";
        }
  
        var v = ""
        if(parseInt(numero) != parseFloat(numero)){
            numero = parseFloat(numero);
            v = parseFloat(numero.toFixed(2));
            v = v.toString().split(".");
        }
        return this.toExtenso1(numero) + ((v != "")?" vírgula " + ((v[1].substring(0,1) == "0")? "zero " : "") 
        + this.toExtenso1(v[1]):"")
    }
    toExtenso1(numero){
        
        var frase = "";
        if (numero < 0){frase = "menos "; numero *= -1;} 

        if(parseInt(numero) == 100) return frase + "cem";

        var centenas = parseInt(numero / 100);
        var dezenas = parseInt((numero % 100) / 10);
        var unidades = parseInt((numero % 100) % 10);
      
        if(centenas > 0)frase += this.nExtenso("2,"+centenas)[0] + ((dezenas > 0 || unidades > 0)? " e " : "");
        if(dezenas == 1) return frase + this.nExtenso("0,1"+unidades)[0];
        if(dezenas > 1) frase += this.nExtenso("1,"+dezenas)[0] + ((unidades > 0)? " e ": "");
        if(dezenas == 0 && centenas == 0) return frase + this.nExtenso("0,"+unidades)[0];
        return frase + ((unidades > 0)? this.nExtenso("0,"+unidades)[0]: "");
    }    
}