
// função que determina pra onde o objeto irá se movimentar.
function leDoTeclado(evento) {

    if(evento.keyCode == cima && y - taxa > 0) {
        y ++;

        //velocidade caso apertar uma direção, no caso a posição y vai receber -1
        velox = 0;
        veloy = -1;


    } else if (evento.keyCode == baixo && y + taxa < 500) {
        y ++;
        velox = 0;
        veloy = 1;
        

    } else if (evento.keyCode == esquerda && x - taxa > 0) {
        x ++;
        velox = -1;
        veloy = 0;
        

    } else if (evento.keyCode == direita && x + taxa < 500) {
        x ++;
        velox = 1;
        veloy = 0;
    }
}

// função que cria o objeto.
function desenhaCirculo(x, y, raio) {

    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

// função que cria a cauda
function desenhaCauda(xc, yc, raioc) {
    
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(xc, yc, raioc, 0, 2 * Math.PI);
    pincel.fill();
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
                pincel.fillStyle = "green";
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
        x += velox; //cada intervalo, ele movimenta o x a velox, que foi definido no teclado
        y += veloy; //mesma coisa com o y, no caso se for -1, ele vai ficar somando -1 a cada intervalo

        
        limpaTela();
        //desenhaCauda(xc, yc, 8); 
        
        
        desenhaCirculo(x, y, 10);
        desenhaMaca(xm, ym, 5);


        //condições para fazer a cobra aparecer no outro lado da tela
        if(x < 0){
            x = tabela; 
            // caso a cobra for na extremidade do lado esquerdo(0), ela ganhara o valor da tabela(400)
        }
        if(x > tabela){
            x = 0;
        }
        if(y < 0){
            y = tabela;
        }
        if(y > tabela){
            y = 0;
        }

        //condição para comer a maçã, sendo impossivel atingir a posição exata, foi feito um valor aproximado
        //valor aproximado: um raio de 15 ao redor da posição da maçã
        if(x >= xm-15 && x <= xm+15 && y >= ym-15 && y <= ym+15){
            tam_cauda++;
            xm = Math.floor(Math.random() * tabela); //método para aparecer em outra posição dentro da tabela
            ym = Math.floor(Math.random() * tabela);
            }
        

        for (var i=1; i < cauda.lenght; i ++){
            pincel.fillStyle = 'black';
            pincel.beginPath();
            pincel.arc(cauda[i].xc, cauda[i].yc, raio, 0, 2 * Math.PI);
            pincel.fill();
            cauda[i].xc = x;
            cauda[i].yc = y;

            
            
        }
        snake.push({xc: x, yc: y});
        while(cauda.length > tam_cauda){
            cauda.shift();
            }
        
    }


var tela = document.querySelector('canvas'); // Váriavel que seleciona a tela.
    var pincel = tela.getContext('2d'); // Váriavel usada para pintar na tela.
    
    // Váriavel que define a posição do objeto.
    var x = 12.5;       
    var y = 12.5;

    // Váriavel que define a posição inicial da maçã.
    var xm = 200;
    var ym = 200;

    // Váriavel que define a velocidade incial da cobra, que no caso parada.
    var velox = 0;
    var veloy = 0;
    
    // Váriavel com o valor total da tabela
    var tabela = 400;

    // Vetor para construir a cauda .
    var cauda = [];

    // Váriavel que define o tamanho inicial da cauda
  var  tam_cauda = 5

    // códigos do teclado
    var esquerda = 37
    var cima = 38
    var direita = 39
    var baixo = 40

    // Quantidade de pixel que o objeto se movimenta.
    var taxa = 25;


    // função para chamar o "atualizaTela" em um intervalo de tempo dado como segundo parâmetro.
    setInterval(atualizaTela, 9);

   document.onkeydown = leDoTeclado; //atribuição de método, quando clicar no teclado, executa a função