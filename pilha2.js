function setarCampo() {
  formPilha.elemento.value = "";
  formPilha.elemento.focus();
}

var qtdElementos = 0;

function estouro_pilha(qtd, tipo) {
  if (tipo == "push" && qtd == 10) {
    ativaAnimacao();
    const carlaoTexto = document.getElementById("carlaoTexto");
    carlaoTexto.innerHTML = "A pilha está cheia!!!";
    return false;
  }
  if (tipo == "pop" && qtd == 0) {
    ativaAnimacao();
    const carlaoTexto = document.getElementById("carlaoTexto");
    carlaoTexto.innerHTML = "A pilha está vazia!!!";
    return false;
  }
  return true;
}

function ativaAnimacao() {
  const carlaoArea = document.querySelector(".carlaoAlerta");
  carlaoArea.style.display = "flex";
  setTimeout(() => {
    carlaoArea.style.animation = "fadeOut 1s";
    carlaoArea.style.display = "none";
  }, 2000);
}

function verificaPontoVirgula(elemento) {
  const carlaoTexto = document.getElementById("carlaoTexto");
  var pos = elemento.value;


  if (pos != -1) {
    if (elemento.includes(";")) {
      ativaAnimacao();
      carlaoTexto.innerHTML = "O valor possui ;";
      return false;
    } else if (elemento.includes(",")) {
      ativaAnimacao();
      carlaoTexto.innerHTML = "O valor possui ,";
      return false;
    } else if (elemento.includes(".")) {
      ativaAnimacao();
      carlaoTexto.innerHTML = "O valor possui .";
      return false;
    } else if (elemento.includes("~")) {
      ativaAnimacao();
      carlaoTexto.innerHTML = "O valor possui ~";
      return false;
    } else if (elemento.includes("^")) {
      ativaAnimacao();
      carlaoTexto.innerHTML = "O valor possui ^";
      return false;
    } else if (elemento.includes("#")) {
      ativaAnimacao();
      carlaoTexto.innerHTML = "O valor possui #";
      return false;
    } else if (elemento.includes("$")) {
      ativaAnimacao();
      carlaoTexto.innerHTML = "O valor possui $";
      return false;
    }
  } 
  return true;
}

function pushElemento(elemento) {
  if (estouro_pilha(qtdElementos, "push")) {
    if (verificaPontoVirgula(elemento)) {
      if (qtdElementos == 0) {
        formPilha.pilha.value = elemento;
      } else {
        formPilha.pilha.value += ";" + elemento;
      }
      qtdElementos += 1;
    }
  }
  mostrarPilha();
}

function popElemento() {
  if (estouro_pilha(qtdElementos, "pop")) {
    var str = formPilha.pilha.value;
    var pilha = str.split(";");

    formPilha.elemento.value = " ";
    for (index = 0; index < pilha.length - 1; index++) {
      if (index == 0) {
        formPilha.pilha.value = pilha[index];
      } else {
        formPilha.pilha.value += ";" + pilha[index];
      }
    }
    qtdElementos -= 1;

    // Crie uma div para o elemento removido
    const elementoRemovido = document.createElement("div");
    elementoRemovido.textContent = pilha[pilha.length - 1]; // Último elemento da pilha
    elementoRemovido.classList.add("item-removido");
    document.body.appendChild(elementoRemovido);

    // Animação de queda
    const alturaInicial = window.scrollY;
    const alturaFinal = alturaInicial + 100; // Altura de queda (ajuste conforme necessário)
    let posicaoAtual = alturaInicial;

    function animacaoQueda() {
      posicaoAtual += 2; // Velocidade de queda (ajuste conforme necessário)
      if (posicaoAtual < alturaFinal) {
        elementoRemovido.style.transform = `translateY(${posicaoAtual}px)`;
        requestAnimationFrame(animacaoQueda);
      } else {
        // Remova a div após a queda
        document.body.removeChild(elementoRemovido);
        mostrarPilha();
      }
    }

    animacaoQueda();
  }
}

function mostrarPilha() {
  var str = formPilha.pilha.value;
  var retorno = "A quantidade de elementos da pilha é: " + qtdElementos;
  retorno += "<br><table width='500' border='0' class='tabela'>";
  retorno +=
    "<tr style='border-radius: 10px;'><td width='104'>Posi&ccedil;&atilde;o</td>";
  for (i = 1; i <= 10; i++) {
    retorno +=
      "<td width='35'><div align='center'><strong>" +
      i +
      "</strong></div></td>";
  }
  retorno += "</tr><tr><td>Elemento</td>";

  if (str != "") {
    var pilha = str.split(";");
    if (qtdElementos > 0) {
      for (index = 0; index < pilha.length; index++) {
        posicao = index + 1;
        retorno += "<td><div align='center'>";
        retorno += "" + pilha[index] + "</div></td>";
      }
      while (posicao < 10) {
        retorno += "<td><div align='center'></div></td>";
        posicao += 1;
      }
    }
    retorno += "</tr></table>";
    document.getElementById("conteudo").innerHTML = retorno;
  }
  setarCampo();
}
