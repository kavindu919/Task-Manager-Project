type Statiscs = {
  cpuUsage: number;
  ramUsage: number;
  storageData: number;
};

type StatiscData = {
  totalStorge: number;
  cpuModel: string;
  totalMemoyGB: number;
};

interface Window {
  electron: {
    subscribeStatistics: (callback: (Statiscs: Statiscs) => void) => void;
    getStaticData: () => Promise<StatiscData>;
  };
}
