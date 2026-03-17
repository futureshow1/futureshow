// Created by iWeb 2.0.4 local-build-20190416

function writeMovie1()
{detectBrowser();if(windowsInternetExplorer)
{document.write('<object id="id8" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="364" height="307" style="height: 307px; left: 296px; position: absolute; top: 12px; width: 364px; z-index: 1; "><param name="src" value="Media/StudioWarszawaCentralna-iPhone.m4v" /><param name="controller" value="true" /><param name="autoplay" value="false" /><param name="scale" value="tofit" /><param name="volume" value="100" /><param name="loop" value="false" /></object>');}
else if(isiPhone)
{document.write('<object id="id8" type="video/quicktime" width="364" height="307" style="height: 307px; left: 296px; position: absolute; top: 12px; width: 364px; z-index: 1; "><param name="src" value="Film_files/StudioWarszawaCentralna-iPhone.jpg"/><param name="target" value="myself"/><param name="href" value="../Media/StudioWarszawaCentralna-iPhone.m4v"/><param name="controller" value="true"/><param name="scale" value="tofit"/></object>');}
else
{document.write('<object id="id8" type="video/quicktime" width="364" height="307" data="Media/StudioWarszawaCentralna-iPhone.m4v" style="height: 307px; left: 296px; position: absolute; top: 12px; width: 364px; z-index: 1; "><param name="src" value="Media/StudioWarszawaCentralna-iPhone.m4v"/><param name="controller" value="true"/><param name="autoplay" value="false"/><param name="scale" value="tofit"/><param name="volume" value="100"/><param name="loop" value="false"/></object>');}}
setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,95),url:'Film_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Film_files/stroke_1.png'},{rect:new IWRect(5,-5,250,10),url:'Film_files/stroke_2.png'},{rect:new IWRect(255,-5,10,10),url:'Film_files/stroke_3.png'},{rect:new IWRect(255,5,10,95),url:'Film_files/stroke_4.png'},{rect:new IWRect(255,100,10,10),url:'Film_files/stroke_5.png'},{rect:new IWRect(5,100,250,10),url:'Film_files/stroke_6.png'},{rect:new IWRect(-5,100,10,10),url:'Film_files/stroke_7.png'}],new IWSize(260,105))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Film_files/FilmMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');adjustLineHeightIfTooBig('id6');adjustFontSizeIfTooBig('id6');adjustLineHeightIfTooBig('id7');adjustFontSizeIfTooBig('id7');adjustLineHeightIfTooBig('id9');adjustFontSizeIfTooBig('id9');Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
