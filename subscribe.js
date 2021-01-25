//基于单例模式实现
let subscribe = (function () {
    //1.定义一个池子
    let pond = {}
    //2.关于事件池中方法的管理
    /*
    * @params
    * type : 自定义事件的名称
    * func : 你要执行的事件函数
    * params : 执行的时候传递的参数
    */
    const on = function (type,func) {
        //3.首先我们要知道池子中你的自定义事件名称是否存在 
        // 如果存在了 我们就什么也不做 
        //如果不存在 我们就应该把这个名称添加进去 并且让它的值等于一个空数组 方便存放我的们事件处理函数
        !pond.hasOwnProperty(type) ? pond[type] = [] :null
        //4. 下一步 如果你这个自定义事件里 已经有我们的事件处理函数了 我们需要去重 如果不存在我们就需要添加
        let arr = pond[type]
        //判断 你的事件处理函数 在不在里面 如果在就去重 如果不在就添加
        // if(arr.includes(func)) return
        for(let i = 0; i < arr.length; i++){
            if(arr[i] === func){
                return
            }
        }
        arr.push(func)
    }
    const off = function (type,func){
        //5.移除 
        // 如果 你穿进来的自定义名称 在我们的pond 里 那么我就开始移除你传过来的事件处理函数
        // 如果不在 我们就给一个空数组
        let arr = pond[type] || []
        for(let i = 0; i < arr.length; i++){
            // 找到相同的了 开始移除
            if(arr[i] === func){
                arr.splice(i,1)
                // 这里我们在添加的时候 就已经去重了 所以不会在重复了 这里我们就要把循环结束
                break
            }
        }
        // 更快捷的方法 就是过滤
        // arr = arr.filter(item => item !== func)
    }
    //6.通知方法执行
    const fire = function (type,...params) {
        //这是找到了 你上面 要执行的函数
        let arr = pond[type] || []
        //为了防止数组塌陷 我们克隆一份
        arr = arr.slice(0)
        // arr.forEach(item => item(...params))
        for(let i = 0; i < arr.length; i++){
            // 然后让每一个函数执行 并且 把参数传入进去
            let item = arr[i]
            item(...params)
        }
    }
    return {
        on,
        off,
        fire
    }
})()

//以上我们就写完了 但是存在如下问题
let box = document.getElementById('box')
box.onclick = function (e) {
    subscribe.fire('@aa',10,20,e)
}
function fn1(x,y,e) {
    console.log(x,y,e)
}
subscribe.on('@aa',fn1)
function fn2(){
    console.log(2)
    //这里 我们在触发fn2的时候 把fn1 和 fn2 删除
    //这里 我们第一次触发的的时候 fn1 和 fn2 应该还能触发
    // 但是 fn2 执行完毕之后 fn1 和 fn2 才会被删除
    // 但是 我们第一次触发的时候  fn1 和 fn2 fn5 还在 但是 fn3 和 fn4 却被删除了
    // 然后当我们点击第二次的时候 才恢复正常
    subscribe.off('@aa',fn1)
    subscribe.off('@aa',fn2)
}
subscribe.on('@aa',fn2)
function fn3(){
    console.log(3)
}
subscribe.on('@aa',fn3)
function fn4(){
    console.log(4)
}
subscribe.on('@aa',fn4)

function fn5(){
    console.log(5)
}
subscribe.on('@aa',fn5)
