var UI_ctrl = require("UI_ctrl");
var UI_manager = require("UI_manager");
cc.Class({
	extends: UI_ctrl,

	properties: {
	},

	onLoad() {
		UI_ctrl.prototype.onLoad.call(this);
	},

	start() {
		this.c_type = Math.random() * 3 + 1;
        this.c_type = Math.floor(this.c_type); // [cow1, cow2, cow3]
        
        var imgPath=[]
        for(var i=1;i<=3;i++){
            imgPath.push('res/cow'+this.c_type+'_'+i);
        }
        cc.loader.loadResArray(imgPath,function(err,imgs){
			var sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(imgs[0]);
            
            var animation = this.node.addComponent(cc.Animation);
            /* 添加SpriteFrame到frames数组 */
            var frames = [];
            for(var j=0;j<imgs.length;j++){
                frames.push(new cc.SpriteFrame(imgs[j]));
            }
    
            var clip = cc.AnimationClip.createWithSpriteFrames(frames, imgs.length);
            clip.name = 'anim_boom';
            clip.wrapMode = cc.WrapMode.Loop;
            /* 添加关键帧事件 */
            // clip.events.push({
            //     frame: 1,                   // 准确的时间，以秒为单位。这里表示将在动画播放到 1s 时触发事件
            //     func: 'frameEvent',         // 回调函数名称
            //     params: [1, 'hello']        // 回调参数
            // });
            animation.addClip(clip);
            animation.play('anim_boom');
		}.bind(this))
		
		
		this.speed = -(200 + Math.random() * 100);
	},
	update(dt) {
        var s = this.speed * dt;
        this.node.x += s;
        if (this.node.x <= -510) {
            this.node.removeFromParent();
        }
    },
});