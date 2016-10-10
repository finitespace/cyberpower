CyberPowerSystems -  Ups - Nodejs - Csv - DataLogger
--------------------

works with https://www.cyberpowersystems.com/products

install powerpanel:
----------------
   dpkg -i powerpanel_132_amd64.deb;

test pwrstat:
----------------
   which pwrstat;
   pwrstat -status;

install:
----------------
   sudo npm install;

run:
----------------
   sudo npm start&;

config:
----------------
   nano index.js;

output:
----------------
   cyberpower.csv

default:
----------------
   poll rate: 30 sec



keywords:
----------------
cyberpowersystems, cyberpower, powerpanel, UPS, battery backup, PFC, pwrstat, data, datalogging, csv, nodejs, npm
