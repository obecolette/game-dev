#pragma strict

public var score:int = 0;

public function addPoints(points:int) {
	score += points;
	Debug.Log("Score: " + score);
}

function Start () {

}

function Update () {

}