// =============================================== Get color From LocalStorage =============================================== \\

if (window.localStorage["main-color"]) {
    document.documentElement.style.setProperty("--main-color", window.localStorage["main-color"]);
    Array.from(document.querySelectorAll(".controls .colors ul li")).forEach(ele => {
        if(ele.getAttribute("data-color") === `${window.localStorage["main-color"]}`) {
            ele.classList.add("activ");
        }else {
            ele.classList.remove("activ");
        }
    })
}

// =============================================== Change Background Settings =============================================== \\

if(window.localStorage.bgChange) {
    if (window.localStorage.bgChange === "no") {
        changeNo.click();
    }
}

// =================================================== Show bullets or not ================================================== \\

if(window.localStorage.showBullets) {
    if (window.localStorage.showBullets === "no") {
        showNo.click();
    }
}

// =============================================== Open And Close Settings Box =============================================== \\

let controls = document.querySelector(".controls");
let closed = true;
document.querySelector(".controls-icon").addEventListener("click", () => {
    document.querySelector(".controls-icon i").classList.toggle("fa-spin");
    if (closed === true) {
        controls.style.left = "0";
        closed = false;
    }else {
        controls.style.left = "-188px";
        closed = true;
    }
})

// ====================================================== Change Colors ====================================================== \\

Array.from(document.querySelectorAll(".controls .colors ul li")).forEach(ele => {
    ele.addEventListener("click", (event) => {
        document.querySelector(".controls .colors ul li.activ").classList.remove("activ");
        event.target.classList.add("activ");  
        let mainColor = event.target.getAttribute("data-color");
        // console.log(mainColor);
        document.documentElement.style.setProperty("--main-color", mainColor);
        window.localStorage["main-color"] = mainColor;
    });
});

// ==================================================== Change Background ==================================================== \\

let intervalcount;
let changeYes = document.querySelector(".landing .controls .bg-random .yes");
let changeNo = document.querySelector(".landing .controls .bg-random .no");
function changeBackground() {
    let landing = document.querySelector(".landing");
    intervalcount =  setInterval(() => {
        let random = Math.floor(Math.random() * 5);
        random++;
        landing.style.cssText = `background-image: url(imgs/0${random}.jpg)`;
    } ,10000)
}
changeYes.addEventListener("click", () => {
    changeNo.style.opacity = ".5";
    changeYes.style.opacity = "1";
    window.localStorage.bgChange = "yes";
    changeBackground();
});
changeNo.addEventListener("click", () => {
    changeYes.style.opacity = ".5";
    changeNo.style.opacity = "1";
    window.localStorage.bgChange = "no";
    clearInterval(intervalcount);
});
changeBackground();

// ====================================================== Show Bullets ====================================================== \\

let showYes = document.querySelector(".landing .controls .show-bullets .yes");
let showNo = document.querySelector(".landing .controls .show-bullets .no");
let bulletsList = document.querySelector(".landing .bullets"); 
showYes.addEventListener("click", () => {
    showNo.style.opacity = ".5";
    showYes.style.opacity = "1";
    bulletsList.style.display = "flex";
    window.localStorage.showBullets = "yes";
});
showNo.addEventListener("click", () => {
    showYes.style.opacity = ".5";
    showNo.style.opacity = "1";
    bulletsList.style.display = "none";
    window.localStorage.showBullets = "no";
});

// ====================================================== Reset Options ====================================================== \\

document.querySelector(".reset").addEventListener("click",() => {
    window.localStorage.clear();
    window.location.reload();
    // document.querySelectorAll(".controls .colors ul li")[0].click();
    // document.querySelectorAll(".landing .controls .yes").forEach(yes => {
    //     yes.click();
    // });
});

// ================================================== Animate Progress bars ================================================== \\

let skills = document.querySelector(".skills");
window.onscroll = function (){
    // // The Height Of The Skills Section  
    // console.log(skills.offsetHeight);
    
    // // The Height From The Start Of The Window To The Start Of The Skills Section
    // console.log(skills.offsetTop);
    
    // // The Height Of The the viewport Height
    // console.log(window.innerHeight);
    if (window.scrollY > (skills.offsetHeight + skills.offsetTop - window.innerHeight)) {
        document.querySelectorAll(".skills .progress span").forEach(span => {
            span.style.width = span.dataset.progress;
        })
    }
}

// ================================================== Create Gallery Pop Up ================================================== \\

document.querySelectorAll(".gallery .imgs-box img").forEach(img => {
    img.addEventListener("click", (event) => {
        
        // Pop Up Container
        let popCont = document.createElement("div");
        popCont.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgb(0 0 0 / 80%)`;
        
        // pop up main div and style
        let popUp = document.createElement("div");
        popUp.style.cssText = `width: 500px; padding: 20px; background-color: white; border: 1px solid #ddd; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`;
        
        // pop head Title
        if(event.target.alt !== null) {
            let popHead = document.createElement("h3");
            popHead.innerHTML = event.target.getAttribute("alt");
            popHead.style.cssText = `text-align: center; color: var(--main-color); margin-top: 0; margin-bottom: 20px;`;
            popUp .appendChild(popHead);
        }
        
        // pop Img 
        let popImg = document.createElement("img");
        popImg.setAttribute("src", `${event.target.getAttribute("src")}`)
        popImg.style.maxWidth = "100%";
        popUp.appendChild(popImg);
        
        // Close The Pop Up Button
        let closePop = document.createElement('span');
        closePop.innerHTML = 'X';
        closePop.style.cssText = `width: 40px; height: 40px; border-radius: 50%; color: white; background-color: var(--main-color); position: absolute; top: -20px; right: -20px; text-align: center; line-height: 40px; font-weight: bold; cursor: pointer;`;
        
        closePop.addEventListener("click", () => {
            popCont.remove();
        });
        
        popUp.appendChild(closePop);
        
        popCont.appendChild(popUp);
        document.body.appendChild(popCont);
    } )
});

// ================================================ Bullets Scroll To Section ================================================ \\

let bullets = document.querySelectorAll(".landing .bullets li");

bullets.forEach(bullet => {
    bullet.addEventListener("click", (event) => {
        let sectionOffset = document.querySelector(`#${event.target.getAttribute("data-scrol")}`);
        window.scrollTo(0, sectionOffset.offsetTop );
        // document.querySelector(`#${event.target.getAttribute("data-scrol")}`).scrollIntoView({
            //     behavior: "smooth"
            // });
        })
    });
    
    
// =================================================== Mobile Toggle Menu =================================================== \\

let opened = false;
document.querySelector(".toggle-menu").addEventListener("click", () => {
    if (opened === false && window.innerWidth < 767) {
        document.querySelector(".landing .head ul").style.display = "flex";
        opened = true;
    } else if (opened === true && window.innerWidth < 767) {        
        document.querySelector(".landing .head ul").style.display = "none";
        opened= false;
    }
})