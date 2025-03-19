import request from "@/lib/Request";

export async function list(
	body: {
		shopId: number;
		current: number;
		pageSize: number;
	},
	options?: Global.RequestOptions,
) {
	return request<CustomerCameraPlatform.ListResult>(`user/customerCameraPlatform/list`, {
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

export async function detail(
	body: {
		id: number;
	},
	options?: Global.RequestOptions,
) {
	return request<CustomerCameraPlatform.Detail>(
		`user/customerCameraPlatform/detail`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				...body,
			},
			...(options || {}),
		},
	);
}


export async function create(
	body: Camera.CreateQuery,
	options?: Global.RequestOptions,
) {
	return request<CustomerCameraPlatform.CreateQuery>(
		`user/customerCameraPlatform/create`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				...body,
			},
			...(options || {}),
		},
	);
}



export async function del(
	body: {
		id: number;
	},
	options?: Global.RequestOptions,
) {
	return request<CustomerCameraPlatform.CreateQuery>(
		`user/customerCameraPlatform/del`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				...body,
			},
			...(options || {}),
		},
	);
}

