/**********************
* 파일명 : main.js
* 작성자 : 함지훈
* 작성일 : 25-11-11
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (hedaer/footer 제외)
**********************/

$(document).ready(function(){
	let visual_time = 5000 //변수
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

		autoplay: {  /* 팝업 자동 실행 */
			delay: visual_time,
			disableOnInteraction: true,
		},

		effect: "fade", /* fade 효과 */

		loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

	});
	
	$('.visual .ctrl_btn .stop').on('click', function(){
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .play').css('display', 'flex')
        $('.visual .ctrl_btn .paging .bar span').stop()
    })
    $('.visual .ctrl_btn .play').on('click', function(){
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .stop').css('display', 'flex')
        updateCurrent()
    })
          
    // 전체 슬라이드 개수 (loop 상태에서도 실제 슬라이드 개수만)
    const totalSlides = $('.visual .swiper .swiper-slide').not('.swiper-slide-duplicate').length;
    $('.visual .paging .total').text(totalSlides); // 총 개수 표시

    // 현재 슬라이드 번호 표시 함수
    function updateCurrent() {
        let realIndex = visual_swiper.realIndex + 1; // 실제 인덱스 (0부터 시작하므로 +1)
        $('.visual .paging .current').text(realIndex);
        // 슬라이드가 교체되면 제일 먼저 넓이를 0으로 초기화
        $('.visual .ctrl_btn .paging .bar span').stop() //animate 종료
        $('.visual .ctrl_btn .paging .bar span').width(0)
        $('.visual .ctrl_btn .paging .bar span').animate({
            width : '100%'
        }, visual_time)
    }

    // 처음 로드 시 한번 실행
    updateCurrent();

    // 슬라이드 변경될 때마다 실행
    visual_swiper.on('slideChange', function () {
        updateCurrent();
    });
    /****************company 시작 ********************/
    /**********************
	* .company .list ul li에 마우스를 오버하면
	* 오버한 li에 active 클래스
	* .company .list에는 over 클래스 추가
	* ---- 언제 out
	**********************/
	$('.company .list ul li').on('mouseenter', function(){
		$(this).addClass('active')
		$('.company .list').addClass('over')
	})
	$('.company .list ul li').on('mouseleave', function(){
		$(this).removeClass('active')
		$('.company .list').removeClass('over')
	})
    /****************company 종료 ********************/
    /************new menu tab::시작***********
     * .product .tab_list ul li를 클릭했을 때 1번째를 클릭하면 active 클래스를 주고 
     * li에서 어떤 tab_item을 보이게 해야하는 지 단서를 줘야함
     * .product .tab_content .tab_item에서 1번째 요소에 active 클래스 줌
     * 
    */
    let tab_name
    $('.product .tab_list ul li').on('click', function(){
        // 클릭한 li에만 active 클래스 추가
        $('.product .tab_list ul li').removeClass('active')
        $(this).addClass('active')

        // 클릭한 li에만 button에다가 선택됨이라고 글자쓰기
        $('.product .tab_list ul li button span').text('')
        $(this).find('button span').text('선택됨')
        
        //클릭한 li와 관련된 tab_content tab_item에 active 클래스 추가
        tab_name = $(this).attr('data-tab')
        $('.product .tab_content .tab_item').removeClass('active')
        //find로 찾을 때는 클래스명이면 .이 추가되어야함, 내가 가져온 이름은 .이 없음
        $('.product .tab_content').find('.' + tab_name).addClass('active')

        //선택됨 tab_item의 title에만 '선택됨'이라고 써주기
        $('.product .tab_content .tab_item').attr('title', '')
        $('.product .tab_content').find('.' + tab_name).attr('title', '선택됨')
    })
    /************new menu tab::끝************/

    /************레시피 swiper::시작***********/
        const Recipe_swiper = new Swiper('.Recipe .swiper', { /* 팝업을 감싼는 요소의 class명 */
            slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
            spaceBetween: 50, /* 팝업과 팝업 사이 여백 */
            breakpoints: {
                1024: {    /* 640px 이상일때 적용 */
                    slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                    spaceBetween: 207,
                },
            },
            centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
            // loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

            navigation: {
                nextEl: '.Recipe .next',
                prevEl: '.Recipe .prev',
            },
            // navigation: {
            //     nextE1: '.Recipe .ctrl_btn .mo_next',
            //     prevE1: '.Recipe .ctrl_btn .mo_prev',
            // },
        });
        document.querySelector('.mo_next').addEventListener('click', () => {
            Recipe_swiper.slideNext();
        });
        
        document.querySelector('.mo_prev').addEventListener('click', () => {
            Recipe_swiper.slidePrev();
        });
    /************레시피 swiper::끝***********/

    /************new 오버시 이미지 생성::시작***********/
    const items = document.querySelectorAll('.news .list li');
    const preview = document.querySelector('.news .preview');
    const list = document.querySelector('.news .list');

    // 초기 active 이미지 세팅
    const activeItemInit = document.querySelector('.news .list li.active');
    if (activeItemInit) {
        preview.style.backgroundImage = `url(${activeItemInit.dataset.img})`;
        preview.style.opacity = '1';
    }

    items.forEach(item => {
        // hover 시 active 옮기기 + 이미지 변경
        item.addEventListener('mouseenter', () => {
            // 기존 active 제거
            items.forEach(i => i.classList.remove('active'));
            // 현재 아이템에 active 추가
            item.classList.add('active');
            // 이미지 변경
            preview.style.backgroundImage = `url(${item.dataset.img})`;
            preview.style.opacity = '1';
        });
    });

    // 리스트 밖으로 나가도 마지막 hover(active) 이미지 유지
    list.addEventListener('mouseleave', () => {
        const activeItem = document.querySelector('.news .list li.active');
        if (activeItem) {
            preview.style.backgroundImage = `url(${activeItem.dataset.img})`;
            preview.style.opacity = '1';
        }
    });
    
    /************new 오버시 이미지 생성::끝***********/



    /************리뷰 swiper::시작***********/
    const review_swiper = new Swiper('.review .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* css에서 slide의 넓이ㅓ 지정 */
        spaceBetween: 40, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 768px 이상일때 적용 */
                spaceBetween: 70,
            },
            1501: {    /* 768px 이상일때 적용 */
                spaceBetween: 90,
            },
        },
        centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.review .next',
            prevEl: '.review .prev',
        },
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.review .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
        on: {
            slideChange: function() {
                const activeSlide = this.slides[this.activeIndex]
                const activeSlideWidth = activeSlide.offsetWidth
                const otherSlides = this.slides[this.previousIndex]
                const otherSlideWidth = otherSlides.offsetWidth			
                const slideWidthDifference = activeSlideWidth - otherSlideWidth;
                this.setTranslate(this.translate - slideWidthDifference);
            },
            slideChangeTransitionEnd: function() {
                // 전환이 끝나면 Swiper를 다시 업데이트
                setTimeout(() => {
                    this.update();
                }, 10);  // 잠시 딜레이를 주고 업데이트
            }
        },
    });
    /************리뷰 swiper::시작***********/












})//맨끝