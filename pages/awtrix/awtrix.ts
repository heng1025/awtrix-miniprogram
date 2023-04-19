import { request } from "../../utils/util";
import config from "../../config";

const { IP } = config;

type MatrixInfo = {
  Temp: number;
  Hum: number;
  wifissid: string;
  wifiquality: number;
  version: string;
  latency: number;
};

const defaultMatrixInfo = {
  Temp: 0.0,
  Hum: 0.0,
  latency: 0,
  wifissid: "--",
  wifiquality: 0,
  version: "--",
};

Page({
  basisTimer: -1,
  data: {
    matrixInfo: defaultMatrixInfo,
    uptime: "0 Days,0 Hours,0 Minutes,0 Seconds",
    powerState: false,
  },
  async onLoad() {
    try {
      const { powerState } = await request<{ powerState: string }>("/basics", {
        get: "powerState",
      });

      this.setData({
        powerState: powerState === "true",
      });

      if (this.data.powerState) {
        this.getBasis();
        this.basisTimer = setInterval(this.getBasis, 30000);
      }
      wx.showTabBar({});
    } catch (error) {
      console.log(`error`, error);
      wx.showToast({
        title: "粗错鸟！",
        icon: "error",
        duration: 2000,
      });
      wx.hideTabBar({});
      clearInterval(this.basisTimer);
    }
  },
  async getBasis() {
    try {
      const { uptime } = await request<{ uptime: string }>("/basics", {
        get: "uptime",
      });
      const matrixInfo = await request<{ [ip: string]: MatrixInfo }>(
        "/basics",
        {
          get: "matrixInfo",
        }
      );
      this.setData({
        matrixInfo: matrixInfo[IP],
        uptime,
      });
    } catch (error) {
      clearInterval(this.basisTimer);
    }
  },
  async changePower() {
    const afterPowerState = !this.data.powerState;
    await request("/basics", { power: afterPowerState });
    this.setData({
      powerState: afterPowerState,
    });
    if (!afterPowerState) {
      clearInterval(this.basisTimer);
    } else {
      this.getBasis();
      this.basisTimer = setInterval(this.getBasis, 30000);
    }
  },
});
