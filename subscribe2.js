//基于构造函数 模式 编写 发布订阅
(function(){
    function Sub () {
        return new init()
    }
    function init () {
        this.pond = {}
    }
    Sub.prototype = {
        constructor:Sub,
        //发布的方法 就是向你的池子中添加方法
        on:function(type,func){
            !this.pond.hasOwnProperty(type)?this.pond[type] = [] : null
            var arr = this.pond[type]
            if(arr.includes(func)) return
            arr.push(func)
        },
        // 通知的方法 从池子中执行方法
        fire(type,...params){
            var arr = this.pond[type]
            arr = arr.slice(0)
            for(var i = 0; i < arr.length; i++){
                var item = arr[i]
                item = item(...params)
            }
        },
        // 移除池子中的方法
        off(type,func){
            var arr = this.pond[type]
            this.pond[type] = arr.filter( item => {
                return item !== func
            })
        }
    }
    init.prototype = Sub.prototype
    window.Sub = Sub
})()