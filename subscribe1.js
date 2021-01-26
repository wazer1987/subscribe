// // 基于 ES6 CLASS模式 实现 发布订阅
class Subscribe {
    //1.写一个自己的属性 加上#号 这个只有自己内部可以访问到 外部访问不到 自己的池子
    #pond ={}
    //2.通知方法执行
    $on(type,callback) {
        // 先看看 你的这个自定义事件名称这里面有没有 如果有 我们就什么也不干 如果没有 我们让我们的
        //自定义事件名称等于一个空数组
        !this.#pond.hasOwnProperty(type)?this.#pond[type] = [] :null
        // 我们把这个数组拿过来
        let arr = this.#pond[type]
        // 把我们的函数 都推入进去
        arr.push(callback)
    }
    //3. 执行的方法
    $emit(type,...params){
        //看看 你的自定义事件 在不在 我们的池子里
        let arr = this.#pond[type] || []
        for(let i = 0; i < arr.length; i++){
            let item = arr[i]
            item && item(...params)
        }
    }
};


//以上我们就写完了 但是存在如下问题
const sub = new Subscribe()
let box = document.getElementById('box')
box.onclick = function () {
    sub.$emit('@aa',33)
    sub.$emit('@aa',55)
}

sub.$on('@aa',function(res){
    console.log(res)
})

