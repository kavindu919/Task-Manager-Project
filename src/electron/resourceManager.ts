import osUtils from "os-utils";

const POLLING_INTERVAL = 500;

export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUseage();
    console.log(cpuUsage);
  }, POLLING_INTERVAL);
}

function getCpuUseage() {
  return new Promise((reslove) => {
    osUtils.cpuUsage(reslove);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}
