/**********************
* 파일명 : main.js
* 작성자 : 함지훈
* 작성일 : 25-11-28
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (hedaer/footer 제외)
**********************/

$(document).ready(function(){
    let visual_name = ['역사를 만나는 문턱에서', '한 점의 유물이 전하는 깊은 순간', '유산이 살아 숨 쉬는 전시의 중심']
	const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

		autoplay: {  /* 팝업 자동 실행 */
			delay: 5000,
			disableOnInteraction: true,
		},

		effect: "fade", /* fade 효과 */

		loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

		pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
			el: '.visual .paging ul', /* 해당 요소의 class명 */
			clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
			// type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
			renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
				return '<li class="'+ className +'"><span>'+ visual_name[index] +'</span></li>';
			},
		},
	});

	const special_swiper = new Swiper('.special .swiper', { /* 팝업을 감싼는 요소의 class명 */
	slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
	spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
		breakpoints: {
			600: {    /* 640px 이상일때 적용 */
				slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 16,
			},
			1024: {    /* 640px 이상일때 적용 */
				slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
		},
		scrollbar: {
			el: ".special .ctrl_wrap .scrollbar",
			hide: false,
			draggable: true, // 스크롤바 드래그 가능
			dragSize: 'auto', // 스크롤바 사이즈
		},
		//centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
		autoplay: {  /* 팝업 자동 실행 */
			delay: 2500,
			disableOnInteraction: true,
		},
		navigation: {
			nextEl: '.special .ctrl_wrap .ctrl_btn .ctrl_next',
			prevEl: '.special .ctrl_wrap .ctrl_btn .ctrl_prev',
		},
	});
	/*special 팝업슬라이드 정지, 플레이 버튼*/
	$('.special .ctrl_wrap .ctrl_btn .ctrl_stop').on('click', function(){
        special_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.special .ctrl_wrap .ctrl_btn .ctrl_play').css('display', 'flex')
    })
    $('.special .ctrl_wrap .ctrl_btn .ctrl_play').on('click', function(){
        special_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.special .ctrl_wrap .ctrl_btn .ctrl_stop').css('display', 'flex')
        updateCurrent()
    })
	/*special 팝업슬라이드 정지, 플레이 버튼*/


	/************exhibition menu tab::시작***********
     * .exhibition .tab_list ul li를 클릭했을 때 1번째를 클릭하면 active 클래스를 주고 
     * li에서 어떤 tab_item을 보이게 해야하는 지 단서를 줘야함
     * .exhibition .tab_content .tab_item에서 1번째 요소에 active 클래스 줌
     * 
    */
	let exhibition_tab_name
	$('.exhibition .tab_list ul li').on('click', function(){
		// 클릭한 li에만 active 클래스 추가
		$('.exhibition .tab_list ul li').removeClass('active')
		$(this).addClass('active')

		// 클릭한 li에만 button에다가 선택됨이라고 글자쓰기
		$('.exhibition .tab_list ul li button span').text('')
		$(this).find('button span').text('선택됨')
		
		//클릭한 li와 관련된 tab_content tab_item에 active 클래스 추가
		exhibition_tab_name = $(this).attr('data-tab')
		$('.exhibition .tab_content .tab_item').removeClass('active')
		//find로 찾을 때는 클래스명이면 .이 추가되어야함, 내가 가져온 이름은 .이 없음
		$('.exhibition .tab_content').find('.' + exhibition_tab_name).addClass('active')

		//선택됨 tab_item의 title에만 '선택됨'이라고 써주기
		$('.exhibition .tab_content .tab_item').attr('title', '')
		$('.exhibition .tab_content').find('.' + exhibition_tab_name).attr('title', '선택됨')
	})
	/************new menu tab::끝************/
	/************exhibition 탭 누를 시 배경 변경::시작************/
	const tabs = document.querySelectorAll('.tab_list li');
	const exhibition = document.querySelector('.exhibition');

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			// active 초기화
			tabs.forEach(t => t.classList.remove('active'));
			tab.classList.add('active');

			// 배경 변경
			const target = tab.dataset.tab;
			exhibition.className = `exhibition ${target}`;
		});
	});
	/************exhibition 탭 누를 시 배경 변경::시작************/
	
	/************collection swiper::시작************/
	const collection_swiper = new Swiper('.collection .swiper', { /* 팝업을 감싼는 요소의 class명 */
		slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
		spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
		breakpoints: {
			450: {    /* 640px 이상일때 적용 */
				slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 16,
			},
			769: {    /* 640px 이상일때 적용 */
				slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
			1025: {    /* 640px 이상일때 적용 */
				slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
		},
		autoplay: {  /* 팝업 자동 실행 */
			delay: 2500,
			disableOnInteraction: true,
		},
		navigation: {
			nextEl: '.collection  .ctrl_btn .ctrl_next',
			prevEl: '.collection  .ctrl_btn .ctrl_prev',
		},
	});
	/*collection 팝업슬라이드 정지, 플레이 버튼*/
	$('.collection  .ctrl_btn .ctrl_stop').on('click', function(){
        collection_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.collection  .ctrl_btn .ctrl_play').css('display', 'flex')
    })
    $('.collection  .ctrl_btn .ctrl_play').on('click', function(){
        collection_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.collection  .ctrl_btn .ctrl_stop').css('display', 'flex')
        updateCurrent()
    })
	/*collection 팝업슬라이드 정지, 플레이 버튼*/
/************collection swiper::종료************/
/************publication swiper::시작************/
	const publication_swiper = new Swiper('.publication .swiper', { /* 팝업을 감싼는 요소의 class명 */
		slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
		spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
		breakpoints: {
			400: {    /* 640px 이상일때 적용 */
				slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 16,
			},
			769: {    /* 640px 이상일때 적용 */
				slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
			1025: {    /* 640px 이상일때 적용 */
				slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
		},
		autoplay: {  /* 팝업 자동 실행 */
			delay: 2500,
			disableOnInteraction: true,
		},
		navigation: {
			nextEl: '.publication  .ctrl_btn .ctrl_next',
			prevEl: '.publication  .ctrl_btn .ctrl_prev',
		},
	});
	/*publication 팝업슬라이드 정지, 플레이 버튼*/
	$('.publication  .ctrl_btn .ctrl_stop').on('click', function(){
        publication_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.publication  .ctrl_btn .ctrl_play').css('display', 'flex')
    })
    $('.publication  .ctrl_btn .ctrl_play').on('click', function(){
        publication_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.publication  .ctrl_btn .ctrl_stop').css('display', 'flex')
        updateCurrent()
    })
	/*publication 팝업슬라이드 정지, 플레이 버튼*/
/************publication swiper::종료************/

/************ education swiper :: 시작 ***********/
const education_swiper = new Swiper('.group01 .education .swiper', {
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    loop: true,
    navigation: {
        nextEl: '.group01 .education .pagination .ctrl_next',
        prevEl: '.group01 .education .pagination .ctrl_prev',
    },
    on: {
        init: function() {
            // ▼ 이름 변경: updateEducationCurrent
            updateEducationCurrent(this);
        },
        slideChange: function() {
            // ▼ 이름 변경: updateEducationCurrent
            updateEducationCurrent(this);
        }
    }
});

// 전체 슬라이드 개수
const education_totalSlides = $('.group01 .education .swiper .swiper-wrapper .swiper-slide').not('.swiper-slide-duplicate').length;
$('.group01 .education .pagination .paging .total').text(education_totalSlides);

// ▼ 함수 이름 변경: updateEducationCurrent
function updateEducationCurrent(swiper) {
    const current = (swiper ? swiper.realIndex : education_swiper.realIndex) + 1;
    $('.group01 .education .pagination .paging .current').text(current);
}
/************ education swiper :: 종료 ***********/


/************ popup swiper :: 시작 ***********/
const popup_swiper = new Swiper('.group01 .popup .swiper', { // .group01 추가 확인 필요하면 넣으세요
    // autoplay: {
    //  delay: 5000,
    //  disableOnInteraction: true,
    // },
    loop: true,
    navigation: {
        nextEl: '.group01 .popup .pagination .ctrl_next',
        prevEl: '.group01 .popup .pagination .ctrl_prev',
    },
    on: {
        init: function() {
            // ▼ 이름 변경: updatePopupCurrent
            updatePopupCurrent(this);
        },
        slideChange: function() {
            // ▼ 이름 변경: updatePopupCurrent
            updatePopupCurrent(this);
        }
    }
});

// 전체 슬라이드 개수
const popup_totalSlides = $('.group01 .popup .swiper .swiper-wrapper .swiper-slide').not('.swiper-slide-duplicate').length;
$('.group01 .popup .pagination .paging .total').text(popup_totalSlides);

// ▼ 함수 이름 변경: updatePopupCurrent
function updatePopupCurrent(swiper) {
    const current = (swiper ? swiper.realIndex : popup_swiper.realIndex) + 1;
    $('.group01 .popup .pagination .paging .current').text(current);
}
/************ popup swiper :: 종료 ***********/

/************album swiper::시작************/
const album_swiper = new Swiper('.album .swiper', { /* 팝업을 감싼는 요소의 class명 */
slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
breakpoints: {
	551: {    /* 640px 이상일때 적용 */
		slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
		spaceBetween: 16,
	},
	769: {    /* 640px 이상일때 적용 */
		slidesPerView: 1,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
		spaceBetween: 24,
	},
	1025: {    /* 640px 이상일때 적용 */
		slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
		spaceBetween: 24,
	},
},
autoplay: {  /* 팝업 자동 실행 */
	delay: 2500,
	disableOnInteraction: true,
},
navigation: {
	nextEl: '.album  .ctrl_btn .ctrl_next',
	prevEl: '.album  .ctrl_btn .ctrl_prev',
},
});
/*album 팝업슬라이드 정지, 플레이 버튼*/
$('.album  .ctrl_btn .ctrl_stop').on('click', function(){
	album_swiper.autoplay.stop();  /* 일시정지 기능 */
$(this).hide()
$('.album  .ctrl_btn .ctrl_play').css('display', 'flex')
})
$('.album  .ctrl_btn .ctrl_play').on('click', function(){
	album_swiper.autoplay.start();  /* 재생 기능 */
$(this).hide()
$('.album  .ctrl_btn .ctrl_stop').css('display', 'flex')
updateCurrent()
})
/*album 팝업슬라이드 정지, 플레이 버튼*/
/************album swiper::종료************/

/************.group02 .news menu tab::시작***********
     * ..group02 .news .tab_list ul li를 클릭했을 때 1번째를 클릭하면 active 클래스를 주고 
     * li에서 어떤 tab_item을 보이게 해야하는 지 단서를 줘야함
     * ..group02 .news .tab_content .tab_item에서 1번째 요소에 active 클래스 줌
     * 
    */
let tab_name
$('.group02 .news .tab_list ul li').on('click', function(){
	// 클릭한 li에만 active 클래스 추가
	$('.group02 .news .tab_list ul li').removeClass('active')
	$(this).addClass('active')

	// 클릭한 li에만 button에다가 선택됨이라고 글자쓰기
	$('.group02 .news .tab_list ul li button span').text('')
	$(this).find('button span').text('선택됨')
	
	//클릭한 li와 관련된 tab_content tab_item에 active 클래스 추가
	tab_name = $(this).attr('data-tab')
	$('.group02 .news .tab_content .tab_item').removeClass('active')
	//find로 찾을 때는 클래스명이면 .이 추가되어야함, 내가 가져온 이름은 .이 없음
	$('.group02 .news .tab_content').find('.' + tab_name).addClass('active')

	//선택됨 tab_item의 title에만 '선택됨'이라고 써주기
	$('.group02 .news .tab_content .tab_item').attr('title', '')
	$('.group02 .news .tab_content').find('.' + tab_name).attr('title', '선택됨')
})
/************.group02 .news menu tab::끝************/


$(window).on('scroll', function() {
    if ($(this).scrollTop() > 200) {
        $('aside.top').fadeIn();   // 나타남
    } else {
        $('aside.top').fadeOut();  // 사라짐
    }
});
// top 버튼을 클릭하면 상단으로 이동
$('aside.top .top_btn').on('click', function(){
    $('html, body').animate({ scrollTop: 0 }, 500);
});


AOS.init({
	offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
	duration: 500, // 애니메이션 효과가 작동되는 시간
	easing: 'ease', // 가속도
});

})//맨끝