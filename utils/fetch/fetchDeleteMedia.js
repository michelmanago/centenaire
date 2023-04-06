import {getServerImageEndpoint} from '../utils-serveur-image';

export default async function fetchDeleteMedia(media) {
    try {
        let results = null;
        let mediaNameSplit = media.public_path.split('/');
        let mediaName = mediaNameSplit[mediaNameSplit.length - 1];

        // Fetch
        const response = await fetch(getServerImageEndpoint() + '/' + mediaName, {
            method: 'DELETE',
        });

        // Decode
        if (response.ok) {
            results = await response.json();
        } else {
            throw new Error(response.statusText);
        }

        // Receive results
        return true;
    } catch (error) {
        console.log('FetchDeleteMedia', error);
        return false;
    }
}
