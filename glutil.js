var glutil = {
	createProgram: function(gl, vertexShader, fragmentShader) {
		var program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		var success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (success) {
			return program;
		}
		console.log(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
	},
	createShader: function(gl, type, source) {
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (success) {
			return shader;
		}
		console.log(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
	}
};

var m3 = {
	identity: function() {
		return [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		];
	},
	projection: function(w, h) {
		return [
			2 / w, 0, 0,
			0, -2 / h, 0,
			-1, 1, 1
		];
	},
	translate: function(m, x, y) {
		return m3.multiply(m, m3.translation(x, y));
	},
	translation: function(x, y) {
		return [
			1, 0, 0,
			0, 1, 0,
			x, y, 1
		];
	},
	rotate: function(m, angle) {
		return m3.multiply(m, m3.rotation(angle));
	},
	rotation: function(angle) {
		var c = Math.cos(angle);
		var s = Math.sin(angle);
		return [
			c, -s, 0,
			s,  c, 0,
			0,  0, 1
		];
	},
	scale: function(m, x, y) {
		return m3.multiply(m, m3.scaling(x, y));
	},
	scaling: function(x, y) {
		return [
			x, 0, 0,
			0, y, 0,
			0, 0, 1
		];
	},
	multiply: function(a, b) {
		return [
		  b[0] * a[0] + b[1] * a[3] + b[2] * a[6], b[0] * a[1] + b[1] * a[4] + b[2] * a[7], b[0] * a[2] + b[1] * a[5] + b[2] * a[8],
		  b[3] * a[0] + b[4] * a[3] + b[5] * a[6], b[3] * a[1] + b[4] * a[4] + b[5] * a[7], b[3] * a[2] + b[4] * a[5] + b[5] * a[8],
		  b[6] * a[0] + b[7] * a[3] + b[8] * a[6], b[6] * a[1] + b[7] * a[4] + b[8] * a[7], b[6] * a[2] + b[7] * a[5] + b[8] * a[8]
		];
	}
};