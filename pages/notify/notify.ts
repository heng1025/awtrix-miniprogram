import { request } from "../../utils/util";
import sounds from "../music/sound";
type CustomEvent = WechatMiniprogram.CustomEvent;

function genColor() {
  const colors: number[] = [];
  for (let i = 0; i < 256; i++) {
    colors.push(i);
  }
  return colors;
}
const RColor: number[] = genColor();
const GColor: number[] = genColor();
const BColor: number[] = genColor();

Page({
  data: {
    sounds,
    soundIdx: -1,
    colors: [RColor, GColor, BColor],
    colorIdx: [28, 128, 100],
  },

  onLoad() {},
  colorChange(e: CustomEvent) {
    this.setData({
      colorIdx: e.detail.value,
    });
  },
  soundChange(e: CustomEvent) {
    this.setData({
      soundIdx: +e.detail.value,
    });
  },
  sendNotification() {
    request("/notify", {
      name: "Test Notification",
      force: true,
      icon: 6,
      moveIcon: true,
      repeat: 2,
      soundfile: 1,
      text: "Totally Awesome",
      color: [0, 255, 0],
    });
  },
  formSubmit(e: CustomEvent) {
    const { soundfile } = e.detail.value;
    const params = {
      ...e.detail.value,
      soundfile: soundfile + 200,
    };
    if (soundfile < 0) {
      delete params.soundfile;
    }
    request("/notify", params);
  },
  formReset(e: CustomEvent) {
    console.log(e.detail.value);
  },
});
