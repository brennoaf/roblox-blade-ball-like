import * as gameEngine from './scripts/gameEngine.js';
import * as animations from './scripts/animations.js';

const player1Engine = new gameEngine.Player1();
const player2Engine = new gameEngine.Player2();
const botEngine = new gameEngine.Bot();
const ballEngine = new gameEngine.Ball();
const playerAnimation = new animations.AnimationP1();

var game = {
    engine: {
        player: [{
            content: document.getElementById('player1'),
            atkHitbox: document.getElementById('p1-atk-hitbox'),
            dmgHitbox: document.getElementById('p1-damage-hitbox'),
            weapon: document.getElementById('p1-weapon'),

            X: 0,
            Y: 0,
            step: 3,
            stepX: -410,
            stepY: 0

        },
        {
            content: document.getElementById('player2'),
            atkHitbox: document.getElementById('p2-atk-hitbox'),
            dmgHitbox: document.getElementById('p2-damage-hitbox'),
            weapon: document.getElementById('p2-weapon'),

            X: 0,
            Y: 0,
            step: 3,
            stepX: 410,
            stepY: 0
        }],

        ball: {
            content: document.getElementById('ball'),
            speed: 2,
            possibilites: document.querySelectorAll('.player[id]'),
            goingTo: [0, 1]

        },

    },

    assets: {
        startButton: document.getElementById('start-button'),
        returnButton: document.getElementById('return-button')
    }
}



game.assets.startButton.addEventListener('click', () => {
    game.engine.ball.content.style.transition = game.engine.ball.speed + 's';


    setInterval(() => {
        ballEngine.keepMoving(
            game.engine.ball.content,
            game.engine.player[game.engine.ball.goingTo[0]].content,
            game.engine.player[game.engine.ball.goingTo[0]].X,
            game.engine.player[game.engine.ball.goingTo[0]].Y,
            game.engine.player[game.engine.ball.goingTo[0]].step,
            game.engine.player[game.engine.ball.goingTo[0]].stepX
        )
        
    }, 100)


})



game.assets.returnButton.addEventListener('click', 
    () => {

    ballEngine.moveToP1(
        game.engine.ball.content,
        game.engine.player[0].content,
        game.engine.player[0].X,
        game.engine.player[0].Y,
        game.engine.player[0].step,
    )
})



var keysPressed = {};

function moverP1(){
    if(keysPressed['d']){game.engine.player[0].X += game.engine.player[0].step}
    if(keysPressed['a']){game.engine.player[0].X -= game.engine.player[0].step}
    if(keysPressed['s']){game.engine.player[0].Y += game.engine.player[0].step}
    if(keysPressed['w']){game.engine.player[0].Y -= game.engine.player[0].step}

    if(keysPressed['q'] && keysPressed['d']){
        game.engine.player[0].X += 10
        setTimeout(() => {keysPressed['q'] = false}, 100)
    }

    requestAnimationFrame(moverP1);
}


////////////////////////////////////////////////
//comandos do player 1
addEventListener("keydown",
    (event) => {
            keysPressed[event.key] = true;


            if(keysPressed['Shift']){
                playerAnimation.attack(game.engine.player[0].weapon)

                player1Engine.attack(
                    game.engine.ball,
                    game.engine.player[game.engine.ball.goingTo[0]],
                    game.engine.player[game.engine.ball.goingTo[1]],
                    keysPressed,
                )

            }      
            
    },
    false,
)

///////////////////////////////////////////////////////




function moverP2(){
    if(keysPressed['ArrowRight']){game.engine.player[1].X += game.engine.player[0].step}
    if(keysPressed['ArrowLeft']){game.engine.player[1].X -= game.engine.player[0].step}
    if(keysPressed['ArrowDown']){game.engine.player[1].Y += game.engine.player[0].step}
    if(keysPressed['ArrowUp']){game.engine.player[1].Y -= game.engine.player[0].step}

    if(keysPressed['l'] && keysPressed['ArrowRight']){
        game.engine.player[1].X += 10
        setTimeout(() => {keysPressed['l'] = false}, 100)
    }

    requestAnimationFrame(moverP2);
}

//comandos player 2
document.addEventListener('keydown', 
    (event) => {
        const keyName = event.key

        if (keyName === " ") {
            playerAnimation.attack(game.engine.player[1].weapon)

                player1Engine.attack(
                    game.engine.ball,
                    game.engine.player[game.engine.ball.goingTo[0]],
                    game.engine.player[game.engine.ball.goingTo[1]],
                    keysPressed,
                )
            }

        
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
        game.engine.player[game.engine.ball.goingTo[0]].dmgHitbox,
        game.engine.ball.content
    )

    if(touching){
        location.reload()

        }

})

for(let i=0; i < game.engine.ball.possibilites.length; i++){
    game.engine.player[i].content.addEventListener('transitionrun', () => {
        let isTouching

        let touching = player1Engine.dmgHitboxP1(
            isTouching,
            game.engine.player[game.engine.ball.goingTo[0]].dmgHitbox,
            game.engine.ball.content
        )

        if(!player1Engine.checkImune()){

            if(touching){
            location.reload()
            }
        }

    })
}



moverP1()
moverP2()

window.onload = () =>{
    //isso daqui fica atualizando o player de olhar pra bola
    //(testar impactos que isso causa no pc e se tem maneiras mais eficazes)
    setInterval(() =>{
        for(let i = 0; i<2; i++){
        player1Engine.lookBall(
            game.engine.player[i].X,
                game.engine.player[i].Y,
                game.engine.ball.content,
                game.engine.player[i].content   
        )
        }
    }, 100)
}