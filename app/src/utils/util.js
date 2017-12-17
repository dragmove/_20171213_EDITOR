export const isIOS = (userAgent) => /iPad|iPhone|iPod/.test(userAgent) && !global.MSStream;

export const isAndroid = (userAgent) => /android/i.test(userAgent);