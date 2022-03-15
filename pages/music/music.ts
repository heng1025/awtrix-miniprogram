import sounds from "./sound";
import { request } from "../../utils/util";

Page({
  data: {
    sounds,
    currentSound: "",
  },
  async playMusic(e: WechatMiniprogram.BaseEvent) {
    const { soundfile, name } = e.currentTarget.dataset;
    const { success } = await request<{ success: boolean }>("/basics", {
      soundfile,
    });
    if (success) {
      this.setData({
        currentSound: name,
      });
    }
  },
});
