
class vec3 { 
	constructor(x, y, z = 0){ 
		this.x = x; 
		this.y = y;
    this.z = z;
	} 
}

const Math3 = {
    add(...vecs){ // adds a list of vec3s per component
        let total = new vec3(0,0,0);

        for(let i = 0; i < vecs.length; i++){
            total.x += vecs[i].x;
            total.y += vecs[i].y;
            total.z += vecs[i].z;
        }

        return total;
    },

    subtract(a, b){ // a - b per component
        return new vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    },

    multiply(a, b){ // a * b per component
        return new vec3(a.x * b.x, a.y * b.y, a.z * b.z);
    },

    scalar(vec, scalar){
        return new vec3(vec.x * scalar, vec.y * scalar, vec.z * scalar);
    },

    distance(a, b){ // gets distance between two vec3s
        let p1 = a.x - b.x;
        let p2 = a.y - b.y;
        let p3 = a.z - b.z;
    
        return Math.sqrt((p1 * p1) + (p2 * p2) + ( p3 * p3 ));
    },
    
    normalizeVector(vec){
        let dist = Math3.distance(new vec3(0, 0, 0), vec);
        vec.x = vec.x / dist;
        vec.y = vec.y / dist;
		vec.z = vec.z / dist;
    
        return vec;
    },
    
    getNormalFromVectors(p1, p2, p3){ // returns normalised normal of three vec3s
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
        },
    
    dotProduct(p1, p2){
        return (p1.x * p2.x) + (p1.y * p2.y) + (p1.z * p2.z);
    },

	rot(a, b, angle){ // basic spin (degrees!!!!!!)
        return {
            x : a * Math.cos(angle * deg2rad) + b * Math.sin(angle * deg2rad),
            y : a * -Math.sin(angle * deg2rad) + b * Math.cos(angle * deg2rad)
        };
    }

	fullRot(vector, yPlane = 0, xPlane = 0){ // rotates a point by a yPlane and xPlane value ( uses Degrees!!!!)
            return {
                x : Math3.rot(vector.x, vector.z, yPlane).x,
                y : Math3.rot( Math3.rot(vector.x, vector.z, yPlane).y, vector.y, xPlane).x,
                z : Math3.rot( Math3.rot(vector.x, vector.z, yPlane).y, vector.y, xPlane).y
            }
    }
}
