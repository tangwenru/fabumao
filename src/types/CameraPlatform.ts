declare namespace CameraPlatform{
	interface ListQuery{

	}

	interface ListResult{
		list: List[];
		pagination: Global.Pagination;
	}

	interface List{
		id: number;
		name: string;
	}

	interface BaseInfo{
		"id": number;
		"name": string;
		"platformType": string;
		"enabled": boolean;
	}
}