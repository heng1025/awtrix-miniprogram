import config from "./config";

const { AWTRIX_HOST } = config;

App<IAppOption & { baseURL: string }>({
  baseURL: `${AWTRIX_HOST}/api/v3`,
  globalData: {},
  onLaunch() {},
});
