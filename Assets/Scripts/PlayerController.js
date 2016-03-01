#pragma strict

public var maxSpeed:Number = 8;
public var acceleration:Number = 0.2;
public var jumpHeight:Number;
public var upwardForce:Number;
private var jumpUsed:boolean = false;
private var LC:LevelController;
private var mode = "jumping"; 

function Start () {
	// Get level controller
    
    var levelControllerGameObject = GameObject.Find("LevelController");
    var LC = levelControllerGameObject.GetComponent(LevelController);
    
    jumpHeight = LC.levelSpeed;
}

public function skyLevelTrigger() {
    
    var levelControllerGameObject = GameObject.Find("LevelController");
    var LC = levelControllerGameObject.GetComponent(LevelController);

	mode = "flying";
    Debug.Log(mode);
    
    LC.speedDrainRate = 0.003;
    LC.levelSpeed = 6;
    Debug.Log(LC.levelSpeed);
}

public function spaceLevelTrigger() {
    var levelControllerGameObject = GameObject.Find("LevelController");
    var LC = levelControllerGameObject.GetComponent(LevelController);
    
    mode = "floating";
    
    LC.levelSpeed = 20;
}

function FixedUpdate () {
    
    var levelControllerGameObject = GameObject.Find("LevelController");
    var LC = levelControllerGameObject.GetComponent(LevelController);
    
    jumpHeight = LC.levelSpeed;
    upwardForce = LC.levelSpeed;

	var rb = GetComponent(Rigidbody2D);
    
    var rayStart = transform.position;
    rayStart.y -= 1.1;
    Debug.DrawRay(rayStart, -Vector2.up * 0.1, Color.green, 1 );

    var hitSomething:RaycastHit2D = Physics2D.Raycast(rayStart, -Vector2.up, 0.1);
    
    
	if (mode == "jumping") {
        
        if ( Input.GetKey(KeyCode.LeftArrow) ) {
        rb.velocity.x -= acceleration;
        } else if ( Input.GetKey(KeyCode.RightArrow) ) {
            rb.velocity.x += acceleration;
        }

		if ( hitSomething.collider && hitSomething.collider.tag == "Ground" && hitSomething.distance < 0.1 ) {

			if ( !jumpUsed && Input.GetKey(KeyCode.UpArrow) ) {
                
				jumpUsed = true;
				rb.velocity.y = jumpHeight; // get JumpSpeed from LevelController
			}

			if (Input.GetKey(KeyCode.UpArrow)) {
                
				jumpUsed = false;
			}

		} else if ( hitSomething.collider && hitSomething.collider.tag == "SkyLevelTrigger" && hitSomething.distance < 0.1  ) {

			Debug.Log("Sky Level Triggered");
			skyLevelTrigger();
		}	


	} else if ( mode == "flying" ) {
        
        if ( Input.GetKey(KeyCode.LeftArrow) ) {
            rb.velocity.x -= acceleration;
        } else if ( Input.GetKey(KeyCode.RightArrow) ) {
            rb.velocity.x += acceleration;
        }
        
		rb.velocity.y = upwardForce;
        
        if ( hitSomething.collider && hitSomething.collider.tag == "SpaceLevelTrigger" && hitSomething.distance < 0.1 ) {
            
            Debug.Log("Space Level Triggered");
            spaceLevelTrigger();
        }

	} else if ( mode == "floating") {
        
        LC.speedDrainRate = 0;
        rb.gravityScale = 0;
        rb.velocity.y = 0;
        
        if ( Input.GetKey(KeyCode.UpArrow) ) {
            
            rb.drag = 0;
            rb.velocity.y += 1;
            
            if ( Input.GetKeyUp(KeyCode.UpArrow) ) {
                
                rb.drag = 20;
            }
            
        } else if ( Input.GetKey(KeyCode.LeftArrow) ) {
            
            rb.velocity.x -= 1;
            
            if ( Input.GetKeyUp(KeyCode.LeftArrow) ) {
                
                rb.velocity.x = 0;
            }
        }
        
        
    } else {
	}
} 

