layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer;
    $ = layui.jquery;

    //登录按钮事件
    form.on("submit(login)", function (data) {
        //等待加载动画
        var loadIndex = layer.load(2, {shade: [0.3, '#333']});

        $.post(data.form.action, data.field, function (res) {
            localStorage.setItem("username",data.field.username);
            localStorage.setItem("password",data.field.password);
            localStorage.setItem("tel",data.field.tel);
            localStorage.setItem("email",data.field.email);
            localStorage.setItem("identity",data.field.identity);
            localStorage.setItem("sex",data.field.sex);
            //关闭加载动画
            layer.close(loadIndex);
            if (res.success) {

                location.href = "/" + res.url;
             /*   //刷新父页面
                parent.location.reload();*/
            } else {
                layer.msg(res.message);
            }
        });
        return false;
    });




    $(".register").on("click", function () {
        layer.confirm('确定要跳转快捷登录么?', {icon: 3, title: '提示'}, function () {
            location.href = "/" + login0.html;
        });
    });
    //等路页面回车按钮功能
   /* $(document).on('keydown', function (data) {
        var data= console.log(data.field);
        if (event.keyCode == 13) {
            //等待加载动画
            var loadIndex = layer.load(2, {shade: [0.3, '#333']});
            if ($('form').find('input[type="checkbox"]')[0].checked) {
                data.field.rememberMe = true;
            } else {
                data.field.rememberMe = false;
            }
            $.post(data.form.action, data.field, function (res) {
                //关闭加载动画
                layer.close(loadIndex);
                if (res.success) {
                    location.href = "/" + res.url;
                } else {
                    layer.msg(res.message);
                    $("#randImage").click();
                }
            });
            return false;
        }
    });*/

    $("#randImage").click(function () {
        this.src = "/getCaptcha?t=" + Math.random();
    });
});
