import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import { BrowserView, BrowserWindow } from "electron";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUseage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    mainWindow.webContents.send("statistics", {
      cpuUsage,
      ramUsage,
      storageData,
    });
  }, POLLING_INTERVAL);
}

export function getStaticData() {
  const totalStorge = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoyGB = Math.floor(osUtils.totalmem() / 1024);
  return {
    totalStorge,
    cpuModel,
    totalMemoyGB,
  };
}

function getCpuUseage() {
  return new Promise((reslove) => {
    osUtils.cpuUsage(reslove);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;
  return {
    total: Math.floor(total / 1000000000),
    usage: 1 - free / total,
  };
}
