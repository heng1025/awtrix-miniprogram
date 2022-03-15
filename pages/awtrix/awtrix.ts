import { request } from "../../utils/util";

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
  data: {
    matrixInfo: defaultMatrixInfo,
    uptime: "0 Days,0 Hours,0 Minutes,0 Seconds",
    powerState: false,
  },
  async onLoad() {
    try {
      const matrixInfo = await request<MatrixInfo>("/basics", {
        get: "matrixInfo",
      });
      const { uptime } = await request<{ uptime: string }>("/basics", {
        get: "uptime",
      });
      const { powerState } = await request<{ powerState: boolean }>("/basics", {
        get: "powerState",
      });
      this.setData({
        matrixInfo,
        uptime,
        powerState,
      });
      wx.showTabBar({});
    } catch (error) {
      wx.showToast({
        title: "粗错鸟！",
        icon: "error",
        duration: 2000,
      });
      wx.hideTabBar({});
    }
  },
});
