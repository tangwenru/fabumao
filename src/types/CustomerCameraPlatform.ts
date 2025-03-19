declare namespace CustomerCameraPlatform{
	interface CreateQuery{

	}

	interface ListResult{
		list: List[];
		pagination: Global.Pagination
	}
	interface List{
		id: number;
		appKey: string;
		enabled: boolean;
		created: number;
		updated: number;
		CameraPlatformBaseInfo: CameraPlatform.BaseInfo;
	}

	interface ListQuery{

	}

	interface Detail {

	}
}