module.exports = class Player {

	constructor(id, name) {
		this._id = id;
		this._name = name;
		this._x = 0;
		this._y = 0;
		this._angle = 0;
	}

	move(data) {
		this._x = data.x;
		this._y = data.y;
		this._angle = data.angle;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	get angle() {
		return this._angle;
	}
}
