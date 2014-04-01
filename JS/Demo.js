/**
 * Created by sam on 14-3-31.
 */
var demo = {};
demo.fruit = function(){
    var Fruit = Backbone.Model.extend({
        validate:function(options){
            alert('djj');
            if(options.quantity && !_.isNumber(options.quantity)){
                return 'Quantity must be a number';
            }
        }
    });

    var Fruits = Backbone.Collection.extend({
        model:Fruit,
        initialize:function(){
            this.on('add',function(){
                console.log('New fruit added');
            });
            this.on('remove',function(){
                console.log('Fruit removed');
            });
        }
    });

    var fruitbowl = new Fruits({type:'apple',color:'red'});

    return {fruitbowl:fruitbowl};
}();

demo.user = function(){
    var User = Backbone.Model.extend({
        displayName:'Kate'
    });

    var user = new User({
        username:'jonraasch',
        displayName:'Jon Raasch',
        bio:'Some nerd'
    });

    var WelcomeMessageView = Backbone.View.extend({
        el:'header .welcome-message',

        initialize:function(){
            this.model.on('change:displayName',this.render,this);
            this.render();
        },

        render:function(){
            var displayName = this.model.get('displayName');
            this.$el.html('Welcome ' + displayName);
            return this;
        }
    });

    var welcomeMessageView = new WelcomeMessageView({
        model:user
    });

    return {WelcomeMessageView:welcomeMessageView};
}();

demo.Band = function(){
    //创建模型
    var Member = Backbone.Model.extend({});

    //创建集合
    var Members = Backbone.Collection.extend({
       model:Member
    });

    //组装集合
    var band = new Members([
        {name:'John'},
        {name:'Paul'},
        {name:'George'},
        {name:'Ringo'}
    ]);

    //创建模型视图
    Member.View = Backbone.View.extend({
        tagName:'li',

        render:function(){
            //把姓名加到列表条目中
            this.$el.text(this.model.get('name'));
            this.parentView.$el.append(this.$el);
            return this;
        }
    });

    Members.View = Backbone.View.extend({
        el:'#band-wrapper',
        initialize:function(){
            _.bindAll(this,'render');
            this.collection.on('change',this.render);
            this.collection.on('add',this.render);
            this.collection.on('remvoe',this.render);

            this.render();
        },
        render:function(){
            this.$el.empty();
            var thisView = this;

            this.collection.each(function(bandMember){
                var bandMemberView = new Member.View({
                    model:bandMember
                });
                bandMemberView.parentView = thisView;

                bandMemberView.render();
            });
            return this;
        }
    });

    var bandView = new Members.View({
        collection:band
    })
}();

demo.fruit.fruitbowl.add({type:'banana',color:'yellow'});
demo.user.WelcomeMessageView.model.set('displayName','Katherine');