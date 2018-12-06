const carousel = () =>{
    $(document).ready(function(){
    	 $('.yo-carousel').slick({
            // centerMode: true,
             arrows: true,
             dots: true,
              infinite: true,
              draggable: true,
              // speed: 300,
              slidesToShow: 3,
              slidesToScroll: 1,
              accessibility: true,

              responsive: [

                {
                  breakpoint: 800,
                  settings: {
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows:true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
    	 });
       });
}
export default carousel
