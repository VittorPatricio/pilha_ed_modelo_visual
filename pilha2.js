const carlaoTexto = document.getElementById("carlaoTexto");

class Pilha {
  constructor() {
    this.elementos = [];
    this.qtdElementos = 0;
  }

  estouroPilha(tipo) {
    if (tipo === "push" && this.qtdElementos === 10) {
      this.ativaAnimacao();
      carlaoTexto.innerHTML = "A pilha está cheia!!";
      return false;
    }
    if (tipo === "pop" && this.qtdElementos === 0) {
      this.ativaAnimacao();
      carlaoTexto.innerHTML = "A pilha está vazia!!";
      return false;
    }
    return true;
  }

  ativaAnimacao() {
    const carlaoArea = document.querySelector(".carlaoAlerta");
    carlaoArea.style.display = "flex";
    setTimeout(() => {
      carlaoArea.style.animation = "fadeOut 1s";
      carlaoArea.style.display = "none";
    }, 2000);
  }

  verificaPontoVirgula(elemento) {
    var pos = elemento.value;
    if (elemento.trim() === "") {
      this.ativaAnimacao();
        carlaoTexto.innerHTML = "O valor não pode ser nulo!";
        return false;
    }
  
    if (pos != -1) {
      if (elemento.includes(";")) {
        this.ativaAnimacao();
        carlaoTexto.innerHTML = "O valor possui ;";
        return false;
      } else if (elemento.includes("~")) {
        this.ativaAnimacao();
        carlaoTexto.innerHTML = "O valor possui ~";
        return false;
      } else if (elemento.includes("^")) {
        this.ativaAnimacao();
        carlaoTexto.innerHTML = "O valor possui ^";
        return false;
      } else if (elemento.includes("#")) {
        this.ativaAnimacao();
        carlaoTexto.innerHTML = "O valor possui #";
        return false;
      } else if (elemento.includes("$")) {
        this.ativaAnimacao();
        carlaoTexto.innerHTML = "O valor possui $";
        return false;
      }
    } 
    return true;
  }

  pushElemento(elemento) {
    if (this.estouroPilha("push")) {
      if (this.verificaPontoVirgula(elemento)) {
        this.elementos.push(elemento);
        this.qtdElementos += 1;
      }
    }
    this.mostrarPilha();
  }

  popElemento() {
    if (this.estouroPilha("pop")) {
      const elementoRemovido = this.elementos.pop();
      this.qtdElementos -= 1;

      const divElementoRemovido = document.createElement("div");
      divElementoRemovido.textContent = elementoRemovido;
      divElementoRemovido.classList.add("item-removido");
      document.body.appendChild(divElementoRemovido);

      const alturaInicial = window.scrollY;
      const alturaFinal = alturaInicial + 100; 
      let posicaoAtual = alturaInicial;

      const animacaoQueda = () => {
        posicaoAtual += 2; 
        if (posicaoAtual < alturaFinal) {
          divElementoRemovido.style.transform = `translateY(${posicaoAtual}px)`;
          requestAnimationFrame(animacaoQueda);
        } else {
          document.body.removeChild(divElementoRemovido);
          this.mostrarPilha();
        }
      };

      animacaoQueda();
    }
  }

  mostrarPilha() {
    const str = this.elementos.join(";");
    let retorno = `A quantidade de elementos da pilha é: ${this.qtdElementos}<br><table width='500' border='0' class='tabela'>
      <tr style='border-radius: 10px;'>
        <td width='104'>Posi&ccedil;&atilde;o</td>`;
    
    for (let i = 1; i <= 10; i++) {
      retorno += `<td width='35'><div align='center'><strong>${i}</strong></div></td>`;
    }
    
    retorno += `</tr><tr><td>Elemento</td>`;

    if (str !== "") {
      const pilha = str.split(";");
      let posicao;  
      if (this.qtdElementos > 0) {
        for (let index = 0; index < pilha.length; index++) {
          posicao = index + 1;
          retorno += `<td><div align='center'>${pilha[index]}</div></td>`;
        }
        while (posicao < 10) {
          retorno += `<td><div align='center'></div></td>`;
          posicao += 1;
        }
      }
    }
    
    retorno += `</tr></table>`;
    document.getElementById("conteudo").innerHTML = retorno;
  }
}


const minhaPilha = new Pilha();
minhaPilha.mostrarPilha();