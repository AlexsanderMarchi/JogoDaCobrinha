
//Função que usa o teclado para determinar em qual direção o objeto irá se movimentar.
function leDoTeclado(evento) {
    

    if(evento.keyCode === cima) {
        sentidoAtual = cima;


    } else if (evento.keyCode === baixo) {
        sentidoAtual = baixo;
        

    } else if (evento.keyCode === esquerda) {
        sentidoAtual = esquerda;
        

    } else if (evento.keyCode === direita) {
        sentidoAtual = direita;
    }
}

//Função para fazer a cauda seguir a cabeça da cobra.
function deslocarCauda(){

    //se a cobra estiver se deslocando para direita:
    if (sentidoAtual === direita) {
        cauda.unshift([cauda[0][0]+15,cauda[0][1]]);
        cauda.pop();
    }
    
    //se a cobra estiver se deslocando para esquerda:
    if (sentidoAtual === esquerda) {
        cauda.unshift([cauda[0][0]-15,cauda[0][1]]);
        cauda.pop();
    }

    //se a cobra estiver se deslocando para cima:
    if (sentidoAtual === cima) {
        cauda.unshift([cauda[0][0],cauda[0][1]-15]);
        cauda.pop();
    }

    //se a cobra estiver se deslocando para baixo:
    if (sentidoAtual === baixo) {
        cauda.unshift([cauda[0][0],cauda[0][1]+15]);
        cauda.pop();
    }
    


}
// função para criar a cauda
function desenhaCauda(cauda, raio) {
    for (var i=0; i < cauda.length; i ++){

        /*
        Condição para mudar a cor da cobra de vermelho e preto, 
        semelhante a uma coral. No caso se o vetor i for impar, 
        vai ser vermelho e se caso o vetor i for par, vai ser preto.
         */

        if(i%2==0){
            pincel.fillStyle = 'black'; 
        }
        if(i%2==1){
            pincel.fillStyle = 'red'; 
        }

        //Formato da cobra.
        pincel.beginPath();
        pincel.arc(cauda[i][0], cauda[i][1], raio, 0, 2 * Math.PI); // cauda[i][0] referencia a posição x dentro do elemento da cauda [i]
        pincel.fill();
        
        
    }      
}


// função que cria a maçã verde.
function desenhaMaca(xm, ym, raiom) {

    pincel.fillStyle = 'green';
    pincel.beginPath();
    pincel.arc(xm, ym, raiom, 0, 2 * Math.PI);
    pincel.fill();
}


// função que desenha o grid.
function limpaTela() {
    var descer = 0; 
    while(descer <=400){
        for(var imp= 0; imp<=400;imp=imp+25){
            pincel.fillStyle = "lightblue";
            pincel.beginPath();
            pincel.rect(imp, descer, 25, 25);
            pincel.closePath();
            pincel.fill();
                    
        }
        descer = descer + 25; 
    }    
}


//Função para finalizar o jogo, e reiniciar do zero.
function gameOver(){
    alert("Game Over");                 //Mensagem de game over.
    cauda = [[62.5,12.5],[] ,[] ];      //posição e tamanho inicial da cobra.
    sentidoAtual = direita;             //Sentido inicial da cobra sendo para a direita.
}

    // função para atualizar a tela, desenhando o grid e o objeto.
    function atualizaTela() {


        limpaTela();                    //Função que desenha a tabela a cada intervalo.
    
        deslocarCauda();                //Função para sempre ver o sentido da cobra.

        desenhaCauda(cauda, 10);        //Função para desenhar o tamanho da cobra.
        
        desenhaMaca(xm, ym, 5);         //Função para criar a maçã verde.
        
       


        //condições para caso a cobra bater na parede, reiniciar o jogo.
        if(cauda[0][0] < 0){
            gameOver();
        }
        if(cauda[0][0] > tabela){
            gameOver();
        }
        if(cauda[0][1] < 0){
            gameOver();
        }
        if(cauda[0][1] > tabela){
            gameOver();
        }


        //Repetição caso o jogador encoste no próprio rabo.
        for(var i = 1; i<cauda.length; i++){
            if(cauda[0][0] === cauda[i][0] && cauda[0][0] === cauda[i][0] &&  
                cauda[0][1] === cauda[i][1] && cauda[0][1] === cauda[i][1]){
                    gameOver();
                }
            
        }

        /*
        Condição para comer a maçã, sendo impossivel atingir a posição exata, 
        foi feito um valor aproximado do valor aproximado: um raio de 15 ao redor 
        da posição da maçã.
        */
        if(cauda[0][0] >= xm-15 && cauda[0][0] <= xm+15 && cauda[0][1] >= ym-15 && cauda[0][1] <= ym+15){
            cauda.length += 1;
            if(pontos<100){
                pontos+=10;
            }
            if(pontos>=30 && pontos<300){
                pontos+=20;
            }
            if(pontos>=300 && pontos<800){
                pontos+=50;
            }
            if(pontos === 800){
                alert("Você ganhou")
            }
            xm = Math.floor(Math.random() * tabela); //método para aparecer em outra posição dentro da tabela
            ym = Math.floor(Math.random() * tabela);
        }
       
        
        
    }






//Jogo onde é declarado as variáveis e chamadas as funções.
var tela = document.querySelector('canvas');    // Váriavel que seleciona a tela.
    var pincel = tela.getContext('2d');         // Váriavel usada para pintar na tela.
    

    // Váriaveis que define a posição inicial da maçã verde.
    var xm = 200;
    var ym = 200;
    
    // Váriavel com o valor total da tabela
    var tabela = 400;

    // Vetor para construir a cauda, sendo a primeira posição a cabeça e a ultima o final da cauda.
    var cauda = [[62.5,12.5],[] ,[] ];

    //sentido da cobrinha:
    var sentidoAtual;

    //Pontuação
    var pontos = 0;

    // códigos do teclado
    var esquerda = 37
    var cima = 38
    var direita = 39
    var baixo = 40


    // função para chamar o "atualizaTela" em um intervalo de tempo dado como segundo parâmetro.
    setInterval(atualizaTela, 60);

   document.onkeydown = leDoTeclado; //atribuição de método, quando clicar no teclado, executa a função