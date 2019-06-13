( function( blocks, editor, element ) {

    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InnerBlocks = editor.InnerBlocks;

    /**
     * Every block starts by registering a new block type definition.
     * @see https://wordpress.org/gutenberg/handbook/block-api/
     */
    registerBlockType( 'custom-gutenberg-blocks/bootstrap-card', {
        title: 'Bootstrap Card',
        description: 'Eine Bootstrap Karte (die typische Flatbox).',
        icon: 'welcome-widgets-menus',
        category: 'bootstrap',
        keywords: [ 'bootstrap', 'card', 'karte' ],
        attributes: {},
        supports: {
            className: false,
        },

        /**
         * The edit function describes the structure of your block in the context of the editor.
         * This represents what the editor will render when the block is used.
         * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
         *
         * @param {Object} [props] Properties passed from the editor.
         * @return {Element}       Element to render.
         */
        edit: function( ) {

            return [
                // Block Backend
                el( 'div', { className: 'card' },
                    el( 'div', { className: 'card-body' },
                        el ( InnerBlocks ),
                    )
                )
            ]
        },

        /**
         * The save function defines the way in which the different attributes should be combined
         * into the final markup, which is then serialized by Gutenberg into `post_content`.
         * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
         *
         * @return {Element}       Element to render.
         */
        save: function( ) {

            return (
                // Block Frontend
                el( 'div', { className: 'card' },
                    el( 'div', { className: 'card-body' },
                        el ( InnerBlocks.Content ),
                    )
                )
            )
        },
    } )
} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element,
    window.wp.components,
);