
// função que determina pra onde o objeto irá se movimentar.
function leDoTeclado(evento) {

    if(evento.keyCode == cima && cauda[0][1] - taxa > 0) {
        cauda[0][1] ++;

        //velocidade caso apertar uma direção, no caso a posição y vai receber -1
        velox = 0;
        veloy = -2;


    } else if (evento.keyCode == baixo && cauda[0][1] + taxa < 500) {
        cauda[0][1] ++;
        velox = 0;
        veloy = 2;
        

    } else if (evento.keyCode == esquerda && cauda[0][0] - taxa > 0) {
        cauda[0][0] ++;
        velox = -2;
        veloy = 0;
        

    } else if (evento.keyCode == direita && cauda[0][0] + taxa < 500) {
        cauda[0][0] ++;
        velox = 2;
        veloy = 0;
    }
}

/*
// função que cria o objeto.
function desenhaCirculo(x, y, raio) {

    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}*/

// função que cria a cauda
function desenhaCauda(cauda, raio) {
    for (var i=0; i < cauda.length; i ++){

        //para mudar a cor da cobra de vermelho e preto, no caso se o vetor i for impar, vai ser vermelho
        // e se caso o vetor i for par, vai ser preto
        if(i%2==0){
            pincel.fillStyle = 'black'; 
        }
        if(i%2==1){
            pincel.fillStyle = 'red'; 
        }

        pincel.beginPath();
        pincel.arc(cauda[i][0], cauda[i][1], raio, 0, 2 * Math.PI); // cauda[i][0] referencia a posição x dentro do elemento da cauda [i]
        pincel.fill();
        console.log(cauda[i]);
        
    }
    
    
    
        
}


// função que cria a maca
function desenhaMaca(xm, ym, raiom) {

    pincel.fillStyle = 'red';
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

    // função para atualizar a tela, desenhando o grid e o objeto.
    function atualizaTela() {
        cauda[0][0] += velox; //cada intervalo, ele movimenta o x a velox, que foi definido no teclado
        cauda[0][1] += veloy; //mesma coisa com o y, no caso se for -1, ele vai ficar somando -1 a cada intervalo

        
        limpaTela();
        desenhaCauda(cauda, 10);
        
        desenhaMaca(xm, ym, 5);

        

        //condições para fazer a cobra aparecer no outro lado da tela
        if(cauda[0][0] < 0){
            cauda[0][0] = tabela; 
            // caso a cobra for na extremidade do lado esquerdo(0), ela ganhara o valor da tabela(400)
        }
        if(cauda[0][0] > tabela){
            cauda[0][0] = 0;
        }
        if(cauda[0][1] < 0){
            cauda[0][1] = tabela;
        }
        if(cauda[0][1] > tabela){
            cauda[0][1] = 0;
        }

        //condição para comer a maçã, sendo impossivel atingir a posição exata, foi feito um valor aproximado
        //valor aproximado: um raio de 15 ao redor da posição da maçã
        if(cauda[0][0] >= xm-15 && cauda[0][0] <= xm+15 && cauda[0][1] >= ym-15 && cauda[0][1] <= ym+15){
            xm = Math.floor(Math.random() * tabela); //método para aparecer em outra posição dentro da tabela
            ym = Math.floor(Math.random() * tabela);
        }
       
        for (var p= 3; p > cauda.length; p --){
        
            cauda[p].unshift(cauda[p-1]);
            cauda[p].pop();
            
           
        }

    }


var tela = document.querySelector('canvas'); // Váriavel que seleciona a tela.
    var pincel = tela.getContext('2d'); // Váriavel usada para pintar na tela.
    

    // Váriavel que define a posição inicial da maçã.
    var xm = 200;
    var ym = 200;

    // Váriavel que define a velocidade incial da cobra, que no caso parada.
    velox = 0;
    veloy = 0;
    
    // Váriavel com o valor total da tabela
    tabela = 400;

    // Vetor para construir a cauda .
    cauda = [[62.5,12.5],[37.5,12.5] ,[12.5,12.5] ];

    // Váriavel que define o tamanho inicial da cauda
    //cauda.lengh = 2;

    // códigos do teclado
    var esquerda = 37
    var cima = 38
    var direita = 39
    var baixo = 40

    // Quantidade de pixel que o objeto se movimenta.
    var taxa = 25;


    // função para chamar o "atualizaTela" em um intervalo de tempo dado como segundo parâmetro.
    setInterval(atualizaTela, 20);

   document.onkeydown = leDoTeclado; //atribuição de método, quando clicar no teclado, executa a função