/**
 * Created by Sam on 14-4-1.
 */

var demo = {};

demo.commonFunc = {
    //获取js模板字符串
    getTemplateData:function(src,callback,selector,user){
        var templateString="";
        $.ajax({
           //从src处获取模板字符串
            url:src,

            method:'post',

            //加载成功后所作的事
            success:function(data){
                callback(_.template(data),selector,user);
            },

            //万一出错误
            error:function(){
                console.log('Problem loading template');
            }
        });
    }
};

demo.User = function(){
    //创建模板
    var User = Backbone.Model.extend({});

    //创建模板实例
    var user = new User({
        userName:'SamHwang',
        displayName:'Sam',
        bio:'Some nerd'
    });

    //处理模板数据
    var loadTemplateCallback=function(template,elementSelector,user){
        var compiled = template(user.toJSON());
        $(elementSelector).html(compiled);
    }

    //创建视图
    var UserView = Backbone.View.extend({
        el:'#user-card',
        initialize:function(){
            this.render();
        },
        render:function(){
            demo.commonFunc.getTemplateData($('#UserItemModel').attr('src'),loadTemplateCallback,this.el,this.model);
            return this;
        },

    });

    var userView = new UserView({
        model:user
    });

    return {UserView:userView,User:user};
}();
