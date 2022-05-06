const { ipcRenderer } = require("electron");

ipcRenderer.on("login", (e, data) => {
  login(data);
});

ipcRenderer.on("gettoken", (e) => {
  get_token();
});

async function login(data) {
  fetch("http://203.49.14.89/gzpt3-platform/api/pub/session", {
    credentials: "include",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer:
      "http://203.49.14.89/gzpt3-platform/static/login/default/login.html?themeurl=http://babg.zj.pcc/",
    referrerPolicy: "no-referrer-when-downgrade",
    body: data,
    method: "PUT",
    mode: "cors",
  })
    .then((res) => {
      location.reload();
      ipcRenderer.sendToHost("login success");
    })
    .then((res2) => {
      // console.log(res2);
    })
    .catch((err) => {
      ipcRenderer.sendToHost(err);
    });
}

async function get_token() {
  await fetch("http://babg.zj.pcc/gzpt3-platform/api/v2/session", {
    headers: { accept: "application/json,text/plain,*/*" },
    method: "GET",
  }).then((resp1) => {
    let resJson1 = resp1.json();
    resJson1.then(async (res) => {
      const result = [];
      result.push(res.token);
      result.push(res.userId);
      let userid = res.userId;
      await fetch("http://babg.zj.pcc/gzpt3-platform/api/v2/users/" + userid, {
        headers: { accept: "application/json,text/plain,*/*" },
        method: "GET",
      }).then((resp2) => {
        let resJson2 = resp2.json();
        resJson2.then((res) => {
          result.push(res.avatar);
          ipcRenderer.sendToHost("result:" + result.join(","));
          // console.log("result:" + result.toString());
        });
      });
    });
  });
}
