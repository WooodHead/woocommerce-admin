/** @format */
/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * WooCommerce dependencies
 */
import { stringifyQuery } from '@woocommerce/navigation';

/**
 * Internal dependencies
 */
import { computeSuggestionMatch } from './utils';

/**
 * A download IP address autocompleter.
 * See https://github.com/WordPress/gutenberg/tree/master/packages/components/src/autocomplete#the-completer-interface
 *
 * @type {Completer}
 */
export default {
	name: 'download-ips',
	className: 'woocommerce-search__download-ip-result',
	options( match ) {
		let payload = '';
		if ( match ) {
			const query = {
				match,
			};
			payload = stringifyQuery( query );
			return apiFetch( { path: `/wc/v3/data/download-ips${ payload }` } );
		}
	},
	isDebounced: true,
	getOptionKeywords( download ) {
		return [ download.user_ip_address ];
	},
	getOptionLabel( download, query ) {
		const match = computeSuggestionMatch( download.user_ip_address, query ) || {};
		return [
			<span key="name" className="woocommerce-search__result-name" aria-label={ download.user_ip_address }>
				{ match.suggestionBeforeMatch }
				<strong className="components-form-token-field__suggestion-match">
					{ match.suggestionMatch }
				</strong>
				{ match.suggestionAfterMatch }
			</span>,
		];
	},
	getOptionCompletion( download ) {
		return {
			id: download.user_ip_address,
			label: download.user_ip_address,
		};
	},
};
