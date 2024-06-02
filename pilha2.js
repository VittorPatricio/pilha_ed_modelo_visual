class Pilha {
  constructor() {
    this.elementos = [];
    this.qtdElementos = 0;
  }

  estouroPilha(tipo) {
    if (tipo === "push" && this.qtdElementos === 10) {
      this.ativaAnimacao("A pilha está cheia!!!");
      return false;
    }
    if (tipo === "pop" && this.qtdElementos === 0) {
      this.ativaAnimacao("A pilha está vazia!!!");
      return false;
    }
    return true;
  }

  ativaAnimacao(mensagem) {
    const carlaoArea = document.querySelector(".carlaoAlerta");
    const carlaoTexto = document.getElementById("carlaoTexto");
    carlaoTexto.innerHTML = mensagem;
    carlaoArea.style.display = "flex";
    setTimeout(() => {
      carlaoArea.style.animation = "fadeOut 1s";
      carlaoArea.style.display = "none";
    }, 2000);
  }

  verificaPontoVirgula(elemento) {
    if (elemento.trim() === "") {
      this.ativaAnimacao("O valor não pode ser vazio!");
      return false;
    }

    for (const char of elemento) {
      switch (char) {
        case ";":
          this.ativaAnimacao("O valor possui ;");
          return false;
        case "~":
          this.ativaAnimacao("O valor possui ~");
          return false;
        case "^":
          this.ativaAnimacao("O valor possui ^");
          return false;
        case "#":
          this.ativaAnimacao("O valor possui #");
          return false;
        case "$":
          this.ativaAnimacao("O valor possui $");
          return false;
        default:
          break;
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
      let posicao = 0; // Declara e inicializa a variável posicao aqui
      if (this.qtdElementos > 0) {
        for (let index = 0; index < pilha.length; index++) {
          posicao = index + 1;
          retorno += `<td><div align='center'>${pilha[index]}</div></td>`;
        }
        while (posicao < 10) {
          posicao += 1;
          retorno += `<td><div align='center'></div></td>`;
        }
      }
    }

    retorno += `</tr></table>`;
    document.getElementById("conteudo").innerHTML = retorno;
  }
}

const minhaPilha = new Pilha();
minhaPilha.mostrarPilha();

document.getElementById("retirar").addEventListener("click", () => {
  minhaPilha.popElemento();
});

document.getElementById("adicionar").addEventListener("click", () => {
  const elemento = document.getElementById("elemento").value;
  minhaPilha.pushElemento(elemento);
});
