//  const name =(names)=>{
//     return new Promise((resolve, reject) => {
        
//         //resolve
//         //inside of resolve you should put in a funciton to be peroformed or allot of code.
//         if(names == 'ishimwe'){
//             resolve(console.log('fucntion to be performed on result from processed promise'))
//         }
//         //reject
//         // as well as reject you can put whatever you want to be perfomed. 
//         else{
//             reject(console.log('function to be performed when promise is rejected'))
//         }
//     })
// }


// name('ishimwe')

// .then(
//     (name)=>{
//         return name+' claude';
//     }
// )

// .then((name)=>{
//     return console.log(`hello ${name}`)
// }).catch((err)=>{
//     console.log(err)
// })

// //.finally will run if promise is resolved as well as when it's rejected.
// .finally(
//     ()=>{
//         console.log('here is at the end of the code.')
//     }
// )

// console.log('this is practice of using promises')

////////////////////////////////////////////////////////////////////////////////////////////

// setTimeout((a,b)=>{
//         const output = a+b;
//     return console.log(`intered out put is ${output}`)

///////////////////////////////////////////////////////////////////////////////////////////////


////// testing promises
// const a = ()=>{
//     console.log('a function')
// }
// const k =()=>{
//     console.log('k function')
// }
// const y = ()=>{
//     console.log('function y')
// }

// let promis = new Promise((resolve,reject)=>{
//     if(a){
//         resolve(k)
//     }
//     else{
//         reject(y)
//     }
// })


// promis
// .then(()=>{
//     console.log('go on')
// })
// .then(()=>{
//     console.log('next step')
// })
// .catch(()=>{
//     console.log('erro accured')
// })

// console.log('run promises after me')




// // /// //// ////////// /////////////////////// ///////////////////////

// async function h(){
//     return 'hello'
// }
// h()

const arr = [1,2,3,4];
// arr.splice(2,0,'t')
// console.log(arr)

// arr.unshift('t')
// console.log(arr)

// let resu =arr.concat()
// console.log(resu)


var list = [12,34,111,100,34,68,5,6,2,2,90,900];

// searching for max
// const maxNumber =(list)=>{
// var length = list.length-1;
// let store;
// for(var i=0; i<length; i++){
//     if(list[i]>= list[i+1]){
//         store = list[i]
//         list[i+1]= list[i] 
//     }
//     else{
//         store = list[i+1]
//     }
//     }
// console.log(store);
// }
// //invoking function
// maxNumber(list)

var list = [12,34,111,100,34,68,5,6,2,2,90];
let maxNumber = 0
for(let i =0;i<list.length;i++){
    for(let k = i; i<list.length; i++){
        if(list[i]<list[k]){
            maxNumber = list[k]
            list[i]= list[k]
        }
        else{
            maxNumber = list[i]
        }
    }
    console.log(maxNumber)
}