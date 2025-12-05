$(document).ready(function(){

    let mobile_size = 1024 //모바일 메뉴 시작 사이즈
    let window_w // 브라우저 넓이
    let device_status //현재 pc인지 mobile인지 구분하는 값
    
    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        // console.log(device_status)
    }
    device_chk() //문서 로딩되었을때 1번 실행
    $(window).resize(function(){
        device_chk() //브라우저가 리사이즈 할때마다 1번씩 실행
    })

    $('header .hd_bottom .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('menu_pc')
        }
    })
    $('.visual').on('mouseenter', function(){
        $('header').removeClass('menu_pc')
    })
    $('.visual').on('focusin', function(){
        $('header').removeClass('menu_pc')
    })

    /************header lang_list 열기::시작************/
    const langCurrent = document.querySelector('.lang_current');
    const langList = document.querySelector('.lang_list');
    const langItems = document.querySelectorAll('.lang_list button');

    // 현재 버튼 클릭 → 리스트 열기/닫기
    langCurrent.addEventListener('click', () => {
        langList.classList.toggle('open');
    });

    // 리스트에서 언어 선택 시 변경
    langItems.forEach(item => {
        item.addEventListener('click', () => {
            langCurrent.querySelector('span').textContent = item.dataset.lang;
            langList.classList.remove('open');
        });
    });

    // 밖을 클릭하면 닫힘
    document.addEventListener('click', (e) => {
        if (!document.querySelector('.lang').contains(e.target)) {
            langList.classList.remove('open');
        }
    });
    /************header lang_list 열기::끝************/

    /************모바일 메뉴 1차 open::시작***********
     * 닫혀있는 메뉴를 클릭하면 기존에 열려있던 다른 메뉴를 닫고 나만 열기 (li open 클래스 추가)
     * 열려있는 메뉴를 클릭하면 나 자신을 닫고 끝남
     * 열린 메뉴, 닫힌메뉴를 구분하는 방법 -- open있으면 열린메뉴, 없으면 닫힌메뉴
     * 1차메뉴 a의 링크를 삭제 (링크 이동 제한을 건다)
    */
    $('header .hd_bottom .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault();
            if($(this).parent().hasClass('open') == true){ //열려있는 메뉴를 다시 클릭 했을 때
                $(this).parent().removeClass('open') // li에 open 클래스 삭제
                $(this).next().slideUp() // 2차메뉴를 슬라이드로 닫기
            }else{ // 열려있지 않은 다른 메뉴를 여는 거
                $('header .hd_bottom .gnb .gnb_wrap ul.depth1 > li').removeClass('open') // 모든 li의 open을 삭제
                $('header .hd_bottom .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp() // 모든 2차메뉴 닫기
                $(this).parent().addClass('open')
                $(this).next().slideDown() // 2차메뉴를 슬라이드로 열기
            }
        }
    })
    /************모바일 메뉴 1차 open::끝************/
    /************모바일 메뉴 열기::시작***********
     * 열기를 클릭하면 header에 menu_mo 클래스 추가
     * --> header .gnb .gnb_open
     * 닫기를 클릭하면 header에 menu_mo 클래스 삭제
     * --> header .gnb .gnb_wrap .gnb_close
    */
    $('header .hd_bottom .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })
    $('header .hd_bottom .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
    })
    /************모바일 메뉴 닫기::끝************/


    // footer .f_right .family_site .family_open 열기를 클릭하면
    // footer .f_right .family_site 에 open 클래스 추가
    // footer .f_right .family_site .family_close 닫기를 클릭하면
    $('footer .f_right .family_site .family_open').on('click', function(){
        $('footer .f_right .family_site').addClass('open')
        $('footer .f_right .family_site .family_wrap').slideDown()
    })
    $('footer .f_right .family_site .family_close').on('click', function(){
        $('footer .f_right .family_site').removeClass('open')
        $('footer .f_right .family_site .family_wrap').slideUp()
    })
    




})//맨끝