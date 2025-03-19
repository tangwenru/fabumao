import request from '@/lib/Request';


export async function list(
	body: {
		startTime: number;
		endTime: number;
		shopId: number;
		isPassed: Global.Enabled;
		current: number;
		pageSize: number;
	},
	options?: Global.RequestOptions,
) {
	return request<DetectionTask.ListResult>(`user/detectionTask/list`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			...body,
		},
		...(options || {}),
	});
}



export async function dayStatistics(
	body: {
		startTime: number;
		endTime: number;
		shopId: number;
	},
	options?: Global.RequestOptions,
) {
	return request<DetectionTask.DayStatistics>(`user/detectionTask/dayStatistics`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			...body,
		},
		...(options || {}),
	});
}


export async function shopStatistics(
	body: {
		startTime: number;
		endTime: number;
	},
	options?: Global.RequestOptions,
) {
	return request<DetectionTask.ShopStatistics>(`user/detectionTask/shopStatistics`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			...body,
		},
		...(options || {}),
	});
}




export async function shopListStatistics(
	body: {
		startTime: number;
		endTime: number;
	},
	options?: Global.RequestOptions,
) {
	return request<DetectionTask.ShopListStatisticsResult>(`user/detectionTask/shopListStatistics`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			...body,
		},
		...(options || {}),
	});
}
