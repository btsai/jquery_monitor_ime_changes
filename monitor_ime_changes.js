/***********************
Brian Tsai (c)

jQuery plugin to monitor changes in text field when typing with a non-ASCII IME, like Japanese.
Chrome will automatically trigger .keyup /.keydown etc events while typing in Japanese,
but Firefox doesn't - it only triggers after you hit 'Enter' to accept the IME choices.

This plugin will allow consistent behaviour across browsers, which is particularly useful if you are trying to
change page content as the user types, e.g. filtering out lists based on the text field content.

*/

(function ($) {

  $.fn.monitorIMEChanges = function(textChangeCallback){
    var textField = $(this);
    var TEXT_FIELD_MONITOR_LOOP_TIME = 200,  // not too short or CPU usage goes up
        CHANGE_CALLBACK_TRIGGER_TIME = 500; // must be > TEXT_FIELD_MONITOR_LOOP_TIME, but not so long that it feels unresponsive
    var checkTimer, lastCheckText = '',
        thisCheckText, lastFilterText, hasCheckChange,
        filterTimer, thisFilterText, hasFilterChange;

    function startFilterTimer(keyword){
      filterTimer = setTimeout(function(){
        textChangeCallback(keyword);
      }, CHANGE_CALLBACK_TRIGGER_TIME);
    }

    function stopFilterTimer(){
      clearTimeout(filterTimer);
    }

    function checkTextField(){
      checkTimer = setInterval(function(){
        thisCheckText = textField.val();
        if (lastCheckText != thisCheckText && (thisCheckText.length > 1 || thisCheckText.trim().length == 0)){
          hasCheckChange = true;
        }
        else {
          hasCheckChange = false;
        }
        if (hasCheckChange){
          stopFilterTimer();
          startFilterTimer(thisCheckText)
        }

        lastCheckText = thisCheckText;
      }, TEXT_FIELD_MONITOR_LOOP_TIME);

    }

    function ignoreTextField(){
      clearInterval(checkTimer);
    }

    textField.focus(function(){
      checkTextField();
    })
    textField.blur(function(){
      ignoreTextField();
    })

  }

})(jQuery);
