#pragma strict

public var maxSpeed:Number = 8;
public var acceleration:Number = 0.2;
public var jumpHeight:Number;
public var upwardForce:Number;
private var jumpUsed:boolean = false;
private var LC:LevelController;

function Start () {
	// Get level controller
    
    var levelControllerGameObject = GameObject.Find("LevelController");
    var LC = levelControllerGameObject.GetComponent(LevelController);
    
    jumpHeight = LC.levelSpeed;
    
}

public function skyLevelTrigger() {

	var rb = GetComponent(Rigidbody2D);
	rb.gravityScale = 0;
}

function FixedUpdate () {
    
    var levelControllerGameObject = GameObject.Find("LevelController");
    var LC = levelControllerGameObject.GetComponent(LevelController);
    
    jumpHeight = LC.levelSpeed;
    upwardForce = LC.levelSpeed;

	var rb = GetComponent(Rigidbody2D);
	var sprite = transform.Find("mario animation");
	var spriteAnimationController = sprite.GetComponent(Animator);

	if ( Input.GetKey(KeyCode.LeftArrow) ) {
		rb.velocity.x -= acceleration;
	} else if ( Input.GetKey(KeyCode.RightArrow) ) {
		rb.velocity.x += acceleration;
	}

	var mode = "jumping";
	if (mode == "jumping") {

		var rayStart = transform.position;
		rayStart.y -= 1.1;
		Debug.DrawRay(rayStart, -Vector2.up * 0.1, Color.green, 1 );

		var hitSomething:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);

		if ( hitSomething.collider && hitSomething.collider.tag == "Ground" && hitSomething.distance < 0.1 ) {
			
			spriteAnimationController.SetBool("Grounded", true);

			if ( !jumpUsed && Input.GetKey(KeyCode.UpArrow) ) {
				jumpUsed = true;
				Debug.Log("grounded and hitting up key");
				rb.velocity.y = jumpHeight; // get JumpSpeed from LevelController
			}

			if (Input.GetKey(KeyCode.UpArrow)) {
				jumpUsed = false;
			}

		} else if ( hitSomething.collider && hitSomething.collider.tag == "SkyLevelTrigger" && hitSomething.distance < 0.1  ) {

			Debug.Log("Sky Level Triggered");

			skyLevelTrigger();
		}

	} else if ( mode == "jumping" ) {
		


	} else if ( mode == "flying" ) {

		

	} else {

		spriteAnimationController.SetBool("Grounded", false);
	}
} 

