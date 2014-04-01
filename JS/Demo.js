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

}();

demo.fruit.fruitbowl.add({type:'banana',color:'yellow'});