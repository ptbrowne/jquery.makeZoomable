makeZoomable
============

Little jquery plugin to make containers scrollable horizontally.
Useful for timelines.
You can also bind some divs to one master.

Usage
=====

HTML :: 

    <div id="master" class="mz-container" style="width:50%; border:1px solid; black;">
        <div class="mz-content">
            <div style="height:10px;left:10%; width:10%; background: red "></div>
            <div style="height:10px;left:80%; width:20%; background: green "></div>
            <div style="height:10px;left:50%; width:40%; background: blue "></div>
            <div style="height:10px;left:70%; width:30%; background: darkblue "></div>
        </div>
    </div>

JS ::

    $("#master").makeZoomable();


See index.html for more info.

Dependencies
============

jquery.mousewheel.js
