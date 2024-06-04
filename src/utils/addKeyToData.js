function addKeyToArrayData(dataArray) {
	if (!dataArray) {
		return;
	}
	const dataArrayWithKey = dataArray.map((item, index) => {
		return { ...item, key: item.id };
	});

	return dataArrayWithKey;
}

export default addKeyToArrayData;
