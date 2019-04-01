export function entityGet(entity){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.get",
			{},
			function (result) {
				if (result.error())
					reject(result.error());
				else
					resolve(result.data());
			}
		);
	});
}

export function entityAdd(entity, name, access={U1:'W',AU:'W'}){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.add",
			{ENTITY: entity, NAME: name, ACCESS: access},
			function (result) {
				if (!result.answer.result)
					reject(result);
				else
					resolve(result);
			}
		);
	});
}

export function entityDelete(entity){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.delete",
			{ENTITY: entity},
			function (result) {
				if (!result.answer.result)
					reject(result);
				else
					resolve(result);
			}
		);
	});
}

export function entityUpdate(entity){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.update",
			entity,
			function (result) {
				if (!result.answer.result)
					reject(result);
				else
					resolve(result);
			}
		);
	});
}

