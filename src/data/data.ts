// this are data structure user for the example


export interface BusinessHours {
  openings: { [key: string]: OpeningRule[] };
}


export interface OpeningRule {
  fromTime: string; // expected "10:00:00" format
  toTime: string; // expected "10:00:00" format
  isTakeAwayAvaiable: boolean;
  isDeliveryAvaiable: boolean;
  deliveryCost: DeliveryCost;
}


export interface DeliveryCost {
  type: DeliveryCostType;
  steps?: DeliveryCostStep[];
  cost?: number;
}

export type DeliveryCostType = 'FLAT' | 'STEPS_BY_PRICE' | 'STEPS_BY_ITEM';


export interface DeliveryCostStep {
  from: number;
  to: number;
  timeZone: string;
  cost: number;
}

