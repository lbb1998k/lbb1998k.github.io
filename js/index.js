$(document).ready(function(){
    var lat,lon;
    var degree;     //摄氏度
    var tmpShow;    //显示的温度，因为有摄氏与华氏度的转换

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat+"  "+lon);

            var para = "https://free-api.heweather.com/v5/weather?city="+lon+","+lat+"&key=53153e2fed574ce19f5c089a1aacede0";
            console.log(para);
            $.getJSON(para,function(json){
                var city= json["HeWeather5"][0]["basic"]["city"];
                var cnty= json["HeWeather5"][0]["basic"]["cnty"];
                var weatherNow = json["HeWeather5"][0]["now"]["cond"]["txt"];
                degree=json["HeWeather5"][0]["now"]["tmp"];
                tmpShow = degree;

                var windShow = json["HeWeather5"][0]["now"]["wind"]["dir"]+" "+json["HeWeather5"][0]["now"]["wind"]["sc"]+"级";
                //console.log(city);
                $("#cityname").html(city+","+cnty);
                $('.weather').html(weatherNow);    
                $(".tmp").html(tmpShow);
                $(".wind").html(windShow);
            });
        });
    }

    $(".btn-tmp-change").on("click",function(){
        console.log($(".tmp").html());
        if(degree == $(".tmp").html()){
            $(".tmp").html(degree*1.8+32);
            $(".tmp-kind").html("°F");
            console.log(degree);
            console.log($(".tmp").html());
        }else{
            $(".tmp").html(degree);
            $(".tmp-kind").html("°C");
        }
    });

});