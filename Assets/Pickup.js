#pragma strict

public var points:int = 20;
public var speed:int = 2;
private var LC:LevelController;
private var pickedUp:boolean = false;
private var PC:PlayerController;

function Start () {

	var levelControllerGameObject = GameObject.Find("LevelController");
	LC = levelControllerGameObject.GetComponent(LevelController);

	var playerControllerGameObject = GameObject.Find("Player");
	PC = playerControllerGameObject.GetComponent(PlayerController);
}

function Update () {
	
}

function OnTriggerEnter2D(other: Collider2D) {

	Debug.Log("OnTriggerEnter2D");

	if (other.tag == "Player" && !pickedUp) {
		Debug.Log("hit by the player");

		pickedUp = true;

		// disappear
		Destroy(gameObject, 0.2);

		// ding (visual / audio effect)
		var animationController = transform.GetComponent(Animator);
		animationController.enabled = true;

		// points
		LC.addPoints(points);

		// add Speed to Level Controller
		LC.addSpeed(speed);

		// add to JumpHeight
		PC.addLevelSpeed(speed);
	}
}