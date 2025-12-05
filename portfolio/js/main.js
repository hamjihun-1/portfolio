$(document).ready(function(){
	const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */

		navigation: true, /* 오른쪽에 각 페이지의 paging */
		navigationPosition: 'left', /* 위치 */
		navigationTooltips: ['Main', '나무심기', '숲 활동소개', '활동 이야기'], /* 툴팁 */
		showActiveTooltip: true, /* 현재 활성화된 페이지의 툴팁에 특정 클래스 주기 */
		
		lockAnchors: false,
		anchors: ['Main', 'Tree', 'Activity', 'News', 'Last'], /* href="#link1" 이렇게 코딩하면 해당 링크명으로 이동 */

		autoScrolling:true, /* 한페이지씩 스크롤 */
		scrollHorizontally: true,

		verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
		
		scrollOverflow: false, /* 컨텐츠가 넘쳐도 스크롤 금지 */

		afterLoad: function(origin, destination, direction, trigger){
			if((destination.index == 2) || (destination.index == 3)){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				// console.log('3번째 슬라이드가 로딩 되었을때');
				$('#fp-nav').removeClass('hide')
				$('header').addClass('dark')
				$('#fp-nav').addClass('dark')
			}else if(destination.index == 1){
				$('#fp-nav').removeClass('dark')
				$('.tree .tit h2 em').counterUp(); /* 숫자 요소의 클래스명을 써준다. */
			}else if(destination.index == 4){
				$('#fp-nav').addClass('hide')
			}else {
				$('#fp-nav').removeClass('hide')
				$('header').removeClass('dark')
				$('#fp-nav').removeClass('dark')
			}
		},

		responsiveWidth: 769, /* fullpage를 적용시키지 않을 모바일 사이즈 */
		responsiveHeight: 700
	}); //fullpage 종료

	let visual_name = ['도시 속 나무, 우리의 숲', '2025 생명의 숲 후원의 달', '2022 울진산불 이후의 변화', '고목나무 이야기']
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


	/******************
	 * 퀵메뉴 열고 닫기
	 * aside.quick .quick_open를 클릭하면 aside.quick open
	 * ----> aside.quick .quick_wrap slideDown()으로 나타내기
	 * aside.quick .quick_close를 클릭하면 aside.quick에 open 삭제
	 * ----> aside.quick .quick_wrap slideup()으로 나타내기
	*/
	$('aside.quick .quick_open').on('click', function(){
		$('aside.quick').addClass('open')
		$('aside.quick .quick_wrap').slideDown()
	})
	$('aside.quick .quick_close').on('click', function(){
		$('aside.quick').removeClass('open')
		$('aside.quick .quick_wrap').slideUp()
	})


	const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */
		slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
		spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
		breakpoints: {
			500: {    /* 640px 이상일때 적용 */
				slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 16,
			},
			768: {    /* 640px 이상일때 적용 */
				slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
			1024: {    /* 640px 이상일때 적용 */
				slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
		},
		//centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
		// loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	});




})// 맨끝