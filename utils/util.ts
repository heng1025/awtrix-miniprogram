const { baseURL } = getApp();

export const request = async <T = unknown>(
  url: string,
  data: { [key: string]: any }
) => {
  return new Promise<T>((resolve, reject) => {
    wx.request({
      url: `${baseURL}${url}`,
      method: "POST",
      data,
      success(res: { data: any }) {
        const data = res.data;
        if (data.success === false) {
          reject(res.data);
        } else {
          resolve(res.data);
        }
      },
      fail(res: unknown) {
        reject(res);
      },
    });
  });
};
