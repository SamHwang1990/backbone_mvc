/**
 * Created by Sam on 14-4-2.
 */

var demo = {};

demo.commonFunc = {
    //获取js模板字符串
    setTemplateData:function(src,selector,modelData){
        $.ajax({
            //从src处获取模板字符串
            url:src,

            method:'get',

            //加载成功后所作的事
            success:function(data){
                var template = _.template(data);
                var compiled = template(modelData);
                $(selector).html(compiled);
            },

            //万一出错误
            error:function(){
                console.log('Problem loading template');
            }
        });
    }
};

demo.FormDemo = {};

demo.FormDemo.User = function(){
    //创建 无效输入域 的模型
    var Invalid = Backbone.Model.extend({});

    //创建 User 模型
    var User = Backbone.Model.extend({
        defaults:{
            name:'',
            email:'',
            username:'',
            password:'',
            passwordConf:''
        },
        initialize:function(){
            //配置 无效输入域 的子模型
            this.set('invalid', new Invalid);
        }
    });
    //返回 模型方法
    return User;
}();

demo.FormDemo.SignupView = function(){
    var SignupView = Backbone.View.extend({
        el:"#signup-form-wrapper",
        initialize:function(){
            _.bindAll(this,"render");
            this.render();
        },
        render:function(){
            //将模型转换为对象
            var modelData = this.model.toJSON();

            //调用 如渲染模板函数
            var jsModelUrl = $("#UserFormTemplateUrl").attr('src');
            demo.commonFunc.setTemplateData(jsModelUrl,this.el,modelData);
        }
    });
    //返回 视图
    return SignupView;
}();

demo.init = function(){
    var user = new demo.FormDemo.User({
        name:'Sam Hwang',
        email:'samhwang1990@gmail.com',
        username:'samhwang1990'
    });
    new demo.FormDemo.SignupView({
        model:user
    });
    return this;
}
