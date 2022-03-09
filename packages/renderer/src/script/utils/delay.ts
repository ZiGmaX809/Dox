export function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Done waiting");
      resolve(ms);
    }, ms);
  });
}
