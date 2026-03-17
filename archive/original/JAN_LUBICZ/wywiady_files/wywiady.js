// Created by iWeb 2.0.4 local-build-20190416

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,290),url:'wywiady_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'wywiady_files/stroke_1.png'},{rect:new IWRect(5,-5,190,10),url:'wywiady_files/stroke_2.png'},{rect:new IWRect(195,-5,11,10),url:'wywiady_files/stroke_3.png'},{rect:new IWRect(195,5,11,290),url:'wywiady_files/stroke_4.png'},{rect:new IWRect(195,295,11,10),url:'wywiady_files/stroke_5.png'},{rect:new IWRect(5,295,190,10),url:'wywiady_files/stroke_6.png'},{rect:new IWRect(-5,295,10,10),url:'wywiady_files/stroke_7.png'}],new IWSize(200,300))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('wywiady_files/wywiadyMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');fixAllIEPNGs('Media/transparent.gif');applyEffects()}
