import { api } from "./api.config";

export const listUniversity = () => {
  const data = api
    .get("/university")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [{ _id: "0", name: "NoData", code: "null" }];
    });
  return data;
};

export const signup = () => {
  api.post("/signup").then((res) => {
      return res.data
  }).catch((err)=>{
      console.log(err)
  });
};
