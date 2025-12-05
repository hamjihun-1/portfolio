/**********************
* 파일명 : main.js
* 작성자 : 함지훈
* 작성일 : 25-11-19
* 설  명 : 메인페이지에서만 적용되는 js를 저장 (hedaer/footer 제외)
**********************/

$(document).ready(function(){
	const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            renderBullet: function (i, className) {
                return '<button class="' + className + '"><svg viewBox="0 0 73 73" xmlns="http://www.w3.org/2000/svg"><circle cx="36.5" cy="36.5" r="35.5" class="circle"></circle></svg></button>';
            }
        },

    });
/*****실행버튼, 일시정지버튼******/
    $('.visual_ctrl .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();
        $(this).hide();
        $('.visual_ctrl .btn_play').show();
    });

    $('.visual_ctrl .btn_play').on('click', function(){
        visual_swiper.autoplay.start();
        $(this).hide();
        $('.visual_ctrl .btn_stop').show();
    });
/*****실행버튼, 일시정지버튼******/

/********************visual 시작::드롭박스**********************/
    // 모든 드롭다운 섹션 (.reservation-select) 선택
    const dropdownSelects = document.querySelectorAll('.reservation-select');

    // 외부 클릭 시 모든 드롭다운 닫기
    document.addEventListener('click', (e) => {
        dropdownSelects.forEach(select => {
            // 클릭된 영역이 해당 드롭다운 섹션 안에 속하지 않으면 닫기
            if (!select.contains(e.target)) {
                select.classList.remove('is-open');
            }
        });
    });


    dropdownSelects.forEach(select => {
        // A. 드롭다운 열고 닫기 (토글) 기능
        select.addEventListener('click', (e) => {
            // 클릭된 요소가 A 태그(토글 버튼)와 관련 있다면
            if (e.target.closest('a')) { 
                e.preventDefault(); 
                
                // 다른 열린 드롭다운 닫기
                dropdownSelects.forEach(otherSelect => {
                    if (otherSelect !== select) {
                        otherSelect.classList.remove('is-open');
                    }
                });

                // 현재 요소에 'is-open' 클래스를 토글
                select.classList.toggle('is-open'); 
            }
        });

        // B. 항목 선택 시 값 업데이트 및 드롭다운 닫기
        const items = select.querySelectorAll('.dropdown-content ul > li > a');
        const displayElement = select.querySelector('strong em'); // 값을 표시하는 <em> 요소

        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // 부모 클릭 이벤트 방지

                // 항목 텍스트에서 숫자 추출 (예: 'Room 1' -> '1')
                const rawText = item.textContent.trim();
                const selectedValue = (rawText.match(/\d+/) || [''])[0]; 

                // 1. 표시되는 값 업데이트
                if (displayElement && selectedValue) {
                    displayElement.textContent = selectedValue;
                }

                // 2. 드롭다운 닫기
                select.classList.remove('is-open');

                // 3. 선택된 항목에 'selected' 클래스 토글 (선택적)
                items.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
            });
        });
    });
/********************visual 끝::드롭박스**********************/

    /************room menu tab::시작***********
     * section.room .tab_list ul li를 클릭했을 때 1번째를 클릭하면 active 클래스를 주고 
     * li에서 어떤 tab_item을 보이게 해야하는 지 단서를 줘야함
     * section.room .tab_content .tab_item에서 1번째 요소에 active 클래스 줌
     * 
    */
    let tab_name
    $('section.room .tab_list ul li').on('click', function(){
        // 클릭한 li에만 active 클래스 추가
        $('section.room .tab_list ul li').removeClass('active')
        $(this).addClass('active')

        // 클릭한 li에만 button에다가 선택됨이라고 글자쓰기
        $('section.room .tab_list ul li button span').text('')
        $(this).find('button span').text('선택됨')
        
        //클릭한 li와 관련된 tab_content tab_item에 active 클래스 추가
        tab_name = $(this).attr('data-tab')
        $('section.room .tab_content .tab_item').removeClass('active')
        //find로 찾을 때는 클래스명이면 .이 추가되어야함, 내가 가져온 이름은 .이 없음
        $('section.room .tab_content').find('.' + tab_name).addClass('active')

        //선택됨 tab_item의 title에만 '선택됨'이라고 써주기
        $('section.room .tab_content .tab_item').attr('title', '')
        $('section.room .tab_content').find('.' + tab_name).attr('title', '선택됨')
    })
    /************room menu tab::끝************/
    // 필요한 DOM 요소 변수로 선언 (코드의 재사용성과 가독성을 높입니다)
    const $roomSection = $('section.room');
    const $tabListItems = $roomSection.find('.tab_list ul li');
    const $tabContents = $roomSection.find('.tab_content .tab_item');
    // 이전/다음 버튼을 변수로 선언합니다.
    const $prevButton = $roomSection.find('.ctrl_btn .prev');
    const $nextButton = $roomSection.find('.ctrl_btn .next');
    
    // === 1. Room - 객실 타입 (TWIN/DOUBLE 등) 전환 함수 정의 ===
    function switchRoomType($button) {
        const $activeTab = $button.closest('.tab_item');
        const selectedType = $button.attr('data-type');
        
        // 1-1. 버튼 활성화 상태 업데이트
        $activeTab.find('.room_list .option-btn').removeClass('active');
        $button.addClass('active');

        // 1-2. 이미지 전환
        $activeTab.find('.photo_box .room_image').removeClass('active');
        // data-type 값과 일치하는 이미지에 active 클래스 추가
        $activeTab.find(`.photo_box .room_image.${selectedType}`).addClass('active');
    }

    // === 2. 탭 전환 및 객실 타입 초기화 로직 (핵심 함수) ===
    function updateActiveTab(targetTabElement) {
        const tab_name = $(targetTabElement).attr('data-tab'); 

        // 2-1. 탭 리스트 상태 업데이트
        $tabListItems.removeClass('active');
        $(targetTabElement).addClass('active');

        // blind 텍스트 업데이트 (선택됨 표시)
        $tabListItems.find('button span.blind').text(''); 
        $(targetTabElement).find('button span.blind').text('선택됨');
        
        // 2-2. 콘텐츠 상태 업데이트 및 타겟 변수 지정
        $tabContents.removeClass('active').attr('title', '');
        
        const $targetTabItem = $roomSection.find('.tab_content').find('.' + tab_name);
        $targetTabItem.addClass('active').attr('title', '선택됨');

        // 2-3. 새 탭으로 전환 시, 객실 타입 초기화 (첫 번째 옵션 버튼 강제 클릭)
        // 이 부분이 없으면 새 탭 전환 시 이미지가 안 보일 수 있습니다.
        const $firstOptionButton = $targetTabItem.find('.room_list .option-btn:first');
        if ($firstOptionButton.length) {
            switchRoomType($firstOptionButton);
        }
    }

    // === 3. 이벤트 핸들러 등록 ===

    // 3-1. 메인 탭 클릭 이벤트 (기존 기능)
    $tabListItems.on('click', function(){
        updateActiveTab(this);
    });

    // 3-2. 객실 타입 버튼 클릭 이벤트 (기존 기능)
    $roomSection.on('click', '.room_list .option-btn', function() {
        switchRoomType($(this));
    });

    // 3-3. 이전 버튼 클릭 이벤트 (새로 추가된 기능: 탭 순환)
    $prevButton.on('click', function() {
        // 현재 활성화된 탭의 인덱스를 찾습니다.
        let currentIndex = $tabListItems.index($tabListItems.filter('.active'));
        let newIndex = currentIndex - 1;

        // 인덱스가 0보다 작으면 (맨 앞에서 이전), 마지막 탭으로 이동 (순환)
        if (newIndex < 0) {
            newIndex = $tabListItems.length - 1; 
        }
        
        // 새로운 탭 요소를 찾아서 탭 전환 함수 실행
        updateActiveTab($tabListItems.eq(newIndex));
    });

    // 3-4. 다음 버튼 클릭 이벤트 (새로 추가된 기능: 탭 순환)
    $nextButton.on('click', function() {
        // 현재 활성화된 탭의 인덱스를 찾습니다.
        let currentIndex = $tabListItems.index($tabListItems.filter('.active'));
        let newIndex = currentIndex + 1;

        // 인덱스가 총 개수보다 크거나 같으면 (맨 뒤에서 다음), 첫 번째 탭으로 이동 (순환)
        if (newIndex >= $tabListItems.length) {
            newIndex = 0; 
        }
        
        // 새로운 탭 요소를 찾아서 탭 전환 함수 실행
        updateActiveTab($tabListItems.eq(newIndex));
    });

    // 3-5. 초기 로드 시: 첫 번째 탭의 객실 타입 이미지 설정 (HTML의 초기 active 상태 반영)
    $roomSection.find('.tab_item.active .room_list .option-btn:first').each(function() {
        switchRoomType($(this));
    });

/************facilties swiper 시작************/
    const facilties_swiper = new Swiper('.facilties .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            450: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            768: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        navigation: {
            nextEl: '.facilties .next',
            prevEl: '.facilties .prev',
        },
    });
/************facilties swiper 종료************/

    /************facilties menu tab::시작***********
     * .facilties .tab_list ul li를 클릭했을 때 1번째를 클릭하면 active 클래스를 주고 
     * li에서 어떤 tab_item을 보이게 해야하는 지 단서를 줘야함
     * .facilties .tab_content .tab_item에서 1번째 요소에 active 클래스 줌
     * 
    */
    $('.facilties .tab_list ul li').on('click', function(){
        // 클릭한 li에만 active 클래스 추가
        $('.facilties .tab_list ul li').removeClass('active')
        $(this).addClass('active')

        // 클릭한 li에만 button에다가 선택됨이라고 글자쓰기
        $('.facilties .tab_list ul li button span').text('')
        $(this).find('button span').text('선택됨')
        
        //클릭한 li와 관련된 tab_content tab_item에 active 클래스 추가
        tab_name = $(this).attr('data-tab')
        $('.facilties .tab_content .tab_item').removeClass('active')
        //find로 찾을 때는 클래스명이면 .이 추가되어야함, 내가 가져온 이름은 .이 없음
        $('.facilties .tab_content').find('.' + tab_name).addClass('active')

        //선택됨 tab_item의 title에만 '선택됨'이라고 써주기
        $('.facilties .tab_content .tab_item').attr('title', '')
        $('.facilties .tab_content').find('.' + tab_name).attr('title', '선택됨')
    })
    /************facilties menu tab::끝************/
    /************special swiper::시작************/
    const special_swiper = new Swiper('.special .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 36,
            },
            1201: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 280,
            },
        },
        centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        // autoplay: {  /* 팝업 자동 실행 */
        //     delay: 10000,
        //     disableOnInteraction: true,
        // },
        navigation: {
            nextEl: '.special .list .swiper .next',
            prevEl: '.special .list .swiper .prev',
        },
    });
    /************special swiper::끝************/
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
    /******************/
    // top 버튼을 클릭하면 상단으로 이동
    $('aside.quick .quick_wrap .quick_top').on('click', function(){
        $('html, body').animate({
            scrollTop : 0
        }, 500)
    })


    AOS.init({
        offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 500, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });
})//맨끝