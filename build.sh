#!/bin/bash
clear
echo "Setting shell"
source ~/.rvm/scripts/rvm && rvm gemset use moodle-accessibility-theme
echo "Generate CSS from SASS"
sass --update ./sass/index.scss:./style/index.css
#echo "Contraction CSS"
#csstidy /tmp/index.css ./style/index.css
