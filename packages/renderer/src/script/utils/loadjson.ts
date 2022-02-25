import axios from "axios";

export const load_local_json = async (filepath:string) => {
  return await axios.get(filepath).then((res) => {
    // return res.data.Template;
    return res;
  });
};
