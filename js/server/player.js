module.exports = class Player {

	constructor(id, name) {
		this._id = id;
		this._name = name;
		this._x = 100;
		this._y = 100;
		this._angle = 0;
		this._mirrored = false;
	}

	move(data) {
		this._x = data.x;
		this._y = data.y;
		this._angle = data.angle;
		this._mirrored = data.mirrored;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	asPayload() {
		return {
			id: this._id,
			name: this._name,
			x: this._x,
			y: this._y,
			angle: this._angle,
			mirrored: this._mirrored,
		};
	}
}
