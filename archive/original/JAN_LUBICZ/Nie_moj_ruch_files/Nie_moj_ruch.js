// Created by iWeb 2.0.4 local-build-20190416

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,214),url:'Nie_moj_ruch_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Nie_moj_ruch_files/stroke_1.png'},{rect:new IWRect(5,-5,290,10),url:'Nie_moj_ruch_files/stroke_2.png'},{rect:new IWRect(295,-5,10,10),url:'Nie_moj_ruch_files/stroke_3.png'},{rect:new IWRect(295,5,10,214),url:'Nie_moj_ruch_files/stroke_4.png'},{rect:new IWRect(295,219,10,11),url:'Nie_moj_ruch_files/stroke_5.png'},{rect:new IWRect(5,219,290,11),url:'Nie_moj_ruch_files/stroke_6.png'},{rect:new IWRect(-5,219,10,11),url:'Nie_moj_ruch_files/stroke_7.png'}],new IWSize(300,225))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Nie_moj_ruch_files/Nie_moj_ruchMoz.css')
detectBrowser();adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');fixAllIEPNGs('Media/transparent.gif');Widget.onload();applyEffects()}
function onPageUnload()
{Widget.onunload();}
