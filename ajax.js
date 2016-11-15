
var ktAjax = function (config) {
    var defaultOption = {
        url: "",
        data: {},
        type: "GET",
        headers: {

        },
        success: function () { },
        error: function () { },
        complet: function () { }
    }

    //合并配置参数
    var opt = extend(defaultOption, config);

    /**
     * 创建xmlhttprequest对象
    */
    var xhr = function () {
        var xmlhttprequest;
        if (window.XMLHttpRequest) {
            //IE7,IE8,firefox,MOailla,Safari,Opera等浏览器创建
            xmlhttprequest = new XMLHttpRequest();

            if (xmlhttprequest.overrideMineType) {
                xmlhttprequest.overrideMineType("text/xml");
            }
        } else if (window.ActiveXObject) {
            var activeName = ["MSML2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (var i = 0, len = activeName.length; i < len; i++) {
                try {
                    xmlhttprequest = new ActiveXObject(activeName[i]);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        if (!xmlhttprequest) {
            console.error("XMLHttpRequest对象创建失败!");
        } else {
            this.xhr = new XMLHttpRequest();
        }
    }


    /**
     * 发送函数
    */
    xhr.prototype.send = function (url) {
        var xmlHR = this.xhr;
        if (xmlHR) {
            xmlHR.onreadystatechange = function () {
                if (xmlHR.readyState === 4) {
                    if (xmlHR.status === 200) {
                        //请求成功
                        opt.success({ response: xmlHR.response });
                    } else {
                        //请求失败
                        opt.error({ response: xmlHR });
                    }
                }
            };

            //添加头信息
            var headers = opt.headers;
            for (var name in headers) {
                xmlHR.setRequestHeader(name, headers[name]);
            }
            //谷歌默认头信息 兼容火狐
            xmlHR.setRequestHeader("Accept", "*");
            if (opt.url) {
                xmlHR.open(opt.type, opt.url, true);
            }
            xmlHR.send(opt.data);
        }
    }


    /**
     * 合并参数
     * object1:默认对象
     * object2:参数对象
    */
    function extend(object1, object2) {
        for (var name in object1) {
            object1[name] = object2[name] || object1[name];
        }
        return object1;
    }

    return new xhr();
}







