module.exports = class Player {

	constructor(name) {
		this._name = name;
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
}
