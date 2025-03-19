declare namespace DetectionTask {
	interface ListQuery{
		startTime: number;
		endTime: number;
		shopId: number;
		isPassed: Global.Enabled;
	}

	interface ListResult{
		list: List[];
		pagination: Global.Pagination;
	}

	interface List{
		id: number;
		cameraTime: number;
		isPassed: boolean;
		detectionMessage: string;
		detectionTime: number;
		imageUrl: string;
		shopBaseInfo: Shop.BaseInfo;
		cameraBaseInfo: Camera.BaseInfo;
		detectionRuleBaseInfo: DetectionRule.BaseInfo ;
	}

	interface DayStatistics{
		passedAmount: number;
		notPassedAmount: number;
		yesterdayPassedAmount: number;
		yesterdayNotPassedAmount: number;
		lastWeekPassedAmount: number;
		lastWeekNotPassedAmount: number;
	}

	interface DayStatisticsDataShow extends DayStatistics{
		amount: number;

		passedPercent: number;

		yesterdayPassedPercent: number;
		yesterdayNotPassedPercent: number;

		lastWeekPassedPercent: number;
		lastWeekNotPassedPercent: number;
	}

	interface DayStatisticsPageRef{
		onRun: ( query: DetectionTask.ListQuery ) => void;
	}

	interface ShopStatisticsQuery{
		startTime: number;
		endTime: number;
	}

	interface ShopStatistics{
		// detectionTaskAmount: number;
		// detectionAmount: number;
		passedAmount: number;
		notPassedAmount: number;
		shopAmount: number;
	}

	interface ShopStatisticsPageRef{
		onRun: ( query: DetectionTask.ShopStatisticsQuery ) => void;
	}

	interface ShopListStatisticsPageRef{
		onRun: ( query: DetectionTask.ShopStatisticsQuery ) => void;
	}

	interface ShopListStatisticsResult{
		list: ShopListStatistics[];
		pagination: Global.Pagination;
	}

	interface ShopListStatistics{
		passedAmount: number;
		notPassedAmount: number;
		shopName: string;
		shopId: number;
	}

	interface ShopListStatisticsChart extends ShopListStatistics{
		passedPercent: number;
	}
}