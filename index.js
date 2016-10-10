var json2csv = require('json2csv');
var fs = require('fs');
var spawn = require('child_process').spawn;

var POLL_RATE = 30 * 1000;

function pollUps()
{
  var child = spawn('pwrstat', [
    '-status'
  ]);



child.stdout.on('data', function(chunk) {
  console.log('got chunk: ');
  console.log(chunk.toString());
  var res = processOutput(chunk.toString());

  var fields = ['properties.datetime', 'properties.model', 'properties.firmware', 
                'properties.rating_voltage', 'properties.rating_power', 'status.state', 'status.source',
                'status.utility_voltage', 'status.output_voltage', 'status.battery_cap',
                'status.rem_runtime', 'status.load', 'status.test_result', 
                'status.last_pwr_event'];

  var csv = json2csv({data:res, fields:fields, hasCSVColumnTitle:false}) + '\n';
  fs.appendFile('cyberpower.csv', csv, function(err) {
     if (err) throw err;
     console.log('file saved');
   });

});


  setTimeout(pollUps, POLL_RATE);
}

function processOutput(data)
{
   var idx = -1;
   var pwrstat = {properties:{}, status:{}};
   var str;

   str = 'Model Name...................';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['properties']['model'] = data.substring(sidx, eidx).trim();
  }

   str = 'Firmware Number..............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['properties']['firmware'] = data.substring(sidx, eidx).trim();
  }
   str = 'Rating Voltage...............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['properties']['rating_voltage'] = data.substring(sidx, eidx).trim();
  }

   str = 'Rating Power.................';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['properties']['rating_power'] = data.substring(sidx, eidx).trim();
  }
   str = 'State........................';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['state'] = data.substring(sidx, eidx).trim();
  }
   str = 'Power Supply by..............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['source'] = data.substring(sidx, eidx).trim();
  }

   str = 'Utility Voltage..............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['utility_voltage'] = data.substring(sidx, eidx).trim();
  }

   str = 'Output Voltage...............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['output_voltage'] = data.substring(sidx, eidx).trim();
  }
   str = 'Battery Capacity.............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['battery_cap'] = data.substring(sidx, eidx).trim();
  }
   str = 'Remaining Runtime............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['rem_runtime'] = data.substring(sidx, eidx).trim();
  }
   str = 'Load.........................';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['load'] = data.substring(sidx, eidx).trim();
  }
   str = 'Test Result..................';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['test_result'] = data.substring(sidx, eidx).trim();
  }
   str = 'Last Power Event.............';
   idx = data.indexOf(str);
   if(idx > -1)
   {
      var sidx = idx + str.length;
      var eidx = data.indexOf('\n', sidx);
      pwrstat['status']['last_pwr_event'] = data.substring(sidx, eidx).trim();
  }

  pwrstat['properties']['datetime'] = (new Date).getTime();

  return pwrstat;

}


pollUps();

