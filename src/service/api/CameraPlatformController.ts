import request from "@/lib/Request";

export async function list(
	body?: {},
	options?: Global.RequestOptions,
) {
	return request<CameraPlatform.List[]>(`cameraPlatform/list`, {
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
//
// export async function detail(
// 	body: {
// 		shopId: number;
// 		id: number;
// 	},
// 	options?: Global.RequestOptions,
// ) {
// 	return request<Camera.Detail>(
// 		`cameraPlatform/detail`,
// 		{
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			data: {
// 				...body,
// 			},
// 			...(options || {}),
// 		},
// 	);
// }
//
//
// export async function create(
// 	body: Camera.CreateQuery,
// 	options?: Global.RequestOptions,
// ) {
// 	return request<Camera.CreateQuery>(
// 		`cameraPlatform/create`,
// 		{
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			data: {
// 				...body,
// 			},
// 			...(options || {}),
// 		},
// 	);
// }
//
