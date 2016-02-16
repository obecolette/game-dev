#pragma strict

public var score:int = 0;
public var levelSpeed:Number = 2;

public function addPoints(points:int) {
	score += points;
	Debug.Log("Score: " + score);
}

public function addSpeed(speed:int) {
	levelSpeed += speed;
	Debug.Log("Speed: " + levelSpeed);
}

function Start () {

}

function Update () {

}