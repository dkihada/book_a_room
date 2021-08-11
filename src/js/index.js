import jQuery from 'jquery';
import './lib/jquery-1.9.0.min.js';
import './lib/jquery.maskedinput.min.js';

import '../styles/style.scss';
import '../styles/ui/color-page.scss';
import '../styles/ui/form-elements.scss';

jQuery(function($){
  $(".date").mask("99.99.9999");
  $("#phone").mask("(999) 999-9999");
});