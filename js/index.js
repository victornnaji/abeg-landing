
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
            link: [...document.querySelectorAll(".link")],
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

        this.dom.link.forEach( (item, index) => {
            item.addEventListener("mouseenter", (e) => {
                this.dom.cursor.classList.add("active");
                this.dom.follower.classList.add("active");
            });

            item.addEventListener("mouseleave", (e) => {
                this.dom.cursor.classList.remove("active");
                this.dom.follower.classList.remove("active");
            });
        })

        document.addEventListener("mousemove", (e) => {
            this.data.mouseX = e.clientX;
            this.data.mouseY = e.clientY;
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
            spinner: document.querySelector(".loader .spinner-container"),
            loader_logo: document.querySelector(".loader .loader-logo"),
            lines: [...document.querySelectorAll('.js-mask-line')],
            loader_logo_img: document.querySelector(".loader-logo__mask svg"),
            bg: document.querySelector(".line-bg"),
            logo: document.querySelector(".brand.link svg"),
            navs: [...document.querySelectorAll(".nav-item")],
        }
        this.init();
    }

    resetScroll(){
        window.scrollTo(0, 0);
    }

    createTimeLine(){
        this.tl = gsap.timeline({
            // paused: true,
            onComplete: () => {
                this.state = false;
            }
        })

        this.tl
            .set(this.dom.mask, {
                autoAlpha: 1,
            })
            .set([this.dom.logo, this.dom.navs], {yPercent: 0, autoAlpha: 1})
            
            .fromTo(this.dom.slices, {
                xPercent: 100,
            }, {
                xPercent: 0,
                ease: "expo.inOut",
                duration: 1.5,
                stagger: 0.06,
            }, -0.09)
            .call(this.resetScroll.bind(this))

            .add("loadingStart")

            
            .set([this.dom.bg, this.dom.navs], {autoAlpha: 0})
            .set(this.dom.logo, {yPercent: -100})

            .set([this.dom.spinner, this.dom.loader_logo, this.dom.lines[0]], {
                autoAlpha: 1,
            })

            .fromTo(this.dom.loader_logo_img, {
                yPercent: -100,
                rotation: 1
            }, {
                yPercent: 0,
                rotation: 0,
                ease: "expo.out",
                duration: 1
            })

            .fromTo(this.dom.lines, {
                scaleX: 0
            }, {
                scaleX: 1,
                duration: 1,
                ease: "expo.inOut",
                stagger: 0.75,
            }, "-=1")

            .set(this.dom.lines, {
              transformOrigin: 'right'
            })

            .fromTo(this.dom.lines[0], 1, {
               scaleX: 1
            }, {
                scaleX: 0,
                ease: "expo.inOut",
            })
            .to(this.dom.loader_logo_img, {
                yPercent: 150,
                ease: "expo.in",
                duration: 1
            })
            .fromTo(this.dom.slices, {
                xPercent: 0
            },{
              duration: 1.5,
              stagger: 0.095,
              xPercent: 100,
              ease: "expo.inOut"
            }, "-=0.2")
            .set(this.dom.mask, {
              autoAlpha: 0
            })
            .to(this.dom.bg, {
                xPercent: -5,
                autoAlpha: 1,
                yoyo: true,
                ease: "bounce.out",
                duration: 1.5
            }, "-=0.9")
            .add("contentStart", '-=0.65')

            .fromTo(this.dom.logo, {
                yPercent: -100,
                autoAlpha: 0,
            }, {
                yPercent: 0,
                ease: "expo.inOut",
                autoAlpha: 1,
            }, "contentStart")

            .fromTo(this.dom.navs, {
                yPercent: -100,
                autoAlpha: 0,
            }, {
                yPercent: 0,
                ease: "expo.inOut",
                autoAlpha: 1,
                stagger: 0.05,
            }, "contentStart")

    }

    init(){
        this.createTimeLine();
    }
}

window.addEventListener("load", load);