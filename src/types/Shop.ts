declare namespace Shop{
	interface ListResult{
		list: List[];
		pagination: Global.Pagination;
	}
	interface List{
		id: number;
		name: string;
		enabled: boolean;
	}

	interface ListQuery{

	}

	interface CreateQuery{

	}

	interface BaseInfo{
		id: number;
		name: string;
		enabled: boolean;
	}
}