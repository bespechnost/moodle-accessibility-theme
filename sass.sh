#!/bin/bash
source ~/.rvm/scripts/rvm && rvm gemset use moodle-accessibility-theme && sass --watch ./sass:./css -trace
