
load = () => {
   new Cursor();
   new Transition();
}

const math = {
	lerp: (a, b, n) => {
		return (1 - n) * a + n * b
	},
	norm: (value, min, max) => {
	  	return (value - min) / (max - min)
	}
}

const config = {
    height: window.innerHeight,
    width: window.innerWidth
}

class Cursor{
    constructor(){
        this.data = {
            posX: 0,
            posY: 0,
            mouseX: 0,
            mouseY: 0,
        }
        this.dom = {
            cursor: document.querySelector(".cursor"),
            follower: document.querySelector(".cursor-follower"),
        }

        this.init();
    }

    init(){
        gsap.to({},{
            duration:  0.010,
            repeat: -1,
            onRepeat: () => {
                this.data.posX += (this.data.mouseX - this.data.posX) / 9;
                this.data.posY += (this.data.mouseY - this.data.posY) / 9;

                gsap.set(this.dom.follower, {
                    css: {
                        left: this.data.posX - 12,
                        top: this.data.posY - 12,
                    }
                });

                gsap.set(this.dom.cursor, {
                    css: {
                        left: this.data.mouseX,
                        top: this.data.mouseY,
                    }
                })
            }
        });

        document.addEventListener("mousemove", (e) => {
            this.data.mouseX = e.clientX,
            this.data.mouseY = e.clientY
        })
    }
}

class Transition{
    constructor(){
        this.tl = null;
        this.state = false;
        this.dom = {
            //todo remember
            mask: document.querySelector('.page-loader'),
            slices: [...document.querySelectorAll('.js-mask__slice')],
        }
        this.init();
    }

    createTimeLine(){
        this.tl = gsap.timeline({
            // paused: true,
            onComplete: () => {
                this.state = false;
                console.log("I am done");
            }
        })

        this.tl
            .set(this.dom.mask, {
                autoAlpha: 1
            })
            .fromTo(this.dom.slices, {
                xPercent: 100,
            }, {
                xPercent: 0,
                ease: "expo.inOut",
                duration: 1.5,
                stagger: 0.06,
            })
    }

    init(){
        this.createTimeLine();
    }
}

window.addEventListener("load", load);