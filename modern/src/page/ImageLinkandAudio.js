/**
 *   DEPRECATED!!! Use TextPage.js instead
 */
Ext.define('Player.page.ImageLinkandAudio', {
    extend: 'Player.page.Page',

    alias: ['widget.ImageLinkandAudio'],
    
    requires: ['Player.page.components.TextImage','Player.view.main.AudioBar'],

    config: {
        layout: 'vbox',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        recordId: '',
        items: [{
            xtype: 'panel',
            html: 'Title of the Video',
            itemId: 'pageTitle',
            cls: 'page-title',
            layout: {
                type: 'fit'
            }
        }, {
            xtype: 'textimage',
            showCaption: true,
            html: '',
            cls: 'page-content',
            itemId: 'pageText'
        }, {
            xtype: 'audiobar',
            itemId: 'audio'
        }],
        pageData: {}
    },

    applyPageData: function(config) {
        return config;
    },

     updatePageData: function(newPageData, oldPageData) {
        var me = this,
            pText = '';

        // Set Title
        me.getComponent('pageTitle').setHtml(newPageData.title);

        // Set Image
        if(newPageData.imageURL){
            me.getComponent('pageText').on('imagetap', me.imageTapHandler, me);
        }
        else{
            newPageData.iconType = 'none';
        }
        me.getComponent('pageText').setPageData(newPageData);

        // Create Audio
        me.getComponent('audio').setMediaPath(newPageData.mediaPath);

        // Create Note
        if (newPageData.note) {
            var textNote = Ext.create('Player.view.Note', {
                noteText: newPageData.note['#text'],
                nType: newPageData.nType
            });
            me.add(textNote);
        }

        ApplyMathJax(me.element.dom);
    },
    imageTapHandler: function(e) {
        Player.app.fireEvent('gotolink', this.getPageData().imageURL);
    },

    start: function() {
        var me = this;
        me.callParent(arguments);
    },
    close: function() {
        var me = this;
        me.getComponent('audio').pause();
        me.closeImagePopup();
    },

    initialize: function() {
        this.callParent(arguments);
    }
});
