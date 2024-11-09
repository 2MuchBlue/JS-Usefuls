const MatrixMath = {
    mult2lists(list1, list2) {
        let finalMatrix = 0;
        for (let a = 0; a < Math.min(list1.length, list2.length); a++) {
            finalMatrix += list1[a] * list2[a];
        }
        return finalMatrix;
    },

    getRow(mat, index){
        let rowArray = [];
        for (let i = 0; i < mat.length; i++) {
            rowArray[i] = mat[i][index];
        }

        return rowArray;
    },

    mult2matrix(mat1, mat2) {
        let finalMatrix = [];
        for (let a = 0; a < mat1[0].length; a++) {
            finalMatrix[a] = [];
            for (let b = 0; b < mat2.length; b++) {
                if (finalMatrix[a][b] === undefined) { finalMatrix[a][b] = 0; }
                finalMatrix[a][b] += MatrixMath.mult2lists(MatrixMath.getRow(mat1, a), mat2[b]);
            }
        }
        let tempMat = [];
        for(let i = 0; i < finalMatrix.length; i++){
            tempMat.push(MatrixMath.getRow(finalMatrix, i));
        }
        return tempMat;
    },

    add2matrix(mat1, mat2){
        let w = mat1.length;
        let h = mat1[0].length;
        if(mat2.length !== w){
            return null;
        }
        if(mat2[0].length !== h){
            return null;
        }
        let finalMatrix = [];
        for(let x = 0; x < w; x++){
            for(let y = 0; y < h; y++){
                finalMatrix[x] = [];
                finalMatrix[x][y] = mat1[x][y] + mat2[x][y];
            }
        }

        return finalMatrix;
    },

    sub2matrix(mat1, mat2){
        let w = mat1.length;
        let h = mat1[0].length;
        if(mat2.length !== w){
            return null;
        }
        if(mat2[0].length !== h){
            return null;
        }
        let finalMatrix = [];
        for(let x = 0; x < w; x++){
            for(let y = 0; y < h; y++){
                finalMatrix[x] = [];
                finalMatrix[x][y] = mat1[x][y] - mat2[x][y];
            }
        }

        return finalMatrix;
    },

    vec2matrix(vec){
        let finalMatrix = [[vec.x, vec.y]];

        if(vec.z !== undefined){
            finalMatrix[0][2] = vec.z;
        }
        if(vec.w !== undefined){
            finalMatrix[0][3] = vec.w;
        }
    },

    matrix2vec(matrix){
        const letters = ["x", "y", "z", "w", "ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"];
        let vec = {};
        for(let i = 0; i < matrix[0].length; i++){
            vec[letters[i]] = matrix[0][i];
        }

        return vec;
    },

    projectionMatrix(near, far, top, right) {
        return (
            [
                [near / right, 0, 0, 0],
                [0, near / top, 0, 0],
                [0, 0, (far + near) / (near - far), -1],
                [0, 0, (2 * far * near) / (near - far), 0]
            ]
        );
    },

    fovProjMatrix(near, far, aspect, fov = 15){
        let top = near * Math.tan(fov * 0.5);
        let bottom = -top;
        let right = aspect * top;
        let left = -right;

        let e = 1 / Math.tan(fov * 0.5);
        return (
            [
                [e / aspect, 0, 0, 0],
                [0, e, 0, 0],
                [0, 0, (far + near) / (near - far), -1],
                [0, 0, (2 * far * near) / (near - far), 0]
            ]
        );
    },

    vecToCamSpace(vec, projMatrix = MatrixMath.fovProjMatrix(Camera.frustum.n, Camera.frustum.f, 1, 15)){
        return MatrixMath.divideByW(MatrixMath.mult2matrix(projMatrix, [[vec.x, vec.y, vec.z, 1]]));
    },

    divideByW(matrix){
        
        let finalMatrix = [[]];
        finalMatrix[0][0] = matrix[0][0] / matrix[0][3];
        finalMatrix[0][1] = matrix[0][1] / matrix[0][3];
        finalMatrix[0][2] = matrix[0][2] / matrix[0][3];

        return finalMatrix;
    }
}
