var UI_Manager = require("UI_manager")

cc.Class({
    extends: cc.Component,

    properties: {

    },


    start () {
        cc.loader.loadRes('audio/bg', cc.AudioClip, function (err, clip) {
            var audioID = cc.audioEngine.playMusic(clip, true);
        });
        UI_Manager.show_ui_at(this.node,"LoginUI");
    },

    // update (dt) {},
});
