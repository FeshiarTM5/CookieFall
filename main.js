let game = true;
let cookies = [];
let hp = 3;
let xp = 0;
let hearts = document.getElementsByClassName("heart");
document.addEventListener("DOMContentLoaded", function(){
    let gameOverContainer = document.getElementsByClassName("ec")[0];
    let gameOverText = document.getElementsByClassName("go")[0];
    let para = document.getElementsByTagName("p")[0];
    let div = document.getElementsByClassName("container")[0];
    let audio = new Audio('cookieMonster.mp3');
    audio.volume = 0.2;
    let interval = setInterval(function(){
        if(game){
            let newElement = document.createElement("img");
            newElement.setAttribute("src", "cookie.png");
            newElement.classList.add("cookie");
            let displacement = Math.floor(Math.random() * 1000 % (parseInt(getComputedStyle(div).width) - 100));
            let rotation = Math.floor(Math.random() * 1000 % 360);
            newElement.style.transform = "translateX(" + displacement + "px) " + "rotate(" + rotation + "deg)";
            div.appendChild(newElement);
            cookies.push(newElement);
        }
        else{
            clearInterval(interval);
        }
    }, 500);
    let cookieInterval = setInterval(function(){
        if(game){
            cookies.forEach(cookie => {
                if(cookie != 0){
                    cookie.addEventListener("click", function(){
                        if(cookie.getAttribute("src") == "cookie.png"){
                            xp += 1;
                            para.innerHTML = "XP: " + xp;
                        }
                        audio.play();
                        cookie.setAttribute("src", "crumbs.png");
                        cookie.style.zIndex = "10"
                    })
                    if(xp >= 3 && hp < 3){
                        hp += 1;
                        xp -= 3;
                        hearts[3 - hp].style.opacity = "100%";
                        para.innerHTML = "XP: " + xp;
                    }
                    if(parseInt(getComputedStyle(cookie).top) < parseInt(getComputedStyle(div).height)){
                        cookie.style.top = parseInt(getComputedStyle(cookie).top) + 4 + "px";
                    }
                    else{
                        cookies[cookies.indexOf(cookie)] = 0;
                        cookie.remove()
                        if(cookie.getAttribute("src") == "cookie.png"){
                            hearts[3 - hp].style.opacity = "10%";
                            hp -= 1;
                            if(hp <= 0){
                                game = false;
                                gameOverText.style.display = "inline";
                                gameOverContainer.style.display = "inline";
                            }
                        }
                    }
                }
            });
        }
        else{
            clearInterval(cookieInterval);
        }
    }, 10);
});
