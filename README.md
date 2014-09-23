jQuery monitor_ime_changes plugin
==========================

jQuery plugin to monitor changes in text field when typing with a non-ASCII IME, like Japanese.

Chrome will automatically trigger .keyup /.keydown etc events while typing in Japanese, but Firefox doesn't - it only triggers after you hit 'Enter' to accept the IME choices.

This plugin will allow consistent behaviour across browsers, which is particularly useful if you are trying to
change page content as the user types, e.g. filtering out lists based on the text field content.
