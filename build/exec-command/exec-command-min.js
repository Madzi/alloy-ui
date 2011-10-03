/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("exec-command",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.extend(a,b.Base,{_lastKey:null,_inst:null,command:function(f,e){var d=a.COMMANDS[f];if(d){return d.call(this,f,e);}else{return this._command(f,e);}},_command:function(g,f){var d=this.getInstance();try{try{d.config.doc.execCommand("styleWithCSS",null,1);}catch(j){try{d.config.doc.execCommand("useCSS",null,0);}catch(i){}}d.config.doc.execCommand(g,null,f);}catch(h){}},getInstance:function(){if(!this._inst){this._inst=this.get("host").getInstance();}return this._inst;},initializer:function(){b.mix(this.get("host"),{execCommand:function(e,d){return this.exec.command(e,d);},_execCommand:function(e,d){return this.exec._command(e,d);}});this.get("host").on("dom:keypress",b.bind(function(d){this._lastKey=d.keyCode;},this));}},{NAME:"execCommand",NS:"exec",ATTRS:{host:{value:false}},COMMANDS:{wrap:function(f,d){var e=this.getInstance();return(new e.Selection()).wrapContent(d);},inserthtml:function(f,d){var e=this.getInstance();if(e.Selection.hasCursor()||b.UA.ie){return(new e.Selection()).insertContent(d);}else{this._command("inserthtml",d);}},insertandfocus:function(h,e){var g=this.getInstance(),d,f;if(g.Selection.hasCursor()){e+=g.Selection.CURSOR;d=this.command("inserthtml",e);f=new g.Selection();f.focusCursor(true,true);}else{this.command("inserthtml",e);}return d;},insertbr:function(j){var i=this.getInstance(),h=new i.Selection(),d="<var>|</var>",e=null,g=(b.UA.webkit)?"span.Apple-style-span,var":"var";if(h._selection.pasteHTML){h._selection.pasteHTML(d);}else{this._command("inserthtml",d);}var f=function(l){var k=i.Node.create("<br>");l.insert(k,"before");return k;};i.all(g).each(function(m){var l=true;if(b.UA.webkit){l=false;if(m.get("innerHTML")==="|"){l=true;}}if(l){e=f(m);if((!e.previous()||!e.previous().test("br"))&&b.UA.gecko){var k=e.cloneNode();e.insert(k,"after");e=k;}m.remove();}});if(b.UA.webkit&&e){f(e);h.selectNode(e);}},insertimage:function(e,d){return this.command("inserthtml",'<img src="'+d+'">');},addclass:function(f,d){var e=this.getInstance();return(new e.Selection()).getSelected().addClass(d);},removeclass:function(f,d){var e=this.getInstance();return(new e.Selection()).getSelected().removeClass(d);},forecolor:function(f,g){var e=this.getInstance(),d=new e.Selection(),h;if(!b.UA.ie){this._command("useCSS",false);}if(e.Selection.hasCursor()){if(d.isCollapsed){if(d.anchorNode&&(d.anchorNode.get("innerHTML")==="&nbsp;")){d.anchorNode.setStyle("color",g);h=d.anchorNode;}else{h=this.command("inserthtml",'<span style="color: '+g+'">'+e.Selection.CURSOR+"</span>");d.focusCursor(true,true);}return h;}else{return this._command(f,g);}}else{this._command(f,g);}},backcolor:function(f,g){var e=this.getInstance(),d=new e.Selection(),h;if(b.UA.gecko||b.UA.opera){f="hilitecolor";}if(!b.UA.ie){this._command("useCSS",false);}if(e.Selection.hasCursor()){if(d.isCollapsed){if(d.anchorNode&&(d.anchorNode.get("innerHTML")==="&nbsp;")){d.anchorNode.setStyle("backgroundColor",g);h=d.anchorNode;}else{h=this.command("inserthtml",'<span style="background-color: '+g+'">'+e.Selection.CURSOR+"</span>");d.focusCursor(true,true);}return h;}else{return this._command(f,g);}}else{this._command(f,g);}},hilitecolor:function(){return a.COMMANDS.backcolor.apply(this,arguments);},fontname2:function(f,g){this._command("fontname",g);var e=this.getInstance(),d=new e.Selection();if(d.isCollapsed&&(this._lastKey!=32)){if(d.anchorNode.test("font")){d.anchorNode.set("face",g);}}},fontsize2:function(f,h){this._command("fontsize",h);var e=this.getInstance(),d=new e.Selection();if(d.isCollapsed&&d.anchorNode&&(this._lastKey!=32)){if(b.UA.webkit){if(d.anchorNode.getStyle("lineHeight")){d.anchorNode.setStyle("lineHeight","");}}if(d.anchorNode.test("font")){d.anchorNode.set("size",h);}else{if(b.UA.gecko){var g=d.anchorNode.ancestor(e.Selection.DEFAULT_BLOCK_TAG);if(g){g.setStyle("fontSize","");}}}}},insertunorderedlist:function(d){this.command("list","ul");},insertorderedlist:function(d){this.command("list","ol");},list:function(u,y){var f=this.getInstance(),h,t="dir",e="yui3-touched",m,k,l,g,o,q,i,j,w,d,r=new f.Selection();u="insert"+((y==="ul")?"un":"")+"orderedlist";if(b.UA.ie&&!r.isCollapsed){k=r._selection;h=k.htmlText;l=f.Node.create(h);if(l.test("li")||l.one("li")){this._command(u,null);return;}if(l.test(y)){g=k.item?k.item(0):k.parentElement();o=f.one(g);d=o.all("li");q="<div>";d.each(function(n){q+=n.get("innerHTML")+"<br>";});q+="</div>";i=f.Node.create(q);if(o.get("parentNode").test("div")){o=o.get("parentNode");}if(o&&o.hasAttribute(t)){i.setAttribute(t,o.getAttribute(t));}o.replace(i);if(k.moveToElementText){k.moveToElementText(i._node);}k.select();}else{j=b.one(k.parentElement());if(!j.test(f.Selection.BLOCKS)){j=j.ancestor(f.Selection.BLOCKS);}if(j){if(j.hasAttribute(t)){m=j.getAttribute(t);}}if(h.indexOf("<br>")>-1){h=h.split(/<br>/i);}else{var x=f.Node.create(h),p=x.all("p");if(p.size()){h=[];p.each(function(s){h.push(s.get("innerHTML"));});}else{h=[h];}}w="<"+y+' id="ie-list">';b.each(h,function(s){var n=f.Node.create(s);if(n.test("p")){if(n.hasAttribute(t)){m=n.getAttribute(t);}s=n.get("innerHTML");}w+="<li>"+s+"</li>";});w+="</"+y+">";k.pasteHTML(w);g=f.config.doc.getElementById("ie-list");g.id="";if(m){g.setAttribute(t,m);}if(k.moveToElementText){k.moveToElementText(g);}k.select();}}else{if(b.UA.ie){j=f.one(r._selection.parentElement());if(j.test("p")){if(j&&j.hasAttribute(t)){m=j.getAttribute(t);}h=b.Selection.getText(j);if(h===""){var v="";if(m){v=' dir="'+m+'"';}w=f.Node.create(b.Lang.sub("<{tag}{dir}><li></li></{tag}>",{tag:y,dir:v}));j.replace(w);r.selectNode(w.one("li"));}else{this._command(u,null);}}else{this._command(u,null);}}else{f.all(y).addClass(e);if(r.anchorNode.test(f.Selection.BLOCKS)){j=r.anchorNode;}else{j=r.anchorNode.ancestor(f.Selection.BLOCKS);}if(j&&j.hasAttribute(t)){m=j.getAttribute(t);}this._command(u,null);w=f.all(y);if(m){w.each(function(s){if(!s.hasClass(e)){s.setAttribute(t,m);
}});}w.removeClass(e);}}},justify:function(i,j){if(b.UA.webkit){var h=this.getInstance(),g=new h.Selection(),d=g.anchorNode;var f=d.getStyle("backgroundColor");this._command(j);g=new h.Selection();if(g.anchorNode.test("div")){var e="<span>"+g.anchorNode.get("innerHTML")+"</span>";g.anchorNode.set("innerHTML",e);g.anchorNode.one("span").setStyle("backgroundColor",f);g.selectNode(g.anchorNode.one("span"));}}else{this._command(j);}},justifycenter:function(d){this.command("justify","justifycenter");},justifyleft:function(d){this.command("justify","justifyleft");},justifyright:function(d){this.command("justify","justifyright");},justifyfull:function(d){this.command("justify","justifyfull");}}});var c=function(j,v,r){var k=this.getInstance(),t=k.config.doc,h=t.selection.createRange(),g=t.queryCommandValue(j),l,f,i,e,n,u,q;if(g){l=h.htmlText;f=new RegExp(r,"g");i=l.match(f);if(i){l=l.replace(r+";","").replace(r,"");h.pasteHTML('<var id="yui-ie-bs">');e=t.getElementById("yui-ie-bs");n=t.createElement("div");u=t.createElement(v);n.innerHTML=l;if(e.parentNode!==k.config.doc.body){e=e.parentNode;}q=n.childNodes;e.parentNode.replaceChild(u,e);b.each(q,function(d){u.appendChild(d);});h.collapse();if(h.moveToElementText){h.moveToElementText(u);}h.select();}}this._command(j);};if(b.UA.ie){a.COMMANDS.bold=function(){c.call(this,"bold","b","FONT-WEIGHT: bold");};a.COMMANDS.italic=function(){c.call(this,"italic","i","FONT-STYLE: italic");};a.COMMANDS.underline=function(){c.call(this,"underline","u","TEXT-DECORATION: underline");};}b.namespace("Plugin");b.Plugin.ExecCommand=a;},"3.4.0",{skinnable:false,requires:["frame"]});