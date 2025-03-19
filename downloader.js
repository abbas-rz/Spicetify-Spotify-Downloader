// NAME: SpotifyDownloader
// AUTHOR: Claude
// DESCRIPTION: Directly downloads playlists using spotDL when download button is clicked

(function SpotifyDownloader() {
    // Wait for Spicetify to be fully loaded
    if (!Spicetify) {
        setTimeout(SpotifyDownloader, 300);
        return;
    }

    // Function to sanitize playlist name for use as folder name
    function sanitizeFolderName(name) {
        return name.replace(/[/\\?%*:|"<>]/g, '-').trim();
    }

    // Function to execute shell commands
    async function executeCommand(command) {
        // This function will send a request to a local server that can execute commands
        // NOTE: This requires setting up a small local server/script that can execute commands
        try {
            const response = await fetch('http://localhost:8765/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command }),
            });
            
            return await response.json();
        } catch (error) {
            console.error('Failed to execute command:', error);
            throw error;
        }
    }

    // Function to download playlist using spotDL
    async function downloadPlaylist() {
        try {
            // Get the current URI path
            const uri = Spicetify.Platform.History.location.pathname;
            
            // Check if current page is a playlist
            if (!uri.includes('/playlist/')) {
                console.log('Not a playlist page');
                Spicetify.showNotification("Not a playlist page");
                return;
            }
            
            // Extract playlist ID from the URI
            const playlistId = uri.split('/').pop();
            
            // Get playlist name directly from DOM
            const playlistNameElement = document.querySelector('h1[dir="auto"]');
            const playlistName = playlistNameElement ? playlistNameElement.textContent : 'Unknown_Playlist';
            const sanitizedName = sanitizeFolderName(playlistName);
            
            // Log playlist info
            console.log('Playlist Name:', playlistName);
            const playlistUrl = 'https://open.spotify.com/playlist/' + playlistId;
            console.log('Playlist URL:', playlistUrl);
            
            // Show downloading notification
            Spicetify.showNotification(`Downloading "${playlistName}" playlist...`);
            
            // Generate spotDL command
            const spotdlCommand = `${playlistUrl} --output "${sanitizedName}"`;
            console.log('Executing command:', spotdlCommand);
            
            try {
                // Execute the spotDL command
                await executeCommand(spotdlCommand);
                
                // Show completion notification
                Spicetify.showNotification(`"${playlistName}" downloaded successfully!`);
            } catch (error) {
                console.error('Download failed:', error);
                Spicetify.showNotification(`Failed to download "${playlistName}"`);
            }
        } catch (error) {
            console.error('Error downloading playlist:', error);
            Spicetify.showNotification("Error preparing download");
        }
    }

    // Function to find and attach event to download buttons
    function attachToDownloadButtons() {
        // Find download buttons by their aria-label or title
        const downloadButtons = document.querySelectorAll('[aria-label*="Download"], [title*="Download"]');
        
        if (downloadButtons.length > 0) {
            downloadButtons.forEach(button => {
                // Remove any existing event listeners
                button.removeEventListener('click', downloadPlaylist);
                // Add new event listener
                button.addEventListener('click', downloadPlaylist);
                console.log('SpotifyDownloader: Attached listener to download button');
            });
            return true;
        }
        return false;
    }

    // Function to wait for download buttons to appear
    function waitForDownloadButton() {
        if (!attachToDownloadButtons()) {
            setTimeout(waitForDownloadButton, 1000);
        }
    }

    // Start waiting for the button to appear
    waitForDownloadButton();
    
    // Create a MutationObserver to detect when DOM changes
    const observer = new MutationObserver(mutations => {
        attachToDownloadButtons();
    });

    // Start observing the document body for changes
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    
    // Also attach to navigation events to handle when user navigates between playlists
    Spicetify.Platform.History.listen(location => {
        if (location.pathname.includes('/playlist/')) {
            setTimeout(waitForDownloadButton, 1000);
        }
    });
    
    console.log('SpotifyDownloader extension loaded');
})();