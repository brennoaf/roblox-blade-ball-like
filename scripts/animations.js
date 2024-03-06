export class AnimationP1{
    attack(weapon){
        weapon.style.top = '2em'
        weapon.style.transform = 'rotate(90deg)'

        setTimeout(function(){
            weapon.style.top = '-1em'
            weapon.style.transform = 'rotate(30deg)'
        }, 100)
    }
}