export async function delay(ms: number) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log("Done waiting");
      resolve(ms);
    }, ms);
  });
}
