function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateGUID() {
  const guidKey = "guid";
  let guid = localStorage.getItem(guidKey);
  if (!guid) {
    guid = generateGUID();
    localStorage.setItem(guidKey, guid);
  }
  return guid;
}
