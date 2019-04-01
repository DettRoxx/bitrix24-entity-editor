export function itemPropertyGet(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.property.get",
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

export function itemPropertyAdd(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.property.add",
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

export function itemPropertyDelete(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.property.delete",
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

export function itemPropertyUpdate(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.item.property.update",
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

