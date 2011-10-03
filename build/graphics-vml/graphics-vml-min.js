/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("graphics-vml",function(b){var d=b.Lang,j=d.isNumber,f=d.isArray,h=b.DOM,c=b.Selector,m=b.config.doc,e=b.AttributeLite,p,l,o,k,n,i,a;function g(){}g.prototype={_currentX:0,_currentY:0,curveTo:function(t,s,A,z,w,v){var u,q,r,B;w=Math.round(w);v=Math.round(v);this._path+=" c "+Math.round(t)+", "+Math.round(s)+", "+Math.round(A)+", "+Math.round(z)+", "+w+", "+v;this._currentX=w;this._currentY=v;u=Math.max(w,Math.max(t,A));r=Math.max(v,Math.max(s,z));q=Math.min(w,Math.min(t,A));B=Math.min(v,Math.min(s,z));this._trackSize(u,r);this._trackSize(q,B);},quadraticCurveTo:function(v,u,z,w){var r=this._currentX,q=this._currentY,t=r+0.67*(v-r),s=q+0.67*(u-q),B=t+(z-r)*0.34,A=s+(w-q)*0.34;this.curveTo(t,s,B,A,z,w);},drawRect:function(q,t,r,s){this.moveTo(q,t);this.lineTo(q+r,t);this.lineTo(q+r,t+s);this.lineTo(q,t+s);this.lineTo(q,t);this._currentX=q;this._currentY=t;return this;},drawRoundRect:function(q,v,r,t,s,u){this.moveTo(q,v+u);this.lineTo(q,v+t-u);this.quadraticCurveTo(q,v+t,q+s,v+t);this.lineTo(q+r-s,v+t);this.quadraticCurveTo(q+r,v+t,q+r,v+t-u);this.lineTo(q+r,v+u);this.quadraticCurveTo(q+r,v,q+r-s,v);this.lineTo(q+s,v);this.quadraticCurveTo(q,v,q,v+u);return this;},drawWedge:function(s,w,u,t,r,q){var v=r*2;q=q||r;if(Math.abs(t)>360){t=360;}u*=-65535;t*=65536;this._path+=" m "+s+" "+w+" ae "+s+" "+w+" "+r+" "+q+" "+u+" "+t;this._trackSize(v,v);this._currentX=s;this._currentY=w;return this;},lineTo:function(v,u,s){var r=arguments,t,q;if(typeof v==="string"||typeof v==="number"){r=[[v,u]];}q=r.length;if(!this._path){this._path="";}this._path+=" l ";for(t=0;t<q;++t){this._path+=" "+Math.round(r[t][0])+", "+Math.round(r[t][1]);this._trackSize.apply(this,r[t]);this._currentX=r[t][0];this._currentY=r[t][1];}return this;},moveTo:function(q,r){if(!this._path){this._path="";}this._path+=" m "+Math.round(q)+", "+Math.round(r);this._trackSize(q,r);this._currentX=q;this._currentY=r;},_closePath:function(){var x=this.get("fill"),v=this.get("stroke"),s=this.node,q=this.get("width"),r=this.get("height"),u=this._path,t="";s.style.visible="hidden";this._fillChangeHandler();this._strokeChangeHandler();if(u){if(x&&x.color){t+=" x";}if(v){t+=" e";}}if(u){s.path=u+t;}if(q&&r){s.coordSize=q+", "+r;s.style.position="absolute";s.style.width=q+"px";s.style.height=r+"px";}this._path=u;s.style.visible="visible";this._updateTransform();},end:function(){this._closePath();},clear:function(){this._path="";},_trackSize:function(q,r){if(q>this._right){this._right=q;}if(q<this._left){this._left=q;}if(r<this._top){this._top=r;}if(r>this._bottom){this._bottom=r;}this._width=this._right-this._left;this._height=this._bottom-this._top;},_left:0,_right:0,_top:0,_bottom:0,_width:0,_height:0};b.VMLDrawing=g;p=function(){this._transforms=[];this.matrix=new b.Matrix();this.rotationMatrix=new b.Matrix();p.superclass.constructor.apply(this,arguments);};p.NAME="vmlShape";b.extend(p,b.BaseGraphic,b.mix({_type:"shape",init:function(){this.initializer.apply(this,arguments);},initializer:function(q){var r=this,s=q.graphic;r._graphic=s;r.createNode();this._updateHandler();},createNode:function(){var F,B=this.get("x"),z=this.get("y"),C=this.get("width"),H=this.get("height"),E,t,K,J,v,u,D,r,A,I,q,G,s;E=this.get("id");t=this._type;v="vml"+t+" yui3-vmlShape yui3-"+this.constructor.NAME;u=this._getStrokeProps();G=this._getFillProps();K="<"+t+'  xmlns="urn:schemas-microsft.com:vml" id="'+E+'" class="'+v+'" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:'+B+"px;top:"+z+"px;width:"+C+"px;height:"+H+'px;"';if(u&&u.weight&&u.weight>0){D=u.endcap;r=parseFloat(u.opacity);A=u.joinstyle;I=u.miterlimit;q=u.dashstyle;K+=' stroked="t" strokecolor="'+u.color+'" strokeWeight="'+u.weight+'px"';J='<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;"';J+=' opacity="'+r+'"';if(D){J+=' endcap="'+D+'"';}if(A){J+=' joinstyle="'+A+'"';}if(I){J+=' miterlimit="'+I+'"';}if(q){J+=' dashstyle="'+q+'"';}J+="></stroke>";this._strokeNode=m.createElement(J);K+=' stroked="t"';}else{K+=' stroked="f"';}if(G){if(G.node){s=G.node;this._fillNode=m.createElement(s);}if(G.color){K+=' fillcolor="'+G.color+'"';}K+=' filled="'+G.filled+'"';}K+=">";K+="</"+t+">";F=m.createElement(K);if(this._strokeNode){F.appendChild(this._strokeNode);}if(this._fillNode){F.appendChild(this._fillNode);}this.node=F;this._strokeFlag=false;this._fillFlag=false;},addClass:function(q){var r=this.node;h.addClass(r,q);},removeClass:function(q){var r=this.node;h.removeClass(r,q);},getXY:function(){var t=this._graphic,r=t.getXY(),q=this.get("x"),s=this.get("y");return[r[0]+q,r[1]+s];},setXY:function(r){var s=this._graphic,q=s.getXY();this.set("x",r[0]-q[0]);this.set("y",r[1]-q[1]);},contains:function(q){return q===b.one(this.node);},compareTo:function(q){var r=this.node;return r===q;},test:function(q){return c.test(this.node,q);},_getStrokeProps:function(){var x,z=this.get("stroke"),v,r,t="",q,s=0,u,y,w;if(z&&z.weight&&z.weight>0){x={};y=z.linecap||"flat";w=z.linejoin||"round";if(y!="round"&&y!="square"){y="flat";}v=parseFloat(z.opacity);r=z.dashstyle||"none";z.color=z.color||"#000000";z.weight=z.weight||1;z.opacity=j(v)?v:1;x.stroked=true;x.color=z.color;x.weight=z.weight;x.endcap=y;x.opacity=z.opacity;if(f(r)){t=[];u=r.length;for(s=0;s<u;++s){q=r[s];t[s]=q/z.weight;}}if(w=="round"||w=="bevel"){x.joinstyle=w;}else{w=parseInt(w,10);if(j(w)){x.miterlimit=Math.max(w,1);x.joinstyle="miter";}}x.dashstyle=t;}return x;},_strokeChangeHandler:function(w){if(!this._strokeFlag){return;}var s=this.node,A=this.get("stroke"),x,r,u="",q,t=0,v,z,y;if(A&&A.weight&&A.weight>0){z=A.linecap||"flat";y=A.linejoin||"round";if(z!="round"&&z!="square"){z="flat";}x=parseFloat(A.opacity);r=A.dashstyle||"none";A.color=A.color||"#000000";A.weight=A.weight||1;A.opacity=j(x)?x:1;s.stroked=true;s.strokeColor=A.color;s.strokeWeight=A.weight+"px";if(!this._strokeNode){this._strokeNode=this._createGraphicNode("stroke");s.appendChild(this._strokeNode);
}this._strokeNode.endcap=z;this._strokeNode.opacity=A.opacity;if(f(r)){u=[];v=r.length;for(t=0;t<v;++t){q=r[t];u[t]=q/A.weight;}}if(y=="round"||y=="bevel"){this._strokeNode.joinstyle=y;}else{y=parseInt(y,10);if(j(y)){this._strokeNode.miterlimit=Math.max(y,1);this._strokeNode.joinstyle="miter";}}this._strokeNode.dashstyle=u;this._strokeNode.on=true;}else{if(this._strokeNode){this._strokeNode.on=false;}s.stroked=false;}this._strokeFlag=false;},_getFillProps:function(){var w=this.get("fill"),q,t,v,r,s,u=false;if(w){t={};if(w.type=="radial"||w.type=="linear"){q=parseFloat(w.opacity);q=j(q)?q:1;u=true;v=this._getGradientFill(w);s='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="'+q+'"';for(r in v){if(v.hasOwnProperty(r)){s+=" "+r+'="'+v[r]+'"';}}s+=" />";t.node=s;}else{if(w.color){q=parseFloat(w.opacity);u=true;t.color=w.color;if(j(q)){q=Math.max(Math.min(q,1),0);t.opacity=q;if(q<1){t.node='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+q+'"/>';}}}}t.filled=u;}return t;},_fillChangeHandler:function(x){if(!this._fillFlag){return;}var t=this.node,w=this.get("fill"),q,s,u=false,r,v;if(w){if(w.type=="radial"||w.type=="linear"){u=true;v=this._getGradientFill(w);if(this._fillNode){for(r in v){if(v.hasOwnProperty(r)){this._fillNode.setAttribute(r,v[r]);}}}else{s='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"';for(r in v){if(v.hasOwnProperty(r)){s+=" "+r+'="'+v[r]+'"';}}s+=" />";this._fillNode=m.createElement(s);t.appendChild(this._fillNode);}}else{if(w.color){t.fillcolor=w.color;q=parseFloat(w.opacity);u=true;if(j(q)&&q<1){w.opacity=q;if(this._fillNode){if(this._fillNode.getAttribute("type")!="solid"){this._fillNode.type="solid";}this._fillNode.opacity=q;}else{s='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+q+'"/>';this._fillNode=m.createElement(s);t.appendChild(this._fillNode);}}else{if(this._fillNode){this._fillNode.opacity=1;this._fillNode.type="solid";}}}}}t.filled=u;this._fillFlag=false;},_updateFillNode:function(q){if(!this._fillNode){this._fillNode=this._createGraphicNode("fill");q.appendChild(this._fillNode);}},_getGradientFill:function(K){var O={},C,A,z=K.type,D=this.get("width"),N=this.get("height"),E=j,I,B=K.stops,M=B.length,x,J,L=0,F,q="",u=K.cx,s=K.cy,v=K.fx,t=K.fy,G=K.r,y,H=K.rotation||0;if(z==="linear"){if(H<=270){H=Math.abs(H-270);}else{if(H<360){H=270+(360-H);}else{H=270;}}O.type="gradient";O.angle=H;}else{if(z==="radial"){C=D*(G*2);A=N*(G*2);v=G*2*(v-0.5);t=G*2*(t-0.5);v+=u;t+=s;O.focussize=(C/D)/10+"% "+(A/N)/10+"%";O.alignshape=false;O.type="gradientradial";O.focus="100%";O.focusposition=Math.round(v*100)+"% "+Math.round(t*100)+"%";}}for(;L<M;++L){I=B[L];J=I.color;x=I.opacity;x=E(x)?x:1;y=I.offset||L/(M-1);y*=(G*2);if(y<=1){y=Math.round(100*y)+"%";F=L>0?L+1:"";O["opacity"+F]=x+"";q+=", "+y+" "+J;}}y=B[1].offset||0;y*=100;if(parseInt(y,10)<100){q+=", 100% "+J;}O.colors=q.substr(2);return O;},_addTransform:function(r,q){q=b.Array(q);this._transform=d.trim(this._transform+" "+r+"("+q.join(", ")+")");q.unshift(r);this._transforms.push(q);if(this.initialized){this._updateTransform();}},_updateTransform:function(){var J=this.node,Q,E,F,z=this.get("x"),v=this.get("y"),B=this.get("width"),N=this.get("height"),t,r,D,A,I,H,q,R,s,u,P,O,G=[],K=this.matrix,C=this.rotationMatrix,L=0,M=this._transforms.length;if(this._transforms&&this._transforms.length>0){F=this.get("transformOrigin");for(;L<M;++L){Q=this._transforms[L].shift();if(Q){if(Q=="rotate"){P=F[0];O=F[1];s=this.getBounds(K);K[Q].apply(K,this._transforms[L]);C[Q].apply(C,this._transforms[L]);u=this.getBounds(K);t=B*0.5;r=N*0.5;I=B*(P);H=N*(O);q=t-I;R=r-H;q=(K.a*q+K.b*R);R=(K.d*q+K.d*R);q+=I;R+=H;K.dx=C.dx+q-(u.right-u.left)/2;K.dy=C.dy+R-(u.bottom-u.top)/2;}else{if(Q=="scale"){F=this.get("transformOrigin");P=z+(F[0]*this.get("width"));O=v+(F[1]*this.get("height"));K.translate(P,O);K[Q].apply(K,this._transforms[L]);K.translate(0-P,0-O);}else{K[Q].apply(K,this._transforms[L]);C[Q].apply(C,this._transforms[L]);}}G.push(Q);}}E=K.toFilterText();}D=K.dx;A=K.dy;this._graphic.addToRedrawQueue(this);if(b.Array.indexOf(G,"skew")>-1||b.Array.indexOf(G,"scale")>-1){J.style.filter=E;}else{if(b.Array.indexOf(G,"rotate")>-1){J.style.rotation=this._rotation;D=C.dx;A=C.dy;}}this._transforms=[];z+=D;v+=A;J.style.left=z+"px";J.style.top=v+"px";},_translateX:0,_translateY:0,_transform:"",translate:function(q,r){this._translateX+=q;this._translateY+=r;this._addTransform("translate",arguments);},translateX:function(q){this._translateX+=q;this._addTransform("translateX",arguments);},translateY:function(q){this._translateY+=q;this._addTransform("translateY",arguments);},skew:function(q,r){this._addTransform("skew",arguments);},skewX:function(q){this._addTransform("skewX",arguments);},skewY:function(q){this._addTransform("skewY",arguments);},_rotation:0,rotate:function(q){this._rotation+=q;this._addTransform("rotate",arguments);},scale:function(q,r){this._addTransform("scale",arguments);},on:function(r,q){if(b.Node.DOM_EVENTS[r]){return b.one("#"+this.get("id")).on(r,q);}return b.on.apply(this,arguments);},_draw:function(){},_updateHandler:function(s){var r=this,q=r.node;r._fillChangeHandler();r._strokeChangeHandler();q.style.width=this.get("width")+"px";q.style.height=this.get("height")+"px";this._draw();r._updateTransform();},_createGraphicNode:function(q){q=q||this._type;return m.createElement("<"+q+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;" class="vml'+q+'"/>');},_getDefaultFill:function(){return{type:"solid",cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5};},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1};},set:function(){var q=this;e.prototype.set.apply(q,arguments);
if(q.initialized){q._updateHandler();}},getBounds:function(x){var q,y={},G=x||this.matrix,P=G.a,O=G.b,N=G.c,L=G.d,D=G.dx,B=G.dy,C=this.get("width"),J=this.get("height"),v=this.get("x"),E=this.get("y"),M=v+C,A=E+J,z=this.get("stroke"),K=(P*v+N*E+D),u=(O*v+L*E+B),I=(P*M+N*E+D),t=(O*M+L*E+B),H=(P*v+N*A+D),s=(O*v+L*A+B),F=(P*M+N*A+D),r=(O*M+L*A+B);y.left=Math.min(H,Math.min(K,Math.min(I,F)));y.right=Math.max(H,Math.max(K,Math.max(I,F)));y.top=Math.min(t,Math.min(r,Math.min(s,u)));y.bottom=Math.max(t,Math.max(r,Math.max(s,u)));if(z&&z.weight){q=z.weight;y.left-=q;y.right+=q;y.top-=q;y.bottom+=q;}y.width=y.right-y.left;y.height=y.bottom-y.top;return y;},destroy:function(){var q=this._graphic&&this._graphic._node?this._graphic._node:null,r=this.node;if(this.node){if(this._fillNode){r.removeChild(this._fillNode);}if(this._strokeNode){r.removeChild(this._strokeNode);}if(q){q.removeChild(r);}}}},b.VMLDrawing.prototype));p.ATTRS={transformOrigin:{valueFn:function(){return[0.5,0.5];}},transform:{setter:function(t){var s=0,q,r;this._rotation=0;this.matrix.init();this._transforms=this.matrix.getTransformArray(t);q=this._transforms.length;for(;s<q;++s){r=this._transforms[s];if(r[0]=="rotate"){this._rotation+=r[1];}}this._transform=t;if(this.initialized){this._updateTransform();}return t;},getter:function(){return this._transform;}},x:{value:0},y:{value:0},id:{valueFn:function(){return b.guid();},setter:function(r){var q=this.node;if(q){q.setAttribute("id",r);}return r;}},width:{value:0},height:{value:0},visible:{value:true,setter:function(s){var r=this.node,q=s?"visible":"hidden";if(r){r.style.visibility=q;}return s;}},fill:{valueFn:"_getDefaultFill",setter:function(t){var r,s,q=this.get("fill")||this._getDefaultFill();if(t){if(t.hasOwnProperty("color")){t.type="solid";}for(r in t){if(t.hasOwnProperty(r)){q[r]=t[r];}}}s=q;if(s&&s.color){if(s.color===undefined||s.color=="none"){s.color=null;}}this._fillFlag=true;return s;}},stroke:{valueFn:"_getDefaultStroke",setter:function(u){var s,t,q,r=this.get("stroke")||this._getDefaultStroke();if(u){if(u.hasOwnProperty("weight")){q=parseInt(u.weight,10);if(!isNaN(q)){u.weight=q;}}for(s in u){if(u.hasOwnProperty(s)){r[s]=u[s];}}}t=r;this._strokeFlag=true;return t;}},autoSize:{value:false},pointerEvents:{value:"visiblePainted"},node:{readOnly:true,getter:function(){return this.node;}},graphic:{readOnly:true,getter:function(){return this._graphic;}}};b.VMLShape=p;o=function(){o.superclass.constructor.apply(this,arguments);};o.NAME="vmlPath";b.extend(o,b.VMLShape,{_updateHandler:function(){var q=this;q._fillChangeHandler();q._strokeChangeHandler();q._updateTransform();}});o.ATTRS=b.merge(b.VMLShape.ATTRS,{width:{getter:function(){return this._width;},setter:function(q){this._width=q;return q;}},height:{getter:function(){return this._height;},setter:function(q){this._height=q;return q;}},path:{readOnly:true,getter:function(){return this._path;}}});b.VMLPath=o;k=function(){k.superclass.constructor.apply(this,arguments);};k.NAME="vmlRect";b.extend(k,b.VMLShape,{_type:"rect"});k.ATTRS=b.VMLShape.ATTRS;b.VMLRect=k;n=function(){n.superclass.constructor.apply(this,arguments);};n.NAME="vmlEllipse";b.extend(n,b.VMLShape,{_type:"oval"});n.ATTRS=b.merge(b.VMLShape.ATTRS,{xRadius:{lazyAdd:false,getter:function(){var q=this.get("width");q=Math.round((q/2)*100)/100;return q;},setter:function(r){var q=r*2;this.set("width",q);return r;}},yRadius:{lazyAdd:false,getter:function(){var q=this.get("height");q=Math.round((q/2)*100)/100;return q;},setter:function(r){var q=r*2;this.set("height",q);return r;}}});b.VMLEllipse=n;l=function(q){l.superclass.constructor.apply(this,arguments);};l.NAME="vmlCircle";b.extend(l,p,{_type:"oval"});l.ATTRS=b.merge(p.ATTRS,{radius:{lazyAdd:false,value:0},width:{setter:function(q){this.set("radius",q/2);return q;},getter:function(){var q=this.get("radius"),r=q&&q>0?q*2:0;return r;}},height:{setter:function(q){this.set("radius",q/2);return q;},getter:function(){var q=this.get("radius"),r=q&&q>0?q*2:0;return r;}}});b.VMLCircle=l;a=function(){a.superclass.constructor.apply(this,arguments);};a.NAME="vmlPieSlice";b.extend(a,b.VMLShape,b.mix({_type:"shape",_draw:function(u){var r=this.get("cx"),v=this.get("cy"),t=this.get("startAngle"),s=this.get("arc"),q=this.get("radius");this.clear();this.drawWedge(r,v,t,s,q);this.end();}},b.VMLDrawing.prototype));a.ATTRS=b.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},b.VMLShape.ATTRS);b.VMLPieSlice=a;i=function(){i.superclass.constructor.apply(this,arguments);};i.NAME="vmlGraphic";i.ATTRS={render:{},id:{valueFn:function(){return b.guid();},setter:function(r){var q=this._node;if(q){q.setAttribute("id",r);}return r;}},shapes:{readOnly:true,getter:function(){return this._shapes;}},contentBounds:{readOnly:true,getter:function(){return this._contentBounds;}},node:{readOnly:true,getter:function(){return this._node;}},width:{setter:function(q){if(this._node){this._node.style.width=q+"px";}return q;}},height:{setter:function(q){if(this._node){this._node.style.height=q+"px";}return q;}},autoSize:{value:false},resizeDown:{getter:function(){return this._resizeDown;},setter:function(q){this._resizeDown=q;this._redraw();return q;}},x:{getter:function(){return this._x;},setter:function(q){this._x=q;if(this._node){this._node.style.left=q+"px";}return q;}},y:{getter:function(){return this._y;},setter:function(q){this._y=q;if(this._node){this._node.style.top=q+"px";}return q;}},autoDraw:{value:true},visible:{value:true,setter:function(q){this._toggleVisible(q);return q;}}};b.extend(i,b.BaseGraphic,{_x:0,_y:0,getXY:function(){var q=b.one(this._node),r;if(q){r=q.getXY();}return r;},_resizeDown:false,initializer:function(q){var r=this.get("render");this._shapes={};this._contentBounds={left:0,top:0,right:0,bottom:0};this._node=this._createGraphic();this._node.setAttribute("id",this.get("id"));if(r){this.render(r);}},render:function(t){var q=b.one(t),r=this.get("width")||parseInt(q.getComputedStyle("width"),10),s=this.get("height")||parseInt(q.getComputedStyle("height"),10);
q=q||m.body;q.appendChild(this._node);this.setSize(r,s);this.parentNode=q;this.set("width",r);this.set("height",s);return this;},destroy:function(){this.clear();this._node.parentNode.removeChild(this._node);},addShape:function(q){q.graphic=this;var s=this._getShapeClass(q.type),r=new s(q);this._appendShape(r);return r;},_appendShape:function(r){var s=r.node,q=this._frag||this._node;if(this.get("autoDraw")){q.appendChild(s);}else{this._getDocFrag().appendChild(s);}},removeShape:function(q){if(!q instanceof p){if(d.isString(q)){q=this._shapes[q];}}if(q&&q instanceof p){q.destroy();delete this._shapes[q.get("id")];}if(this.get("autoDraw")){this._redraw();}},removeAllShapes:function(){var q=this._shapes,r;for(r in q){if(q.hasOwnProperty(r)){q[r].destroy();}}this._shapes={};},_removeChildren:function(q){if(q.hasChildNodes()){var r;while(q.firstChild){r=q.firstChild;this._removeChildren(r);q.removeChild(r);}}},clear:function(){this._removeAllShapes();this._removeChildren(this._node);},_toggleVisible:function(t){var s,r=this._shapes,q=t?"visible":"hidden";if(r){for(s in r){if(r.hasOwnProperty(s)){r[s].set("visible",t);}}}this._node.style.visibility=q;},setSize:function(q,r){q=Math.round(q);r=Math.round(r);this._node.style.width=q+"px";this._node.style.height=r+"px";this._node.coordSize=q+" "+r;},setPosition:function(q,r){q=Math.round(q);r=Math.round(r);this._node.style.left=q+"px";this._node.style.top=r+"px";},_createGraphic:function(){var q=m.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:block;zoom:1;" />');q.style.display="block";q.style.position="absolute";return q;},_createGraphicNode:function(q){return m.createElement("<"+q+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;zoom:1;" />');},getShapeById:function(q){return this._shapes[q];},_getShapeClass:function(r){var q=this._shapeClass[r];if(q){return q;}return r;},_shapeClass:{circle:b.VMLCircle,rect:b.VMLRect,path:b.VMLPath,ellipse:b.VMLEllipse,pieslice:b.VMLPieSlice},batch:function(r){var q=this.get("autoDraw");this.set("autoDraw",false);r.apply();this._redraw();this.set("autoDraw",q);},_getDocFrag:function(){if(!this._frag){this._frag=m.createDocumentFragment();}return this._frag;},addToRedrawQueue:function(q){var s,r;this._shapes[q.get("id")]=q;if(!this.get("resizeDown")){s=q.getBounds();r=this._contentBounds;r.left=r.left<s.left?r.left:s.left;r.top=r.top<s.top?r.top:s.top;r.right=r.right>s.right?r.right:s.right;r.bottom=r.bottom>s.bottom?r.bottom:s.bottom;r.width=r.right-r.left;r.height=r.bottom-r.top;this._contentBounds=r;}if(this.get("autoDraw")){this._redraw();}},_redraw:function(){var q=this.get("resizeDown")?this._getUpdatedContentBounds():this._contentBounds;if(this.get("autoSize")){this.setSize(q.right,q.bottom);}if(this._frag){this._node.appendChild(this._frag);this._frag=null;}},_getUpdatedContentBounds:function(){var u,s,r,q=this._shapes,t={left:0,top:0,right:0,bottom:0};for(s in q){if(q.hasOwnProperty(s)){r=q[s];u=r.getBounds();t.left=Math.min(t.left,u.left);t.top=Math.min(t.top,u.top);t.right=Math.max(t.right,u.right);t.bottom=Math.max(t.bottom,u.bottom);}}t.width=t.right-t.left;t.height=t.bottom-t.top;this._contentBounds=t;return t;}});b.VMLGraphic=i;},"3.4.0",{requires:["graphics"],skinnable:false});