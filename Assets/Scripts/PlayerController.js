#pragma strict

public var maxSpeed:Number = 8;
public var acceleration:Number = 0.2;
public var jumpHeight:Number = 8;

private var jumpUsed:boolean = false;

function Start () {
	
}

function FixedUpdate () {

	var rb = GetComponent(Rigidbody2D);
	var sprite = transform.Find("mario animation");
	var spriteAnimationController = sprite.GetComponent(Animator);

//	if (rb.velocity.x < maxSpeed) {
//		rb.velocity.x += acceleration;
//	}

	if ( Input.GetKey(KeyCode.LeftArrow) ) {
		rb.velocity.x -= acceleration;
	} else if ( Input.GetKey(KeyCode.RightArrow) ) {
		rb.velocity.x += acceleration;
	}

	var rayStart = transform.position;
	rayStart.y -= 1.1;
	Debug.DrawRay(rayStart, -Vector2.up * 0.1, Color.green, 1 );

	var hitSomething:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);

	if ( hitSomething.collider && hitSomething.collider.tag == "Ground" && hitSomething.distance < 0.1 ) {

		spriteAnimationController.SetBool("Grounded", true);

		if ( !jumpUsed && Input.GetKey(KeyCode.UpArrow) ) {
			jumpUsed = true;
			Debug.Log("grounded and hitting up key");
			rb.velocity.y = jumpHeight;
		}

		if (Input.GetKey(KeyCode.UpArrow)) {
			jumpUsed = false;
		}

	} else {

		spriteAnimationController.SetBool("Grounded", false);
	}
}

