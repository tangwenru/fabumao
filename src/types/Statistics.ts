declare namespace Statistics {
  interface FinanceMonth {
    chartList: FinanceMonthChartList[];
    monthList: FinanceMonthMonthList[];
  }
  interface FinanceMonthChartList {
    money: number;
    day: number;
  }

  interface FinanceMonthChartData {
    money: number;
    day: string;
  }

  interface FinanceMonthMonthList {
    month: string;
    money: number;
  }
}
