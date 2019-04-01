export function sectionGet(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.section.get",
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

export function sectionAdd(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.section.add",
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

export function sectionDelete(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.section.delete",
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

export function sectionUpdate(payload){
	return new Promise(function(resolve, reject) {
		window.BX24.callMethod(
			"entity.section.update",
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

