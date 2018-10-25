$(document).ready(function(){
  var level = 1,
      speedModifier = 0.1,
      laserSettings = {
        "background-color": "#F00",
        "height": "15px",
        "width": "15px"
      };
  
  
  $('.mode-select').on('change', function() {
      level = +$('.mode-select option:selected').val();
    
      switch(level) {
        default:
        case 1:
          laserSettings.height = "40px";
          laserSettings.width = "40px";
          speedModifier = 0.2;
          break;

        case 2:
          laserSettings.height = "30px";
          laserSettings.width = "30px";
          speedModifier = 0.3;
          break;

        case 3:
          laserSettings.height = "20px";
          laserSettings.width = "20px";
          speedModifier = 0.4;
          break;

        case 4:
          laserSettings.height = "10px";
          laserSettings.width = "10px";
          speedModifier = 0.7;
          break;
      }
    
      $('.laser-pointer').css(laserSettings);
    });
  
  switch(level) {
    default:
    case 1:
      laserSettings.height = "40px";
      laserSettings.width = "40px";
      break;
      
    case 2:
      laserSettings.height = "30px";
      laserSettings.width = "30px";
      speedModifier = 0.3;
      break;
      
    case 3:
      laserSettings.height = "20px";
      laserSettings.width = "20px";
      speedModifier = 0.4;
      break;
      
    case 4:
      laserSettings.height = "10px";
      laserSettings.width = "10px";
      speedModifier = 0.7;
      break;
    }
  
    function levelUp() {
      var current = level;
      
      if(level >= 4) {
        return 4;
      }
      else if(level <= 1) {
        return 2;
      } else {
        return level + 1;
      }
    }
  
    animateDiv();
  
    var hits = 0;
    $(".laser-container").on('click', function() {
      hits++;
      
      if(hits%5 == 0) {
        level = levelUp();
      }
      
      $('.hits').text(hits);
      
      var levelText = ["Boş", "Kolay", "Normal", "Zor", "Deli"];
      
      $('.level').text(levelText[level]);
      
    	$('.a').hide();
      setTimeout(function(){
        $('.a').show();
      }, 2000);
    }) 
  
    function makeNewPosition(){
      var h = $(window).height() - 50;
      var w = $(window).width() - 50;

      var nh = Math.floor(Math.random() * h);
      var nw = Math.floor(Math.random() * w);

      return [nh,nw];    

    }

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('.a').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.a').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;

    var speed = Math.ceil(greatest/speedModifier);
 
    return speed;

}
});