// Created by iWeb 2.0.4 local-build-20190416

function writeMovie1()
{detectBrowser();if(windowsInternetExplorer)
{document.write('<object id="id3" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="368" height="292" style="height: 292px; left: 307px; position: absolute; top: 399px; width: 368px; z-index: 1; "><param name="src" value="Media/I.mp4" /><param name="controller" value="true" /><param name="autoplay" value="false" /><param name="scale" value="tofit" /><param name="volume" value="100" /><param name="loop" value="false" /></object>');}
else if(isiPhone)
{document.write('<object id="id3" type="video/quicktime" width="368" height="292" style="height: 292px; left: 307px; position: absolute; top: 399px; width: 368px; z-index: 1; "><param name="src" value="Production_files/I-2.jpg"/><param name="target" value="myself"/><param name="href" value="../Media/I.mp4"/><param name="controller" value="true"/><param name="scale" value="tofit"/></object>');}
else
{document.write('<object id="id3" type="video/quicktime" width="368" height="292" data="Media/I.mp4" style="height: 292px; left: 307px; position: absolute; top: 399px; width: 368px; z-index: 1; "><param name="src" value="Media/I.mp4"/><param name="controller" value="true"/><param name="autoplay" value="false"/><param name="scale" value="tofit"/><param name="volume" value="100"/><param name="loop" value="false"/></object>');}}
setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,42),url:'Production_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Production_files/stroke_1.png'},{rect:new IWRect(5,-5,57,10),url:'Production_files/stroke_2.png'},{rect:new IWRect(62,-5,11,10),url:'Production_files/stroke_3.png'},{rect:new IWRect(62,5,11,42),url:'Production_files/stroke_4.png'},{rect:new IWRect(62,47,11,10),url:'Production_files/stroke_5.png'},{rect:new IWRect(5,47,57,10),url:'Production_files/stroke_6.png'},{rect:new IWRect(-5,47,10,10),url:'Production_files/stroke_7.png'}],new IWSize(67,52))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Production_files/ProductionMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
