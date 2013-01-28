#!/bin/bash
#source ~/.rvm/scripts/rvm && rvm gemset use moodle-accessibility-theme && sass --update ./sass:./css
echo "Setting shell"
source ~/.rvm/scripts/rvm && rvm gemset use moodle-accessibility-theme

echo "Generate CSS from SASS"
sass --update ./sass:./temp/css

echo "Contraction CSS"
csstidy ./temp/css/index.css ./index.css

echo "Finish"