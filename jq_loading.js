const Loading = (($)=>{
	const Selector =  {
		LOADING:$('[loading]')
	}
	class Loading {
		constructor(el){
			this.$el = el
			this.init()
		}
		init(){
			this.$loadingEl = $('<div>loading...</div>').appendTo(this.$el)
			this.$el.addClass('loading')
		}
		hide(){
			this.$el.removeClass('loading')
			this.$loadingEl.remove()
		}

	}
	$.fn.loading = function(option){
		this.each(function(){
			 var $this = $(this)
			 var data = $this.data('loading')
			 if(typeof option === 'string'){
			 	if(!data){
			 		return
			 	}
			 	data[option].apply(data,arguments)
			 }
			 if(!data){
			 	$this.data('loading',(data=new Loading($this,option)))
			 }
		})
	}

	Selector.LOADING.loading()
})($)
		

// $('body').loading()
setTimeout(()=>{
	$('body').loading('hide')
},1000)