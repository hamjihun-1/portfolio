$(document).ready(function(){

    let mobile_size = 1169 //모바일 메뉴 시작 사이즈
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


    /* 메뉴오픈 클릭시 header에 open 클래스 추가 */
    $('header .head_top .menu_open').on('click focusin', function(){
        $('header').addClass('open')
    })
    $('header .head_top .menu_close').on('click', function(){
        $('header').removeClass('open')
    })
    $('.visual').on('focusin', function(){
        $('header').removeClass('open')
    })
    /* 메뉴오픈 클릭시 header에 open 클래스 추가 */


    let gnb_open
    $('header .full_menu .menu_list ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
            gnb_open = $(this).parent().hasClass('open')
            // console.log(gnb_open)
            if(gnb_open == true){ //열려있다면
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            }else{
                $('header .full_menu .menu_list ul.depth1 > li').removeClass('open')
                $('header .full_menu .menu_list ul.depth1 > li > ul.depth2').slideUp()
                $(this).parent().addClass('open')
                $(this).next().slideDown()
            }
        }
	});
})//맨끝