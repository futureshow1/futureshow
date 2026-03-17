// Created by iWeb 2.0.4 local-build-20190416

function writeMovie1()
{detectBrowser();if(windowsInternetExplorer)
{document.write('<object id="id4" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="368" height="292" style="height: 292px; left: 307px; position: absolute; top: 401px; width: 368px; z-index: 1; "><param name="src" value="Media/artofaction1-iPhone.m4v" /><param name="controller" value="true" /><param name="autoplay" value="false" /><param name="scale" value="tofit" /><param name="volume" value="100" /><param name="loop" value="false" /></object>');}
else if(isiPhone)
{document.write('<object id="id4" type="video/quicktime" width="368" height="292" style="height: 292px; left: 307px; position: absolute; top: 401px; width: 368px; z-index: 1; "><param name="src" value="Action_files/artofaction1-iPhone.jpg"/><param name="target" value="myself"/><param name="href" value="../Media/artofaction1-iPhone.m4v"/><param name="controller" value="true"/><param name="scale" value="tofit"/></object>');}
else
{document.write('<object id="id4" type="video/quicktime" width="368" height="292" data="Media/artofaction1-iPhone.m4v" style="height: 292px; left: 307px; position: absolute; top: 401px; width: 368px; z-index: 1; "><param name="src" value="Media/artofaction1-iPhone.m4v"/><param name="controller" value="true"/><param name="autoplay" value="false"/><param name="scale" value="tofit"/><param name="volume" value="100"/><param name="loop" value="false"/></object>');}}
setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,95),url:'Action_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Action_files/stroke_1.png'},{rect:new IWRect(5,-5,250,10),url:'Action_files/stroke_2.png'},{rect:new IWRect(255,-5,10,10),url:'Action_files/stroke_3.png'},{rect:new IWRect(255,5,10,95),url:'Action_files/stroke_4.png'},{rect:new IWRect(255,100,10,10),url:'Action_files/stroke_5.png'},{rect:new IWRect(5,100,250,10),url:'Action_files/stroke_6.png'},{rect:new IWRect(-5,100,10,10),url:'Action_files/stroke_7.png'}],new IWSize(260,105))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Action_files/ActionMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');adjustLineHeightIfTooBig('id6');adjustFontSizeIfTooBig('id6');Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
