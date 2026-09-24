      const slider = document.getElementById("slider");

        const leftBtn = document.querySelector(".left-btn");

        const rightBtn = document.querySelector(".right-btn");


        /*
        ============================================
        AUTO SLIDE
        ============================================
        */

        let autoSlide;


        function startAutoSlide() {

            autoSlide = setInterval(() => {

                slider.scrollBy({
                    left: 440,
                    behavior: "smooth"
                });

                /*
                When reaching the end,
                go back to beginning.
                */

                if (
                    slider.scrollLeft +
                    slider.clientWidth >=
                    slider.scrollWidth - 10
                ) {

                    setTimeout(() => {

                        slider.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });

                    }, 800);

                }

            }, 3000);

        }


        /*
        ============================================
        RIGHT BUTTON
        ============================================
        */

        rightBtn.addEventListener("click", () => {

            slider.scrollBy({
                left: 440,
                behavior: "smooth"
            });

            restartAuto();

        });


        /*
        ============================================
        LEFT BUTTON
        ============================================
        */

        leftBtn.addEventListener("click", () => {

            slider.scrollBy({
                left: -440,
                behavior: "smooth"
            });

            restartAuto();

        });


        /*
        ============================================
        RESTART AUTO SLIDE
        ============================================
        */

        function restartAuto() {

            clearInterval(autoSlide);

            startAutoSlide();

        }


        /*
        ============================================
        START
        ============================================
        */

        startAutoSlide();
