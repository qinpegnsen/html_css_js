var CreatedOKLodop7766 = null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
    try {
        // var ua = navigator.userAgent;
        // if (ua.match(/Windows\sPhone/i) != null) return true;
        // if (ua.match(/iPhone|iPod/i) != null) return true;
        // if (ua.match(/Android/i) != null) return true;
        // if (ua.match(/Edge\D?\d+/i) != null) return true;

        // var verTrident = ua.match(/Trident\D?\d+/i);
        // var verIE = ua.match(/MSIE\D?\d+/i);
        // var verOPR = ua.match(/OPR\D?\d+/i);
        // var verFF = ua.match(/Firefox\D?\d+/i);
        // var x64 = ua.match(/x64/i);
        // if ((verTrident == null) && (verIE == null) && (x64 !== null))
        //     return true;
        // else
        // if (verFF !== null) {
        //     verFF = verFF[0].match(/\d+/);
        //     if ((verFF[0] >= 42) || (x64 !== null)) return true;
        // } else
        // if (verOPR !== null) {
        //     verOPR = verOPR[0].match(/\d+/);
        //     if (verOPR[0] >= 32) return true;
        // } else
        // if ((verTrident == null) && (verIE == null)) {
        //     var verChrome = ua.match(/Chrome\D?\d+/i);
        //     if (verChrome !== null) {
        //         verChrome = verChrome[0].match(/\d+/);
        //         if (verChrome[0] >= 42) return true;
        //     }
        // }
        return true;
    } catch (err) {
        return true;
    }
}
/* 
    qps 写的备注：
        域名是localhost，那是因为我们用的是本地打印版（每个电脑都需要安装一个lodop的桌面程序，我安装的是clodop 的扩展板，在桌面的右下角有图标显示）
        双击打开有端口设置，可以看到有两个http 的端口和一个https 的端口（http 默认的是8000 和 18000 https 默认的是8443），多个端口可以防止端口被占用 

*/
//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var oscript8 = document.createElement('script');
    oscript8.src = 'https://localhost:8443/CLodopfuncs.js?priority=1';
    head.insertBefore(oscript8, head.firstChild);
    //引用双端口(8000和18000）避免其中某个被占用：
    var oscript18 = document.createElement('script');
    oscript18.src = 'http://localhost:18000/CLodopfuncs.js?priority=0';
    head.insertBefore(oscript18, head.firstChild);

}

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
    if (document.getElementById('NOLODOPTIPSONTOP')) {
        return;
    }
    var htmlClose = '<a href="javascript:;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" style="float:right;padding:10px;line-height:1;" title="关闭">x</a>';
    var strHtmInstall = htmlClose + '<div>打印控件未安装!点击这里<a href="install_lodop32.exe" style="color:#1c8bcc" target="_self">执行安装</a>,安装后请刷新页面或重新进入。</div>';
    var strHtmUpdate = htmlClose + '<div>打印控件需要升级!点击这里<a href="install_lodop32.exe" style="color:#1c8bcc" target="_self">执行升级</a>,升级后请重新进入。</div>';
    var strHtm64_Install = htmlClose + '<div>打印控件未安装!点击这里<a href="install_lodop64.exe" style="color:#1c8bcc" target="_self">执行安装</a>,安装后请刷新页面或重新进入。</div>';
    var strHtm64_Update = htmlClose + '<div>打印控件需要升级!点击这里<a href="install_lodop64.exe" style="color:#1c8bcc" target="_self">执行升级</a>,升级后请重新进入。</div>';
    var strHtmFireFox = htmlClose + '<div>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</div>';
    var strHtmChrome = htmlClose + '<div>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</div>';
    var strCLodopInstall = htmlClose + '<div>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href="/dist/files/CLodop_Setup_for_Win32_https_3.037Extend.rar" style="color:#1c8bcc" target="_self">执行安装</a>,安装后请刷新页面。</div>';
    var strCLodopUpdate = htmlClose + '<div>CLodop云打印服务需升级!点击这里<a href="/dist/files/CLodop_Setup_for_Win32_https_3.037Extend.rar" style="color:#1c8bcc" target="_self">执行升级</a>,升级后请刷新页面。</div>';
    var LODOP;
    var tempDiv = document.createElement('div');
    tempDiv.id = 'NOLODOPTIPSONTOP';
    tempDiv.setAttribute('style', 'position:relative;z-index:19980;background:#eee;color:#555;line-height:40px;position:absolute;width:100%;');
    try {
        var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
        if (needCLodop()) {
            try { LODOP = getCLodop(); } catch (err) {}
            if (!LODOP && document.readyState !== "complete") {
                alert("C-Lodop没准备好，请稍后再试！");
                return;
            }
            if (!LODOP) {
                if (isIE) document.write(strCLodopInstall);
                else {
                    tempDiv.innerHTML = strCLodopInstall;
                    document.body.insertBefore(tempDiv, document.body.firstChild);
                    // document.documentElement.innerHTML = strCLodopInstall + document.documentElement.innerHTML;
                }
                return;
            } else {
                if (CLODOP.CVERSION < "2.0.9.3") {
                    if (isIE) document.write(strCLodopUpdate);
                    else {
                        tempDiv.innerHTML = strCLodopUpdate;
                        document.body.insertBefore(tempDiv, document.body.firstChild);
                    }
                }
                if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
            }
        } else {
            var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT != undefined || oEMBED != undefined) {
                if (isIE) LODOP = oOBJECT;
                else LODOP = oEMBED;
            } else if (CreatedOKLodop7766 == null) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else LODOP = CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP == null) || (typeof(LODOP.VERSION) == "undefined")) {
                if (navigator.userAgent.indexOf('Chrome') >= 0)
                    document.documentElement.innerHTML = strHtmChrome + document.documentElement.innerHTML;
                if (navigator.userAgent.indexOf('Firefox') >= 0)
                    document.documentElement.innerHTML = strHtmFireFox + document.documentElement.innerHTML;
                if (is64IE) document.write(strHtm64_Install);
                else
                if (isIE) document.write(strHtmInstall);
                else {
                    tempDiv.innerHTML = strHtmInstall;
                    document.body.insertBefore(tempDiv, document.body.firstChild);
                }
                return LODOP;
            }
        }
        if (LODOP.VERSION < "6.2.1.6") {
            if (needCLodop()) {
                tempDiv.innerHTML = strCLodopUpdate;
                document.body.insertBefore(tempDiv, document.body.firstChild);
            } else
            if (is64IE) document.write(strHtm64_Update);
            else
            if (isIE) document.write(strHtmUpdate);
            else {
                tempDiv.innerHTML = strHtmUpdate;
                document.body.insertBefore(tempDiv, document.body.firstChild);
            }
            return LODOP;
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
        LODOP.SET_LICENSES('', '9390EAFD75F8B8C6FFA0C16912CF8D56', 'C94CEE276DB2187AE6B65D56B3FC2848', '');
        //===========================================================
        return LODOP;
    } catch (err) { alert("getLodop出错:" + err); }
}