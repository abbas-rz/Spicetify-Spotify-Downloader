# 🎧 Spotify Downloader for Spicetify

An integrated **Spotify Downloader** extension for **Spicetify**. Simply hit the standard "Download" button on any playlist, and enjoy your saved tracks from the **Downloaded** tab in your library! (Powered by [SpotDL](https://github.com/spotDL/spotify-downloader)).

---

## 🚀 Features
✅ Seamless playlist downloading via the default Spotify UI.  
✅ Automatically stores songs in the **Downloaded** tab.  
✅ Uses **SpotDL** for fast and high-quality downloads.  

---

## 🛠️ Installation

Follow these steps to get started:

### 1. Install Prerequisites
- Download and install **Python** (Make sure to add it to PATH).  
- Install **SpotDL** using the following command:  
`pip install spotdl`

### 2. Add the Extension
- Place both files from this repository into your **Spicetify extensions** folder:  
`%userprofile%\.spicetify\Extensions`  *(Windows)*  
`~/.spicetify/Extensions`  *(Mac/Linux)*  

### 3. Run the Python Script
Run the Python script to configure the downloader:  
`python spotdl_script.py`

### 4. (Optional) Add Extensions Folder to Spotify
To ensure local files are accessible, add the **Extensions** folder to your **Spotify Settings**:  
- Go to **Settings > Local Files** and add the folder path.

### 5. Hit the Download Button!
- Open Spotify, navigate to your playlist, and click the regular **"Download"** button.  
- Tracks will be saved and accessible from the **Downloaded** tab.  

---

## 🎨 Customization
You can modify the script or extension to suit your needs. To explore Spicetify customization options, visit the [Spicetify GitHub](https://github.com/spicetify/spicetify-cli).

---

## 🧠 Troubleshooting
If you encounter issues:
- Ensure Python and SpotDL are correctly installed.  
- Double-check that the extension files are placed in the correct directory.  
- Restart Spotify and apply changes using:  
`spicetify apply`

---

## 📚 License
This project is licensed under the **MIT License**.  
Feel free to modify and distribute it as needed.

---

## 🌟 Credits
- Built with ❤️ using [Spicetify](https://github.com/spicetify/spicetify-cli) and [SpotDL](https://github.com/spotDL/spotify-downloader).
