var UI_ctrl = require("UI_ctrl");
var UI_manager = require("UI_manager");
cc.Class({
	extends: UI_ctrl,

	properties: {
	},

	onLoad() {
		UI_ctrl.prototype.onLoad.call(this);
		// 给按钮绑定事件
		UI_manager.add_button_listen(this.view['btnplay'],this,this.start_game);
	},

	start() {

	},
	start_game(){
		this.scheduleOnce(function(){
			UI_manager.show_ui_at(this.node,"LoginUI");
		}.bind(this), 20);
		
		UI_manager.show_ui_at(this.node,"GameUI");
	}

});