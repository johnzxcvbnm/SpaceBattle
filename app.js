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
      let myText = this.name + " hit " + enemy.name + " and did " + this.firepower + " damage!";
      myText += "\n";
      myText += enemy.name + " has " + enemy.hull + " Hull left.";
      return myText;
    } else {
      return this.name + " missed!";
    }
  }
}

const myShip = new Ship("USS Schwarzenegger", 20, 5, .7); //Player's ship
const alienShips = []; //Enemy Ships

//Resets the game and sets default values
//Empties current alien ship array then repopulates it with six new ships
const reset = (shipArray, playerShip) =>{
  playerShip.hull = 20;

  for(let x = 0; x < 6; x++){
    shipArray.pop();
  }

  for(let i = 0; i < 6; i++){
    let hull = Math.floor(Math.random() * 4) + 3;
    let firepower = Math.floor(Math.random() * 3) + 2;
    let accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    shipArray.push(new Ship("Alien " + (i+1), hull, firepower, accuracy));
  }
}

reset(alienShips, myShip);

const mainTurn = () => {
  let cmd = ""; //User's input
  let retreat = false; //Sets weither or not the user has retreated

  //Alert for beggining story line
  alert("Aliens are attacking!");

  //Looping turn
  //Exits the loop if the player dies, retreats, or if there are no more aliens
  while(!myShip.isDead() && !retreat && alienShips.length > 0)
  {
    cmd = prompt("What will you do?\n Attack?  Retreat?", "Attack/Retreat").toLowerCase();
    if(cmd === "retreat"){
      retreat = true;
    } else if(cmd === "attack"){
      //While the player and the alien ship is alive, keep attacking until one of them dies.
      while(!myShip.isDead() && !alienShips[0].isDead()){
        alert(myShip.attackShip(alienShips[0]));
        if(!alienShips[0].isDead()){
          alert(alienShips[0].attackShip(myShip));
        } else {
          alert("You blew up " + alienShips[0].name + " into a million bits!");
        }
      }

      //The alien ship was destroyed so remove it from the array
      alienShips.shift();
    } else if(cmd === "reset"){
        reset(alienShips, myShip);
    }
  }

  //Alert if you died
  if(myShip.hull <= 0){
    alert("You died!");
  }

  //Alert if you ran away from the fight
  if(retreat){
    alert("Coward!");
  }

  //Alert if you won the game
  if(alienShips.length == 0){
    alert("You win!");
  }
}

mainTurn();
