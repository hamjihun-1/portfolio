$(document).ready(function(){
    /*************시작 :: 지금 pc버전인지 모바일인지 체크 (메뉴상태) ************/
    let mobile_size = 1024
    let window_w
    let device_status //pc, 모바일인지

    function device_chk(){ //함수를 정의한다 (선언)
        window_w = $(window).width()
        if(window_w > mobile_size){ //브라우저 넓이가 1024보다 클 때
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }
    device_chk() //html의 로딩이 완료된 이후 단 1번 실행
    $(window).resize(function(){ //브라우저가 리사이즈 될때 마다 실행
        device_chk()
    })

    /************header 메뉴 over::시작***********
     * 메뉴에 마우스를 오버 했을 때 (header .gnb)
     * header에 menu_pc 클래스 추가
     * 마우스를 오버한 메뉴의 1차 메뉴 li에 over 클래스 추가 (header .gnb .gnb_wrap ul.depth1 > li)
     * --> 오버한 li에만 over클래스 줌
     * ---> 모든 li에서 over를 빼고 오버한 li에만 over클래스 줌
     * pc버전에서만...
     * 메뉴를 오버해서 바뀐 색상의 영역 내부에서는 오버가 유지되고 그 밖에 나갈 때 아웃
    */
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){ // PC일 때만 동작
            // console.log('over')
            $('header').addClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $(this).addClass('over')
        }
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        $(this).removeClass('over')
    })
    $('header').on('mouseleave', function(){
        $(this).removeClass('menu_pc')
    })
    $('header .util .search .sch_open').on('focusin', function(){
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })
    /************header 메뉴 over::끝************/
    /************모바일 메뉴 1차 open::시작***********
     * 닫혀있는 메뉴를 클릭하면 기존에 열려있던 다른 메뉴를 닫고 나만 열기 (li open 클래스 추가)
     * 열려있는 메뉴를 클릭하면 나 자신을 닫고 끝남
     * 열린 메뉴, 닫힌메뉴를 구분하는 방법 -- open있으면 열린메뉴, 없으면 닫힌메뉴
     * 1차메뉴 a의 링크를 삭제 (링크 이동 제한을 건다)
    */
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault();
            if($(this).parent().hasClass('open') == true){ //열려있는 메뉴를 다시 클릭 했을 때
                $(this).parent().removeClass('open') // li에 open 클래스 삭제
                $(this).next().slideUp() // 2차메뉴를 슬라이드로 닫기
            }else{ // 열려있지 않은 다른 메뉴를 여는 거
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open') // 모든 li의 open을 삭제
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp() // 모든 2차메뉴 닫기
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
    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
    })
    /************모바일 메뉴 닫기::끝************/
    /************스크롤 시  header에 fixed::시작***********
     * pc/moblie 둘다
     * 스크롤이 조금만 되도 header에 fixed 클래스 줌
     * 다시 맨 꼭대기로 올라가면 header에 fixed 클래스 삭제
    */
    //스크롤을 내리면 header fixed
    let scrolling = $(window).scrollTop() //현재 스크롤 된 값
    let prev_scroll //이전에 스크롤된값
    let diff_scroll //차이값
    function scroll_chk(){
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()
        diff_scroll = prev_scroll - scrolling
        // console.log(diff_scroll)
        if(diff_scroll < 0){//위로 스크롤
            $('header').addClass('up')
        }else{ //아래로 스크롤
            $('header').removeClass('up')
        }
        if(scrolling > 0){ //스크롤 내림
            $('header').addClass('fixed')
        }else{ //0이거나 0보다 작은경우 (fixed 제거)
            $('header').removeClass('fixed')
        }
    }
    scroll_chk() // 문서가 로딩되고 1번 실행
    $(window).scroll(function(){
        scroll_chk() // 스크롤 할 때마다 실행
    })
    // top 버튼을 클릭하면 상단으로 이동
    $('.top').on('click', function(){
        $('html, body').animate({
            scrollTop : 0
        }, 500)
    })
    const topBtn = document.querySelector(".top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 250) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

})//맨끝