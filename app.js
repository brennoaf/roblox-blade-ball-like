import * as gameEngine from './scripts/gameEngine.js'
const player1Engine = new gameEngine.Player1();
const player2Engine = new gameEngine.Player2();
const botEngine = new gameEngine.Bot();
const ballEngine = new gameEngine.Ball();

var game = {
    engine: {
        player1: {
            content: document.getElementById('player1'),
            atkHitbox: document.getElementById('p1-hitbox'),

            X: 0,
            Y: 0,
            step: 10

        },

        player2: {
            content: document.getElementById('player2'),
            atkHitbox: document.getElementById('p2-hitbox'),

            X: 0,
            Y: 0,
            step: 10
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
        game.engine.player1.content,
        player1Engine.lookBall
    )
})



//comandos do player 1
document.addEventListener("keydown",
    (event) => {
        const keyName = event.key;
        
        let isTouching
        if (keyName === "Control") {

            let touching = player1Engine.atkHitboxP1(
                isTouching,
                game.engine.player1.atkHitbox,
                game.engine.ball.content
            )

            if(touching){
                if (game.engine.ball.speed > 0.3){
                    game.engine.ball.speed = game.engine.ball.speed * 0.95
                    game.engine.ball.content.style.transition = game.engine.ball.speed + 's';
                    
                }
                
                botEngine.botResponse(
                    game.engine.ball.speed,
                    game.engine.ball.content,
                    game.engine.player1.content,
                    game.engine.player1.X,
                    game.engine.player1.Y,
                    game.engine.player1.step,
                    ballEngine.moveToP1
                )
                
                
                ballEngine.moveToP2(
                    game.engine.ball.content,
                    game.engine.player2.content,
                    game.engine.player2.X,
                    game.engine.player2.Y,
                    game.engine.player2.step
                )
            }
        }

            
            const { posX, posY } = player1Engine.playerControl(
                event,
                game.engine.player1.X,
                game.engine.player1.Y,
                game.engine.player1.step,
                game.engine.ball.content,
                game.engine.player1.content
            )
            game.engine.player1.X = posX
            game.engine.player1.Y = posY

    },
    false,
)

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

