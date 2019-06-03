var jqserc = "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js";
var scr = document.createElement("script");
scr.src = jqserc;
document.head.appendChild(scr);
function after1s() {
  return new Promise(res => {
    setTimeout(res, 1000);
  });
}
function afterS(value) {
  return new Promise(res => {
    setTimeout(() => {
      res(value);
    }, 200);
  });
}
scr.onload = function() {
  var resArr = [];
  var $subbtn = $(".footer-bottom .btn-default");
  var isFirst = true;
  async function loop() {
    setTimeout(async () => {
      // var $alltimu = $(".exam-list");
      var $error = $(".exam-list.error");
      if ($error.length === 0) {
        if (!isFirst) {
          $subbtn[0].click();
          return;
        }
      }
      var $alltimu = $(".exam-list");
      var asyncIterable = {
        [Symbol.asyncIterator]() {
          return {
            i: 0,
            next() {
              if (this.i < $alltimu.length) {
                return afterS({
                  value: { e: $alltimu[this.i++], i: this.i },
                  done: false
                });
              }
              return Promise.resolve({ done: true });
            }
          };
        }
      };
      for await ({ e, i } of asyncIterable) {
        var $options = $(e)
          .children(".key-list")
          .children("li");
        var $active = $options.filter(".active");
        console.log(resArr);
        if ($active.length === 0) {
          isFirst = false;
          $options[0].click();
          resArr[i] = 0;
        }
        if ($(e).hasClass("error")) {
          resArr[i] = resArr[i] + 1;
          $options[resArr[i]].click();
        }
      }
      $subbtn[0].click();
      console.log("提交了");
      await after1s();
      loop();
    }, 2000);
  }
  window.onhashchange = function(e) {
    if (e.newURL === "#/promotion") {
    }
  };
  loop();
};
