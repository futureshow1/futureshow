// Created by iWeb 2.0.4 local-build-20190416

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-1,1,2,88),url:'piastowska_files/stroke.png'},{rect:new IWRect(-1,-1,2,2),url:'piastowska_files/stroke_1.png'},{rect:new IWRect(1,-1,133,2),url:'piastowska_files/stroke_2.png'},{rect:new IWRect(134,-1,2,2),url:'piastowska_files/stroke_3.png'},{rect:new IWRect(134,1,2,88),url:'piastowska_files/stroke_4.png'},{rect:new IWRect(134,89,2,2),url:'piastowska_files/stroke_5.png'},{rect:new IWRect(1,89,133,2),url:'piastowska_files/stroke_6.png'},{rect:new IWRect(-1,89,2,2),url:'piastowska_files/stroke_7.png'}],new IWSize(135,90)),shadow_0:new IWShadow({blurRadius:4,offset:new IWPoint(1.4142,1.4142),color:'#000000',opacity:0.500000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('piastowska_files/piastowskaMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
