import * as animations from './animations.js'
const animationP1 = new animations.AnimationP1();

export class Player1{

    lookBall(posX, posY, ballContent, player){
        const ballRect = ballContent.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        var dx = ballRect.left - playerRect.left;
        var dy = ballRect.top - playerRect.top;

        const angle = Math.atan2(dy, dx) * 180 / Math.PI; // Converte radianos para graus

        player.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;
        return angle

    }

    playerControl(event, posX, posY, step, ballContent, player){

        //controles (ajeitar isso pelo amor)
        switch (event.key) {
            case 'w':
                posY -= step;
                break;
            case 'a':
                posX -= step;
                break;
            case 's':
                posY += step;
                break;
            case 'd':
                posX += step;
                break;
            default:
                break;
        }

        this.lookBall(posX, posY, ballContent, player)

        return { posX, posY }
    }
    
    imune = false
    checkImune(){
        return this.imune  
    }

    setImune(imune){
        this.imune = imune
    }

    Attack(event, ball, player1, player2, botResponse, moveToP1, moveToP2){

        let isTouching
        if (event.key === "Shift") {

            //criando variavel para retornar um boolean se tive no hitbox do atk
            let touching = this.atkHitbox(
                isTouching,
                player1.atkHitbox,
                ball.content
            )

            //se tiver tocando...
            if(touching){
                if (ball.speed > 0.3){
                    ball.speed = ball.speed * 0.95
                    ball.content.style.transition = ball.speed + 's';
                    
                    this.setImune(true)

                    setTimeout(() => {

                        this.setImune(false)
                    }, ball.speed * 1000);
                }
                
                //resposta do bot (ajeitar pra deixar o bot opcional depois)
                botResponse(
                    ball.speed,
                    ball.content,
                    player1.content,
                    player1.X,
                    player1.Y,
                    player1.step,
                    moveToP1
                )
                
                
                moveToP2(
                    ball.content,
                    player2.content,
                    player2.X,
                    player2.Y,
                    player2.step
                )
            }
            
            animationP1.attack(player1.weapon)
        }
        return { ball }
    }

    atkHitbox(touching, hitbox1, ball){
        touching = false

        let hb1Rect = hitbox1.getBoundingClientRect();
        let hbBall = ball.getBoundingClientRect();

        //checa se uma div ta em cima da outra (testando se é realmente eficaz)
        if (
            hb1Rect.right > hbBall.left && 
            hb1Rect.left < hbBall.right && 
            hb1Rect.bottom > hbBall.top &&
            hb1Rect.top < hbBall.bottom
            ){
                touching = true
                console.log('sim')
        }else{
            touching = false
            console.log('nao')
        }

        return(touching)
    }

    dmgHitboxP1(touching, hitbox1, ball){
        touching = false

        let hb1Rect = hitbox1.getBoundingClientRect();
        let hbBall = ball.getBoundingClientRect();

        if (
            hb1Rect.right > hbBall.left && 
            hb1Rect.left < hbBall.right && 
            hb1Rect.bottom > hbBall.top &&
            hb1Rect.top < hbBall.bottom
            ){
                touching = true

        }else{
            touching = false

        }

        return(touching)
    }
}


export class Player2{
    lookBall(posX, posY, ballContent, player){
        const ballRect = ballContent.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        var dx = ballRect.left - playerRect.left;
        var dy = ballRect.top - playerRect.top;

        const angle = Math.atan2(dy, dx) * 180 / Math.PI; // Converte radianos para graus

        player.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;

    }


    playerControl(event, posX, posY, step, ballContent, player){

        switch (event.key) {
            case 'ArrowUp':
                posY -= step;
                break;
            case 'ArrowLeft':
                posX -= step;
                break;
            case 'ArrowDown':
                posY += step;
                break;
            case 'ArrowRight':
                posX += step;
                break;
            default:
                break;
        }

            this.lookBall(posX, posY, ballContent, player)
        return { posX, posY }
    }


    atkHitboxP2(touching, hitbox2, ball){
        touching = false

        let hb2Rect = hitbox2.getBoundingClientRect();
        let hbBall = ball.getBoundingClientRect();

        if (
            hb2Rect.right > hbBall.left && 
            hb2Rect.left < hbBall.right && 
            hb2Rect.bottom > hbBall.top &&
            hb2Rect.top < hbBall.bottom
            ){
                touching = true
                console.log('sim')
        }else{
            touching = false
            console.log('nao')
        }

        return touching;
    }
}



export class Bot{

    botResponse(ballSpeed, ballContent, p1, posX, posY, step, moveToP1){
        let botReflex = ballSpeed * 1000 * 0.95
        
        setTimeout(function(){
            moveToP1(ballContent, p1, posX, posY, step)

        }, botReflex)
        
        return ballContent.style.translate;
    }
}



export class Ball{

     moveToP1(ball, p1, posX, posY, step,) {
        console.log('Indo até P1');


        //coisas que fazem a bola andar e se mexer
        var deltaX = p1.offsetLeft - ball.offsetLeft;
        var deltaY = p1.offsetTop - ball.offsetTop;

        //calculando a distância a partir de pitágoras na diferença
        //da relação entre a esquerda e o top do player para a bola
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        
        const normalizedDeltaX = (deltaX / distance) * step;
        const normalizedDeltaY = (deltaY / distance) * step;

        posX += normalizedDeltaX - 410;
        posY += normalizedDeltaY;
    
        ball.style.transform = `translate(${posX}px, ${posY}px)`;
        /////////////////////////////////////////////////////////////////

        //fazendo a bola continuar seguindo
 
        }
    

    
    moveToP2(ball, p1, posX, posY, step) {
        console.log('Indo até P2');


        var deltaX = p1.offsetLeft - ball.offsetLeft;
        var deltaY = p1.offsetTop - ball.offsetTop;

        //calculando a distância a partir de pitágoras na diferença
        //da relação entre a esquerda e o top do player para a bola
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        
        const normalizedDeltaX = (deltaX / distance) * step;
        const normalizedDeltaY = (deltaY / distance) * step;

        posX += normalizedDeltaX + 400;
        posY += normalizedDeltaY;
    
        function move() {
            ball.style.transform = `translate(${posX}px, ${posY}px)`;
        }
    
        window.requestAnimationFrame(move);
    }
}