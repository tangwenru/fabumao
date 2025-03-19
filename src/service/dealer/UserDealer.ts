declare namespace UserDealer{
  interface Detail{
    id: number;
    userId: number;
    agentMaxRatioPercent: number;
    canWithdraw:  boolean;
    weContactQrUrl: string;
    enabled: boolean;
    created: number;
  }
}