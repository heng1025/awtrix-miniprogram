import { request } from "../../utils/util";

type CustomEvent = WechatMiniprogram.CustomEvent;
type Success = { success: boolean };
type Setting = {
  Language: string;
  AutoBrightness: boolean;
  BootAnimation: boolean;
  SleepMode: boolean;
  Brightness: number;
  Volume: number;
};

type AwtrixApp = {
  Name: string;
};
Page({
  data: {
    settings: <Setting>{},
    languages: ["en", "zh-CN"],
    languageIdx: 0,
    brightnessDisabled: false,
    appList: <AwtrixApp[]>[],
    appIdx: -1,
    appAcitons: ["back", "next", "pause", "hold"],
  },
  async onLoad() {
    const settings = await request<Setting>("/basics", {
      get: "settings",
    });
    const appList = await request<AwtrixApp[]>("/basics", {
      get: "appList",
    });
    const { AutoBrightness, Language } = settings;
    this.setData({
      settings,
      appList,
      languageIdx: Language === "en" ? 0 : 1,
      brightnessDisabled: AutoBrightness,
    });
  },

  async languageChange(e: CustomEvent) {
    const idx = e.detail.value;
    const { success } = await request<Success>("/settings", {
      Language: this.data.languages[idx],
    });

    if (success) {
      this.setData({
        languageIdx: idx,
      });
    }
  },
  async autoBrightnessChange(e: CustomEvent) {
    const val = e.detail.value;
    const { success } = await request<Success>("/settings", {
      AutoBrightness: val,
    });
    if (success) {
      this.setData({
        brightnessDisabled: val,
      });
    }
  },
  settingChange(e: CustomEvent) {
    const { type } = e.currentTarget.dataset;
    request("/settings", {
      [type]: e.detail.value,
    });
  },
  async appChange(e: CustomEvent) {
    const { Name } = this.data.appList[e.detail.value];
    const { success } = await request<Success>("/basics", { switchTo: Name });
    if (success) {
      this.setData({
        appIdx: e.detail.value,
      });
    }
  },
  toggleAppAction(e: CustomEvent) {
    const { type } = e.currentTarget.dataset;
    request("/basics", { app: type });
  },
});
