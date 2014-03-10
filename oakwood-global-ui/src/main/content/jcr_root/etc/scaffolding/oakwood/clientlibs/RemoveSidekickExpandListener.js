CQ.WCM.getTopWindow().CQ.WCM.on('sidekickready',function(){
				var sidekick = CQ.WCM.getSidekick();
                var previewSwitch = sidekick.header.child(".x-tool-toggle");
                var scaffoldMode = CQ.WCM.getContentUrl().indexOf(".scaffolding.") > 0;

                if(scaffoldMode){

                	//remove existed listener
                	// just expand or collapse .
                    previewSwitch.removeAllListeners().on("click", function() {
                         if (!this.collapsed) {
                    		this.collapse();
                        } else {
                            this.expand();
                        }
                    }, sidekick);
                }
});