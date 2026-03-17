// Created by iWeb 2.0.4 local-build-20190416

function createMediaStream_id11()
{return IWCreatePhotocast("file://localhost/Users/janjan/Desktop/WWW/new%2013/BELLMER_SOCIETY/premiera_bellmera_2_files/rss.xml",true,true);}
function initializeMediaStream_id11()
{createMediaStream_id11().load('file://localhost/Users/janjan/Desktop/WWW/new%2013/BELLMER_SOCIETY',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget1'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id11',{pageIndex:0}));});}
function layoutMediaGrid_id11(range)
{createMediaStream_id11().load('file://localhost/Users/janjan/Desktop/WWW/new%2013/BELLMER_SOCIETY',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id11',new IWPhotoGridLayout(3,new IWSize(168,168),new IWSize(168,32),new IWSize(204,215),27,27,0,new IWSize(2,2)),new IWEmptyStroke(),imageStream,range,null,null,1.000000,{backgroundColor:'#000000',reflectionHeight:100,reflectionOffset:2,captionHeight:100,fullScreen:0,transitionIndex:2},'Media/slideshow.html','widget1','widget2','widget3')});}
function relayoutMediaGrid_id11(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id11(range);}
setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_1:new IWShadow({blurRadius:4,offset:new IWPoint(1.4142,1.4142),color:'#000000',opacity:0.500000}),shadow_0:new IWShadow({blurRadius:4,offset:new IWPoint(1.4142,1.4142),color:'#000000',opacity:0.500000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-1,1,2,81),url:'premiera_bellmera_2_files/stroke.png'},{rect:new IWRect(-1,-1,2,2),url:'premiera_bellmera_2_files/stroke_1.png'},{rect:new IWRect(1,-1,108,2),url:'premiera_bellmera_2_files/stroke_2.png'},{rect:new IWRect(109,-1,2,2),url:'premiera_bellmera_2_files/stroke_3.png'},{rect:new IWRect(109,1,2,81),url:'premiera_bellmera_2_files/stroke_4.png'},{rect:new IWRect(109,82,2,2),url:'premiera_bellmera_2_files/stroke_5.png'},{rect:new IWRect(1,82,108,2),url:'premiera_bellmera_2_files/stroke_6.png'},{rect:new IWRect(-1,82,2,2),url:'premiera_bellmera_2_files/stroke_7.png'}],new IWSize(110,83)),stroke_1:new IWStrokeParts([{rect:new IWRect(-1,1,2,88),url:'premiera_bellmera_2_files/stroke_8.png'},{rect:new IWRect(-1,-1,2,2),url:'premiera_bellmera_2_files/stroke_9.png'},{rect:new IWRect(1,-1,133,2),url:'premiera_bellmera_2_files/stroke_10.png'},{rect:new IWRect(134,-1,2,2),url:'premiera_bellmera_2_files/stroke_11.png'},{rect:new IWRect(134,1,2,88),url:'premiera_bellmera_2_files/stroke_12.png'},{rect:new IWRect(134,89,2,2),url:'premiera_bellmera_2_files/stroke_13.png'},{rect:new IWRect(1,89,133,2),url:'premiera_bellmera_2_files/stroke_14.png'},{rect:new IWRect(-1,89,2,2),url:'premiera_bellmera_2_files/stroke_15.png'}],new IWSize(135,90))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','Media/Photo-Overlay-Movie.png')
IWRegisterNamedImage('contribution overlay','Media/Photo-Overlay-Contribution.png')
loadMozillaCSS('premiera_bellmera_2_files/premiera_bellmera_2Moz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');adjustLineHeightIfTooBig('id6');adjustFontSizeIfTooBig('id6');adjustLineHeightIfTooBig('id7');adjustFontSizeIfTooBig('id7');adjustLineHeightIfTooBig('id8');adjustFontSizeIfTooBig('id8');adjustLineHeightIfTooBig('id9');adjustFontSizeIfTooBig('id9');adjustLineHeightIfTooBig('id10');adjustFontSizeIfTooBig('id10');NotificationCenter.addObserver(null,relayoutMediaGrid_id11,'RangeChanged','id11')
Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()
initializeMediaStream_id11()}
function onPageUnload()
{Widget.onunload();}
