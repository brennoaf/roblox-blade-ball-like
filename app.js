import * as gameEngine from './scripts/gameEngine.js';
import * as animations from './scripts/animations.js';

const player1Engine = new gameEngine.Player1();
const player2Engine = new gameEngine.Player2();
const botEngine = new gameEngine.Bot();
const ballEngine = new gameEngine.Ball();
const p1Animation = new animations.AnimationP1();

var game = {
    engine: {
        player1: {
            content: document.getElementById('player1'),
            atkHitbox: document.getElementById('p1-atk-hitbox'),
            dmgHitbox: document.getElementById('p1-damage-hitbox'),
            weapon: document.getElementById('p1-weapon'),

            X: 0,
            Y: 0,
            step: 3,
            stepX: 0,
            stepY: 0

        },

        player2: {
            content: document.getElementById('player2'),
            atkHitbox: document.getElementById('p2-atk-hitbox'),

            X: 0,
            Y: 0,
            step: 10,
            stepX: 0,
            stepY: 0
        },
        ball: {
            content: document.getElementById('ball'),
            speed: 2

        }

    },
    assets: {
        startButton: document.getElementById('start-button'),
        returnButton: document.getElementById('return-button')
    }
}

window.onload = () =>{
    //isso daqui fica atualizando o player de olhar pra bola
    //(testar impactos que isso causa no pc e se tem maneiras mais eficazes)
    setInterval(() =>{
        player1Engine.lookBall(
            game.engine.player1.X,
                game.engine.player1.Y,
                game.engine.ball.content,
                game.engine.player1.content
        )
    }, 100)
}


game.assets.startButton.addEventListener('click', () => {
    game.engine.ball.content.style.transition = game.engine.ball.speed + 's';

    ballEngine.moveToP2(
        game.engine.ball.content,
        game.engine.player2.content
    )

    botEngine.botResponse(
        game.engine.ball.speed,
        game.engine.ball.content,
        game.engine.player1.content,
        game.engine.player1.X,
        game.engine.player1.Y,
        game.engine.player1.step,
        ballEngine.moveToP1
    )

})



game.assets.returnButton.addEventListener('click', 
    () => {
    if (game.engine.ballSpeed > 0.1){
        game.engine.ball.speed = game.engine.ball.speed * 0.95
        game.engine.ball.content.style.transition = game.engine.ball.speed + 's';

    }

    ballEngine.moveToP1(
        game.engine.ball.content,
        game.engine.player1.content,
        game.engine.player1.X,
        game.engine.player1.Y,
        game.engine.player1.step,
    )
})



var keysPressed = {};

function moverP1(){
    if(keysPressed['d']){game.engine.player1.X += game.engine.player1.step}
    if(keysPressed['a']){game.engine.player1.X -= game.engine.player1.step}
    if(keysPressed['s']){game.engine.player1.Y += game.engine.player1.step}
    if(keysPressed['w']){game.engine.player1.Y -= game.engine.player1.step}

    if(keysPressed['q'] && keysPressed['d']){
        game.engine.player1.X += 10
        setTimeout(() => {keysPressed['q'] = false}, 100)
    }

    requestAnimationFrame(moverP1);
    }


/////////////////////////////////
//comandos do player 1
addEventListener("keydown",
    (event) => {
            keysPressed[event.key] = true;

            if(keysPressed['Shift']){player1Engine.attack(
                game.engine.ball,
                game.engine.player1,
                game.engine.player2,
                botEngine.botResponse,
                ballEngine.moveToP1,
                ballEngine.moveToP2,
                keysPressed
            )}
                console.log(keysPressed)
            
    },
    false,
)

/////////////////////////////////





//comandos player 2
document.addEventListener('keydown', 
    (event) => {
        const keyName = event.key

        let isTouching
        if (keyName === " ") {

            let touching = player2Engine.atkHitboxP2(
                isTouching,
                game.engine.player2.atkHitbox,
                game.engine.ball.content
            )

            if(touching){
                if (game.engine.ball.speed > 0.1){
                    game.engine.ball.speed = game.engine.ball.speed * 0.95
                    game.engine.ball.content.style.transition = game.engine.ball.speed + 's';
        
                }

                ballEngine.moveToP1(
                    game.engine.ball.content,
                    game.engine.player1.content,
                    game.engine.player1.X,
                    game.engine.player1.Y,
                    game.engine.player1.step
                )
            }
        }

        const { posX, posY } = player2Engine.playerControl(
            event,
            game.engine.player2.X,
            game.engine.player2.Y,
            game.engine.player2.step,
            game.engine.ball.content,
            game.engine.player2.content
        )
        game.engine.player2.X = posX
        game.engine.player2.Y = posY
})

/////////////////////////////////

//encerrando comandos de andar
document.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
})


game.engine.ball.content.addEventListener('transitionend', () =>{
    let isTouching

    let touching = player1Engine.dmgHitboxP1(
        isTouching,
        game.engine.player1.dmgHitbox,
        game.engine.ball.content
    )

    if(touching){
        location.reload()

        }

})

game.engine.player1.content.addEventListener('transitionrun', () => {
    let isTouching

    let touching = player1Engine.dmgHitboxP1(
        isTouching,
        game.engine.player1.dmgHitbox,
        game.engine.ball.content
    )

    if(!player1Engine.checkImune()){

        if(touching){
        location.reload()
        }
    }

})

moverP1()