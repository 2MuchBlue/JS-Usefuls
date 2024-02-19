
/*
	A bunch of 3D related functions for easy 3D projects.

 	!! REMEMBER, All Rotations Are Done In Degrees !!
*/

///// ===== Consts To Play With =====
    let focalLegnth = 400;

    let Camera = {
        x : 0,
        y : 0,
        z : 0,

        rotation: {
            yPlane : 0,
            xPlane : 0
        },

        properties : {
            nearClip : 50,
            farClip : 1000,

            perspective : true
        }
    };



// ===== Main Content =====

// == don't change! ==
  let deltaTime = 0;
  
  class vec3{
      constructor (x, y, z){
          this.x = x; 
          this.y = y;
          this.z = z;
      }
  }

// ===== Canvas Constants =====
  const canvasElement = document.getElementById('mainCanvas');
  const ctx = canvasElement.getContext('2d');
  const canvasHalfWidth = canvasElement.width * 0.5;
  const canvasHalfHeight = canvasElement.height * 0.5;

//Degree to Radiun Converson
const deg2rad = Math.PI / 180.0;


// vector3 constants for QOL
const Vector3 = {
    zero : new vec3(0, 0, 0),
    right : new vec3(1, 0, 0),
    forward : new vec3(0, 0, 1),
    up : new vec3(0, 1, 0)
};

const Math3 = { // basic 3D vector math
    add(vecA, vecB){ // adds the vectors per componant (x1 + x2, y1 + y2...)
        let total = new vec3(0, 0, 0);

        total.x = vecA.x + vecB.x;
        total.y = vecA.y + vecB.y;
        total.z = vecA.z + vecB.z;

        return(total);
    },

    subt(vecA, vecB){ // subtracts the vectors per componant (x1 - x2, y1 - y2...)
        let total = new vec3(0, 0, 0);

        total.x = vecA.x - vecB.x;
        total.y = vecA.y - vecB.y;
        total.z = vecA.z - vecB.z;

        return(total);
    },

    mult(vecA, vecB){ // a * b (per componant)
        let total = new vec3(
            vecA.x * vecB.x,
            vecA.y * vecB.y,
            vecA.z * vecB.z
        );
        return total;
    },

    divide(vecA, vecB){ // divison ( <vecA> devided by <vecB> )
        let total = new vec3(
            vecA.x / vecB.x,
            vecA.y / vecB.y,
            vecA.z / vecB.z
        );
        return total;
    },

    scale(vec, scalar){ // scales vector by the scaler ( <vec> * <scalar> )
        let total = new vec3(
            vec.x * scalar,
            vec.y * scalar,
            vec.z * scalar
        );
        return total;
    },
    
    distance(point1, point2){ // distance between 2 vec3s ( distance between <point1> and <point2> ) 
        let a = point1.x - point2.x;
        let b = point1.y - point2.y;
        let c = point1.z - point2.z;
    
        return Math.sqrt((a * a) + (b * b) + (c * c));
    },

    dotProduct(p1, p2){
        return (p1.x * p2.x) + (p1.y * p2.y) + (p1.z * p2.z);
    },
};

// clockwise detection
function clockwiseCheck(vertices) { // writen 'clockwiseCheck([ <vec2A>, <vec2B>, <vec2C>...)' all vertices should be 2D Points
    let area = 0;
    for (let i = 0; i < vertices.length; i++) {
        j = (i + 1) % vertices.length;
        area += vertices[i].x * vertices[j].y;
        area -= vertices[j].x * vertices[i].y;
    }
    return (area / 2 < 0);
}

const Draw3 = {
    Triangle(p1, p2, p3, color, yPlane, xPlane){ // unrotated 3D points to make a triangle
        
        if (yPlane === undefined){
            yPlane = Camera.rotation.yPlane;
        }
        
        if (xPlane === undefined){
            xPlane = Camera.rotation.xPlane;
        }

        let p1Rot = fullRot(p1, yPlane, xPlane);
        let p2Rot = fullRot(p2, yPlane, xPlane);
        let p3Rot = fullRot(p3, yPlane, xPlane);

        let p1projected = projectPoint(p1Rot);
        let p2projected = projectPoint(p2Rot);
        let p3projected = projectPoint(p3Rot);

        let normal = getNormalFromVectors(p1, p2, p3);
        let center = Math3.scale( Math3.add( Math3.add(p1, p2), p3 ), 1/3);

        let clockwise = clockwiseCheck([p1projected, p2projected, p3projected]);
        if(clockwise){
            ctx.beginPath();
            ctx.moveTo(p1projected.x + canvasHalfWidth, p1projected.y + canvasHalfHeight);
            ctx.lineTo(p2projected.x + canvasHalfWidth, p2projected.y + canvasHalfHeight);
            ctx.lineTo(p3projected.x + canvasHalfWidth, p3projected.y + canvasHalfHeight);
            ctx.closePath();

            ctx.fillStyle = color;
            ctx.strokeStyle = '#000000';

            ctx.fill();
            ctx.stroke();
        }

        return {
            clockwise : clockwise,
            normal : normal,
            center : center
        };
    }
};

// ===== functions =====
    function rot(a, b, angle){ // basic spin (degrees!!!!!!)
        return {
            x : a * Math.cos(angle * deg2rad) + b * Math.sin(angle * deg2rad),
            y : a * -Math.sin(angle * deg2rad) + b * Math.cos(angle * deg2rad)
        };
    }

    function fullRot(vector, yPlane, xPlane){ // rotates a point by a yPlane and xPlane value (Degrees!!!!)
        if (yPlane === undefined){
            yPlane = Camera.rotation.yPlane;
        }
        
        if (xPlane === undefined){
            xPlane = Camera.rotation.xPlane;
        }

        return {
            x : rot(vector.x, vector.z, yPlane).x,
            y : rot( rot(vector.x, vector.z, yPlane).y, vector.y, xPlane).x,
            z : rot( rot(vector.x, vector.z, yPlane).y, vector.y, xPlane).y
        }
    }

    function getNormalFromVectors(p1, p2, p3){ // returns normalised normal of vectors
        let v = {x : p2.x - p1.x, y : p2.y - p1.y, z : p2.z - p1.z };
        let w = {x : p3.x - p1.x, y : p3.y - p1.y, z : p3.z - p1.z };
    
    
        let normal = new vec3(
            (v.y * w.z) - (v.z * w.y),
            (v.z * w.x) - (v.x * w.z),
            (v.x * w.y) - (v.y * w.x)
        );

        let length = Math3.distance(normal, Vector3.zero);

        return new vec3(
            normal.x / length,
            normal.y / length,
            normal.z / length
        );
    }

    function projectComponents(a, b, c){ // projects 3 seperate vector componants
        return {
            x : ((a * focalLegnth) / (c + focalLegnth)),
            y : ((b * focalLegnth) / (c + focalLegnth))
        };
    }

    function projectPoint(point){ // projects a point
        let a = point.x;
        let b = point.y;
        let c = point.z;

        if(Camera.properties.perspective){
            return {
                x : ((a * focalLegnth) / (c + focalLegnth)),
                y : ((b * focalLegnth) / (c + focalLegnth))
            };
        }else{
            return {
                x : a,
                y : b
            };
        }
    }

    const EngineDebug = {
        drawOrigin(){
            
        },

        displayPoint(point, yPlane, xPlane, color){ // Draws a point and displays the position both in non and rotated space (rounded to tenths)
            
            if (yPlane === undefined){
                yPlane = Camera.rotation.yPlane;
            }
            
            if (xPlane === undefined){
                xPlane = Camera.rotation.xPlane;
            }
            
            let rotatedPoint = fullRot(point, yPlane, xPlane);
            let projectedPoint = projectPoint(rotatedPoint);
            let offsetPoint = {x :  (projectedPoint.x + canvasElement.width * 0.5) - 5, y: (projectedPoint.y + canvasElement.height * 0.5) - 5};
            
            ctx.fillStyle = color;
            ctx.fillRect(offsetPoint.x, offsetPoint.y, 10, 10);

            ctx.font = '12px serif';
            ctx.fillText(`original : (${point.x},${point.y},${point.z}),\nrotated ~ (${Math.round(rotatedPoint.x) }, ${Math.round(rotatedPoint.y) }, ${Math.round(rotatedPoint.z)})`, offsetPoint.x, offsetPoint.y);

            //console.log(`original : (${point.x},${point.y},${point.z}),\nrotated ~ (${Math.round(rotatedPoint.x) }, ${Math.round(rotatedPoint.y) }, ${Math.round(rotatedPoint.z)})`);
        }
    }

    let now = new Date();
    now = now.getTime();
    let lastTime = now;
    function engineUpdate(){
        let now = new Date();
        now = now.getTime();

        deltaTime = now - lastTime;
        lastTime = now;

        update();

        if(!paused){
            requestAnimationFrame(engineUpdate);
        }
    }


// Input Gathering =====
    let paused = true;
    let keys = {};
    let updateLoop;
    document.addEventListener('keydown', function(e){
        keys[e.key] = true;
        //console.log(e.key + " down");

        if(e.key == 'p'){
            paused = !paused;

            if(paused){
                console.log('paused');
            }else{
                engineUpdate();
                console.log('unpaused');
            }
        }
    });

    document.addEventListener('keyup', function(e){
        keys[e.key] = false;

        //console.log(e.key + " up");   
    });

    function btn(key){
        return (keys[key] === true ? 1 : 0);
    }
