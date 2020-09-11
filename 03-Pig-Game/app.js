/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var roundScore,scores,activePlayer,gamePlaying,winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
   
    if(gamePlaying){
        var dice1=Math.floor(Math.random()*6)+1;

        var dice2=Math.floor(Math.random()*6)+1;

        var dice1DOM=document.querySelector('.dice-1');
        dice1DOM.style.display='block';
        dice1DOM.src='dice-'+dice1+'.png';

        var diceDOM2=document.querySelector('.dice-2');
        diceDOM2.style.display='block';
        diceDOM2.src='dice-'+dice2+'.png';

    if(dice1 === 6 && dice2 === 6)
        {
            scores[activePlayer]=0;
            document.querySelector('#score-'+activePlayer).textContent= scores[activePlayer];
            nextPlayer();

        }else if(dice1 !== 1 && dice2!==1) {

            roundScore += dice1;
            roundScore += dice2;
            document.querySelector('#current-'+activePlayer).textContent=roundScore;

        } else {

            nextPlayer();
        }
       
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
            scores[activePlayer]+=roundScore;
        document.querySelector('#score-'+activePlayer).textContent= scores[activePlayer];
        if(scores[activePlayer]>=winningScore)
        {
            document.querySelector('#name-'+activePlayer).textContent= 'Winner!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying=false;

        }else{
            nextPlayer()
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.final-score').addEventListener('keyup', function(){

    var input=document.querySelector('.final-score').value;
    var numbers = /^[0-9]+$/;
    if(input.match(numbers))
    {
        winningScore=input;
        document.querySelector('.error-message').style.display='none';
    }else if(input===''){
        document.querySelector('.error-message').style.display='none';
        winningScore=100;
    }
    else
    {
        document.querySelector('.error-message').style.display='block';
        document.getElementById('error-message').innerHTML = "Invalid Final Score";
    }
    
});

function nextPlayer()
{
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    roundScore=0;

    document.getElementById('current-1').textContent='0';
    document.getElementById('current-0').textContent='0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display='none';
    document.querySelector('.dice-2').style.display='none';
}

function init()
{
    roundScore=0;
    scores=[0,0];
    activePlayer= 0;
    gamePlaying=true;
    winningScore=100;

    document.getElementById('score-1').textContent='0';
    document.getElementById('score-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.querySelector('.dice-1').style.display='none';
    document.querySelector('.dice-2').style.display='none';
    document.getElementById('name-0').textContent= 'Player 1';
    document.getElementById('name-1').textContent= 'Player 2';

    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


}