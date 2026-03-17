// Created by iWeb 2.0.4 local-build-20190416

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,170),url:'Clients_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Clients_files/stroke_1.png'},{rect:new IWRect(5,-5,117,10),url:'Clients_files/stroke_2.png'},{rect:new IWRect(122,-5,11,10),url:'Clients_files/stroke_3.png'},{rect:new IWRect(122,5,11,170),url:'Clients_files/stroke_4.png'},{rect:new IWRect(122,175,11,10),url:'Clients_files/stroke_5.png'},{rect:new IWRect(5,175,117,10),url:'Clients_files/stroke_6.png'},{rect:new IWRect(-5,175,10,10),url:'Clients_files/stroke_7.png'}],new IWSize(127,180))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Clients_files/ClientsMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
