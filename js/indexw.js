

/*---------------------------------------------------------------------\
|           navigation  buttons with corresponding divs                 |
 \--------------------------------------------------------------------*/

 const navButtons= document.querySelectorAll('.navRight ul li');
 const navfa = document.querySelectorAll('.navRight ul li .fa');
 const rightPanelDiv = document.querySelectorAll('.rightPanel >div');
 const postsectionClick = document.querySelector('.centralPanel');
 const notifications = document.querySelectorAll('.navRight ul .notfication')

//if you click on button color must be blue and all other bechome black
// if that button have notification, the notification must desappeal
//once you click on other button then opened section must be closed

for(let i=0;i<navButtons.length;i++){

    navButtons[i].addEventListener('click',()=>{
        
        for(let k=0;k<navButtons.length;k++){
            if(k!= i){
                rightPanelDiv[k].classList.remove('show')
                navfa[k].classList.remove('blue')
            }
            else{
                rightPanelDiv[i].classList.toggle('show')
                navfa[i].classList.toggle('blue')
                notifications[k-1].style.display = 'none'
            }
        }
        
    })
}


//if you click on scrolling section the right menu section must disappeal
postsectionClick.addEventListener('click',()=>{
    rightPanelDiv[0].classList.remove('show')
})


/*---------------------------------------------------------------------\
|                   different posts (middle part)                       |
 \--------------------------------------------------------------------*/

const posts = document.querySelectorAll('.post');
const closebutton = document.querySelectorAll('.post .tools .fa');

for (let index = 0; index < posts.length; index++) {
    closebutton[index].addEventListener('click',()=>{
        posts[index].style.display = 'none'
    })
    
}


// public comments woth like

// once you click on comment, all comment shoul bedesplayed and color of 
// comment section must be blue
// if you click on it again comments shold desappeal and button become black

const comment = document.querySelectorAll('.post .publicComments');
const commentButton = document.querySelectorAll('.post .likeAndComment .commenting')

for (let index = 0; index < posts.length; index++) {
    commentButton[index].classList.remove('blue')

    commentButton[index].addEventListener('click',()=>{
        comment[index].classList.toggle('show')
        commentButton[index].classList.toggle('blue')
    })

}



/*---------------------------------------------------------------------\
|                         scloring stories                              |
 \--------------------------------------------------------------------*/
const storyContainer = document.querySelector('.scrollStory')
const scllorLeft = document.querySelector('.scrollLeft')
const scllorRight = document.querySelector('.scrollRight ')
const certainStory = document.querySelectorAll('.freindStories')

const sizeOfStoryDiv = certainStory[0].clientWidth;
let counter = 0
console.log(sizeOfStoryDiv)

storyContainer.style.transform = 'translateX('+(-sizeOfStoryDiv*counter)+'px)';

//scroll rigth
scllorRight.addEventListener('click',()=>{
    if( counter < (-certainStory.length + Number(5))) {
        counter = counter
    }
    else{
        counter--
        storyContainer.style.transition = 'transform 0.4s ease-in-out';
        storyContainer.style.transform = 'translateX('+(sizeOfStoryDiv*counter)+'px)';
    }
    
})
// scroll left
scllorLeft.addEventListener('click',()=>{
    if( counter >=0) {
        counter = counter
    }
    else{
        counter++
        storyContainer.style.transition = 'transform 0.4s ease-in-out';
        storyContainer.style.transform = 'translateX('+(sizeOfStoryDiv*counter)+'px)';
    }
})



    

/*---------------------------------------------------------------------\
|                        writing commment                               |
 \--------------------------------------------------------------------*/
const usercommentContent = document.querySelectorAll('.post .commentContent input');
const sendComment = document.querySelectorAll('.post .commentContent .send');


if(usercommentContent.value !==''){
    sendComment[0].innerHTML = '<i class="fa fa-paper-plane" aria-hidden="true" style= "color:blue; cursor:pointer;"></i>'
} 
else{
    sendComment[0].innerHTML = ''
}



/*---------------------------------------------------------------------\
|                        resizing window                                |
 \--------------------------------------------------------------------*/
// incase our window size is less than than 1024
// how our screen should look like
const rightPanel = document.querySelector('.userEnvironment .rightPanel')
window.addEventListener('resize', ()=> {
    let viewport_width =document.body.clientWidth;

    if(viewport_width<1024){

        //incase you click on posts part menu have to hide
        postsectionClick.addEventListener('click',()=>{
            rightPanel.style.display = 'none'
        })


        // navigation actions
        for(let i=0;i<navButtons.length;i++){
            navButtons[i].addEventListener('click',()=>{
                rightPanel.style.display = 'block';
            })
        }

        
    }
});
