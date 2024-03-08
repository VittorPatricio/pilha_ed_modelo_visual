function setarCampo(){
	formPilha.elemento.value = "";
	formPilha.elemento.focus();
}

var qtdElementos = 0;

function estouro_pilha(qtd, tipo){
	if ((tipo == 'push') && (qtd == 10)){
		alert('A pilha está cheia!!!');
		return false;
	}
	if ((tipo == 'pop') && (qtd == 0)){
		alert('A pilha está vazia!!!');
		return false;
	}
	return true;
}

function verificaPontoVirgula(elemento){
	var pos = elemento.indexOf(';');
	if (pos != -1) {
		alert("O valor possui ; ");
		return false;
	}
	return true;
}

function pushElemento(elemento){
	if (estouro_pilha(qtdElementos, 'push')){
		if (verificaPontoVirgula(elemento)){
			if (qtdElementos == 0) {
				formPilha.pilha.value = elemento
			}else{
				formPilha.pilha.value += ";"+elemento;
			}
			qtdElementos += 1;
		}
	}
	mostrarPilha();	
}

function popElemento(){
	if (estouro_pilha(qtdElementos, 'pop')){
		var str = formPilha.pilha.value;
		var	pilha = str.split(";");
		
		formPilha.pilha.value = " ";
		for (index = 0; index < pilha.length - 1; index++){
			if (index == 0){
				formPilha.pilha.value = pilha[index];
			}else{
				formPilha.pilha.value += ";"+pilha[index];
			}
		}
		qtdElementos -= 1;
	}
	mostrarPilha();
}

function mostrarPilha(){
	var str = formPilha.pilha.value;
	var retorno = "A quantidade de elementos da pilha é: "+qtdElementos;
	retorno += "<br><table width='500' border='0' class='tabela'>";
	retorno += "<tr><td width='104'>Posi&ccedil;&atilde;o</td>";
	for (i = 1; i <= 10; i++){
		retorno += "<td width='35'><div align='center'><strong>"+i+"</strong></div></td>";
	}
	retorno += "</tr><tr><td>Elemento</td>";
	
	if (str != ""){
		var pilha = str.split(";");
		if (qtdElementos > 0){
			for (index = 0; index < pilha.length; index++) {
				posicao = index + 1;
				retorno += "<td><div align='center'>";
				retorno += ""+pilha[index]+"</div></td>";
			}
			while (posicao < 10){
				retorno += "<td><div align='center'></div></td>";
				posicao += 1;
			}
		}
		retorno += "</tr></table>";
		document.getElementById("conteudo").innerHTML = retorno;
	}			
	setarCampo();
}
