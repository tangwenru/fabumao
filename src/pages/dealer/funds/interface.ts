export declare type WithdrawPayAccountDataType = 'payOnline' | 'payBank' | ''

export declare interface WithdrawPayAccountData{
  payType: WithdrawPayAccountDataType;
  accountType: string;
  id: number;
  index?: number;
}
