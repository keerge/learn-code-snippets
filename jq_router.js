// 点击拦截
const Router = (($)=>{
	const Selector =  {
		LINK:$('a')
	}
	class Router {
	  constructor() {
	    this.$el = Selector.LINK
	   	this.eventList = {}
	   	this.bindEvents()
	   	this.init()
	  }
	  on(event,linstener){
	  	this.eventList[event] = this.eventList[event] || []
	    this.eventList[event].push(linstener)
	  }
	  replace(target){
	  	this.beforeEvents(target).done(({path} = {})=>{
	  		window.location.replace(path?path:target);
	  	})
	  }
	  push(target){
	  	this.beforeEvents(path).done(({path} = {})=>{
	  		window.location.href = path?path:target
	  	})
	  }
	  beforeEvents(path){
	  	return $.when(...this.eventList['beforeEach'].map((route=>{
	  		var dtd = $.Deferred();
	  		route(path,dtd.resolve)
	  		return dtd
	  	})))
	  }
	  bindEvents(){
	  	let self = this
	  	this.$el.on('click',function(e){
	  		e.preventDefault()
	  		self.push($(this).attr('href'))
	  	})
	  }
	  init(){
	  	setTimeout(()=>{
	  		this.eventList['afterEach'].forEach(linstener => linstener.apply(null,[window.location.pathname,GetRequest()]))
	  	},0)
	  }
	}

	$.router = new Router()
})($)


$.router.on('beforeEach',(url,next)=>{
	console.log('beforeEach...')
	setTimeout(()=>{
		next({path:'/login.html'})
	},3000)
})

$.router.on('afterEach',(path,query)=>{
	console.log('afterEach')
	if(query.token){
		// setCookie
		$.router.replace(path)
	}
})