import request from '@/lib/Request';
export async function list(
	body?: {

	},
	options?: Global.RequestOptions,
) {
	return request<Shop.ListResult>(
		`user/shop/list`,
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

export async function detail(
	body?: {

	},
	options?: Global.RequestOptions,
) {
	return request<Shop.Detail>(
		`user/shop/detail`,
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
	body: Shop.CreateQuery,
	options?: Global.RequestOptions,
) {
	return request<Shop.Detail>(`user/shop/create`, {
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
