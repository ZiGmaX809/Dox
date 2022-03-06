export const convert_file_path = (path: string) => {

  
  if (process.env.NODE_ENV !== "production") {
    //debug
    return path;
  } else {
    return "./" + path;
  }
};

export const convert_folder_path = (path: string) => {
  if (process.env.NODE_ENV !== "production") {
    //debug
    return path;
  } else {
    const folder_name = path.replace("packages/renderer/public/", "");

    const test_f =
      "/Users/zigma/Documents/Electron/Dox/release/0.0.1/mac/Dox.app/Contents/Resources/app/dist/renderer/" +
      folder_name;
    console.log(test_f);
    return test_f;
  }
};
