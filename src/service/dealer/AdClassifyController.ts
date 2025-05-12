import request from '@/lib/Request';

export async function detail(
	body?: {},
	options?: Global.RequestOptions,
) {
	return request<DealerAdClassify.Detail>(
		`dealer/adClassify/detail`,
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
		productType: string;
		from: Ad.From | '';
		current: number;
		pageSize: number;
	},
	options?: Global.RequestOptions,
) {
	return request<DealerAdClassify.ListResult>(
		`dealer/adClassify/list`,
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
	body: DealerAdClassify.CreateQuery,
	options?: Global.RequestOptions,
) {
	return request<boolean>(
		`dealer/adClassify/create`,
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