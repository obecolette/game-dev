#pragma strict

public var points:int = 20;
private var LC:LevelController;
private var pickedUp:boolean = false;

function Start () {
	var levelControllerGameObject = GameObject.Find("LevelController");
	LC = levelControllerGameObject.GetComponent(LevelController);
}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
	Debug.Log("OnTriggerEnter2D");

	if (other.tag == "Player" && !pickedUp) {
		Debug.Log("hit by the player");

		pickedUp = true;

		// disappear
		Destroy(gameObject, 1);

		// ding (visual / audio effect)
		var animationController = transform.GetComponent(Animator);
		animationController.enabled = true;

		// points
		LC.addPoints(points);
	}
}