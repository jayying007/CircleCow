var UI_ctrl = require("UI_ctrl");
var UI_manager = require("UI_manager");
cc.Class({
	extends: UI_ctrl,

	properties: {
	},

	onLoad() {
		UI_ctrl.prototype.onLoad.call(this);
		// 给按钮绑定事件
		UI_manager.add_button_listen(this.view['btn'],this,this.throwRope);
		// 加载绳子的几张图片
		this.rope_imgs=[]
		cc.loader.loadResArray(['res/rope','res/ropeCow1','res/ropeCow2','res/ropeCow3'],function(err,imgs){
			for(var i=0;i<imgs.length;i++){
				this.rope_imgs.push(new cc.SpriteFrame(imgs[i]))
			}
		}.bind(this))
	},

	start() {
		this.view['time'].getComponent(cc.ProgressBar).progress=1;
		this.time = 0;
		this.score = 0;
		this.rope_sp = this.view['rope'].getComponent(cc.Sprite);
		this.gen_one_cow();
	},
	gen_one_cow() {
		cc.loader.loadRes("item_prefabs/Cow",cc.Prefab,function(err,cow_prefab){
			var cow = cc.instantiate(cow_prefab);
			this.view['cow_root'].addChild(cow);
			
			cow.x = 450;
			cow.y = -80;
			
			cow.addComponent("Cow_ctrl");

			var time = 3 + Math.random() * 2;
			this.scheduleOnce(this.gen_one_cow.bind(this), time);
		}.bind(this))
        
    },

	throwRope(){
		if (this.is_throwing === true) {
            return;
        }
		this.rope_sp.spriteFrame = this.rope_imgs[0];

        this.is_throwing = true;
        // 移动Action, [m1, m2]  --> 队列容器把他们装起来;
        var m1 = cc.moveTo(0.5, cc.v2(0, -150));
        var m2 = cc.moveTo(0.5, cc.v2(0, -750));
        var end_func = cc.callFunc(function() {
            this.is_throwing = false;
        }.bind(this), this);

        var mid_func = cc.callFunc(function() {
            var cow = this.hit_test();
			if (cow) { // 
				// 套中牛，发出尖叫
				cc.loader.loadRes('audio/cow', cc.AudioClip, function (err, clip) {
					var audioID = cc.audioEngine.playEffect(clip, false);
				});

				// 替换绳子图片，同时移除这只牛
                var cow_type = cow.getComponent("Cow_ctrl").c_type; // 1, 2, 3
                this.rope_sp.spriteFrame = this.rope_imgs[cow_type];
                cow.removeFromParent();
				this.view['rope'].y = -145;

				// 加分
				this.score += 1;
				this.view['score'].getComponent(cc.Label).string = 'Score: ' + this.score;
				console.log(this.score,this.view['score'])
            }

        }.bind(this), this);

        var seq = cc.sequence([m1, mid_func, m2, end_func]);
		this.view['rope'].runAction(seq);
	},
	hit_test() {
        for(var i = 0; i < this.view['cow_root'].childrenCount; i ++) {
            var cow = this.view['cow_root'].children[i];
            if (cow.x >= 65 && cow.x <= 155) {
                return cow;
            }
        }

        return null;
	},
	update(dt){
		this.time += dt;
		var progress = (20-this.time)/20;
		this.view['time'].getComponent(cc.ProgressBar).progress=progress;
	}
});