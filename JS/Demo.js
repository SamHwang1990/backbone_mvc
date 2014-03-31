/**
 * Created by sam on 14-3-31.
 */
var demo = function(){
        var Fruit = Backbone.Model.extend({
//            defaults:{
//                condition:'perfect'
//            },
//            description:function(){
//                return this.get('color')+', ' + this.get('condition')+' '+this.get('type');
//            },
//            initialize:function(){
//                console.log('Fruit model initialize');
//                this.on('add',function(){
//                    console.log('Fruit added -' + this.get('type'));
//                });
//                this.on("change",function(){
//                   console.log('Values for this model have changed');
//                });
//            },
            validate:function(options){
                alert('djj');
                if(options.quantity && !_.isNumber(options.quantity)){
                    return 'Quantity must be a number';
                }
            }
        });
    var apple=new Fruit({
            name:'apple'
    });
    apple.on('invalid',function(model,error){
        console.log(error);
    });

    apple.set('quantity', 'a bunch',{validate:true});

    return {apple:apple};
}();

demo.apple.set('condition','moldy');