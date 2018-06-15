class Ship {
  constructor(name, hull, firepower, accuracy){
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  //Returns wether or not the ship has hit the target
  hitNoHit() { return this.accuracy >= Math.random(); }

  //Returns weither or not the ship has been destroyed
  isDead() { return this.hull <= 0; }

  //Attacks the enemy ship and decrements their health accordingly
  //Returns a string with what happened
  attackShip(enemy){
    if(this.hitNoHit()){
      enemy.hull -= this.firepower;
      let myText = "<br>" + this.name + " hit " + enemy.name + " and did " + this.firepower + " damage!";
      myText += "<br>";
      myText += enemy.name + " has " + enemy.hull + " Hull left.";
      return myText;
    } else {
      return "<br>" + this.name + " missed!";
    }
  }
}

const myShip = new Ship("USS Schwarzenegger", 20, 5, .7); //Player's ship
const alienShips = []; //Enemy Ships
const combatText = document.getElementById("battleText"); //textBox which has all the text from 'combat'

//Enables the Attack and Retreat Buttons
const enableButtons = () => {
  document.getElementById("attackButton").addEventListener('click', combat);
  document.getElementById("retreatButton").addEventListener('click', fullRetreat);
  document.getElementById("scanButton").addEventListener('click', getStatus);
}

//Disables the Attack and Retreat Buttons
const disableButtons = () => {
  document.getElementById("attackButton").removeEventListener('click', combat);
  document.getElementById("retreatButton").removeEventListener('click', fullRetreat);
  document.getElementById("scanButton").removeEventListener('click', getStatus);
}

//Adds text to the combat log
const pushText = (text) => {
  combatText.innerHTML += text;
}

//Resets the game and sets default values
//Empties current alien ship array then repopulates it with six new ships
const reset = () =>{
  //Disables all the buttons in case you reset mid-game
  disableButtons();
  enableButtons();

  //Default story text that is displayed in the begining
  combatText.innerHTML = "You are in Earth's Orbit on board the USS Schwarzenegger.  It's serene and peaceful.  It's amazing how beautiful the stars look, especially when they're getting bigger and bigger and start blowing up the moon base. Wait a minute!  Those are aliens!  You are Earth's only hope to stop them (due to budget cuts).  You have to make a last stand here and now!<br><br>";

  //Default player ship hull value
  myShip.hull = 20;

  //Empty out the alien ship array
  alienShips.splice(0, alienShips.length);

  //Adds in 5 to 10 alien ships
  const random = Math.floor(Math.random() * 6) + 5;
  for(let i = 0; i < random; i++){
    let hull = Math.floor(Math.random() * 4) + 3; //Hull is 3-6
    let firepower = Math.floor(Math.random() * 3) + 2; //Firepower is 2-4
    let accuracy = (Math.floor(Math.random() * 3) + 6) / 10; //Accuracy is 0.6-0.8
    alienShips.push(new Ship("Alien " + (i+1), hull, firepower, accuracy));
  }
}

//Gives a full status update on your ship as well as the alien ships
//All the information from your ship and the remaining alien ships is stored on a string which is then pushed into the combat textbox
const getStatus = () => {
  let temp = `<br>My ship - ${ myShip.name }<br>Hull - ${myShip.hull}<br>Firepower - ${myShip.firepower}<br>Accuracy - ${myShip.accuracy}<br>`;

  for(let alien of alienShips){
    temp += `<br>${ alien.name }<br>Hull - ${ alien.hull }<br>Firepower - ${ alien.firepower }<br>Accuracy - ${ alien.accuracy }<br>`
  }
  pushText(temp);
}

//When the player chooses to retreat
//Function disables the attack and retreat buttons
const fullRetreat = () =>{
  pushText("<br><br>Congradulations, just when the Earth needs you, you decided to tuck your tail between your legs and fly off.  Do you even know where you're going?  Did you even think that far ahead, or did you just decide that dying wasn't worth the minimum wage that they pay you?  Either way you lose.  I guess you ended up dying because you chocked on a ham sandwich or something, I don't know and frankly I don't care.  The end.");
  disableButtons();
}

//Checks to see if the player has won or lost
const winCheck = () => {
  //If the player has exited out of combat and died, display this message and disable the buttons
  if(myShip.isDead()){
    pushText("<br><br>You died!  Well, no one case say that you didn't try, mainly because they're all dead too.  Great Job!");
    disableButtons();
  }

  //If there are no more aliens to fight, then the player has won.  Display the message and disable the buttons
  if(alienShips.length == 0){
    pushText("<br><br>You braved the alien attack and have defeated the invaders! Unfortunately someone else takes all the credit so you get nothing.  Sorry.");
    disableButtons();
  }
}

//When the player decides to attack, they attack until either they are dead or until the alien is dead
const combat = () => {

  //Keep looping until one enemy is dead
  while(!myShip.isDead() && !alienShips[0].isDead()){

    //Player automatically attacks first
    pushText(myShip.attackShip(alienShips[0]));

    //If the alien survives, then (s)he attacks
    if(!alienShips[0].isDead()){
      pushText(alienShips[0].attackShip(myShip));

      //If the alien died, alert the player
    } else {
      pushText("<br>You blew up " + alienShips[0].name + " into a million bits!<br>");
    }
  }//End of Loop

  //Delete the top alien, even if the player lost
  alienShips.shift();

  //Checks to see if the player has won or lost
  winCheck();
}


reset();
document.getElementById("resetButton").addEventListener("click", reset, false);
