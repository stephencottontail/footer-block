const { Placeholder } = wp.components;
const { withSelect, subscribe, select } = wp.data;
const { createElement, Component } = wp.element;
const { addQueryArgs } = wp.url;
const DEFAULT_QUERY = {
	per_page: -1,
	orderby: 'id',
	order: 'desc',
    _fields: 'id,name,link'
};

class FooterBlock extends Component {
    constructor() {
        super( ...arguments );
    }

    componentDidMount() {
        const { type, setAttributes } = this.props;
        let current = select( 'core/editor' ).getCurrentPostAttribute( type );

        setAttributes( { [type]: current } );

        subscribe( () => {
            let edited = select( 'core/editor' ).getEditedPostAttribute( type );
            let didChange = _.isEqual( current, edited );
            current = edited;

            if ( ! didChange ) {
                /**
                 * this syntax lets us use the value of `type` as the object key
                 * name. there's no way anyone would know that without Google
                 */
                setAttributes( { [type]: edited } );
            }
        } );
    }

    render() {
		const { type, terms, attributes, className } = this.props;
        const hasPosts = Array.isArray( terms ) && terms.length;

		/* i can't immediately use this.props.terms here because it takes some time
		   to populate `terms` with the data returned from `withSelect`, so i need
		   to think of something reasonable to display while we wait for the
		   data to arrive */
        if ( hasPosts ) {
			return (
                <div className={ `${className}__block` }>
					<span className={ `${className}__title` }>{ type }</span>
				    { terms.map( ( value, index ) => {
						return <a className={ `${className}__link` } key={ index } href={ value.link }>{ value.name }</a>
					} ) }
				</div>
			);
        } else {
            return <Placeholder icon={ 'smiley' } label={ 'Footer Block' } ></Placeholder>
        }
    }
}

export default withSelect( ( select, props ) => {
    let taxonomy;
	const { type, attributes } = props;
    if ( 'categories' == type ) {
        taxonomy = 'category';
    } else if ( 'tags' == type ) {
        taxonomy = 'post_tag';
    }

	return { terms: select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, { ...DEFAULT_QUERY, include: attributes[type] } ) }
} )( FooterBlock );

