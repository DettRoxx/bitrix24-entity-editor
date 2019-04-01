export function itemGet(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.get",
			payload,
			function (result) {
				if (result.error())
					reject(result.error());
				else
					resolve(result.data());
			}
		);
	});
}

export function itemAdd(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.add",
			payload,
			function (result) {
				if (!result.answer.result)
					reject(result);
				else
					resolve(result);
			}
		);
	});
}

export function itemDelete(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.delete",
			payload,
			function (result) {
				if (!result.answer.result)
					reject(result);
				else
					resolve(result);
			}
		);
	});
}

export function itemUpdate(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.update",
			payload,
			function (result) {
				if (!result.answer.result)
					reject(result);
				else
					resolve(result);
			}
		);
	});
}

