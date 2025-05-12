import request from '@/lib/Request';

export async function detail(
	body?: {},
	options?: Global.RequestOptions,
) {
	return request<DealerAd.Detail>(
		`dealer/ad/detail`,
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


export async function list(
	body: {

		current: number;
		pageSize: number;
	},
	options?: Global.RequestOptions,
) {
	return request<DealerAd.ListResult>(
		`dealer/ad/list`,
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
	body: DealerAd.CreateQuery,
	options?: Global.RequestOptions,
) {
	return request<boolean>(
		`dealer/ad/create`,
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
	return request<boolean>(
		`dealer/ad/del`,
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