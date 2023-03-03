const btn = document.querySelector('.btn')
const divContainer = document.querySelector('.div-container')

btn.addEventListener('click', ()=>{
    console.log("Hello World");
    divContainer.style.height = '6em'
    // divContainer.textContent = 'Hello There'

})


// divContainer.forEach(element => {
//     element.addEventListener('click', ()=>{
//         console.log('Hello there');
//         // div.style.height = '6em'
//     })
    
// });