#pragma strict

public var score:int = 0;
public var speedDrainRate:Number = 0.0000000000001;
public var maxSpeed:Number = 15;
public var minSpeed:Number = 1;
private var PC:PlayerController;

public var levelSpeed:Number = 0;

function Start () {
    var playerControllerGameObject = GameObject.Find("Player");
	PC = playerControllerGameObject.GetComponent(PlayerController);
   
}

public function addPoints(points:int) {
	score += points;
	Debug.Log("Score: " + score);
}

function Update () {

}

function FixedUpdate () {
	levelSpeed -= speedDrainRate;
    Debug.Log(levelSpeed);
}