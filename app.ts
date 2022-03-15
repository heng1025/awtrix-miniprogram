import config from "./config";

const { AWTRIX_HOST } = config;

type AppOptions<T> = WechatMiniprogram.App.Options<T>;

App<AppOptions<{baseURL:string}>>({
  baseURL: `${AWTRIX_HOST}/api/v3`,
  onLaunch() {},
});
